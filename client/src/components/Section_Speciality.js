import React from "react";
import styled from "styled-components";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Section_Speciality = ({
  level,
  chooseSection,
  chooseSpeciality,
  speciality,
  section,
  box,
  setBox,
  onClick
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Selected
        onClick={() => {
          setBox(!box);
        }} 
      >
        {level === "section" ? section : speciality}
        <DownIcon />
      </Selected>

      {box && (
        <SelectBox>
          {level === "section" ? (
            <>
              <Options onClick={() => chooseSection("Section")}>
                All
              </Options>
              <Options onClick={() => chooseSection("Section 1")}>
                Section 1
              </Options>
              <Options onClick={() => chooseSection("Section 2")}>
                Section 2
              </Options>
              <Options onClick={() => chooseSection("Section 3")}>
                Section 3
              </Options>
              <Options onClick={() => chooseSection("Section 4")}>
                Section 4
              </Options>{" "}
            </>
          ) : ( 
            <>
              <Options onClick={() => chooseSpeciality("GL")}>GL</Options>
              <Options onClick={() => chooseSpeciality("TI")}>TI</Options>
              <Options onClick={() => chooseSpeciality("SCI")}>SCI</Options>
              <Options onClick={() => chooseSpeciality("SI")}>SI</Options>
            </>
          )}
        </SelectBox>
      )}
    </Wrapper>
  );
};

export default Section_Speciality;

const Wrapper = styled.div``;

const Selected = styled.div`
  background-color: #f6e8ff;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 100px;
  color: #adb1c0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DownIcon = styled(IoIosArrowDropdownCircle)`
  font-size: 18px;
  margin-left: 5px;
`;

const SelectBox = styled.div`
  position: absolute;
  margin-top: 5px;
  background-color: #f6e8ff;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s;
  overflow: hidden;
  z-index: 50;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  color: #adb1c0;
  height: 8px;
  width: 100px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
`;
