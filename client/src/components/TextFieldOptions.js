import React from "react";
import styled from "styled-components";
import { Field, ErrorMessage, useField } from "formik";

const TextFieldOptions = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { name, options } = props;

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
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.key}{" "}
          </Option>
        ))}
      </Select>
      <ErrorMessage name={name} component={Error} />
    </>
  );
};

export default TextFieldOptions;

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
