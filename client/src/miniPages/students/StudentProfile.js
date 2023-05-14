import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileStudent from "../../componentStudent/ProfileStudent";
import StudentNavBar from "../../componentStudent/StudentNavBar";

const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await axios
      .get(
        `http://localhost:5000/api/student/profile/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setUser(res.data.result);
          setFirstLetter(res.data.result.firstName.slice(0, 1).toUpperCase());
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
    <>
      <StudentNavBar
        profileStyle={{ backgroundColor: "#000" }}
        firstName={sessionStorage.getItem("firstName")}
      />
      <Wrapper>
        <ProfileStudent
          user={user}
          firstLetter={firstLetter}
          getProfile={getProfile}
        />
      </Wrapper>
    </>
  );
};

export default StudentProfile;

const Wrapper = styled.div`
  background-color: #f1f3f7;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
