import React from "react";
import styled from "styled-components";
import randomcolor from "randomcolor";

const TablePhoto = ({ Name }) => {
  return (
    <Logo
      style={{
        backgroundColor: randomcolor({ luminosity: "light"}),
      }}
    >
      {Name}
    </Logo>
  );
};

export default TablePhoto; 

const Logo = styled.div`
  height: 25px;
  width: 25px; 
  border-radius: 5px;
  color: #ffffff;
  background-color: #c278f8;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
