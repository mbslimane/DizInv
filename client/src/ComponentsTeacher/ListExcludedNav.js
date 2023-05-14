import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ListTotal from "../components/ListTotal";
import Search from "../components/Search";
import Select from "react-select";

const customStyles = {
  menuList: () => ({
    height: 10,
  }),
  menu: (provided, state) => ({
    ...provided,
    height: "170px",
    overflowY: "scroll",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "13px",
  }),
};

const ListExcludedNav = ({
  setQuery,
  total,
  chelf,
  getExcludedStudents
}) => {
  const [moduleList, setModuleList] = useState([]);

  //get all date listing
  const getModules = async () => {
    await axios
      .get(
        `http://localhost:5000/api/managePresence/modules/${sessionStorage.getItem(
          "department"
        )}`
      )
      .then((res) => {
        // console.log(res.data.results)
        if (res.data.status === "SUCCESS") {
          setModuleList(res.data.results);
        }
        if (res.data.status === "FAILED") {
          //this error message should be prompted to show in the toast
          console.log(res.data.message);
        }
      })
      .catch((err) => {  
        console.log(err);
      });
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <Wrapper>
      <SearchContainer>
        <Search onChange={(e) => setQuery(e.target.value)} />
      </SearchContainer>

      {chelf && (
        <SelectModule
          placeholder="choose module..."
          styles={customStyles}
          name="module"
          options={moduleList}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#e5cbff",
              primary: "#bf7fff",
            },
          })}
          onChange={(e) => getExcludedStudents(e.value)}
        />
      )}

      <ListTotal total={total} />
    </Wrapper>
  );
};

export default ListExcludedNav;

const Wrapper = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-radius: 20px 20px 0 0;
`;
const SearchContainer = styled.div`
  border: 2px solid #d0d3e0;
  width: 400px;
  height: 30px;
  padding-left: 15px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const SelectModule = styled(Select)`
  width: 350px;
`;
