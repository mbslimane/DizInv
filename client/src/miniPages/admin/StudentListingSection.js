import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { HiAcademicCap } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom";

import HeaderNav from "../../components/HeaderNav";
import ListNav from "../../components/ListNav";
import Table from "../../components/Table";

import toast, { Toaster } from "react-hot-toast";
import NewUserModal from "../../components/NewUserModal";

const StudentListingSection = () => {
  const params = useParams();
  const [section, setSection] = useState("Section");
  const [group, setGroup] = useState("Group");
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //data been pushed to Table
  const [allList, setAllList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  //common changes to change
  const [getStudentParameter, setGetStudentParameter] = useState("");
  const [IconChange, setIconChange] = useState();

  const DeleteUser = (message) => {
    toast.success(message, {
      style: {
        background: "#25ab42",
        color: "#fff",
      },
    });
  };

  //this function is called from the addNew forms components
  const addedSuccecfully = (message) => {
    toast.success(message, {
      style: {
        background: "#25ab42",
        color: "#fff",
      },
    });
  };

  //this function is called from the addNew forms components
  const addedFailed = (message) => {
    toast.error(message, {
      style: {
        background: "rgba(255,51,51, 0.7)",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (params.id === "licence1") {
      setGetStudentParameter("Licence 1");
      setIconChange(<HiOutlineAcademicCap />);
    }
    if (params.id === "licence2") {
      setGetStudentParameter("Licence 2");
      setIconChange(<HiAcademicCap />); 
    }
    getStudents();
  }, [params]);

  const getStudents = async () => {
    //console.log(params)
    await axios
      .get(`http://localhost:5000/api/admin/students/${params.id}`)
      .then((res) => {
        // console.log(res.data)
        if (res.data.status === "SUCCESS") {
          setAllList(res.data.result);
          setFiltered(res.data.result);
        }
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    let newData = allList;

    if (query !== "") {
      newData = newData.filter((item) => {
        return (
          item.firstName.toUpperCase().includes(query.toUpperCase()) ||
          item.lastName.toUpperCase().includes(query.toUpperCase())
        );
      });
    }
    if (section !== "Section") {
      newData = newData.filter((item) => {
        return item.section_speciality === section;
      });
    }
    if (group !== "Group") {
      newData = newData.filter((item) => {
        return item.student_group === group;
      });
    }
    setFiltered(newData);
  }, [section, group, query]);

  useEffect(() => {
    setGroup("Group");
  }, [section]);

  return (
    <Wrapper>
      <Content>
        <Toaster />
        <HeaderNav
          level={getStudentParameter}
          Icon={IconChange}
          onClick={() => setModalIsOpen(true)}
        />
        <List>
          <ListNav
            Students
            level="section"
            section={section}
            setSection={setSection}
            setGroup={setGroup}
            group={group}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            total={filtered.length}
          />
          <Table
            data={filtered}
            DeleteUser={DeleteUser}
            updateUI={getStudents}
          />
        </List>
        <NewUserModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          setModalIsOpen={() => setModalIsOpen(false)}
          update={getStudents}
          addedSuccecfully={addedSuccecfully}
          addedFailed={addedFailed}
          Student
        />
      </Content>
    </Wrapper>
  );
};

export default StudentListingSection;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
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

// const Content = styled.div`
//   //border: 1px solid red;
// `;
