import { useCallback, useMemo, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import PageTitle from "../PageTItle";
import TeamsComboBox from "../TeamsComboBox";
import Spacer from "../Spacer";
import Checkbox from "../Checkbox";

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
                type: currentError.type ?? "validation",
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

export default function EditGame({ game }) {
  console.log({ game });
  const pageTitle =
    game.homeTeam.city +
    " " +
    game.homeTeam.name +
    "  vs " +
    game.awayTeam.city +
    " " +
    game.awayTeam.name;
  const isWinner = (teamId) => {
    if (teamId === game.winner?.id) return true;
    return false;
  };
  return (
    <>
      <PageTitle title={pageTitle} />
      <Spacer size={32} />
      <EditGameForm
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        spread={game.spread}
        isWinner={isWinner}
      />
    </>
  );
}

function EditGameForm({ homeTeam, awayTeam, spread, isWinner }) {
  const [isDisabled, setIsDisabled] = useState(true);
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
            .typeError("Home team cannot be blank"),
          awayTeam: yup
            .object()
            .shape({
              name: yup.string().required(),
              city: yup.string().required(),
              id: yup.string().required(),
            })
            .typeError("Away team cannot be blank"),
          spread: yup
            .string()
            .matches(/^[-+]?[0-9]*\.?[0-9]+$/, {
              message: "Spread must be a number",
            })
            .required("Spread cannot be blank"),
          isHomeWinner: yup.boolean(),
          isAwayWinner: yup.boolean(),
        })
        .test("customTest", null, (obj) => {
          if (obj.isHomeWinner && obj.isAwayWinner) {
            return new yup.ValidationError(
              "Only one team can be the winner of a game",
              null,
              "isWinner"
            );
          }
          return true;
        }),
    []
  );
  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<Inputs>({
    mode: "onSubmit",
    resolver,
    reValidateMode: "onSubmit",
    defaultValues: {
      spread,
      homeTeam,
      awayTeam,
      isHomeWinner: isWinner(homeTeam.id),
      isAwayWinner: isWinner(awayTeam.id),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsDisabled(true);
    console.log({ data });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <FormFields
        control={control}
        register={register}
        errors={errors}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
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
  isDisabled,
  setIsDisabled,
}) {
  return (
    <Wrapper>
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
                disabled={isDisabled}
              />
            )}
          />
          {errors.homeTeam && (
            <ValidationError>{errors.homeTeam.message}</ValidationError>
          )}
        </div>
        <div style={{ marginTop: "29px" }}>
          <Controller
            control={control}
            name="isHomeWinner"
            render={({ field: { onChange, value } }) => (
              <CheckboxWrapper>
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  disabled={isDisabled}
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
          {...register("spread")}
          disabled={isDisabled}
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
                disabled={isDisabled}
              />
            )}
          />
          {errors.awayTeam && (
            <ValidationError>{errors.awayTeam.message}</ValidationError>
          )}
        </div>
        <div style={{ marginTop: "29px" }}>
          <Controller
            control={control}
            name="isAwayWinner"
            render={({ field: { onChange, value } }) => (
              <CheckboxWrapper>
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  disabled={isDisabled}
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
      <Spacer size={10} />
      {isDisabled && (
        <Button type="button" onClick={() => setIsDisabled(!isDisabled)}>
          Edit Game
        </Button>
      )}
      {!isDisabled && <Button type="submit">Save Game</Button>}
    </Wrapper>
  );
}

const FormErrors = styled.div`
  position: relative;
  z-index: 0;
  top: 18px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.span`
  margin-left: 8px;
`;

const Wrapper = styled.div`
  width: 600px;
  border: 2px solid var(--black);
  padding: 16px;
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
  font-size: 1.5rem;
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
