import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import MenuTeacher from "../miniPages/teachers/MenuTeacher";
import TeacherNav from "../miniPages/teachers/TeacherNav";

const Teacher = () => {
  return (
    <Wrapper>
      <MenuTeacher />
      <Content>
        <TeacherNav />
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Teacher;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const Content = styled.div`
  width: calc(100% - 300px);
  background-color: #f1f3f7;
  //  border:1px solid red ;
  padding-right: 30px;
`;
