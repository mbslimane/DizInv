import React from "react";
import styled from "styled-components";;


const QRGenerator = ({ QRsrc, setModalIsOpen }) => {

  return (
    <Wrapper>
      <img src={QRsrc} /> 
      <Close onClick={() => setModalIsOpen(false)}>Done</Close> 
    </Wrapper>
  );
};

export default QRGenerator;

const Wrapper = styled.div`
  width: 100%; 
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > img{
    width: 70%;
    height: 60%;
  }
`;

const Close = styled.div`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #bf7fff;
  background-color: #e5cbff;

  &:hover {
    background-color: #f2e5ff;
  }
`;