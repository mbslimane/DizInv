import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineEditNote } from "react-icons/md";
import axios from "axios";
import { BiUser } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import UpdateProfileForm from "./UpdateProfileForm";

const ProfileStudent = ({ user, firstLetter, getProfile }) => {
  const [edit, setEdit] = useState(true);

    //toast messages success
  const successMessage = (message) => {
    toast.success(message, {
      style: {
        background: "#25ab42",
        color: "#fff",
      },
    });
  };

  //toast messages error
  const errorMessage = (message) => {
    toast.error(message, {
      style: {
        background: "rgba(255,51,51, 0.7)",
        color: "#fff",
      },
    });
  };

  //founction to call an Api for the profile update
  const UpdateStudent = async (newValues) => {
    // console.log(newValues);
    await axios
      .post(`http://localhost:5000/api/student/update-profile`, {
        newValues,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.status === "SUCCESS") {
          getProfile();
          setEdit(false);
          successMessage(res.data.message);
        }
        if (res.data.status === "FAILED") {
          errorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Wrapper>
      <Toaster />
      <HeaderContainer>
        <ProfileIcon />
        <Hearder>My Profile</Hearder>
      </HeaderContainer>
      <Content>
        <Info>
          <Personal>
            <Edit onClick={() => setEdit(!edit)} />
            <Header>
              <Photo>{firstLetter}</Photo>
              <Name>
                {user.firstName} {user.lastName}
              </Name>
            </Header>
            <Detail>
              <DataContainer>
                <Data>Email:</Data>
                <Value>{user.email}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Phone:</Data>
                <Value>{user.phone}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Address:</Data>
                <Value>{user.address}</Value>
              </DataContainer>
              <DataContainer>
                <Data>City:</Data>
                <Value>{user.city}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Password:</Data>
                <Value>{user.password}</Value>
              </DataContainer>
            </Detail>
          </Personal>
          <Academic>
            <h1>Academic</h1>
            <AcademicDetail>
              <DataContainer>
                <Data>Dept:</Data>
                <Value>{user.department}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Level:</Data>
                <Value>{user.level}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Inscription-No:</Data>
                <Value>{user.inscription}</Value>
              </DataContainer>
              <DataContainer>
                <Data>Group:</Data>
                <Value>
                  {user.section_speciality} / {user.student_group}
                </Value>
              </DataContainer>
            </AcademicDetail>
          </Academic>
        </Info>
        <UpdateProfileForm
          user={user}
          edit={edit}
          UpdateStudent={UpdateStudent}
        />
      </Content>
    </Wrapper>
  );
};

export default ProfileStudent;

const Wrapper = styled.div`
  margin-top: 40px;
  width: 60%;
  //border:1px solid red ;
`;

const Content = styled.div`
  display: flex;
  height: 75vh;
`;
const Info = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 30px;
`;
const Personal = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  height: 60%;
  padding: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ProfileIcon = styled(BiUser)`
  color: #777b86;
  font-size: 25px;
  font-weight: 700;
  margin-right: 5px;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const Edit = styled(MdOutlineEditNote)`
  position: absolute;
  font-size: 30px;
  margin-left: 25%;
  color: #777b86;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #adb1c0;
  border-radius: 5px;
  padding: 10px;
`;

const Photo = styled.div`
  height: 80px;
  width: 80px;
  font-size: 35px;
  margin-bottom: 5px;
  border-radius: 50%;
  background: #dbffdb;
  color: #29d129;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1`
  font-size: 20px;
  color: #777b86;
`;

const Detail = styled.div`
  padding: 20px 20px;
`;
const DataContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
const Data = styled.h1`
  font-size: 16px;
  margin-right: 10px;
  color: #000000;
  opacity: 0.8;
`;
const Value = styled.p`
  font-size: 14px;
  color: #777b86;
  font-weight: 500;
`;

const Academic = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  margin-top: 10px;
  height: 30%;
  padding: 10px 20px;

  & > h1 {
    font-size: 18px;
    color: #c4c4c4;
    margin-bottom: 10px;
    border-radius: 2px;
    border-bottom: 1px solid #adb1c0;
  }
`;

const AcademicDetail = styled.div`
  padding: 3px 10px;
`;
