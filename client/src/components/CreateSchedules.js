import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewSeance from "./NewSeance";
import { v4 as uuidv4 } from "uuid";
import NewSeanceTime from "./NewSeanceTime";

const CreateSchedules = ({ scheduleData, setScheduleData }) => {
  const [refresh, setRefresh] = useState(true);

  const [editLocation, setEditLocation] = useState({});

  //initialValues
  const [initial, setInitial] = useState({
    valueID: uuidv4(),
    module: "",
    teacher: { name: "", email: "" },
    room: "",
  });

  //modal time index to be editted or deleted
  const [currentTimeIndex, setCurrentTimeIndex] = useState({});

  //add sceance modal open and close
  const [addSceanceModal, setAddSceanceModal] = useState(false);

  //add sceance modal Time open and close
  const [addSceanceTime, setAddSceanceTime] = useState(false);

  //refresh the state when a value is updated
  useEffect(() => {}, [refresh]);

  const formEditLocationClick = (td) => {
    setEditLocation({ indexDay: td.indexDay, day: td.day });
    setAddSceanceModal(true);
  };

  const editSceance = (e) => {
    e.preventDefault();

    let newSchedule = scheduleData;
    const { day, indexDay } = editLocation;
    const { valueID, module, room } = initial;
    const row = newSchedule[day][indexDay].value.findIndex((value) => {
      if (value === undefined) {
        //find ad way to manage the error of not having an initial value here
        return console.log("non");
      } else {
        return value.valueID === valueID;
      }
    });

    newSchedule[day][indexDay].value[row] = {
      valueID: valueID,
      module: module,
      room: room,
      teacher: { name: "", email: "" },
    };

    setScheduleData(newSchedule);
    clearState();
  };

  const addSceance = (e) => {
    e.preventDefault();

    let newSchedule = scheduleData;
    const { day, indexDay } = editLocation;
    const { module, room } = initial;

    newSchedule[day][indexDay].value.push({
      valueID: uuidv4(),
      module: module,
      room: room,
      teacher: { name: "", email: "" },
    });

    setScheduleData(newSchedule);
    clearState();
  };

  const deleteSceance = (e) => {
    e.preventDefault();

    let newSchedule = scheduleData;
    const { day, indexDay } = editLocation;
    const { valueID } = initial;

    newSchedule[day][indexDay].value = newSchedule[day][indexDay].value.filter(
      (v) => {
        return v.valueID !== valueID;
      }
    );

    setScheduleData(newSchedule);
    clearState();
  };

  const clearState = () => {
    setRefresh(!refresh);
    setAddSceanceModal(false);
    setAddSceanceTime(false);
    setEditLocation({});
    setInitial({
      valueID: uuidv4(),
      module: "",
      teacher: { name: "", email: "" },
      room: "",
    });
  };

  //opening and initiallizing the clicked time value
  const openTimeModal = (th) => {
    setAddSceanceTime(true);
    setCurrentTimeIndex(th);
  };

  //edith or add new time to schedule to table
  const edithTime = (e) => {
    e.preventDefault();

    let newSchedule = scheduleData;
    const { index, value } = currentTimeIndex;
    const row = newSchedule.header.findIndex((no) => {
      return no.index === index;
    });

    newSchedule.header[row] = {
      index: index,
      value: value,
    };

    console.log(newSchedule);

    setScheduleData(newSchedule);
    clearState();
  };

  //delete the value of already added time to schedule to table
  const deleteTime = (e) => {
    e.preventDefault();

    let newSchedule = scheduleData;
    const { index } = currentTimeIndex;
    const row = newSchedule.header.findIndex((no) => {
      return no.index === index;
    });

    newSchedule.header[row] = {
      index: index,
      value: "",
    };

    console.log(newSchedule);

    setScheduleData(newSchedule);
    clearState();
  };

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
                  <TimeValues onClick={() => openTimeModal(th)} key={th.index}>
                    {th.value}
                  </TimeValues>
                ))}
              </Tr> 
            </Thead>
            <Tbody>
              <Tr>
                <Days>Sunday</Days>
                {scheduleData.sunday.map((td) => (
                  <DaysValues
                    key={td.indexDay}
                    onClick={() => formEditLocationClick(td)}
                  >
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
                          <InnerTableTr
                            key={value.valueID}
                            onClick={() => setInitial(value)}
                          >
                            <td>{value.module}</td>
                            <td>{value.teacher.name}</td>
                            <td>{value.room}</td>
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
                  <DaysValues
                    key={td.indexDay}
                    onClick={() => formEditLocationClick(td)}
                  >
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
                          <InnerTableTr
                            key={value.valueID}
                            onClick={() => setInitial(value)}
                          >
                            <td>{value.module}</td>
                            <td>{value.teacher.name}</td>
                            <td>{value.room}</td>
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
                  <DaysValues
                    key={td.indexDay}
                    onClick={() => formEditLocationClick(td)}
                  >
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
                          <InnerTableTr
                            key={value.valueID}
                            onClick={() => setInitial(value)}
                          >
                            <td>{value.module}</td>
                            <td>{value.teacher.name}</td>
                            <td>{value.room}</td>
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
                  <DaysValues
                    key={td.indexDay}
                    onClick={() => formEditLocationClick(td)}
                  >
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
                          <InnerTableTr
                            key={value.valueID}
                            onClick={() => setInitial(value)}
                          >
                            <td>{value.module}</td>
                            <td>{value.teacher.name}</td>
                            <td>{value.room}</td>
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
                  <DaysValues
                    key={td.indexDay}
                    onClick={() => formEditLocationClick(td)}
                  >
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
                          <InnerTableTr
                            key={value.valueID}
                            onClick={() => setInitial(value)}
                          >
                            <td>{value.module}</td>
                            <td>{value.teacher.name}</td>
                            <td>{value.room}</td>
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
      <NewSeance
        isOpen={addSceanceModal}
        close={() => setAddSceanceModal(false)}
        editSceance={editSceance}
        addSceance={addSceance}
        deleteSceance={deleteSceance}
        initial={initial}
        setInitial={setInitial}
        clearState={clearState}
      />
      <NewSeanceTime
        isOpen={addSceanceTime}
        close={() => setAddSceanceTime(false)}
        edithTime={edithTime}
        deleteTime={deleteTime}
        currentTimeIndex={currentTimeIndex}
        setCurrentTimeIndex={setCurrentTimeIndex}
      />
    </Wrapper>
  );
};

export default CreateSchedules;

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
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;
const InnerTablbeTbody = styled.tbody``;
