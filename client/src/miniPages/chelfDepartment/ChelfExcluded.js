import React from "react";
import styled from "styled-components";
//import axios from "axios";
import DepartmentExcludedList from "../../componentsChelf/DepartmentExcludedList";

const ChelfExcluded = () => {

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <Title>
            <Hearder> Excluded Students (Department) </Hearder>
          </Title>
        </HeaderContainer>
        <DepartmentExcludedList />
      </Content>
    </Wrapper>
  );
};

export default ChelfExcluded;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
  width: 100%;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;


const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;
