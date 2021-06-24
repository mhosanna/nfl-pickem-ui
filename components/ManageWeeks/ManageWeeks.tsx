import React from "react";
import AddNewTile from "../AddNewTile";
import Modal from "../Modal";
import NewWeekForm from "../NewWeekForm";
import Spacer from "../Spacer";
import { WeekTiles } from "../WeekTile/WeekTile";

export default function ManageWeeks() {
  const [openModal, setOpenModal] = React.useState(false);

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
        handleDismiss={() => setOpenModal(false)}
      >
        <NewWeekForm setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
}
