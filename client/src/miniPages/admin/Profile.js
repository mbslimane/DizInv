import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { BiUser } from "react-icons/bi";
import GeneralProfile from "../../components/GeneralProfile";

const Profile = () => {
  //data from the add new userEditProfile
  const [user, setUser] = useState({});

  useEffect(() => {
    getProfileAdmin();
  }, []);

  const getProfileAdmin = async () => {
    await axios
      .get(
        `http://localhost:5000/api/admin/profile/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "SUCCESS") {
          setUser(res.data.result);
        }
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
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
        <GeneralProfile
          user={user}
          getProfileAdmin={getProfileAdmin}
          profileType="admin"
        />
      </Content>
    </Wrapper>
  );
};

export default Profile;

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
