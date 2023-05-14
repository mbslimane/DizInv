import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ListExcludedNav from "../ComponentsTeacher/ListExcludedNav";
import ExcludedTable from "../ComponentsTeacher/ExcludedTable";

const DepartmentExcludedList = () => {
  const [query, setQuery] = useState("");

  const [allList, setAllList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  //get all date listing
  const getExcludedStudents = async (value) => {
      console.log(value)
    await axios
    .get(
        `http://localhost:5000/api/managePresence/chelf-excluded/${value}`
      )
      .then((res) => {  
        // console.log(res.data.results)
        if (res.data.status === "SUCCESS") {
          setAllList(res.data.results);
          setFiltered(res.data.results);
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
    if (query !== "") {
      const newData = allList.filter((item) => {
        return (
          item.firstName.toUpperCase().includes(query.toUpperCase()) ||
          item.lastName.toUpperCase().includes(query.toUpperCase())
        );
      });
      setFiltered(newData);
    } else {
      setFiltered(allList);
    }
  }, [query, allList]);

  return (
    <Wrapper>
      <Content>
        <List>
          <ListExcludedNav
            chelf={true}
            setQuery={setQuery}
            total={filtered.length}
            getExcludedStudents={getExcludedStudents}
          />
          <ExcludedTable listExcluded={filtered} />
        </List>
      </Content>
    </Wrapper>
  );
};

export default DepartmentExcludedList;

const Wrapper = styled.div`
  padding: 20px 40px 0 0px;
`;

const Content = styled.div`
  //border: 1px solid red;
`;
const List = styled.div`
  margin-top: 15px;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: #ffffff;
  padding-bottom: 10px;
`;
