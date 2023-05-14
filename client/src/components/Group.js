import React from "react";
import styled from "styled-components";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Group = ({
  section,
  speciality,
  group,
  setGroupBox,
  groupBox,
  choice,
  onClick
}) => {
  // console.log(section);
  // console.log(speciality);

  return (
    <Wrapper onClick={onClick}>
      <Selected
        onClick={() => {
          setGroupBox(!groupBox);
        }}
      >
        {group}
        <DownIcon />
      </Selected>

      {groupBox && (
        <SelectBox>
          {speciality  && ( 
            <>
              <Options onClick={() => choice("Group")}>All</Options>
              <Options onClick={() => choice("G1")}>G1</Options>
              <Options onClick={() => choice("G2")}>G2</Options>
              <Options onClick={() => choice("G3")}>G3</Options>
              <Options onClick={() => choice("G4")}>G4</Options>
            </>
          )}
          {section === "Section 1" && (
            <>
              <Options onClick={() => choice("Group")}>All</Options>
              <Options onClick={() => choice("G1")}>G1</Options>
              <Options onClick={() => choice("G2")}>G2</Options>
              <Options onClick={() => choice("G3")}>G3</Options>
              <Options onClick={() => choice("G4")}>G4</Options>
            </>
          )}
          {section === "Section 2" && (
            <>
              <Options onClick={() => choice("Group")}>All</Options>
              <Options onClick={() => choice("G5")}>G5</Options>
              <Options onClick={() => choice("G6")}>G6</Options>
              <Options onClick={() => choice("G7")}>G7</Options>
              <Options onClick={() => choice("G8")}>G8</Options>
            </>
          )}
          {section === "Section 3" && (
            <>
              <Options onClick={() => choice("Group")}>All</Options>
              <Options onClick={() => choice("G9")}>G9</Options>
              <Options onClick={() => choice("G10")}>G10</Options>
              <Options onClick={() => choice("G11")}>G11</Options>
              <Options onClick={() => choice("G12")}>G12</Options>
            </>
          )}
          {section === "Section 4" && (
            <>
              <Options onClick={() => choice("Group")}>All</Options>
              <Options onClick={() => choice("G13")}>G13</Options>
              <Options onClick={() => choice("G14")}>G14</Options>
              <Options onClick={() => choice("G15")}>G15</Options>
              <Options onClick={() => choice("G16")}>G16</Options>
            </>
          )}
        </SelectBox>
      )}
    </Wrapper>
  );
};

export default Group;

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
