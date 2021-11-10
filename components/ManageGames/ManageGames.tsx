import React from 'react';
import AddNewTile from '../AddNewTile';
import Spacer from '../Spacer';
import Modal from '../Modal';
import { GameTiles } from '../GameTiles';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { string_to_slug } from '../../utils/slugify';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TeamsComboBox from '../TeamsComboBox';
import ErrorMessage from '../ErrorMessage';
import { GET_GAMES_BY_WEEK_SLUG } from '../GameTiles';

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
};

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_BY_WEEK(
    $season: String
    $slug: String
    $week: ID!
    $homeTeamId: ID!
    $awayTeamId: ID!
    $spread: Float
  ) {
    createGame(
      data: {
        season: $season
        slug: $slug
        week: { connect: { id: $week } }
        homeTeam: { connect: { id: $homeTeamId } }
        awayTeam: { connect: { id: $awayTeamId } }
        spread: $spread
      }
    ) {
      id
      slug
    }
  }
`;

export default function ManageGames({ weekId, season }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [formError, setFormError] = React.useState(null);

  const [createGame] = useMutation(CREATE_GAME_MUTATION, {
    refetchQueries: [{ query: GET_GAMES_BY_WEEK_SLUG }],
    update(cache, { data: { createGame } }) {
      cache.modify({
        fields: {
          games(existingGames = []) {
            const newGameRef = cache.writeFragment({
              data: createGame,
              fragment: gql`
                fragment NewGame on games {
                  id
                  slug
                }
              `,
            });
            return [...existingGames, newGameRef];
          },
        },
      });
    },
  });

  async function SubmitNewGame(data: Inputs) {
    const slug = string_to_slug(data.homeTeam.name + ' ' + data.awayTeam.name);

    await createGame({
      variables: {
        season,
        slug,
        week: weekId,
        homeTeamId: data.homeTeam.id,
        awayTeamId: data.awayTeam.id,
        spread: parseFloat(data.spread),
      },
    })
      .then(() => {
        setOpenModal(false);
        setFormError(null);
      })
      .catch((error) => setFormError(error));
  }

  return (
    <>
      <AddNewTile
        label="Add New Game"
        icon="Plus"
        onClick={() => setOpenModal(true)}
      />
      <Spacer size={28} />
      <GameTiles />
      <Modal
        title="Add a New Game"
        isOpen={openModal}
        handleDismiss={() => {
          setFormError(null);
          setOpenModal(false);
        }}
      >
        <NewGameForm
          handleSubmitGame={SubmitNewGame}
          error={formError}
        ></NewGameForm>
      </Modal>
    </>
  );
}

function NewGameForm({ handleSubmitGame, error }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    handleSubmitGame(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields
        control={control}
        register={register}
        errors={errors}
        formError={error}
      />
    </form>
  );
}

function FormFields({ control, register, errors, formError }) {
  return (
    <>
      <ErrorMessage error={formError} />
      <HomeTeamInput>
        <Controller
          control={control}
          name="homeTeam"
          render={({ field: { ref, ...fieldProps } }) => (
            <TeamsComboBox {...fieldProps} inputRef={ref} label="Home Team" />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.homeTeam && (
          <ValidationError>You must select a Home Team</ValidationError>
        )}
      </HomeTeamInput>
      <Spacer size={24} />
      <InputWrapper>
        <Label>Spread</Label>
        <Input
          placeholder="Ex. -4"
          {...register('spread', {
            pattern: /^$|[-+]?[0-9]*\.?[0-9]+$/,
          })}
        />
        {errors.spread && (
          <ValidationError>Spread must be a number</ValidationError>
        )}
      </InputWrapper>
      <Spacer size={24} />
      <AwayTeamInput>
        <Controller
          control={control}
          name="awayTeam"
          render={({ field: { ref, ...fieldProps } }) => (
            <TeamsComboBox {...fieldProps} inputRef={ref} label="Away Team" />
          )}
          rules={{
            required: true,
          }}
        />
        {errors.awayTeam && (
          <ValidationError>You must select an Away Team</ValidationError>
        )}
      </AwayTeamInput>
      <Button type="submit">Create Game</Button>
    </>
  );
}

const HomeTeamInput = styled.div`
  position: relative;
  z-index: 2;
`;

const AwayTeamInput = styled.div`
  position: relative;
  z-index: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 5px;
`;

const Button = styled.button`
  display: block;
  font-size: 1.4rem;
  margin: 32px auto 0;
  padding: 8px 32px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  font-size: 1.2rem;
  color: var(--warning);
`;
