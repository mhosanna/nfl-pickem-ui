import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  useForm,
  useFormState,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import gql from 'graphql-tag';
import PageTitle from '../PageTItle';
import TeamsComboBox from '../TeamsComboBox';
import Spacer from '../Spacer';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import { useMutation } from '@apollo/client';
import ErrorMessage from '../ErrorMessage';
import { GET_WEEKS_BY_SEASON_QUERY } from '../WeekTile';
import Tile from '../Tile';

type Team = {
  __typeName: string;
  name: string;
  city: string;
  id: string;
};

type Inputs = {
  homeTeam: Team;
  awayTeam: Team;
  spread: string;
  isHomeWinner: boolean;
  isAwayWinner: boolean;
};

const UPDATE_SPREAD_AND_WINNER_MUTATION = gql`
  mutation UPDATE_GAME_AND_WINNER(
    $gameId: ID!
    $winnerId: ID!
    $spread: Float
  ) {
    updateGame(
      where: { id: $gameId }
      data: { winner: { connect: { id: $winnerId } }, spread: $spread }
    ) {
      id
      winner {
        id
      }
      spread
    }
  }
`;

const UPDATE_SPREAD_REMOVE_WINNER_MUTATION = gql`
  mutation UPDATE_GAME_REMOVE_WINNER($gameId: ID!, $spread: Float) {
    updateGame(
      where: { id: $gameId }
      data: { winner: { disconnect: true }, spread: $spread }
    ) {
      id
      winner {
        id
      }
      spread
    }
  }
`;

const DELETE_GAME_MUTATION = gql`
  mutation DELETE_GAME_MUTATION($gameId: ID!) {
    deleteGame(where: { id: $gameId }) {
      id
    }
  }
`;

export default function EditGame({ game }) {
  return (
    <>
      <PageTitle>
        <span>
          {game.homeTeam.city} {game.homeTeam.name}
        </span>
        <span>vs</span>
        <span>
          {game.awayTeam.city} {game.awayTeam.name}
        </span>
      </PageTitle>
      <Spacer size={32} />
      <EditGameForm
        gameId={game.id}
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        spread={game.spread}
        gameWinner={game.winner}
      />
    </>
  );
}

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const getWinnerId = (data) => {
  //if no checkbox selected, no winner
  if (!data.isAwayWinner && !data.isHomeWinner) {
    return null;
  }
  //return id of home or away team
  if (data.isAwayWinner) {
    return data.awayTeam.id;
  } else {
    return data.homeTeam.id;
  }
};

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteGame));
}

function EditGameForm({ gameId, homeTeam, awayTeam, spread, gameWinner }) {
  const router = useRouter();
  const { week, season } = router.query;
  const [updateGame, { loading: updateGameLoading, error: updateGameError }] =
    useMutation(UPDATE_SPREAD_AND_WINNER_MUTATION);
  const [
    updateGameRemoveWinner,
    { loading: updateGameRemoveLoading, error: updateRemoveError },
  ] = useMutation(UPDATE_SPREAD_REMOVE_WINNER_MUTATION);
  const [deleteGame, { error: deleteGameError }] = useMutation(
    DELETE_GAME_MUTATION,
    {
      refetchQueries: [{ query: GET_WEEKS_BY_SEASON_QUERY }],
      variables: { gameId },
      update,
    }
  );

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          homeTeam: yup
            .object()
            .shape({
              name: yup.string(),
              city: yup.string(),
              id: yup.string(),
            })
            .typeError('Home team cannot be blank'),
          awayTeam: yup
            .object()
            .shape({
              name: yup.string().required(),
              city: yup.string().required(),
              id: yup.string().required(),
            })
            .typeError('Away team cannot be blank'),
          spread: yup.string().matches(/^$|[-+]?[0-9]*\.?[0-9]+$/, {
            message: 'Spread must be a number',
          }),
          isHomeWinner: yup.boolean(),
          isAwayWinner: yup.boolean(),
        })
        .test('customTest', null, (obj) => {
          if (obj.isHomeWinner && obj.isAwayWinner) {
            return new yup.ValidationError(
              'Only one team can be the winner of a game',
              null,
              'isWinner'
            );
          }
          return true;
        }),
    []
  );
  const resolver = useYupValidationResolver(validationSchema);
  const isWinner = (teamId) => {
    if (teamId === gameWinner?.id) return true;
    return false;
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver,
    reValidateMode: 'onSubmit',
    defaultValues: {
      spread,
      homeTeam,
      awayTeam,
      isHomeWinner: isWinner(homeTeam.id),
      isAwayWinner: isWinner(awayTeam.id),
    },
  });

  const { isSubmitting, isDirty, isSubmitSuccessful } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const spread = parseFloat(data.spread);
    const winnerId = getWinnerId(data);
    if (winnerId) {
      await updateGame({ variables: { gameId, winnerId, spread } }).catch(
        console.error
      );
    } else {
      await updateGameRemoveWinner({ variables: { gameId, spread } }).catch(
        console.error
      );
    }
    reset({}, { keepValues: true });
  };

  const handleDeleteGame = async () => {
    await deleteGame().catch(console.error);
    router.push({
      pathname: '/manage-games/[season]/[week]',
      query: {
        season,
        week,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <FormFields
        control={control}
        register={register}
        errors={errors}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isSubmitting={isSubmitting}
        isSubmitSuccessful={isSubmitSuccessful}
        isLoading={updateGameLoading || updateGameRemoveLoading}
        isDirty={isDirty}
        updateGameError={updateGameError}
        updateRemoveError={updateRemoveError}
        handleDeleteGame={handleDeleteGame}
      />
    </form>
  );
}

function FormFields({
  control,
  register,
  errors,
  homeTeam,
  awayTeam,
  isSubmitting,
  isSubmitSuccessful,
  isLoading,
  isDirty,
  updateGameError,
  updateRemoveError,
  handleDeleteGame,
}) {
  return (
    <Wrapper>
      <ErrorMessage error={updateGameError || updateRemoveError} />
      <HomeTeamInput>
        <div>
          <Controller
            control={control}
            name="homeTeam"
            render={({ field: { ref, ...fieldProps } }) => (
              <TeamsComboBox
                {...fieldProps}
                inputRef={ref}
                label="Home Team"
                initialTeam={homeTeam}
                disabled={true}
              />
            )}
          />
          {errors.homeTeam && (
            <ValidationError>{errors.homeTeam.message}</ValidationError>
          )}
        </div>
        <div style={{ marginTop: '29px' }}>
          <Controller
            control={control}
            name="isHomeWinner"
            render={({ field: { onChange, value } }) => (
              <CheckboxWrapper>
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  disabled={isSubmitting}
                />
                <CheckboxLabel>Matchup Winner</CheckboxLabel>
              </CheckboxWrapper>
            )}
          />
        </div>
      </HomeTeamInput>
      <Spacer size={24} />
      <InputWrapper>
        <Label>Spread</Label>
        <Input
          placeholder="Ex. -4"
          {...register('spread')}
          disabled={isSubmitting}
        />
        {errors.spread && (
          <ValidationError>{errors.spread.message}</ValidationError>
        )}
      </InputWrapper>

      <Spacer size={24} />
      <AwayTeamInput>
        <div>
          <Controller
            control={control}
            name="awayTeam"
            render={({ field: { ref, ...fieldProps } }) => (
              <TeamsComboBox
                {...fieldProps}
                inputRef={ref}
                label="Away Team"
                initialTeam={awayTeam}
                disabled={true}
              />
            )}
          />
          {errors.awayTeam && (
            <ValidationError>{errors.awayTeam.message}</ValidationError>
          )}
        </div>
        <div style={{ marginTop: '29px' }}>
          <Controller
            control={control}
            name="isAwayWinner"
            render={({ field: { onChange, value } }) => (
              <CheckboxWrapper>
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  disabled={isSubmitting}
                />
                <CheckboxLabel>Matchup Winner</CheckboxLabel>
              </CheckboxWrapper>
            )}
          />
        </div>
      </AwayTeamInput>
      <FormErrors>
        {errors.isWinner && (
          <ValidationError>{errors.isWinner.message}</ValidationError>
        )}
      </FormErrors>
      <Spacer size={50} />
      <FooterWrapper>
        <ButtonWrapper>
          <Button type="submit" disabled={!isDirty || isLoading}>
            Sav{isSubmitting ? 'ing' : 'e'} Game
          </Button>
          {isSubmitSuccessful &&
            !updateGameError &&
            !updateRemoveError &&
            !isDirty && <Tile type="success">Saved!</Tile>}
        </ButtonWrapper>
        <DeleteGameButton type="button" onClick={handleDeleteGame}>
          <Icon name={'Trash2'} size={18} />
          <span>Delete Game</span>
        </DeleteGameButton>
      </FooterWrapper>
    </Wrapper>
  );
}

const DeleteGameButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  color: var(--warning);
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: var(--warningLight);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormErrors = styled.div`
  position: relative;
  z-index: 0;
  top: 18px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const CheckboxLabel = styled.span`
  margin: 0px 8px;
`;

const Wrapper = styled.div`
  width: 600px;
  border: 2px solid var(--black);
  padding: 16px;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding-right: 0px;
    width: 100%;
  }
`;
const HomeTeamInput = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 30px;
  align-items: center;
  > * {
    &:first-child {
      flex: 2;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
`;

const AwayTeamInput = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 30px;
  align-items: center;
  > * {
    &:first-child {
      flex: 2;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 5px;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 8px 32px;
  background: ${(props) =>
    props.disabled ? 'var(--gray500)' : 'var(--black)'};
  color: white;
  border-radius: 3px;
  box-shadow: ${(props) =>
    props.disabled ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)'};
  border: none;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 3px;
  border: 2px solid var(--black);
`;

const ValidationError = styled.span`
  position: absolute;
  z-index: 0;
  bottom: -24px;
  left: 2px;
  font-size: 1.2rem;
  color: var(--warning);
`;
