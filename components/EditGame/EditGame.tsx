import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import gql from "graphql-tag";
import styled from "styled-components";
import PageTitle from "../PageTItle";
import TeamsComboBox from "../TeamsComboBox";
import Spacer from "../Spacer";

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

export default function EditGame({ game }) {
  const pageTitle =
    game.homeTeam.city +
    " " +
    game.homeTeam.name +
    "  vs " +
    game.awayTeam.city +
    " " +
    game.awayTeam.name;
  return (
    <>
      <PageTitle title={pageTitle} />
      <Spacer size={32} />
      <EditGameForm />
    </>
  );
}

function EditGameForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ data });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields control={control} register={register} errors={errors} />
    </form>
  );
}

function FormFields({ control, register, errors }) {
  return (
    <Wrapper>
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
          {...register("spread", {
            required: true,
            pattern: /^[-+]?[0-9]*\.?[0-9]+$/,
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
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 600px;
  border: 2px solid var(--black);
  padding: 16px;
`;
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
  font-size: 1.5rem;
  border-radius: 3px;
  border: 2px solid var(--black);
`;

const ValidationError = styled.span`
  font-size: 1.2rem;
  color: var(--warning);
`;
