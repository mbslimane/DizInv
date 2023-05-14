import React from "react";
import styled from "styled-components";

import MenuLinkIcon from "../components/MenuLinkIcon";
import { BiBarChartAlt } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { FcInspection } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";

const ChelfMenu = ({ active, changeActiveIcon }) => {
  return (
    <>
      <Header>Department</Header>
      <Divider />
      <MenuLinkIcon
        Name="Dashboard"
        path="/teacher/chelf/dashboard"
        Icon={BiBarChartAlt}
        Active={active === "dashboard" ? true : false}
        onClick={() => {
          changeActiveIcon("dashboard");
        }}
      />
      <MenuLinkIcon
        Name="Sessions"
        path="/teacher/chelf/sessions"
        Icon={GiSandsOfTime}
        Active={active === "sessions" ? true : false}
        onClick={() => {
          changeActiveIcon("sessions");
        }}
      />
      <MenuLinkIcon
        Name="Excluded students"
        path="/teacher/chelf/excluded-students"
        Icon={HiMinusCircle}
        Active={active === "excluded chelf students" ? true : false}
        onClick={() => {
          changeActiveIcon("excluded chelf students");
        }}
      />
      <MenuLinkIcon
        Name="Justification"
        path="/teacher/chelf/justification"
        Icon={FcInspection}
        Active={active === "justification" ? true : false}
        onClick={() => {
          changeActiveIcon("justification");
        }}
      />
      <Divider style={{ visibility: "hidden" }} />
      <Header>Teacher</Header>
      <Divider />
    </>
  );
};

export default ChelfMenu;

const Header = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #777b86;
  margin-bottom: 2px;
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;
