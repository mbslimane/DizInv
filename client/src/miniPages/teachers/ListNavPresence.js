import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../../components/Search";
import axios from "axios";
import Modal from "react-modal";
import { BiMessageSquareEdit } from "react-icons/bi";
import { CgFileRemove } from "react-icons/cg";

import toast, { Toaster } from "react-hot-toast";
import { TiUserDelete } from "react-icons/ti";

import Select from "react-select";
// import { useParams } from "react-router-dom";

const customStylesModal = {
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
    height: "250px",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const customStyles = {
  menuList: () => ({
    height: 10,
  }),
  menu: (provided, state) => ({
    ...provided,
    height: "170px",
    overflowY: "scroll",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "13px",
  }),
};

//toast messages
const deletUnsuccessfull = (message) => {
  toast.error(message, {
    style: {
      background: "rgba(255,51,51, 0.7)",
      color: "#fff",
    },
  });
};

//this function is called from the addNew forms components
const deleteSuccessfull = (message) => {
  toast.success(message, {
    style: {
      background: "#25ab42",
      color: "#fff",
    },
  });
};

const ListNavPresence = ({
  getQuery,
  setDateQuery,
  dateList,
  getAllDate,
  currentDate,
  setCurrentDate,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //refresh state management after every delete
  const [refresh, setRefresh] = useState(false);

  const deleteSession = async () => {
    let id = "";

    let today = new Date().toLocaleDateString();

    //check if thesession is today or not
    if (currentDate.value === today) {
      dateList.map((date) => {
        if (date.value === currentDate.value) {
          id = date.id_session;
          return;
        }
      });
    } else {
      deletUnsuccessfull("You can only delete sessions of Today!!");
      setModalIsOpen(false);
      return;
    }

    //  console.log("id");
    // deleting the session if it was todays session
    if (id) {
      await axios
        .get(`http://localhost:5000/api/managePresence/delete-session/${id}`)
        .then((res) => {
          if (res.data.status === "SUCCESS") {
            deleteSuccessfull(res.data.message);
            setModalIsOpen(false);
            setDateQuery("");
            setCurrentDate({ value: null, label: null });
            setRefresh(!refresh);
            //console.log(res.data.message);
          }
          if (res.data.status === "FAILED") {
            //this error message should be prompted to show in the toast
            deletUnsuccessfull(res.data.message);
            setModalIsOpen(false);
            //  console.log(res.data.message);
          }
        })
        .catch((err) => {
          setModalIsOpen(false);
          console.log(err);
        });
    }
  };

  const setNewDate = (date) => {
    setDateQuery(date.value);
  };
  console.log(currentDate);

  // refresh after delete
  useEffect(() => {}, [refresh]);

  return (
    <Wrapper>
      <Toaster />
      <SearchContainer>
        <Search onChange={getQuery} />
      </SearchContainer>
      <Operation>
        <div
          onClick={() => {
            getAllDate();
          }}
        >
          <SelectDate
            placeholder="Pick date"
            value={currentDate.value === null ? null : currentDate}
            styles={customStyles}
            name="date"
            options={dateList}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: "#e5cbff",
                primary: "#bf7fff",
              },
            })}
            onChange={(e) => setNewDate(e)}
          />
        </div>
        <EditSession>
          Edit
          <BiMessageSquareEdit />
        </EditSession>
        <DeleteSession onClick={() => setModalIsOpen(true)}>
          Delete
          <CgFileRemove />
        </DeleteSession>
      </Operation>
      <Modal
        isOpen={modalIsOpen}
        style={customStylesModal}
        onRequestClose={() => setModalIsOpen(false)}
        onClick={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <DeletStudent>
          <DeletStudentUp>
            <DeletStudentIcon />
            <DeletStudentHeader>Delete Session</DeletStudentHeader>
          </DeletStudentUp>
          <DeletStudentButtonContainer>
            <DeletStudentWarning>
              Session will be permanently remove <br /> from your database !!
            </DeletStudentWarning>
            <div>
              <DeletStudentButtonCancel onClick={() => setModalIsOpen(false)}>
                Cancel
              </DeletStudentButtonCancel>
              <DeletStudentButtonDelete onClick={() => deleteSession()}>
                Delete Session
              </DeletStudentButtonDelete>
            </div>
          </DeletStudentButtonContainer>
        </DeletStudent>
      </Modal>
    </Wrapper>
  );
};

export default ListNavPresence;

const Wrapper = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-radius: 20px 20px 0 0;
`;
const SearchContainer = styled.div`
  border: 2px solid #d0d3e0;
  width: 400px;
  height: 30px;
  padding-left: 15px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const Operation = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SelectDate = styled(Select)`
  width: 230px;
`;

const DeleteSession = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffcbe5;
  color: #ff7fbf;

  &:hover {
    background-color: #ffe6f2;
  }
`;
const EditSession = styled.div`
  width: 60px;
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #d8ffd8;
  color: #3bff3b;

  &:hover {
    background-color: #efffef;
  }
`;

// work on modal delet session

const DeletStudent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DeletStudentUp = styled.div`
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DeletStudentIcon = styled(TiUserDelete)`
  font-size: 30px;
  color: #f56396;
`;
const DeletStudentHeader = styled.h1`
  font-size: 30px;
  color: #f56396;
`;
const DeletStudentWarning = styled.p`
  color: #8f8f8f;
  text-align: center;
`;
const DeletStudentButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  background-color: #f1f3f7;
  width: 100%;
  flex: 1;

  & > div {
    margin-top: 20px;
  }
`;
const DeletStudentButtonDelete = styled.button`
  cursor: pointer;
  background-color: #f56396;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 35px;
  margin: 0 5px;
  padding: 5px;
  width: 130px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #fff;
    color: #8f8f8f;
  }
`;
const DeletStudentButtonCancel = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #8f8f8f;
  outline: none;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  height: 35px;
  padding: 5px;
  width: 130px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #f56396;
    color: #fff;
  }
`;
