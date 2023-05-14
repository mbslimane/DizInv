import React, { useEffect } from "react";
import axios from "axios";
import DashboardChelf from "../../componentsChelf/DashboardChelf";

const ChelfDashBoard = () => {
  const getChelfData = async () => {
    await axios
      .get(
        `http://localhost:5000/api/chelf/data/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          let { department, module, status, groups, level, sceance } =
            res.data.data;

          sessionStorage.setItem("department", department);
          sessionStorage.setItem("module", module);
          sessionStorage.setItem("status", status);
          sessionStorage.setItem("groups", JSON.parse(groups));
          sessionStorage.setItem("level", level);
          sessionStorage.setItem("sceance", JSON.parse(sceance));
        }
        if (res.data.status === "FAILED") {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChelfData();
  }, []);

  return <DashboardChelf />;
};

export default ChelfDashBoard;
