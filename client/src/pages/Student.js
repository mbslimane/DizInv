import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Student = () => {
  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
    </Wrapper> 
  );
};

export default Student;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
`;
