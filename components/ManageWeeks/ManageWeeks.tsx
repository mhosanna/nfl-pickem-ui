import React from "react";
import AddNewTile from "../AddNewTile";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import AppModal from "../Modal";

const CREATE_WEEK_MUTATION = gql`
  query CREATE_WEEK_BY_SEASON($season: String, $label: String) {
    createWeek(data: { label: $label, season: $season }) {
      id
      label
      season
    }
  }
`;

export default function ManageWeeks() {
  const [openModal, setOpenModal] = React.useState(false);
  console.log({ openModal });

  function handleCreateWeek({ label }) {
    console.log("Clicked");
    setOpenModal(true);
    // const [createWeek] = useMutation(CREATE_WEEK_MUTATION);
    // createWeek({
    //   variables: { season: "2021", label },
    // });
  }

  return (
    <>
      <AddNewTile label="Add New Week" icon="Plus" onClick={handleCreateWeek} />
      <AppModal isOpen={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
