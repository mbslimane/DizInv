import React from "react";
import styled from "styled-components";
//import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ExcludedListTeacher from "../../ComponentsTeacher/ExcludedListTeacher";

const TeacherExcludedStudents = () => {
  const navigation = useNavigate();

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <Title>
            <BackIcon onClick={() => navigation(-1)} />
            <Hearder>Excluded Students </Hearder>
          </Title>
        </HeaderContainer>
        <ExcludedListTeacher />
      </Content>
    </Wrapper>
  );
};
  
export default TeacherExcludedStudents;

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

const BackIcon = styled(FaArrowLeft)`
  color: #777b86;
  font-size: 23px;
  font-weight: 700;
  margin-right: 40px;
  cursor: pointer;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;
