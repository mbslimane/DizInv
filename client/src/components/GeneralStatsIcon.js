import React from "react";
import styled from "styled-components";

const GeneralStatsIcon = ({ Icon, about, number, background, color }) => {
  
  return (
    <>
      <IconContainer style={{ backgroundColor: background}} >
        <LinkIcon style={{ color: color}}> <Icon /> </LinkIcon>
      </IconContainer>
      <Discription>
        <About>{about}</About>
        <Number>{number}</Number>
      </Discription>
    </>
  );
};

export default GeneralStatsIcon;

const Discription = styled.div`
  margin-left: 5px;
`;

const About = styled.h1`
  font-size: 18px;
  color: #adb1c0;
`;

const Number = styled.h1`
  font-size: 20px;
  color: #595e68;
  margin-top: -5px;
`;

const IconContainer = styled.div`
height: 60px;
width: 60px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
`;

const LinkIcon = styled.div`
    font-size: 28px;
    font-weight: 500;
  `;
