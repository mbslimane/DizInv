import React from "react";
import styled from "styled-components";
import GeneralStatsIcon from "./GeneralStatsIcon";

import { FcDepartment } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { FaWalking, FaBook } from "react-icons/fa";

const GeneralStatistics = ({ Teachers, Students, Modules, department }) => {
  return (
    <Wrapper>
      <Content>
        <Stats>
          <GeneralStatsIcon
            Icon={FcDepartment}
            number={department}
            about="Department"
            background="#E5EAFA"
          />
        </Stats>
        <Stats>
          <GeneralStatsIcon
            Icon={GiTeacher}
            number={Teachers}
            about="Teacher"
            background="#DBFFDB"
            color="#29D129"
          />
        </Stats>
        <Stats>
          <GeneralStatsIcon
            Icon={FaWalking}
            number={Students}
            about="Students"
            color="#E0BF3E"
            background="#FFFAE5"
          />
        </Stats>
        <Stats>
          <GeneralStatsIcon
            Icon={FaBook}
            number={Modules}
            about="Modules"
            color="#C278F8"
            background="#F6E8FF"
          />
        </Stats>
      </Content>
    </Wrapper>
  );
};

export default GeneralStatistics;

const Wrapper = styled.div`
  margin-top: 15px;
  background-color: #ffffff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  overflow: hidden;
`;

const Content = styled.div`
  //border: 1px solid red;
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
  padding: 10px;
  border-radius: 8px;
`;
