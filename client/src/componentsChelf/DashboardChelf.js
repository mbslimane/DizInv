import React, { useState } from "react";
import styled from "styled-components";

import GeneralStatistics from "../components/GeneralStatistics";
import { BiBarChartAlt } from "react-icons/bi";

//charts
import PieChart from "../components/PieChart";

const DashboardChelf = () => {

  const optionsPie = {
    layout: {
      padding: {
        top: 60,
        left: 60,
        right: 60,
        bottom: 60,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Absence Statistice (Students)",
        padding: {
          top: 10,
          bottom: -20,
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
          boxHeight: 10,
        },
      },
    },
  };
  

  const data = {
    labels:[
      "Present",
      "Absent",
    ],
    datasets: [
      {
        label: "Absence Statistice",
        data: [700, 100],
        backgroundColor: [
          "rgba(194, 120, 248, 0.8)",
          "rgba(194, 120, 248, 0.4)",
        ],

        borderWidth: 1,
      },
    ],
  };


  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <DashboardIcon />
          <Hearder>Dashboard</Hearder>
        </HeaderContainer>
        <GeneralStatistics department={1} Teachers={175} Students={450} Modules={16} />

        <Grid>
          <One>
            <Up>
              <div></div>
            </Up>
            <Down>
              <div></div>
            </Down>
          </One>
          <Two>
            <div>
              <PieChart data={data} optionsPie={optionsPie} />
            </div>
          </Two>
        </Grid>
      </Content>
    </Wrapper>
  );
};

export default DashboardChelf;

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
`;

const DashboardIcon = styled(BiBarChartAlt)`
  color: #777b86;
  font-size: 25px;
  font-weight: 700;
  margin-right: 5px;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  //border:1px solid red ;
`;

const One = styled.div`
  // border: 1px solid red;
  flex: 1;
`;

const Two = styled.div`
  width: 500px;
  height: 380px;

  & > div {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Up = styled.div`
  height: 170px;
  display: flex;
  align-items: center;

  & > div {
    background-color: #ffffff;
    width: 95%;
    height: 90%;
    border-radius: 25px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
const Down = styled.div`
  height: 230px;
  display: flex;
  align-items: center;

  & > div {
    background-color: #ffffff;
    width: 95%;
    height: 90%;
    border-radius: 25px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
