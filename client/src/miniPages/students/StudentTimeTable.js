import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import MyTimeTable from "../../componentStudent/MyTimeTable";

const StudentTimeTable = () => {
  const navigation = useNavigate();

  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    getSchedulesFromDB();
  }, []);

  //uses the admin schedule api to get all the schedules
  const getSchedulesFromDB = async () => {
    await axios
      .get(
        `http://localhost:5000/api/admin/schedule/${sessionStorage.getItem(
          "level"
        )}`
      )
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: 0,
      border: "none",
      borderRadius: "20px",
      overflow: "hidden",
      width: "1400px",
      height: "650px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
  };

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={() => navigation(-1)}
      ariaHideApp={false}
    >
      <MyTimeTable scheduleData={scheduleData} />
    </Modal>
  );
};

export default StudentTimeTable;
