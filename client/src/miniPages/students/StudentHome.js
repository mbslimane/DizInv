import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentHero from "../../componentStudent/StudentHero";
import StudentNavBar from "../../componentStudent/StudentNavBar";

//static dataset
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../../componentStudent/StaticData";
import InfoSection from "../../componentStudent/InfoSection";
import StudentFooter from "../../componentStudent/StudentFooter";

const StudentHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  //get the necesarry data of the student and store in session storage
  const getStudentData = async () => {
    await axios
      .get(
        `http://localhost:5000/api/student/data/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          let { department, inscription, firstName, level } = res.data.result;
          let { student_group, section_speciality } = res.data.result;

          sessionStorage.setItem("department", department);
          sessionStorage.setItem("firstName", firstName);
          sessionStorage.setItem("inscription", inscription);
          sessionStorage.setItem("student_group", student_group);
          sessionStorage.setItem("level", level);
          sessionStorage.setItem("section_speciality", section_speciality);
 
          setFirstName(firstName);
        }
        if (res.data.status === "FAILED") {
          console.log(res.data.messsage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <StudentNavBar toggle={toggle} firstName={firstName} />
      <StudentHero />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <StudentFooter />
    </>
  );
};

export default StudentHome;
