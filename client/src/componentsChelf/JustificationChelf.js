import React from "react";
import styled from "styled-components";

const JustificationChelf = ({ listOfJustification }) => {
  return (
    <Wrapper>
      <AbsenceJustification>
        {listOfJustification.map((absence) => (
          <Card isJustified={absence.isJustified} key={absence.id_absence}>
            <CardContent>
              <Detailes>
                <Discription>
                  Student: <span> {absence.student_name} </span>
                </Discription>
                <Discription>
                  Level: <span> {absence.level} </span>
                </Discription>
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
                    <span style={{ color: "#00cf00" }}>
                      {" "}
                      {absence.isJustified}{" "}
                    </span>
                  )}
                  {absence.isJustified === "Pending" && (
                    <span style={{ color: "red" }}> {absence.isJustified}</span>
                  )}
                  {absence.isJustified === "Accepted" && (
                    <span style={{ color: "#00cf00" }}>
                      {absence.isJustified}
                    </span>
                  )}
                </Discription>
                <Discription>
                  Student Comment:
                  <span>{absence.student_comment} </span>{" "}
                </Discription>
                <Discription>
                  Attachment:
                  <span> {absence.attachment} </span>{" "}
                </Discription>
              </Detailes>
              <JustifyBtn
              // onClick={() => {
              //   setModalOpen(true);
              //   setItemToJustify(absence);
              // }}
              >
                Decision
              </JustifyBtn>
            </CardContent>
          </Card>
        ))}
      </AbsenceJustification>
    </Wrapper>
  );
};

export default JustificationChelf;

const Wrapper = styled.div`
  margin-top: 20px;
  height: 80vh;
`;

const AbsenceJustification = styled.div`
  width: 95%;
  // border: 1px solid red;
  overflow-y: scroll;
  height: 80vh;

  &::-webkit-scrollbar {
    width: 5px;
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
  height: 250px;
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
      isJustified === "Rejected" && "#00cf00"};
    background-color: ${({ isJustified }) =>
      isJustified === "Accepted" && "#00cf00"};
    background-color: ${({ isJustified }) =>
      isJustified === "Pending" && "#ff6262"};
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
    text-transform: capitalize;
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
