import React, { useState } from "react";
import styled from "styled-components";
import { Field, ErrorMessage, useField } from "formik";

const TextFieldOptionsGroup = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { name, formikSection } = props;

  return (
    <>
      <Select
        as="select"
        id={name}
        name={name}
        style={{ borderColor: meta.touched && meta.error && "red" }}
        {...field}
        {...props}
      >
        {formikSection === "GL" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "TI" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "SCI" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "SI" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "MWT" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "Section 1" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G1"> G1 </Option>
            <Option value="G2"> G2 </Option>
            <Option value="G3"> G3 </Option>
            <Option value="G4"> G4 </Option>
          </>
        )}
        {formikSection === "Section 2" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G5"> G5 </Option>
            <Option value="G6"> G6 </Option>
            <Option value="G7"> G7 </Option>
            <Option value="G8"> G8 </Option>
          </>
        )}
        {formikSection === "Section 3" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G9"> G9 </Option>
            <Option value="G10"> G10 </Option>
            <Option value="G11"> G11 </Option>
            <Option value="G12"> G12 </Option>
          </>
        )}
        {formikSection === "Section 4" && (
          <>
            <Option value=""> choose group </Option>
            <Option value="G13"> G13 </Option>
            <Option value="G14"> G14 </Option>
            <Option value="G15"> G15 </Option>
            <Option value="G16"> G16 </Option>
          </>
        )}
      </Select>
      <ErrorMessage name={name} component={Error} />{" "}
    </>
  );
};

export default TextFieldOptionsGroup;

const Select = styled(Field)`
  height: 30px;
  font-size: 14px;
  padding: 0px 5px;
  outline: none;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #adb1c0;
`;
const Option = styled.option`
  font-size: 16px;
  width: 100%;
  background-color: #adb1c0;
  border: none;
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin-bottom: 0px;
  padding-left: 3px;
`;
