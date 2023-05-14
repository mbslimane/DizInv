import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

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
    width: "450px",
    height: "500px",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const AssignTeacherModal = ({
  isOpen,
  close,
  initial,
  setInitial,
  editTeacher,
  deletTeacher,
  clearState,
}) => {
  const [emailOptions, setEmailOptions] = useState([]);

  const updateInitial = (name, value) => {
    if (name === "name") {
      let newInitial = initial;
      newInitial.teacher.name = value.split(" ")[0];

      setInitial(newInitial);
    }

    if (name === "email") {
      let newInitial = initial;
      newInitial.teacher.email = value;

      setInitial(newInitial);
    }

    console.log(initial);
  };

  const CancelClick = () => {
    close();
    clearState();
  };

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#c575ff",
        primary: "#c575ff",
      },
    };
  }

  const Styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
    }),
  };

  useEffect(() => {
    getTeacherOptions();
  }, []);

  const getTeacherOptions = async () => {
    await axios
      .get(
        `http://localhost:5000/api/chelf/emails/${sessionStorage.getItem(
          "department"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setEmailOptions(res.data.emails);
        }
        if (res.data.status === "FAILED") {
          getTeacherOptions();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <Wrapper>
        <form>
          <Header> Edit Delete Teacher sceance</Header>
          <Inputs
            placeholder="enter first name of teacher only ...."
            defaultValue={initial.teacher.name}
            onChange={(e) => updateInitial(e.target.name, e.target.value)}
            name="name"
            type="text"
          />

          <SelectEmail
            onChange={(e) => updateInitial("email", e.value)}
            placeholder="enter teachers email ...."
            theme={customTheme}
            options={emailOptions}
            isSearchable
            styles={Styles}
          />

          <ButtonContainers>
            <Buttons onClick={(e) => editTeacher(e)}>Edit</Buttons>
            <Buttons onClick={(e) => deletTeacher(e)}>Delete</Buttons>
            <Buttons onClick={CancelClick}>Cancel</Buttons>
          </ButtonContainers>
        </form>
      </Wrapper>
    </Modal>
  );
};

export default AssignTeacherModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  & > form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  }
`;

const Header = styled.h1`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Inputs = styled.input`
  width: 80%;
  height: 35px;
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
  border: 1px solid #c4c4c4;

  &:hover {
    border: 2px solid #c575ff;
  }
`;

const SelectEmail = styled(Select)`
  width: 82%;
  position: absolute;
  margin-bottom: 20px;
`;

const ButtonContainers = styled.div``;

const Buttons = styled.button`
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  margin-left: 20px;
  background-color: #f56396;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #fff;
    color: #8f8f8f;
  }
`;
