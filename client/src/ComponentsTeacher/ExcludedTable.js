import React, { useState } from "react";
import styled from "styled-components";
//import axios from "axios";
import randomcolor from "randomcolor";

import { BsCheck2All } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";

const ExcludedTable = ({ listExcluded }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [displayIndex, setDisplayIndex] = useState();

  return (
    <Wrapper>
      <Content>
        <table>
          <TableHeader>
            <TrHead>
              <NumberID>#</NumberID>
              <Name>Name</Name>
              <Group>Group</Group>
              <Action>Excluded</Action>
              <Detaile></Detaile>
            </TrHead>
          </TableHeader>
          {listExcluded.length > 0 ? (
            <TableBody>
              {listExcluded.map((item, index) => (
                <>
                  <TrBody key={index} id={`${index}`}>
                    <NumberIDBody>{index}</NumberIDBody>
                    <NameBody>
                      {item.firstName} {item.lastName}
                    </NameBody>
                    <GroupBody>{item.student_group}</GroupBody>
                    <ActionBody>
                      <IconContainer
                        // onClick={() => registerPresence(item)}
                        style={{
                          color: "#00cf00",
                          backgroundColor: "#e2ffe2",
                        }}
                      >
                        <BsCheck2All />
                      </IconContainer>
                    </ActionBody>
                    <DetaileBody>
                      <ArrowDown
                        style={{ color: displayIndex === index && "#d493ff" }}
                        onClick={() => {
                          setShowDetail(!showDetail);
                          setDisplayIndex(index);
                        }}
                      />
                    </DetaileBody>
                  </TrBody>
                  <MoreDetailes
                    style={{
                      padding: showDetail ? "8px 10px 15px 15px" : "0",
                      maxHeight: showDetail ? "30pc" : "0",
                      overflow: showDetail ? "visible" : "hidden",
                      display: displayIndex === index ? "flex" : "none",
                    }}
                  >
                    <div>
                      <MoreDetailesHeader>
                        Detailes:-{" "}
                        <span>
                          complete assesment of both TP and TD absence{" "}
                        </span>{" "}
                      </MoreDetailesHeader>
                      <MoreDetailesDiscription>
                        Sessions Missed (TD, TP) :-
                        {item.dates.split(",").map((date, index) => (
                          <span
                            key={index}
                            style={{
                              color: randomcolor({
                                luminosity: "dark",
                              }),
                            }}
                          >
                            {" "}
                            {`(${index + 1})`}
                            {date} {" , "}{" "}
                          </span>
                        ))}
                        <br />
                        module :- {item.moduleName}
                      </MoreDetailesDiscription>
                    </div>
                  </MoreDetailes>
                </>
              ))}
            </TableBody>
          ) : (
            <ListEmpty>
              <h1>There is no List for excluding student.......</h1>
            </ListEmpty>
          )}
        </table>
      </Content>
    </Wrapper>
  );
};

export default ExcludedTable;

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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

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
  width: 350px;
  padding: 3px;
  text-align: left;
`;
const Group = styled.th`
  width: 150px;
  padding: 3px;
  text-align: center;
`;

const Action = styled.th`
  width: 200px;
  padding: 3px;
  text-align: center;
`;
const Detaile = styled.th`
  width: 20px;
  padding: 3px;
  text-align: center;
`;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  width: 350px;
  padding: 3px;
  text-align: left;
  text-transform: capitalize;
`;

const GroupBody = styled.td`
  width: 150px;
  padding: 3px;
  text-align: center;
  text-transform: uppercase;
`;

const ActionBody = styled.td`
  width: 200px;
  padding: 3px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const DetaileBody = styled.td`
  width: 20px;
  font-size: 25px;
  padding: 3px;
  text-align: left;

  & > a {
    text-decoration: none;
    color: #777b86;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  //cursor: pointer;
  width: 70px;
  height: 30px;
  font-size: 20px;
`;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...

const MoreDetailes = styled.div`
  background-color: #f6e8ff;
  position: relative;
  transition: 650ms;

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    border-radius: 5px;
    height: 80%;
    background-color: #d493ff;
    top: 50%;
    left: 5;
    transform: translateY(-50%);
  }

  & > div {
    color: #777b86;
    margin-left: 12px;
  }
`;

const ArrowDown = styled(BiChevronDown)``;

const MoreDetailesHeader = styled.h2`
  font-style: italic;
  margin-bottom: 8px;
  font-size: 14px;
  color: #ff6868;

  & > span {
    font-size: 12px;
    color: #777b86;
  }
`;
const MoreDetailesDiscription = styled.h2`
  font-style: italic;
  font-size: 12px;

  & > span {
    color: #ff6868;
  }
`;
