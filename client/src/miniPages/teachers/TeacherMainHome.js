import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const TeacherMainHome = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default TeacherMainHome;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
