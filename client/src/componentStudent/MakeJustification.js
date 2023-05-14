import React, { useState } from "react";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

const MakeJustification = ({ itemToJustify }) => {
  const [studentComment, setStudentComment] = useState("");
  const [filePDF, setFilePDF] = useState(null);
 // console.log(filePDF);

  const errorMessage = (message) => {
    toast.error(message, {
      style: {
        background: "rgba(255,51,51, 0.7)",
        color: "#fff",
      },
    });
  };

  const successMessage = (message) => {
    toast.success(message, {
      style: {
        background: "#25ab42",
        color: "#fff",
      },
    });
  };


  //checking the lenght of words for the student comments
  const checkLength = (word) => {
    if (word.trim().length <= 200) {
      setStudentComment(word);
    }
  };

  //chech if a file is PDF or not
  const checkPDF = (file) => {
    if (file[0].type === "application/pdf") {
      const [f] = file;
      setFilePDF(f);
      // console.log(f);
    } else {
      errorMessage("You must choose a PDF file ONLY");
    }
  };


  //submiting my justification
  const submitJustification = () => {
    let data = { ...itemToJustify, student_comment: studentComment };

    if (filePDF === null) {
      errorMessage("You must choose a PDF file ONLY");
      return;
    }

    console.log(data);
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <Content>
        <Header> New Justification</Header>
        <form>
          <div>
            <Label>Module</Label>
            <InputNotShared defaultValue={itemToJustify.module} readOnly />
          </div>
          <div>
            <Label>Sceance</Label>
            <InputNotShared defaultValue={itemToJustify.sceance} readOnly />
          </div>
          <div>
            <Label>Level</Label>
            <InputNotShared defaultValue={itemToJustify.level} readOnly />
          </div>
          <div>
            <Label>Drop a comment ({200 - studentComment.trim().length})</Label>
            <Textarea
              rows="4"
              cols="50"
              onChange={(e) => checkLength(e.target.value)}
              value={studentComment}
            />
          </div>
          <div>
            <Label>Attachment (recomended)</Label>
            <InputNotShared
              style={{ border: "none" }}
              type={"file"}
              onClick={() => setFilePDF(null)}
              onChange={(e) => checkPDF(e.target.files)}
              multiple={false}
            />
          </div>
          <AddSceance onClick={() => submitJustification()}>Submit</AddSceance>
        </form>
      </Content>
    </Wrapper>
  );
};

export default MakeJustification;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;

  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // border: 1px solid red;

  & > form {
    width: 85%;
    height: 85%;
    // border: 1px solid red;
  }
`;

const Header = styled.h1`
  font-size: 25px;
  color: #bf7fff;
  margin-bottom: 20px;
  margin-top: 10px;
  text-decoration: underline;
`;

const Label = styled.h1`
  font-size: 16px;
  color: #c4c4c4;
  margin-bottom: 5px;
`;

const InputNotShared = styled.input`
  outline: none;
  width: 98%;
  height: 30px;
  border: 1px solid #c4c4c4;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  padding-left: 5px;
`;

const Textarea = styled.textarea`
  outline: none;
  width: 97%;
  border: 1px solid #c4c4c4;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px;
  resize: none;
`;

const AddSceance = styled.div`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  margin-top: 10px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background-color: #c183ff;

  &:hover {
    background-color: #e5cbff;
    color: #bf7fff;
  }
`;
