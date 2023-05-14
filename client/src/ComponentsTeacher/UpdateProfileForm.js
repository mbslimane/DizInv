import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import TextField from "../components/TextField";

const UpdateProfileForm = ({ user, edit, UpdateTeacher }) => {
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
  });

  //destructuring the values that i need
  const { firstName, lastName, email, password, phone, address, city, id_user } = user;
 // console.log(user)

  return (
    <Wrapper> 
      <Content style={{ opacity: edit && 0.3, pointerEvents: edit && "none" }}>
        <Formik
          enableReinitialize
          initialValues={{
            id_user, 
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            city,
          }}
          validationSchema={validation}
          onSubmit={(values) => UpdateTeacher(values)}
        >
          {(formik) => (
            <div>
              <Form style={{ width: "100%" }}>
                {/* {console.log({ formik })} */}
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

export default UpdateProfileForm;

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
  margin-top: 40px;
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
