import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import ListNavPresence from "../miniPages/teachers/ListNavPresence";
import PresenceTable from "./PresenceTable";

import { useParams } from "react-router-dom";

const PresenceListTeacher = ({
  dateList,
  getAllDate,
  dateQuery,
  setDateQuery,
}) => {
  //parameters from URL link
  const { group, module, sceance } = useParams();

  const [query, setQuery] = useState("");
  //console.log(query);

  //date value
  const [currentDate, setCurrentDate] = useState({value: null, label: null });

  //data been pushed to Table
  const [allList, setAllList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query !== "") {
      const newData = allList.filter((item) => {
        return (
          item.firstName.toUpperCase().includes(query.toUpperCase()) ||
          item.lastName.toUpperCase().includes(query.toUpperCase())
        );
      });
      setFiltered(newData);
    }
  }, [query, allList]);

  //get list of present and absenct of the date
  const getListOfPresence = useCallback(async () => {
    await axios
      .post(`http://localhost:5000/api/managePresence/get-list-presence`, {
        date: dateQuery,
        group: group,
        sceance: sceance,
        module: module,
        level: sessionStorage.getItem("level"),
        department: sessionStorage.getItem("department"),
      })
      .then((res) => {
        //console.log(res);
        if (res.data.status === "SUCCESS") {
          let { date } = res.data.results[0];
          setAllList(res.data.results);
          setFiltered(res.data.results);
          setCurrentDate({ value: date, label: date });
         // console.log(res.data.results);
        }
        if (res.data.status === "FAILED") {
          //this error message should be prompted to show in the toast
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [group, module, sceance, dateQuery]);

  //on change or newReq
  useEffect(() => {
    if (dateQuery) {
      getListOfPresence();
      console.log("function 2");
    } else {
    }
  }, [dateQuery, getListOfPresence]);

  return (
    <Wrapper>
      <Content>
        <List>
          <ListNavPresence
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            getAllDate={getAllDate}
            dateList={dateList}
            setDateQuery={setDateQuery}
            getQuery={(e) => {
              setQuery(e.target.value);
            }}
          />

          <PresenceTable
            listPresence={filtered}
            getListOfPresence={getListOfPresence}
          />
        </List>
      </Content>
    </Wrapper>
  );
};

export default PresenceListTeacher;

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
