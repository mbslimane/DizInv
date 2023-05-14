import React from "react";
import Modal from "react-modal";
import AddModuleForm from "./AddModuleForm";

import AddNewFormStudentSection from "./AddNewFormStudentSection";
import AddNewFormTeacher from "./AddNewFormTeacher";

const NewUserModal = ({
  isOpen,
  onRequestClose,
  setModalIsOpen,
  update,
  addedSuccecfully,
  addedFailed,
  Teacher,
  Student,
  Module,
  moduleFormValues,
  mood,
  setMood,
}) => {
  const customStyles = {
    content: {
      top: "50%",  
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#0a0b0d",
      padding: 0,
      border: "none",
      borderRadius: "20px",
      overflow: "hidden",
      width: "900px",
      height: "650px",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {Teacher && (
        <AddNewFormTeacher
          setModalIsOpen={setModalIsOpen}
          addedSuccecfully={addedSuccecfully}
          addedFailed={addedFailed}
          update={update}
        />
      )}
      {Student && (
        <AddNewFormStudentSection
          setModalIsOpen={setModalIsOpen}
          addedSuccecfully={addedSuccecfully}
          addedFailed={addedFailed}
          update={update}
        />
      )}

      {Module && (
        <AddModuleForm
          setModalIsOpen={setModalIsOpen}
          addedSuccecfully={addedSuccecfully}
          addedFailed={addedFailed}
          update={update}
          moduleFormValues={moduleFormValues}
          mood={mood}
          setMood={setMood}
        />
      )}
    </Modal>
  );
};

export default NewUserModal;
