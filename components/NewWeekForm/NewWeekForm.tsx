import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import gql from "graphql-tag";
import styled from "styled-components";
import { string_to_slug } from "../../utils/slugify";

type Inputs = {
  weekLabel: string;
};

const CREATE_WEEK_MUTATION = gql`
  mutation CREATE_WEEK_BY_SEASON(
    $label: String
    $slug: String
    $season: String
  ) {
    createWeek(data: { label: $label, slug: $slug, season: $season }) {
      id
      label
      slug
      season
    }
  }
`;

export default function NewWeekForm({ setOpenModal }) {
  const [createWeek] = useMutation(CREATE_WEEK_MUTATION, {
    update(cache, { data: { createWeek } }) {
      cache.modify({
        fields: {
          allWeeks(existingWeeks = []) {
            const newWeekRef = cache.writeFragment({
              data: createWeek,
              fragment: gql`
                fragment NewWeek on allWeeks {
                  id
                  label
                  slug
                  season
                  gamesCount
                }
              `,
            });
            return [...existingWeeks, newWeekRef];
          },
        },
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createWeek({
      variables: {
        label: data.weekLabel,
        slug: string_to_slug(data.weekLabel),
        season: "2020",
      },
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
