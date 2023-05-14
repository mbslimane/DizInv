import React from "react";
import styled from "styled-components";

const ListTotal = ({ total }) => {
  return (
    <Wrapper>
      <Selected>
          <span> Total: </span>
        {total}
      </Selected>
    </Wrapper>
  );
};

export default ListTotal;

const Wrapper = styled.div``;

const Selected = styled.div`
  background-color: #f6e8ff;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 100px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > span{
    color: #adb1c0;
    margin-right: 5px;
  }
`;
