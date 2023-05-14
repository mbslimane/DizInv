import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; 

const View_Delete = ({ text, path, onClick}) => {

  return (
    <>
      {text === "View" && <View to={`/admin/user/${path}`} > {text} </View>}
      {text === "Delete" && <Delete onClick={onClick}> {text} </Delete>}
    </>
  );
};

export default View_Delete;

const View = styled(Link)` 
  background-color: #d9fcd9;
  color: #25ab42;
  padding: 2px 15px;
  font-size: 13px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const Delete = styled.div`
  background-color: #ffd5ea;
  color: #ab2525;
  padding: 2px 15px; 
  font-size: 13px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
