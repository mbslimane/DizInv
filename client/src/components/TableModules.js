import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import { TiUserDelete } from "react-icons/ti";

const TableModules = ({
  data,
  DeleteUser,
  updateUI,
  DeleteUserFailed,
  editModalFormValue,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //item to delete
  const [newDelete, setNewDelete] = useState('');
  //console.log(newDelete);

  const onDelete = (id_modules) => {
    setModalIsOpen(true);
    setNewDelete(id_modules);
  };

  const onSubmitDelete = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/admin/delete-module/${newDelete}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setModalIsOpen(false);
          DeleteUser("Module deleted succefully");

          //after delet call back the get request to get back up to date data
          updateUI();
        }
        if (res.data.status === "NON") {
          setModalIsOpen(false);
          DeleteUserFailed("Something went wrong, Try again !!");
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
              <Code>Code</Code>
              <Name>Name</Name>
              <Department>Department</Department>
              <Level>Level</Level>
              <Edit>Edit</Edit>
              <Delete>Delete</Delete>
            </TrHead>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TrBody key={item.id_module}>
                <CodeBody>{item.module_code}</CodeBody>
                <NameBody>{item.module_name}</NameBody>
                <DepartmentBody>{item.department}</DepartmentBody>
                <LevelBody>{item.level}</LevelBody>
                <Tbody2>
                  <EditButton
                    text="Edit"
                    onClick={() => editModalFormValue(item)}
                  >
                    Edit
                  </EditButton>
                </Tbody2>
                <Tbody2>
                  <DeleteButton
                    text="Delete"
                    onClick={() => onDelete(item.id_modules)}
                  >
                    Delete
                  </DeleteButton>
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
            <DeletStudentHeader>Delete Module</DeletStudentHeader>
          </DeletStudentUp>
          <DeletStudentButtonContainer>
            <DeletStudentWarning>
              Module will be permanently remove <br /> from your database !!
            </DeletStudentWarning>
            <div>
              <DeletStudentButtonCancel onClick={() => setModalIsOpen(false)}>
                Cancel
              </DeletStudentButtonCancel>
              <DeletStudentButtonDelete onClick={onSubmitDelete}>
                Delete Module
              </DeletStudentButtonDelete>
            </div>
          </DeletStudentButtonContainer>
        </DeletStudent>
      </Modal>
    </Wrapper>
  );
};

export default TableModules;

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

const Code = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const Name = styled.th`
  width: 300px;
  padding: 3px;
  text-align: left;
`;
const Department = styled.th`
  width: 150px;
  padding: 3px;
  text-align: center;
`;
const Level = styled.th`
  width: 200px;
  padding: 3px;
  text-align: center;
`;
const Edit = styled.th`
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
  width: 300px;
  padding: 3px;
  text-align: left;
  text-transform: capitalize;
`;

const DepartmentBody = styled.td`
  width: 170px;
  padding: 3px;
  text-align: center;
`;

const LevelBody = styled.td`
  width: 200px;
  padding: 3px;
  text-align: center;
  text-transform: capitalize;
`;

const CodeBody = styled.td`
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

const EditButton = styled.div`
  background-color: #d9fcd9;
  color: #25ab42;
  padding: 2px 15px;
  font-size: 13px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: #ffd5ea;
  color: #ab2525;
  padding: 2px 15px;
  font-size: 13px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
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
