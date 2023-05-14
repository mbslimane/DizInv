import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcOvertime } from "react-icons/fc";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

//file imports
import CreateSchedules from "../../components/CreateSchedules";
import axios from "axios";

const errorMessage = (message) => {
  toast.error(message, {
    style: {
      background: "rgba(255,51,51, 0.7)",
      color: "#fff",
    },
  });
};

const successMessage = (message) => {
  toast.success(message, {
    style: {
      background: "#25ab42",
      color: "#fff",
    },
  });
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
    borderRadius: "20px",
    overflow: "hidden",
    width: "450px",
    height: "250px",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const AdminSchedules = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewSchedule, setViewSchedule] = useState("Licence 1");

  //modal form inputs values
  const [tableColumnSize, setTableColumnSize] = useState();
  const [tableLevel, setTableLevel] = useState();

  //schedule state manipulation
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    getSchedulesFromDB();
  }, [viewSchedule]);

  const getSchedulesFromDB = async () => {
    await axios
      .get(`http://localhost:5000/api/admin/schedule/${viewSchedule}`)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setScheduleData(res.data.result);
        }
        if (res.data.status === "FAILEd") {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const schema = () => {
    console.log(tableLevel, tableColumnSize);
    let arrHeader = [];

    for (var i = 0; i < tableColumnSize; i++) {
      arrHeader[i] = { index: i, value: "" };
    }

    const data = {
      level: tableLevel,
      header: arrHeader,
      sunday: lopeArray(tableColumnSize, "sunday"),
      monday: lopeArray(tableColumnSize, "monday"),
      tuesday: lopeArray(tableColumnSize, "tuesday"),
      wednesday: lopeArray(tableColumnSize, "wednesday"),
      thursday: lopeArray(tableColumnSize, "thursday"),
    };

    console.log(data);
    return data;
  };

  const lopeArray = (size, day) => {
    let arr = [];
    for (var i = 0; i < size; i++) {
      arr[i] = {
        indexDay: i,
        day: day,
        value: [],
      };
    }
    return arr;
  };

  const createNewSchedule = async () => {
    let newSchema = schema();
    setModalIsOpen(false);
    await axios
      .post(`http://localhost:5000/api/admin/schedule`, {
        schema: newSchema,
        level: newSchema.level,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          getSchedulesFromDB();
          successMessage("Schema Created Succefully");
        }
        if (res.data.status === "FAILD") {
          errorMessage("Something went wrong, Try again!!");
        }
      })
      .catch((err) => {
        errorMessage("Something went wrong, Try again!!");
        console.log(err);
      });
  };

  const SaveChanges = async () => {
    //console.log(scheduleData)
    let newSchema = scheduleData;
    await axios
      .post(`http://localhost:5000/api/admin/schedule`, {
        schema: newSchema,
        level: newSchema.level,
      })
      .then((res) => {
        //toast message that it has saved succefully
        if (res.data.status === "SUCCESS") {
          getSchedulesFromDB();
          successMessage("Schema Saved Succefully");
        }
        if (res.data.status === "FAILD") {
          errorMessage("Something went wrong, Try again!!");
        }
      })
      .catch((err) => {
        errorMessage("Something went wrong, Try again!!");
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <Content>
        <HeaderContainer>
          <HeaherTitle>
            <ScheduleIcon />
            <Hearder>Schedules</Hearder>
          </HeaherTitle>
          <TableButtons>
            <ChooseSchedule
              value={viewSchedule}
              onChange={(e) => setViewSchedule(e.target.value)}
            >
              <option value={"Licence 1"}>Licence 1</option>
              <option value={"Licence 2"}>Licence 2</option>
              <option value={"Licence 3"}>Licence 3</option>
              <option value={"Master 1"}>Master 1</option>
              <option value={"Master 2"}>Master 2</option>
            </ChooseSchedule>
            <Button onClick={() => SaveChanges()}>Save Changes</Button>
            <Button>Edit Current Schedule</Button>
            <Button onClick={() => setModalIsOpen(true)}>
              Create New Schedule
            </Button>
          </TableButtons>
        </HeaderContainer>

        <CreateSchedules
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}
        />
      </Content>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        onClick={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <NewSchedule>
          <NewScheduleHeader>Customize Schema</NewScheduleHeader>
          <Customize>
            <select onChange={(e) => setTableLevel(e.target.value)}>
              <option value={""}>Choose level</option>
              <option value={viewSchedule}> {viewSchedule}</option>
            </select>
            <select onChange={(e) => setTableColumnSize(e.target.value)}>
              <option value={""}>Choose column size</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
            </select>
          </Customize>
          <CreateNewScheduleButton>
            <CreateSchedule onClick={() => createNewSchedule()}>
              Create
            </CreateSchedule>
            <CancelSchedule onClick={() => setModalIsOpen(false)}>
              Cancel
            </CancelSchedule>
          </CreateNewScheduleButton>
        </NewSchedule>
      </Modal>
    </Wrapper>
  );
};

export default AdminSchedules;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaherTitle = styled.div`
  display: flex;
  align-items: center;
`;

const TableButtons = styled.div``;

const Button = styled.button`
  padding: 9px;
  margin-left: 20px;
  border-radius: 8px;
  border: 1px solid #c278f8;
  font-weight: 600;
  color: #fff;
  background-color: #c278f8;

  &:hover {
    color: #c278f8;
    background-color: #fff;
    border: 1px solid #c278f8;
  }
`;

const ScheduleIcon = styled(FcOvertime)`
  color: #777b86;
  font-size: 25px;
  font-weight: 700;
  margin-right: 5px;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const ChooseSchedule = styled.select`
  width: 100px;
  outline: none;
  margin-bottom: 10px;
  padding: 9px;
  border-radius: 8px;
  color: #adb1c0;
  background-color: #f6e8ff;
`;

const NewSchedule = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
`;

const NewScheduleHeader = styled.h1`
  text-align: center;
  font-size: 20px;
  color: #f56396;
`;

const CreateNewScheduleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Customize = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > select {
    width: 63%;
    outline: none;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #000;
  }
`;

const CreateSchedule = styled.button`
  cursor: pointer;
  background-color: #f56396;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 35px;
  margin: 0 5px;
  padding: 5px;
  width: 130px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #fff;
    color: #8f8f8f;
  }
`;
const CancelSchedule = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #8f8f8f;
  outline: none;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  height: 35px;
  padding: 5px;
  width: 130px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #f56396;
    color: #fff;
  }
`;
