import React, { useState } from "react";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import Modal from "react-modal";
import logoImage from "../../asserts/images/logoNav.png";
import MakeJustification from "../../componentStudent/MakeJustification";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: 0,
    border: "none",
    borderRadius: "20px",
    overflow: "hidden",
    width: "500px",
    height: "600px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const StudentAbsenceJustification = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToJustify, setItemToJustify] = useState({});
  // console.log(itemToJustify)

  const List = [
    {
      id_absence: "jjjjj",
      sceance: "TD",
      module: "sysytem information",
      date: "2/2/2022",
      time: "12:30:20",
      isJustified: null,
      inscriotion_no: "james eze",
    },
    {
      id_absence: "jjjjqwej",
      sceance: "TP",
      module: "sysytem Machine",
      date: "2/8/2022",
      time: "10:30:20",
      isJustified: "Pending",
      inscriotion_no: "james eze",
    },
    {
      id_absence: "wwxww",
      sceance: "TD",
      module: "Giene Logiciel",
      date: "21/87/2022",
      time: "15:30:20",
      isJustified: "Accepted",
      inscriotion_no: "james eze",
    },
    {
      id_absence: "wwxfwfwfwww",
      sceance: "TP",
      module: "Development Application Concurrent",
      date: "21/87/2022",
      time: "15:30:20",
      isJustified: "Rejected",
      inscriotion_no: "james eze",
    },
  ];

  return (
    <Wrapper>
      <Logo to="/student/home">
        <img src={logoImage} />
      </Logo>

      <Content>
        <HeaderContainer>
          <Header>My list of Absence and Justification </Header>
         
        </HeaderContainer>
        <AbsenceJustification>
          {List.map((absence) => (
            <Card isJustified={absence.isJustified} key={absence.id_absence}>
              <CardContent
                style={{
                  opacity: absence.isJustified != null && 0.4,
                  pointerEvents: absence.isJustified != null && "none",
                }}
              >
                <Detailes>
                  <Discription>
                    Module: <span> {absence.module} </span>
                  </Discription>
                  <Discription>
                    Sceance: <span>{absence.sceance} </span>
                  </Discription>
                  <Discription>
                    Date: <span> {absence.date} </span>{" "}
                  </Discription>
                  <Discription>
                    Time: <span> {absence.time} </span>{" "}
                  </Discription>
                  <Discription>
                    Justification Status: {""}
                    {absence.isJustified === null && (
                      <span style={{ color: "red" }}> None</span>
                    )}
                    {absence.isJustified === "Rejected" && (
                      <span style={{ color: "red" }}>
                        {" "}
                        {absence.isJustified}{" "}
                      </span>
                    )}
                    {absence.isJustified === "Pending" && (
                      <span style={{ color: "#ffbf00" }}>
                        {" "}
                        {absence.isJustified}
                      </span>
                    )}
                    {absence.isJustified === "Accepted" && (
                      <span style={{ color: "#00cf00" }}>
                        {" "}
                        {absence.isJustified}{" "}
                      </span>
                    )}
                  </Discription>
                </Detailes>
                <JustifyBtn
                  onClick={() => {
                    setModalOpen(true);
                    setItemToJustify(absence);
                  }}
                >
                  Justify Now
                </JustifyBtn>
              </CardContent>
            </Card>
          ))}
        </AbsenceJustification>
      </Content>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
      >
        <MakeJustification itemToJustify={itemToJustify} />
      </Modal>
    </Wrapper>
  );
};

export default StudentAbsenceJustification;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f1f3f7;
`;

const Logo = styled(LinkR)`
  position: absolute;
  margin-top: 30px;
  margin-left: 40px;
  cursor: pointer;
  font-size: 2rem;
  text-decoration: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: #adb1c0;
  margin-bottom: 30px;
  text-decoration: underline;
`;


const AbsenceJustification = styled.div`
  width: 70%;
  // border: 1px solid red;
  overflow-y: scroll;
  height: 80vh;

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
`;

const Card = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    border-radius: 5px;
    margin-left: 8px;
    height: 95%;
    background-color: ${({ isJustified }) => isJustified === null && "#ff6262"};
    background-color: ${({ isJustified }) =>
      isJustified === "Rejected" && "#ff6262"};
    background-color: ${({ isJustified }) =>
      isJustified === "Accepted" && "#00cf00"};
    background-color: ${({ isJustified }) =>
      isJustified === "Pending" && "#ffff76"};
    top: 50%;
    left: 5;
    transform: translateY(-50%);
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Detailes = styled.div`
  padding: 0 25px;
`;

const Discription = styled.h1`
  font-size: 17px;

  & > span {
    font-size: 15px;
    color: #777b86;
    font-style: italic;
  }
`;

const JustifyBtn = styled.button`
  border-radius: 5px;
  background: #00cf00;
  white-space: nowrap;
  padding: 8px 20px;
  color: #fff;
  margin-bottom: 20px;
  margin-right: 20px;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #bbffbb;
    color: #00cf00;
  }
`;
