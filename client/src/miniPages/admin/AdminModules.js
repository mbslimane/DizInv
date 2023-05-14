import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GiTeacher } from "react-icons/gi";

//pages import
import HeaderNav from "../../components/HeaderNav";
import ListNav from "../../components/ListNav";
import NewUserModal from "../../components/NewUserModal";

import { FaBook } from "react-icons/fa";
import TableModules from "../../components/TableModules";

const AdminModules = () => {
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //data been pushed to Table
  const [allList, setAllList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  //form initial value
  const [formValue, setFormValue] = useState({});

  //form mood: add or edit
  const [mood, setMood] = useState("");

  const DeleteUser = (message) => {
    toast.success(message, {
      style: {
        background: "#25ab42",
        color: "#fff",
      },
    });
  };
  const DeleteUserFailed = (message) => {
    toast.error(message, {
      style: {
        background: "rgba(255,51,51, 0.7)",
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
    getModules();
  }, []);

  const getModules = async () => {
    await axios
      .get(`http://localhost:5000/api/admin/modules`)
      .then((res) => {
        // console.log(res.data);
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
        return item.name.toUpperCase().includes(query.toUpperCase());
      });
    }
    setFiltered(newData);
  }, [query]);

  const editModalFormValue = (values) => {
    setFormValue(values);
    setMood("edit");
    setModalIsOpen(true);
  };

  const addModalFormValue = () => {
    setMood("add");
    setModalIsOpen(true);
  };

  const clearEditModalFormValue = () => {
    setFormValue({});
    setModalIsOpen(false);
  };

  return (
    <Wrapper>
      <Content>
        <Toaster />
        <HeaderNav
          level={"Modules"}
          Icon={<FaBook />}
          onClick={() => addModalFormValue()}
        />

        <List>
          <ListNav
            Modules
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            total={filtered.length}
          />

          <TableModules
            data={filtered}
            DeleteUser={DeleteUser}
            DeleteUserFailed={DeleteUserFailed}
            updateUI={getModules}
            editModalFormValue={editModalFormValue}
          />
        </List>

        <NewUserModal
          isOpen={modalIsOpen}
          onRequestClose={() => clearEditModalFormValue()}
          setModalIsOpen={() => clearEditModalFormValue()}
          update={getModules}
          moduleFormValues={formValue}
          addedSuccecfully={addedSuccecfully}
          addedFailed={addedFailed}
          Module
          mood={mood}
          setMood={setMood}
        />
      </Content>
    </Wrapper>
  );
};

export default AdminModules;

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
