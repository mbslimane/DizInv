import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

//file imports
import Menu from "../miniPages/admin/Menu.js";
import Nav from "../miniPages/admin/Nav.js";


const Admin = () => {


  return (
    <Wrapper>
      <Menu />
      <Content> 
        <Nav />
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Admin;

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
