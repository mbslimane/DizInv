import React, { useState } from "react";
import styled from "styled-components";
import Group from "./Group";
import ListTotal from "./ListTotal";
import Search from "./Search";
import Section_Speciality from "./Section_Speciality";
import SelectDepartment from "./SelectDepartment";

const ListNav = ({
  total,
  onChange,
  level,
  section,
  speciality,
  setSection,
  setSpeciality,
  setGroup,
  group,
  Teacher,
  Modules,
  Students,
  dept,
  setDept,
}) => {
  const [box, setBox] = useState(false);
  const [groupBox, setGroupBox] = useState(false);

  const chooseSection = (value) => {
    setBox(!box);
    setSection(value);
  };

  const chooseSpeciality = (value) => {
    setBox(!box);
    setSpeciality(value);
  };

  const chooseDepartment = (value) => {
    setBox(!box);
    setDept(value);
  };

  const choice = (value) => {
    setGroupBox(!groupBox);
    setGroup(value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <Search onChange={onChange} />
      </SearchContainer>
      {Students && (
        <>
          <Section_Speciality
            onClick={() => setGroupBox(false)}
            level={level}
            chooseSection={chooseSection}
            chooseSpeciality={chooseSpeciality}
            speciality={speciality}
            section={section}
            setBox={setBox}
            box={box}
          />
          <Group
            onClick={() => setBox(false)}
            section={section}
            group={group}
            speciality={speciality}
            setGroupBox={setGroupBox}
            groupBox={groupBox}
            choice={choice}
          />
        </>
      )}

      {Teacher && (
        <SelectDepartment
          chooseDepartment={chooseDepartment}
          dept={dept}
          setBox={setBox}
          box={box}
        />
      )}

      <ListTotal total={total} />
    </Wrapper>
  );
};

export default ListNav;

const Wrapper = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-radius: 20px 20px 0 0;
`;
const SearchContainer = styled.div`
  border: 2px solid #d0d3e0;
  width: 400px;
  height: 30px;
  padding-left: 15px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
