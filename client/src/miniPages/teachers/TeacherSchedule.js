import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SheduleTeacher from "../../ComponentsTeacher/SheduleTeacher";

const TeacherSchedule = () => {
  const navigation = useNavigate();
  const [scheduleData, setScheduleData] = useState({});
  const [email, setEmail] = useState();

  useEffect(() => {
    getSchedulesFromDB();
    setEmail(sessionStorage.getItem("email"));  
  }, []);

  const getSchedulesFromDB = async () => {
    await axios
      .get(
        `http://localhost:5000/api/admin/schedule/${sessionStorage.getItem(
          "level"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setScheduleData(res.data.result);
        }
        if (res.data.status === "FAILEd") {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <BackIcon onClick={() => navigation(-1)} />
          <Hearder>My Schedule</Hearder>
        </HeaderContainer>
        <SheduleTeacher scheduleData={scheduleData} email={email} />
      </Content>
    </Wrapper>
  );
};

export default TeacherSchedule;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  // justify-content: space-between;
`;

const BackIcon = styled(FaArrowLeft)`
  color: #777b86;
  font-size: 23px;
  font-weight: 700;
  margin-right: 40px;
  cursor: pointer;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;
