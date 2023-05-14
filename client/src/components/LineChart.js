import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 15,
        boxHeight: 10,
      },
    },
    title: {
      display: true,
      text: "Line Chart of users (Teachers, Students)",
    },
  },
};

const data = {
  labels: ["Teachers", "L1", "L2", "L3", "M1", "M2"],
  datasets: [
    {
      label: "Users Analytics",
      data: [500, 700, 450, 300, 280, 150],
      borderColor: "#C278F8",
      backgroundColor: "#F6E8FF",
      borderWidth: 2,
      pointBackgroundColor: "#C278F8",
      pointHoverRadius: 7,
      pointHoverBackgroundColor: "#3773f5",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 5,
      pointStyle: 'rectRounded',
     
    },
  ],
};

const LineChart = ({ setChartView }) => {
  return (
    <Wrapper>
      <Line data={data} options={options} />
      <ButtonContainer>
        <Button onClick={() => setChartView("pie")}>#Piechart</Button>
        <Button onClick={() => setChartView("bar")}>#Barchart</Button>
        <Button onClick={() => setChartView("line")}>#Linechart</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default LineChart;

const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  margin-right: 10px;
  font-size: 16px;
  color: #adb1c0;
  border: none;
  cursor: pointer;
`;
