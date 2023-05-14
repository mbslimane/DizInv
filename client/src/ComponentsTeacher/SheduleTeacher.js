import React from "react";
import styled from "styled-components";

const SheduleTeacher = ({ scheduleData, email }) => {

  return (
    <Wrapper>
      {scheduleData.hasOwnProperty("level") ? (
        <Content>
          <Header>{scheduleData.level} Scherdule</Header>
          <Table>
            <Thead>
              <Tr>
                <Time>Time</Time>
                {scheduleData.header.map((th) => ( 
                  <TimeValues key={th.index}>{th.value}</TimeValues>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Days>Sunday</Days>
                {scheduleData.sunday.map((td) => (
                  <DaysValues key={td.indexDay}>
                    <InnerTable>
                      <InnerTablbeThead>
                        <InnerTableTr>
                          <th>matiere</th>
                          <th>teacher</th>
                          <th>room</th>
                        </InnerTableTr>
                      </InnerTablbeThead>
                      <InnerTablbeTbody>
                        {td.value.map((value) => (
                          <InnerTableTr key={value.valueID}>
                            {value.teacher.email === email && (
                              <>
                                <td>{value.module}</td>
                                <td>{value.teacher.name}</td>
                                <td>{value.room}</td>{" "}
                              </>
                            )}
                          </InnerTableTr>
                        ))}
                      </InnerTablbeTbody>
                    </InnerTable>
                  </DaysValues>
                ))}
              </Tr>
              <Tr>
                <Days>Monday</Days>
                {scheduleData.monday.map((td) => (
                  <DaysValues key={td.indexDay}>
                    <InnerTable>
                      <InnerTablbeThead style={{ display: "none" }}>
                        <InnerTableTr>
                          <th>matiere</th>
                          <th>teacher</th>
                          <th>room</th>
                        </InnerTableTr>
                      </InnerTablbeThead>
                      <InnerTablbeTbody>
                        {td.value.map((value) => (
                          <InnerTableTr key={value.valueID}>
                            {value.teacher.email === email && (
                              <>
                                <td>{value.module}</td>
                                <td>{value.teacher.name}</td>
                                <td>{value.room}</td>{" "}
                              </>
                            )}
                          </InnerTableTr>
                        ))}
                      </InnerTablbeTbody>
                    </InnerTable>
                  </DaysValues>
                ))}
              </Tr>
              <Tr>
                <Days>Tuesday</Days>
                {scheduleData.tuesday.map((td) => (
                  <DaysValues key={td.indexDay}>
                    <InnerTable>
                      <InnerTablbeThead style={{ display: "none" }}>
                        <InnerTableTr>
                          <th>matiere</th>
                          <th>teacher</th>
                          <th>room</th>
                        </InnerTableTr>
                      </InnerTablbeThead>
                      <InnerTablbeTbody>
                        {td.value.map((value) => (
                          <InnerTableTr key={value.valueID}>
                            {value.teacher.email === email && (
                              <>
                                <td>{value.module}</td>
                                <td>{value.teacher.name}</td>
                                <td>{value.room}</td>{" "}
                              </>
                            )}
                          </InnerTableTr>
                        ))}
                      </InnerTablbeTbody>
                    </InnerTable>
                  </DaysValues>
                ))}
              </Tr>
              <Tr>
                <Days>Wednesday</Days>
                {scheduleData.wednesday.map((td) => (
                  <DaysValues key={td.indexDay}>
                    <InnerTable>
                      <InnerTablbeThead style={{ display: "none" }}>
                        <InnerTableTr>
                          <th>matiere</th>
                          <th>teacher</th>
                          <th>room</th>
                        </InnerTableTr>
                      </InnerTablbeThead>
                      <InnerTablbeTbody>
                        {td.value.map((value) => (
                          <InnerTableTr key={value.valueID}>
                            {value.teacher.email === email && (
                              <>
                                <td>{value.module}</td>
                                <td>{value.teacher.name}</td>
                                <td>{value.room}</td>{" "}
                              </>
                            )}
                          </InnerTableTr>
                        ))}
                      </InnerTablbeTbody>
                    </InnerTable>
                  </DaysValues>
                ))}
              </Tr>
              <Tr>
                <Days>Thursday</Days>
                {scheduleData.thursday.map((td) => (
                  <DaysValues key={td.indexDay}>
                    <InnerTable>
                      <InnerTablbeThead style={{ display: "none" }}>
                        <InnerTableTr>
                          <th>matiere</th>
                          <th>teacher</th>
                          <th>room</th>
                        </InnerTableTr>
                      </InnerTablbeThead>
                      <InnerTablbeTbody>
                        {td.value.map((value) => (
                          <InnerTableTr key={value.valueID}>
                            {value.teacher.email === email && (
                              <>
                                <td>{value.module}</td>
                                <td>{value.teacher.name}</td>
                                <td>{value.room}</td>{" "}
                              </>
                            )}
                          </InnerTableTr>
                        ))}
                      </InnerTablbeTbody>
                    </InnerTable>
                  </DaysValues>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </Content>
      ) : (
        <NoSChedule>
          There is no schedule for this level, create a new schedule!!
        </NoSChedule>
      )}
    </Wrapper>
  );
};

export default SheduleTeacher;

const Wrapper = styled.div`
  width: 100%;
  height: 82vh;
  display: flex;
  justify-content: center;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #f6e8ff;
  }
`;

const NoSChedule = styled.h2`
  font-style: italic;
  align-self: center;
  color: #adb1c0;
`;

const Content = styled.div`
  height: fit-content;
  width: fit-content;
  margin-top: 20px;
`;
const Header = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
  // border-bottom: 1px solid #000;
`;

const Time = styled.th`
  font-size: 14px;
  width: 50px;
  border: 1px solid #adb1c0;
  text-align: center;
  height: 50px;
`;
const TimeValues = styled.th`
  font-size: 14px;
  width: 250px;
  border: 1px solid #adb1c0;
  text-align: center;
  height: 50px;
`;
const Days = styled.td`
  font-size: 12px;
  width: 80px;
  border: 1px solid #adb1c0;
  height: fit-content;
  text-align: center;
  height: 150px;
`;
const DaysValues = styled.td`
  width: 250px;
  border: 1px solid #adb1c0;
  height: fit-content;
  text-align: center;
  height: 150px;
`;

const Tbody = styled.tbody``;

//inner Table

const InnerTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
`;

const InnerTablbeThead = styled.thead``;

const InnerTableTr = styled.tr`
  & > th {
    width: 33%;
    font-size: 11px;
    border-bottom: 1px solid #adb1c0;
    border-right: 1px solid #adb1c0;
    background-color: #f6e8ff;
  }
  & > td {
    width: 33%;
    font-size: 9px;
    border-bottom: 1px solid #adb1c0;
    border-right: 1px solid #adb1c0;
    background-color: rgba(255, 255, 255, 0.9);
  }
`;
const InnerTablbeTbody = styled.tbody``;
