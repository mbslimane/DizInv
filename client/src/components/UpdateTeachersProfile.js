import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import TextFieldOptions from "./TextFieldOptions";
import TextFieldOptionsGroup from "./TextFieldOptionsGroup";
import * as Yup from "yup";
import Select from "react-select";

const UpdateTeachersProfile = ({ user, profileType, edit }) => {
  const [teacherGroups, setTeacherGroups] = useState([]);
  const [teacherModule, setTeacherModule] = useState();
  const [teacherSceanceType, setTeacherSceanceType] = useState([]);
  const [moduleListOptions, setModuleListOptions] = useState([]);

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

  const getModuleOptions = async () => {
    await axios
      .get(`http://localhost:5000/api/admin/modules/teacher-form-option`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setModuleListOptions(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
      <Content style={{ opacity: edit && 0.3, pointerEvents: edit && "none" }}>
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={validation}
          onSubmit={(values) => console.log(values)}
        >
          {(formik) => (
            <div>
              <Form style={{ width: "100%" }}>
                <Shared>
                  <InputShared>
                    <Label>first name</Label>
                    <TextField type="text" name="firstName" />
                  </InputShared>
                  <InputShared>
                    <Label>Last name</Label>
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

export default UpdateTeachersProfile;

const Wrapper = styled.div`
  width: 600px;
  height: fit-content;
  background-color: #ffffff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 20px;
`;

const Content = styled.div`
  padding: 20px 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Shared = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 91%;
  margin-bottom: 10px;
`;
const NonShared = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;

  & > input {
    width: 100%;
    border-radius: 10px;
    height: 30px;
    padding-left: 10px;
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
    width: 93%;
    border-radius: 10px;
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
  font-size: 12px;
  opacity: 0.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
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
