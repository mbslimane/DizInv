import React from "react";
import styled from "styled-components";

//react icons
import { BiSearch } from "react-icons/bi";

const Search = ({ onChange }) => {
  return (
    <>
      <SearchIcon />
      <Input placeholder="Search here...." onChange={onChange} />
    </>
  );
}; 

export default Search;

const SearchIcon = styled(BiSearch)`
  color: #777b86;
  font-size: 21px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  margin-left: 5px;
  font-size: 14px;
`;
