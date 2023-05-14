import React from 'react'
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const ChelfDepartment = () => {
  return (
    <Wrapper>
        <Outlet />
    </Wrapper>
  )
}

export default ChelfDepartment

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`;