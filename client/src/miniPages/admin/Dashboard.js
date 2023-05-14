import React, { useState } from "react";
import styled from "styled-components";
import GeneralStatistics from "../../components/GeneralStatistics";

//react icons
import { BiBarChartAlt } from "react-icons/bi";

//charts
import PieChart from "../../components/PieChart";  
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";

const Dashboard = () => {
  const [chartView, setChartView] = useState("line");

  // setInterval(() => {
  //   const charts = ["pie", "bar", "line"];
  //   setChartView(charts[Math.floor(Math.random() * 3)]);
  // }, 20000);

  const data = {
    labels: [
      "Teachers",
      "Licence 1",
      "Licence 2",
      "Licence 3",
      "Master 1",
      "Master 2",
    ],
    datasets: [
      {
        label: "Users Analytics",
        data: [500, 700, 450, 300, 280, 150],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(241, 90, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(147, 250, 165, 0.5)",
        ],

        borderWidth: 1,
      },
    ],
  };

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
        text: "Pie Chart of users (Teachers, Students)",
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

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <DashboardIcon />
          <Hearder>Dashboard</Hearder>
        </HeaderContainer>
        <GeneralStatistics department={3} Teachers={500} Students={1500} Modules={46} />

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
              {chartView === "pie" && (
                <PieChart
                  setChartView={setChartView}
                  data={data}
                  optionsPie={optionsPie}
                />
              )}
              {chartView === "bar" && <BarChart setChartView={setChartView} data={data} />}
              {chartView === "line" && (
                <LineChart setChartView={setChartView} data={data} />
              )}
            </div>
          </Two>
        </Grid>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
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
