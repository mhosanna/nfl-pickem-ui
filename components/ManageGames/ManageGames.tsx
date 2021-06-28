import React from "react";
import AddNewTile from "../AddNewTile";
import Spacer from "../Spacer";
import Modal from "../Modal";
import { GameTiles } from "../GameTiles";
import NewGameForm from "../NewGameForm";

export default function ManageGames() {
  const [openModal, setOpenModal] = React.useState(false);

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
        handleDismiss={() => setOpenModal(false)}
      >
        <NewGameForm setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
}
