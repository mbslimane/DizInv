import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import image from "../asserts/images/addForm.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import TextFieldOptions from "./TextFieldOptions";
import { MdOutlineClose } from "react-icons/md";

import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const AddNewFormTeacher = ({
  setModalIsOpen,
  addedFailed,
  update,
  addedSuccecfully,
}) => {
  const [teacherGroups, setTeacherGroups] = useState([]);
  const [teacherModule, setTeacherModule] = useState();
  const [teacherSceanceType, setTeacherSceanceType] = useState([]);
  const [moduleListOptions, setModuleListOptions] = useState([]);

  //validation
  const validation = Yup.object({
    firstName: Yup.string()
      .min(3, "field must be more than 3 characters")
      .required("field is required"),
    lastName: Yup.string()
      .min(3, "field must be more than 3 characters")
      .required("field is required"),
    email: Yup.string().email("enter correct email").required("email required"),
    phone: Yup.string("numbers only")
      .required("field is required")
      .min(10, "must be 10 numbers")
      .max(10, "must be 10 numbers"),
    address: Yup.string()
      .min(7, "enter full address")
      .required("field is required"),
    city: Yup.string()
      .min(4, "enter full city name")
      .required("field is required"),
    department: Yup.string().required("this field is required"),
    status: Yup.string().required("this field is required"),
    level: Yup.string().required("this field is required"),
  });

  //data from the add new modal
  const initialValues = {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: uuidv4(),
    department: "",
    module: "",
    status: "",
    groups: [],
    level: "",
    sceance: [],
  };

  const customStyles = {
    menuList: () => ({
      height: 10,
    }),
    menu: (provided, state) => ({
      ...provided,
      height: "170px",
      overflowY: "scroll",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
    }),
  };

  const SceanceStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "10px",
    }),
  };

  const getModuleOptions = async () => {
    await axios
      .get(`http://localhost:5000/api/admin/modules/teacher-form-option`)
      .then((res) => {
       // console.log(res.data);
        if (res.data.status === "SUCCESS") {
          setModuleListOptions(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const AddTeacher = async (value) => {
    const data = {
      ...value,
      groups: teacherGroups.map((e) => e.value),
      sceance: teacherSceanceType.map((e) => e.value),
      module: teacherModule,
    };

    await axios
      .post("http://localhost:5000/api/admin/add-new-teacher", {
        data,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          // succes toast down to the main component
          setModalIsOpen(false);
          addedSuccecfully("Teacher was succefully added");
          update();
        }
        if (res.data.status === "FAILED") {
          setModalIsOpen(false);
          addedFailed("Something went wrong, try again");
        }
      })
      .catch((err) => {
        setModalIsOpen(false);
        console.log(err);
        addedFailed("Something went wrong, try again");
      });

    console.log(data);
  };

  const groupOptions = [
    {
      value: "G1",
      label: "Group 1",
    },
    {
      value: "G2",
      label: "Group 2",
    },
    {
      value: "G3",
      label: "Group 3",
    },
    {
      value: "G4",
      label: "Group 4",
    },
    {
      value: "G5",
      label: "Group 5",
    },
    {
      value: "G6",
      label: "Group 6",
    },
    {
      value: "G7",
      label: "Group 7",
    },
    {
      value: "G8",
      label: "Group 8",
    },
    {
      value: "G9",
      label: "Group 9",
    },
    {
      value: "G10",
      label: "Group 10",
    },
    {
      value: "G11",
      label: "Group 11",
    },
    {
      value: "G12",
      label: "Group 12",
    },
    {
      value: "G13",
      label: "Group 13",
    },
    {
      value: "G14",
      label: "Group 14",
    },
    {
      value: "G15",
      label: "Group 15",
    },
    {
      value: "G16",
      label: "Group 16",
    },
  ];

  return (
    <Wrapper>
      <Hero>
        <Img src={image} alt="add form image" />
      </Hero>
      <Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => AddTeacher(values)}
        >
          {(formik) => (
            <div>
              <Header>
                Teacher Form
                <CloseIcon onClick={setModalIsOpen} />
              </Header>
              <Form style={{ width: "95%" }}>
                {console.log({ formik })}
                <Shared>
                  <InputShared>
                    <Label>First name *</Label>
                    <TextField type="text" name="firstName" />
                  </InputShared>
                  <InputShared>
                    <Label>Last name *</Label>
                    <TextField type="text" name="lastName" />
                  </InputShared>
                </Shared>
                <NonShared>
                  <Input>
                    <Label>Email *</Label>
                    <TextField type="email" name="email" />
                  </Input>
                </NonShared>
                <NonShared>
                  <Input>
                    <Label>Address *</Label>
                    <TextField type="text" name="address" />
                  </Input>
                </NonShared>
                <Shared>
                  <InputShared>
                    <Label>City *</Label>
                    <TextField type="text" name="city" />
                  </InputShared>
                  <InputShared>
                    <Label>Phone no *</Label>
                    <TextField type="text" name="phone" />
                  </InputShared>
                </Shared>
                <NonShared>
                  <Input>
                    <Label>Group (s) *</Label>
                    <Select
                      isMulti
                      placeholder="Select group(s)...."
                      styles={customStyles}
                      name="colors"
                      options={groupOptions}
                      onChange={(e) => setTeacherGroups(e)}
                    />
                  </Input>
                </NonShared>
                <NonShared>
                  <Input>
                    <Label>Module *</Label>
                    <div onClick={() => getModuleOptions()}>
                      <Select
                        placeholder="Select module from list...."
                        styles={customStyles}
                        name="module"
                        options={moduleListOptions}
                        onChange={(e) => setTeacherModule(e.value)}
                      />
                    </div>
                  </Input>
                </NonShared>
                <Shared>
                  <InputShared>
                    <Label>sceance type *</Label>
                    <Select
                      isMulti
                      styles={SceanceStyles}
                      placeholder="Select type"
                      name="password"
                      options={[
                        {
                          value: "cours",
                          label: "cours",
                        },
                        {
                          value: "TD",
                          label: "TD",
                        },
                        {
                          value: "TP",
                          label: "TP",
                        },
                      ]}
                      onChange={(e) => setTeacherSceanceType(e)}
                    />
                  </InputShared>
                  <InputShared>
                    <Label>Department *</Label>
                    <TextFieldOptions
                      options={[
                        { key: "Choose dept.", value: "" },
                        { key: "MI", value: "MI" },
                        { key: "TLSI", value: "TLSI" },
                        { key: "IFA", value: "IFA" },
                      ]}
                      name="department"
                    />
                  </InputShared>
                </Shared>

                <Shared>
                  <InputShared>
                    <Label>Level *</Label>
                    <TextFieldOptions
                      options={[
                        { key: "choose level", value: "" },
                        { key: "Licence 1", value: "Licence 1" },
                        { key: "Licence 2", value: "Licence 2" },
                        { key: "Licence 3", value: "Licence 3" },
                        { key: "Master 1", value: "Master 1" },
                        { key: "Master 2", value: "Master 2" },
                      ]}
                      name="level"
                    />
                  </InputShared>
                  <InputShared>
                    <Label>Status *</Label>
                    <TextFieldOptions
                      options={[
                        { key: "choose status", value: "" },
                        { key: "teacher", value: "teacher" },
                        { key: "Chelf Department", value: "ChelfDepartment" },
                      ]}
                      name="status"
                    />
                  </InputShared>
                </Shared>
                <ButtonContainer>
                  <Save type="submit">Add</Save>
                  <Cancel type="reset" value="Reset" />
                </ButtonContainer>
              </Form>
            </div>
          )}
        </Formik>
      </Content>
    </Wrapper>
  );
};

export default AddNewFormTeacher;

const Wrapper = styled.div`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Hero = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #bb60fd;
`;

const Img = styled.img`
  width: 150px;
`;

const Header = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #c278f8;
  border-bottom: 1px solid #f1f3f7;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CloseIcon = styled(MdOutlineClose)`
  color: #0a0b0d;
  font-weight: 700;
  font-size: 25px;
  margin-right: 10px;
`;

const Shared = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-bottom: 10px;
`;
const NonShared = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-bottom: 10px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > input {
    width: 100%;
    border-radius: 3px;
    height: 30px;
    padding-left: 5px;
    outline: none;
    font-size: 14px;
    border: 1px solid #adb1c0;
  }
`;

const InputShared = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  & > input {
    width: 100%;
    border-radius: 3px;
    padding-left: 5px;
    outline: none;
    height: 30px;
    border: 1px solid #adb1c0;
    font-size: 14px;
  }
`;

const InputShared3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;

  & > input {
    width: 96%;
    border-radius: 3px;
    padding-left: 10px;
    outline: none;
    height: 30px;
    border: 1px solid #adb1c0;
    font-size: 14px;
  }
`;

const Label = styled.span`
  color: #777b86;
  margin-left: 3px;
  margin-bottom: 3px;
  font-size: 14px;
  opacity: 0.7;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 50px;
  width: 100%;
  border-top: 1px solid #f1f3f7;
`;

const Save = styled.button`
  height: 30px;
  width: 100px;
  padding: 4px;
  color: #ffffff;
  text-align: center;
  background-color: #a649ea;
  margin-right: 20px;
  margin-left: 30px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: #c278f8;
  }
`;
const Cancel = styled.input`
  height: 30px;
  width: 100px;
  padding: 3px;
  color: #adb1c0;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
