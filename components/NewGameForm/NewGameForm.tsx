import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import gql from "graphql-tag";
import styled from "styled-components";
import TeamsComboBox from "../TeamsComboBox";

import { string_to_slug } from "../../utils/slugify";

type Inputs = {};

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_BY_WEEK($label: String, $slug: String, $season: String) {
    createGame(data: { slug: $slug, season: $season }) {
      id
      slug
    }
  }
`;
const GET_ALL_TEAMS = gql`
  query GET_ALL_TEAMS {
    allTeams {
      city
      name
    }
  }
`;

export default function NewGameForm({ setOpenModal }) {
  const { data, error, loading } = useQuery(GET_ALL_TEAMS);
  const [allItems, setAllItems] = useState([]);
  const [inputItems, setInputItems] = useState([]);

  useEffect(() => {
    if (data) {
      const { allTeams } = data;
      setAllItems(allTeams);
      setInputItems(allTeams);
    }
  }, [data]);

  const itemToString = (item) => (item ? item.city + " " + item.name : "");

  const {
    handleSubmit,
    formState: { errors },
    control,
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
    // createGame({
    //   variables: {
    //     slug: string_to_slug(""),
    //     season: "2020",
    //   },
    // });
    // setOpenModal(false);
  };

  if (error) return `Error! ${error.message}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="homeTeam"
        render={({ ...field }) => (
          <TeamsComboBox
            {...field}
            allItems={allItems}
            inputItems={inputItems}
            setInputItems={setInputItems}
            itemToString={itemToString}
            label="Home Team"
            teamsLoading={loading}
          />
        )}
        rules={{
          required: true,
        }}
      />
      {/* <InputWrapper>
      </InputWrapper> */}
      <Button type="submit">Create Game</Button>
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
