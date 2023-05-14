import React from "react";
import styled from "styled-components";
import { RiArrowDownSLine } from "react-icons/ri";

const ProfileLogo = ({ Text, Name, style }) => {
  return (
    <Wrapper>
      <Logo>{Text}</Logo>
      <User style={style && style}>{Name}</User>
      <RiArrowDownSLine style={{ marginLeft: "5px", color: "#777B86" }} />
    </Wrapper>
  );
};

export default ProfileLogo;

const Wrapper = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 5px;
     margin-left: 30px;  
     cursor: pointer;
     border:1px solid transparent ;

     &:hover{
      border:1px solid #fff ;
      border-radius: 5px;
     }
`

const Logo = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 5px;
  border-radius: 8px;
  color: #ffffff;
  background-color: #C278F8;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.h2`
     color: #777B86;
     font-size: 20px;
     
`
