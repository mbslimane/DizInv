import React from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { CgClose } from "react-icons/cg";
import { BsCheck2All } from "react-icons/bs";

const PresenceTable = ({ listPresence, getListOfPresence }) => {
  //make presence to the database
  const registerPresence = async (values) => {
    await axios
      .post(`http://localhost:5000/api/managePresence/update-presentiel`, {
        values: { ...values, newID: uuidv4() }, 
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          getListOfPresence();
        }
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Wrapper>
      <Content>
        <table>
          <TableHeader>
            <TrHead>
              <NumberID>#</NumberID>
              <Name>Name</Name>
              <Group>Group</Group>
              <Sceance>Sceance</Sceance>
              <TodayCurrentDate> Date</TodayCurrentDate>
              <Action>Present</Action>
            </TrHead>
          </TableHeader>
          {listPresence.length > 0 ? (
            <TableBody>
              {listPresence.map((item, index) => (
                <TrBody key={index}>
                  <NumberIDBody>{index}</NumberIDBody>
                  <NameBody>
                    {item.firstName} {item.lastName}
                  </NameBody>
                  <GroupBody>{item.student_group}</GroupBody>
                  <SceanceBody>{item.sceance}</SceanceBody>
                  <TodayCurrentDateBody>{item.date}</TodayCurrentDateBody>
                  <ActionBody>
                    {item.id_absence ? (
                      <IconContainer
                        onClick={() => registerPresence(item)}
                        style={{ color: "#ff4a4a", backgroundColor: "#ffe7e7" }}
                      >
                        <CgClose />
                      </IconContainer>
                    ) : (
                      <IconContainer
                        onClick={() => registerPresence(item)}
                        style={{ color: "#00cf00", backgroundColor: "#e2ffe2" }}
                      >
                        <BsCheck2All />
                      </IconContainer>
                    )}
                  </ActionBody>
                </TrBody>
              ))}
            </TableBody>
          ) : (
            <ListEmpty>
              <h1>You need to pick a DATE to view list of presence</h1>
            </ListEmpty>
          )}
        </table>
      </Content>
    </Wrapper>
  );
};

export default PresenceTable;

const Wrapper = styled.div`
  margin: 0;
`;

const Content = styled.div`
  overflow-y: scroll;
  height: 70vh;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #f6e8ff;
  }

  & > table {
    width: 100%;
  }
`;

const ListEmpty = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
    font-size: 18px;
    color: #adb1c0;
  }
`;

const TableHeader = styled.thead`
  background-color: #f1f3f7;
  position: sticky;
  top: 0;
`;
const TrHead = styled.tr`
  padding: 5px 30px 5px 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777b86;
  font-size: 18px;
  border-bottom: 2px solid #f6e8ff;
`;

const NumberID = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const Name = styled.th`
  width: 250px;
  padding: 3px;
  text-align: left;
`;
const Group = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const Sceance = styled.th`
  width: 100px;
  padding: 3px;
  text-align: center;
`;
const TodayCurrentDate = styled.th`
  width: 150px;
  padding: 3px;
  text-align: center;
`;
const Action = styled.th`
  width: 200px;
  padding: 3px;
  text-align: center;
`;

const TableBody = styled.tbody``;

const TrBody = styled.tr`
  padding: 5px 30px 5px 10px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777b86;
  font-size: 15px;
  border-bottom: 2px solid #f6e8ff;

  &:hover {
    background-color: #fdfaff;
  }
`;

const NumberIDBody = styled.td`
  width: 100px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const NameBody = styled.td`
  width: 250px;
  padding: 3px;
  text-align: left;
  text-transform: capitalize;
`;

const GroupBody = styled.td`
  width: 100px;
  padding: 3px;
  text-align: center;
  text-transform: uppercase;
`;

const SceanceBody = styled.td`
  width: 100px;
  padding: 3px;
  text-align: center;
  text-transform: uppercase;
`;
const TodayCurrentDateBody = styled.td`
  width: 150px;
  padding: 3px;
  text-align: center;
`;

const ActionBody = styled.td`
  width: 200px;
  padding: 3px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  width: 70px;
  height: 30px;
  font-size: 20px;
`;
