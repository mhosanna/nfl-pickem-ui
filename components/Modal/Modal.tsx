import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function AppModal({ isOpen, setOpenModal }) {
  console.log({ isOpen });

  function handleClose() {
    console.log("Handle Close");
    setOpenModal(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onAfterClose={handleClose}
    >
      <p>Hello</p>
    </Modal>
  );
}
