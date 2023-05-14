import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

import Hero from "../../ComponentsTeacher/Hero";
import { BsTable } from "react-icons/bs";
import { RiArrowDropRightLine } from "react-icons/ri";
import { MdLibraryAddCheck } from "react-icons/md";
import { HiMinusCircle } from "react-icons/hi";

const listCard = [
  {
    title: "View schedule",
    icon: <BsTable />,
    discription:
      "Get access to your own specific schedules by clicking on the continue button.",
    path: "/teacher/view-schedule",
    boxShadow: {
      boxShadow: "0 1px 1px #e3beff, 0 2px 4px #e3beff",
    },
    colorTitle: {
      color: "#c575ff",
    },
    colorButton: {
      backgroundColor: "#c575ff",
      border: "1px solid #c575ff",
    },
  },
  {
    title: "Manage presence",
    icon: <MdLibraryAddCheck />,
    discription:
      "Manually manage the list of present students in a session by clicking on the continue button.",
    path: "/teacher/manage-presence",
    boxShadow: {
      boxShadow: "0 1px 1px #A9F7FF, 0 2px 4px #A9F7FF",
    },
    colorTitle: {
      color: "#43BECA",
    },
    colorButton: {
      backgroundColor: "#43BECA",
      border: "1px solid #43BECA",
    },
  },
  {
    title: "Excluded students",
    icon: <HiMinusCircle />,
    discription:
      "View and manage the list of excluded students by clicking on the continue button.",
    path: "/teacher/excluded-students",
    boxShadow: {
      boxShadow: "0 1px 1px #FFCADC, 0 2px 4px #FFCADC",
    },
    colorTitle: {
      color: "#FF6B9E",
    },
    colorButton: {
      backgroundColor: "#FF6B9E",
      border: "1px solid #FF6B9E",
    },
  },
];

const TeacherHome = () => {
  useEffect(() => {
    getTeacherData();
  }, []);

  //the chelf api to get teacher infor and store on the session storage of the browser
  const getTeacherData = async () => {
    await axios
      .get(
        `http://localhost:5000/api/chelf/data/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          let { department, module, status, groups, level, sceance } =
            res.data.data;

          sessionStorage.setItem("department", department); 
          sessionStorage.setItem("module", module);
          sessionStorage.setItem("status", status);
          sessionStorage.setItem("groups", JSON.parse(groups));
          sessionStorage.setItem("level", level); 
          sessionStorage.setItem("sceance", JSON.parse(sceance));
        }
        if (res.data.status === "FAILED") {
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
          <HomeIcon />
          <Hearder>Home</Hearder>
        </HeaderContainer>
        <Hero />
        <CardContainer>
          {listCard.map((list) => (
            <Card style={list.boxShadow} key={list.title}>
              <TitleContainer style={list.colorTitle}>
                <TitelIcon>{list.icon}</TitelIcon>
                <Title>{list.title}</Title>
              </TitleContainer>
              <CardDiscription>
                <Discription>{list.discription}</Discription>
              </CardDiscription>
              <CardButton style={list.colorButton}>
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  to={list.path}
                >
                  Continue
                </Link>{" "}
                <RiArrowDropRightLine />
              </CardButton>
            </Card>
          ))}
        </CardContainer>
      </Content>
    </Wrapper>
  );
};

export default TeacherHome;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
  width: 100%;
`;

const Content = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HomeIcon = styled(HiHome)`
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

const CardContainer = styled.div`
  margin-top: 30px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  height: 100%;
  width: 180px;
  margin-right: 100px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const TitelIcon = styled.div`
  font-size: 20px;
`;
const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;

const CardDiscription = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;

const Discription = styled.p`
  font-size: 12px;
  color: #777b86;
  font-style: italic;
`;

const CardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 45%;
  color: #fff;
  font-style: italic;
  padding: 5px;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
