import React from "react";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";

const HeaderNav = ({ level, Icon, onClick }) => {
 
  return (
    <HeaderContainer>
      <div>
        <LevelIcon>{Icon}</LevelIcon>
        <Hearder>{level}</Hearder>
      </div>
      <Add onClick={onClick}>
        <AddIcon />
        <p>New</p>
      </Add>   
    </HeaderContainer>
  );
};

export default HeaderNav;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
`;

const LevelIcon = styled.div`
color: #777b86;
font-size: 25px;
font-weight: 700;
margin-right: 5px;
display: flex;
justify-content: center;
align-items:center ;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background-color: #c278f8;
  border-radius: 10px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;

  &:hover {
    background-color: #a649ea;
  }

  & > p {
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
  }
`;

const AddIcon = styled(MdAddCircle)`
  color: #ffffff;
  margin-right: 5px;
  font-size: 22px;
`;
