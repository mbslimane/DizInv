import React from "react";
import { useField, ErrorMessage } from "formik";
import styled from "styled-components";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        autoComplete="off"
        style={{ borderColor: meta.touched && meta.error && "red" }}
      />
      <ErrorMessage name={field.name} component={Error} />
    </>
  );
};

export default TextField;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin-bottom: 0px;
  padding-left: 3px;
`;
