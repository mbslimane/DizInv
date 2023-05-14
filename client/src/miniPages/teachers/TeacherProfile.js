import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { BiUser } from "react-icons/bi";
import ProfileTeacher from "../../ComponentsTeacher/ProfileTeacher";

const TeacherProfile = () => {
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await axios
      .get(
        `http://localhost:5000/api/teacher/profile/${sessionStorage.getItem(
          "id_user"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setUser(res.data.person);
          setFirstLetter(res.data.person.firstName.slice(0, 1).toUpperCase());
        }
        if (res.data.status === "FAILED") {
          console.log("Couldn't get profile data, Try again!");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <ProfileIcon />
          <Hearder>My Profile</Hearder>
        </HeaderContainer>
        <ProfileTeacher user={user} firstLetter={firstLetter} getProfile={getProfile} />
      </Content>
    </Wrapper>
  );
};

export default TeacherProfile;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
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
