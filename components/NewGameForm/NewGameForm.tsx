import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import gql from "graphql-tag";
import styled from "styled-components";
import TeamsComboBox from "../TeamsComboBox";

import { string_to_slug } from "../../utils/slugify";
import Spacer from "../Spacer";

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
const GET_ALL_TEAMS = gql`
  query GET_ALL_TEAMS {
    allTeams {
      id
      city
      name
    }
  }
`;

export default function NewGameForm({ week, season, setOpenModal }) {
  const { data, error, loading } = useQuery(GET_ALL_TEAMS);
  const [allItems, setAllItems] = useState([]);
  const [homeInputItems, setHomeInputItems] = useState([]);
  const [awayInputItems, setAwayInputItems] = useState([]);

  useEffect(() => {
    if (data) {
      const { allTeams } = data;
      setAllItems(allTeams);
      setHomeInputItems(allTeams);
      setAwayInputItems(allTeams);
    }
  }, [data]);

  const itemToString = (item) => (item ? item.city + " " + item.name : "");

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<Inputs>();

  const [createGame] = useMutation(CREATE_GAME_MUTATION, {
    update(cache, { data: { createGame } }) {
      cache.modify({
        fields: {
          allGames(existingGames = []) {
            const newGameRef = cache.writeFragment({
              data: createGame,
              fragment: gql`
                fragment NewGame on allGames {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ data });
    const slug = string_to_slug(data.homeTeam.name + " " + data.awayTeam.name);

    createGame({
      variables: {
        season,
        slug,
        week: week.id,
        homeTeamId: data.homeTeam.id,
        awayTeamId: data.awayTeam.id,
        spread: parseInt(data.spread),
      },
    });
    setOpenModal(false);
  };

  //TODO: Make better error messages
  if (error) return <div>Error! {error.message}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HomeTeamInput>
        <Controller
          control={control}
          name="homeTeam"
          render={({ field: { ref, ...fieldProps } }) => (
            <TeamsComboBox
              {...fieldProps}
              inputRef={ref}
              allItems={allItems}
              inputItems={homeInputItems}
              setInputItems={setHomeInputItems}
              itemToString={itemToString}
              label="Home Team"
              teamsLoading={loading}
            />
          )}
          rules={{
            required: true,
          }}
        />
      </HomeTeamInput>
      <Spacer size={24} />
      <InputWrapper>
        <Label>Spread</Label>
        <Input
          placeholder="Ex. -4"
          {...register("spread", { required: true })}
        />
      </InputWrapper>
      <Spacer size={24} />
      <AwayTeamInput>
        <Controller
          control={control}
          name="awayTeam"
          render={({ field: { ref, ...fieldProps } }) => (
            <TeamsComboBox
              {...fieldProps}
              inputRef={ref}
              allItems={allItems}
              inputItems={awayInputItems}
              setInputItems={setAwayInputItems}
              itemToString={itemToString}
              label="Away Team"
              teamsLoading={loading}
            />
          )}
          rules={{
            required: true,
          }}
        />
      </AwayTeamInput>
      <Button type="submit">Create Game</Button>
    </form>
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
  font-size: 1.5rem;
  border-radius: 3px;
  border: 2px solid var(--black);
`;

const ValidationError = styled.span`
  font-size: 1.2rem;
  color: var(--warning);
`;
