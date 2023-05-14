import React from "react";
import styled from "styled-components";
import RightBackground from "../asserts/images/teacherHeroBackground.svg";

const Hero = () => {
  return (
    <Wrapper>
      <Content>
        <Left>
          <LeftContent>
            <Welcome>Welcome professor,</Welcome>
            <DiscriptionContainer>
              <Discription>
                you have been placed in charge of the module ("module name"),
                and will be magnaging the ("Tp/Td/Cours") sessions of this
                module. you will be teaching the following group of students:
                ("G1, G2, G3, G4"). Thank you.
              </Discription>
              <Continue>View Schedules</Continue>
            </DiscriptionContainer>
          </LeftContent>
        </Left>
        <Right />
      </Content>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  height: 330px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const Left = styled.div`
  width: 45%;
  padding: 20px 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftContent = styled.div`
`;

const Welcome = styled.h1`
  color: #c278f8;
  margin-bottom: 5px;
`;

const Discription = styled.p`
  font-size: 16px;
  color: #777b86;
`;
const DiscriptionContainer = styled.div`
  width: 450px;
  padding: 10px;
  //line-height: 20px;
  font-style: italic;
`;

const Continue = styled.button`
  margin-top: 10px;
  margin-right: 20px;
  float: right;
  background-color: #c278f8;
  color: #fff;
  padding: 8px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #c278f8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: transparent;
    color: #c278f8;
  }
`;

const Right = styled.div`
  width: 45%;
  background-image: url(${RightBackground});
  background-repeat: no-repeat;
  background-size: contain;
`;
