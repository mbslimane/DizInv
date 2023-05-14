import React from "react";
import styled from "styled-components"; 
import axios from "axios";
import image from "../asserts/images/addForm.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import TextFieldOptions from "./TextFieldOptions";
import { MdOutlineClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const AddModuleForm = ({
  moduleFormValues,
  setModalIsOpen,
  addedFailed,
  update,
  addedSuccecfully,
  mood,
  setMood,
}) => {
  //console.log(moduleFormValues);

  //validation
  const validation = Yup.object({
    code: Yup.string()
      .max(5, "field must not be more than 5 characters")
      .required("field is required"),
    name: Yup.string()
      .min(5, "enter full module name")
      .required("field is required"),
    department: Yup.string().required("choose department"),
    level: Yup.string().required("choose level"),
  });

  const initialValues = {
    id: moduleFormValues.id_modules || uuidv4(),
    code: moduleFormValues.module_code || "",
    name: moduleFormValues.module_name || "",
    department: moduleFormValues.department || "",
    level: moduleFormValues.level || "",
  };

  const AddEditModule = async (module) => {
    await axios
      .post(`http://localhost:5000/api/admin/add-module`, {
        module,
        mood,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          setModalIsOpen(false);
          addedSuccecfully(res.data.message);

          // after delet call back the get request to get back up to date data
          update();
        }
        
        if (res.data.status === "FAILED") {
          setModalIsOpen(false);
          addedFailed(res.data.message);
        }
      })
      .catch((err) => {
        setModalIsOpen(false);
        addedFailed(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setMood("");
      });
  };

  return (
    <Wrapper>
      <Hero>
        <Img src={image} alt="add form image" />
      </Hero>
      <Content>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validation}
          onSubmit={(values) => AddEditModule(values)}
        >
          {(formik) => (
            <div>
              <Header>
                {moduleFormValues.hasOwnProperty("code")
                  ? "Edit Module Form"
                  : "Add New Module Form"}
                <CloseIcon onClick={setModalIsOpen} />
              </Header>
              <Form style={{ width: "95%" }}>
                {console.log({ formik })}
                <NonShared>
                  <Input>
                    <Label>Code *</Label>
                    <TextField type="text" name="code" />
                  </Input>
                </NonShared>
                <NonShared>
                  <Input>
                    <Label>Name *</Label>
                    <TextField type="text" name="name" />
                  </Input>
                </NonShared>
                <NonShared>
                  <Input>
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
                  </Input>
                </NonShared>
                <NonShared>
                  <Input>
                    <Label>Level *</Label>
                    <TextFieldOptions
                      options={[
                        { key: "Choose level", value: "" },
                        { key: "Licence 1", value: "Licence 1" },
                        { key: "Licence 2", value: "Licence 2" },
                        { key: "Licence 3", value: "Licence 3" },
                        { key: "Master 1", value: "Master 1" },
                        { key: "Master 2", value: "Master 2" },
                      ]}
                      name="level"
                    />
                  </Input>
                </NonShared>
                <ButtonContainer>
                  <Save type="submit">
                    {moduleFormValues.hasOwnProperty("module_code") ? "Edit" : "Add"}
                  </Save>
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

export default AddModuleForm;

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
  cursor: pointer;
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
  cursor: pointer;
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
