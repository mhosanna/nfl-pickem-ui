import React from "react";
import AddNewTile from "../AddNewTile";
import Modal from "../Modal";
import NewWeekForm from "../NewWeekForm";


export default function ManageWeeks() {
  const [openModal, setOpenModal] = React.useState(false);
  console.log({ openModal });

  return (
    <>
      <AddNewTile
        label="Add New Week"
        icon="Plus"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        title="Add a New Week"
        isOpen={openModal}
        handleDismiss={() => setOpenModal(false)}
      >
        <NewWeekForm />
      </Modal>
    </>
  );
}
