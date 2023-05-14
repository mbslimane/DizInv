import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcInspection } from "react-icons/fc";
import JustificationChelf from "../../componentsChelf/JustificationChelf";

const ChelfJustification = () => {
  const [levelOptions, setLevelOptions] = useState([]);
  const [listOfJustification, setListOfJustification] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("department") === "MI") {
      getJustification("Licence 1");
      setLevelOptions(["Licence 1", "Licence 2"]);
    } else {
      getJustification("Licence 3");
      setLevelOptions(["Licence 3", "Master 1", "Master 2"]);
    }
  }, []);

  const List = [
    {
      id_absence: "jjlkjpojjj",
      level: "Licence 1",
      module: "system information",
      sceance: "TD",
      date: "2/2/2022",
      isJustified: null,
      student_name: "james eze",
      student_comment:
        "This is a justification, I was very sick and this justification provided proof of my hospital admission and how long my treatment lasted. i will be available to provide more documents or proof if required by the department. thank you for ur",
      attachment: "file here",
    },
    {
      id_absence: "jjj,kjpjj",
      level: "Licence 1",
      module: "system information",
      sceance: "TD",
      date: "2/2/2022",
      isJustified: "Pending",
      student_name: "james eze",
      student_comment: "None",
      attachment: "file here",
    },
    {
      id_absence: "jjvgjjjj",
      level: "Licence 1",
      module: "system information",
      sceance: "TD",
      date: "2/2/2022",
      isJustified: "Accepted",
      student_name: "james eze",
      student_comment: "None",
      attachment: "file here",
    },
    {
      id_absence: "jjjkkkjj",
      level: "Licence 1",
      module: "system information",
      sceance: "TD",
      date: "2/2/2022",
      isJustified: "Rejected",
      student_name: "james eze",
      student_comment: "None",
      attachment: "file here",
    },
  ];

  //on the change of the levelQuery then there is database call to get data of that level

  const getJustification = (level) => {
    setListOfJustification(List);
    console.log(level);
  };

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <Title>
            <Hearder>
              <FcInspection /> Justification
            </Hearder>
          </Title>
          <Select onChange={(e) => getJustification(e.target.value)}>
            {levelOptions.map((level, index) => (
              <option key={index}>{level}</option>
            ))}
          </Select>
        </HeaderContainer>
        <JustificationChelf listOfJustification={listOfJustification} />
      </Content>
    </Wrapper>
  );
};

export default ChelfJustification;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
  width: 100%;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 65px;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const Select = styled.select`
  height: 30px;
  width: 130px;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  border: 2px solid #adb1c0;
`;
