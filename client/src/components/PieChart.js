import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement
);


const PieChart = ({ setChartView, data, optionsPie }) => {
  
  return (
    <Wrapper>
      <Pie data={data} options={optionsPie} />
      <ButtonContainer>
        <Button onClick={() => setChartView("pie")}>#Piechart</Button>
        <Button onClick={() => setChartView("bar")}>#Barchart</Button>
        <Button onClick={() => setChartView("line")}>#Linechart</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PieChart;

const Wrapper = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  height: 20px;
  margin-top: -70px;
  margin-right: 10px;
  font-size: 16px;
  color: #adb1c0;
  border: none;
  cursor: pointer;
`;
