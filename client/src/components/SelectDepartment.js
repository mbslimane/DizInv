import React from "react";
import styled from "styled-components";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SelectDepartment = ({ box, setBox, onClick, chooseDepartment, dept }) => {
  return (
    <Wrapper onClick={onClick}>
      <Selected
        onClick={() => {
          setBox(!box);
        }}
      >
        {dept}
        <DownIcon />
      </Selected>

      {box && (
        <SelectBox>
          <Options onClick={() => chooseDepartment("Department")}>All</Options>
          <Options onClick={() => chooseDepartment("MI")}>MI</Options>
          <Options onClick={() => chooseDepartment("TLSI")}> TLSI </Options>
          <Options onClick={() => chooseDepartment("IFA")}> IFA </Options>
        </SelectBox>
      )}
    </Wrapper>
  );
};

export default SelectDepartment;

const Wrapper = styled.div``;

const Selected = styled.div`
  background-color: #f6e8ff;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 120px;
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
  width: 120px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
`;
