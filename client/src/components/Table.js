import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import TablePhoto from "./TablePhoto";
import View_Delete from "./View_Delete";

import { TiUserDelete } from "react-icons/ti";

const Table = ({ data, DeleteUser, updateUI }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //item to delete
  const [newDelete, setNewDelete] = useState();
  //console.log(newDelete);

  const onDelete = (id) => {
    setModalIsOpen(true);
    setNewDelete(id);
  };

  const onSubmitDelete = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/admin/delete/${"student"}/${newDelete}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setModalIsOpen(false);
          DeleteUser("User deleted succefully");

          //after delet call back the get request to get back up to date data
          updateUI();
        }
        if (res.data.status === "NON") {
          setModalIsOpen(false);
          DeleteUser("Something went wrong, Try again !!");
        }
      })
      .catch((err) => {
        setModalIsOpen(false);
        console.log(err.message);
      });
    setModalIsOpen(false);
  };

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
      height: "250px",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <Wrapper>
      <Content>
        <table>
          <TableHeader>
            <TrHead>
              <Photo>Photo</Photo>
              <Name>Name</Name>
              <Mobile>Mobile</Mobile>
              <Email>Email</Email>
              <View>View</View>
              <Delete>Delete</Delete>
            </TrHead>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TrBody key={item.inscription}>
                <PhotoBody>
                  <TablePhoto Name={item.firstName.slice(0, 1).toUpperCase()} />
                </PhotoBody>
                <NameBody>
                  {item.firstName} {item.lastName}
                </NameBody>     
                <MobileBody>{item.phone}</MobileBody>
                <EmailBody>{item.email.split("univ")[0]}...</EmailBody>
                <Tbody2>
                  <View_Delete text="View" path={`student/${item.inscription}`} />
                </Tbody2>
                <Tbody2>
                  <View_Delete
                    text="Delete"
                    onClick={() => onDelete(item.inscription)}
                  />
                </Tbody2>
              </TrBody>
            ))}
          </TableBody>
        </table>
      </Content>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        onClick={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <DeletStudent>
          <DeletStudentUp>
            <DeletStudentIcon />
            <DeletStudentHeader>Delete User</DeletStudentHeader>
          </DeletStudentUp>
          <DeletStudentButtonContainer>
            <DeletStudentWarning>
              User will be permanently remove <br /> from your database !!
            </DeletStudentWarning>
            <div>
              <DeletStudentButtonCancel onClick={() => setModalIsOpen(false)}>
                Cancel
              </DeletStudentButtonCancel>
              <DeletStudentButtonDelete onClick={onSubmitDelete}>
                Delete Student
              </DeletStudentButtonDelete>
            </div>
          </DeletStudentButtonContainer>
        </DeletStudent>
      </Modal>
    </Wrapper>
  );
};

export default Table;

const Wrapper = styled.div`
  margin: 0;
`;

const Content = styled.div`
  overflow-y: scroll;
  height: 70vh;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #f6e8ff;
  }

  & > table {
    width: 100%;
  }
`;
const TableHeader = styled.thead`
  background-color: #f1f3f7;
  position: sticky;
  top: 0;
`;
const TrHead = styled.tr`
  padding: 5px 30px 5px 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777b86;
  font-size: 18px;
  border-bottom: 2px solid #f6e8ff;
`;

const Photo = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const Name = styled.th`
  width: 200px;
  padding: 3px;
  text-align: left;
`;
const Mobile = styled.th`
  width: 150px;
  padding: 3px;
  text-align: center;
`;
const Email = styled.th`
  width: 230px;
  padding: 3px;
  text-align: left;
`;
const View = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const Delete = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;

const TableBody = styled.tbody``;

const TrBody = styled.tr`
  padding: 5px 30px 5px 10px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777b86;
  font-size: 15px;
  border-bottom: 2px solid #f6e8ff;

  &:hover {
    background-color: #fdfaff;
  }
`;

const NameBody = styled.td`
  width: 200px;
  padding: 3px;
  text-align: left;
  text-transform: uppercase;
`;

const MobileBody = styled.td`
  width: 170px;
  padding: 3px;
  text-align: center;
`;

const EmailBody = styled.td`
  width: 230px;
  padding: 3px;
  text-align: left;
  text-transform: lowercase;
`;

const PhotoBody = styled.td`
  width: 100px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const Tbody2 = styled.td`
  width: 100px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// work on modal delleting student

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
