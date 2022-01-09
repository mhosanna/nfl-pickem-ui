import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AddNewTile from '../AddNewTile';
import Modal from '../Modal';
import Spacer from '../Spacer';
import { GET_WEEKS_BY_SEASON_QUERY, WeekTiles } from '../WeekTile/WeekTile';
import { string_to_slug } from '../../utils/slugify';
import ErrorMessage from '../ErrorMessage';

type Inputs = {
  weekLabel: string;
};

export const CREATE_WEEK_MUTATION = gql`
  mutation CREATE_WEEK_BY_SEASON(
    $label: String
    $slug: String
    $season: String
    $createdAt: String
  ) {
    createWeek(
      data: {
        label: $label
        slug: $slug
        season: $season
        createdAt: $createdAt
      }
    ) {
      id
      label
      slug
      season
      games {
        id
      }
      gamesCount
    }
  }
`;

export default function ManageWeeks({ season }) {
  const [openModal, setOpenModal] = useState(false);
  const [formError, setFormError] = useState(null);

  const [createWeek, { loading }] = useMutation(CREATE_WEEK_MUTATION, {
    refetchQueries: [{ query: GET_WEEKS_BY_SEASON_QUERY }],
    update(cache, { data: { createWeek } }) {
      cache.modify({
        fields: {
          weeks(existingWeeks = []) {
            const newWeekRef = cache.writeFragment({
              data: createWeek,
              fragment: gql`
                fragment NewWeek on weeks {
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

  async function SubmitNewWeek(data: Inputs) {
    const now = new Date();
    const createdAt = now.toISOString();
    await createWeek({
      variables: {
        label: data.weekLabel,
        slug: string_to_slug(data.weekLabel),
        season,
        createdAt,
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
        label="Add New Week"
        icon="Plus"
        onClick={() => setOpenModal(true)}
      />
      <Spacer size={28} />
      <WeekTiles />
      <Modal
        title="Add a New Week"
        isOpen={openModal}
        handleDismiss={() => {
          setFormError(null);
          setOpenModal(false);
        }}
      >
        <NewWeekForm
          handleSubmitWeek={SubmitNewWeek}
          error={formError}
          loading={loading}
        />
      </Modal>
    </>
  );
}

function NewWeekForm({ handleSubmitWeek, error, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    handleSubmitWeek(data);
  };
  return (
    <form aria-label="add new week form" onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={error} />
      <InputWrapper>
        <Label htmlFor="week-label">Week Label</Label>
        <Input
          id="week-label"
          placeholder="Ex. Week 1"
          {...register('weekLabel', { required: true })}
        />
        {errors.weekLabel && (
          <ValidationError>Week label cannot be blank</ValidationError>
        )}
      </InputWrapper>
      <Button disabled={loading} type="submit">
        Create Week
      </Button>
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
  &:disabled {
    background: var(--gray700);
  }
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
