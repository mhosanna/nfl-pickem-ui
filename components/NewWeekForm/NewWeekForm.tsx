import { useMutation, useQuery } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import gql from "graphql-tag";
import styled from "styled-components";
import { GET_WEEKS_BY_SEASON_QUERY } from "../WeekTile";

type Inputs = {
  weekLabel: string;
};

const CREATE_WEEK_MUTATION = gql`
  mutation CREATE_WEEK_BY_SEASON($label: String, $season: String) {
    createWeek(data: { label: $label, season: $season }) {
      id
      label
      season
    }
  }
`;

export default function NewWeekForm({ setOpenModal }) {
  const [createWeek] = useMutation(CREATE_WEEK_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createWeek({
      variables: { label: data.weekLabel, season: "2020" },
      //TODO: Figure out how to add new week to cache
    });
    setOpenModal(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <label>Week Label</label>
        <Input
          placeholder="Ex. Week 1"
          {...register("weekLabel", { required: true })}
        />
        {errors.weekLabel && (
          <ValidationError>Week label cannot be blank</ValidationError>
        )}
      </InputWrapper>
      <Button type="submit">Create Week</Button>
    </form>
  );
}

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

const Input = styled.input`
  padding: 6px 12px;
  font-size: 1.5rem;
  min-width: 350px;
  border-radius: 3px;
  border: 1px solid var(--gray500);
`;

const ValidationError = styled.span`
  font-size: 1.2rem;
  color: var(--warning);
`;
