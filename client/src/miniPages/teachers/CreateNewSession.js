import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import QRGenerator from "./QRGenerator";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import Select from "react-select";

const override = css`
  position: absolute;
  opacity: 1;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
    borderRadius: "20px",
    overflow: "hidden",
    width: "900px",
    height: "500px",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const customStylesSelect = {
  menuList: () => ({
    height: 10,
  }),
  menu: (provided, state) => ({
    ...provided,
    height: "60px",
    overflowY: "scroll",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "10px",
  }),
};

const CreateNewSession = ({
  modalIsOpen,
  setModalIsOpen,
  createNewSession,
  QRsrc,
}) => {
  //parameters from URL link
  const { group, module, sceance } = useParams();

  //loading animation
  const [loading, setLoading] = useState(true);

  const [sessionDetails, setSessionDetails] = useState({});

  //section_speciality options
  const [sectionSpecialityOptions, setSectionSpecialityOptions] = useState([]);

  const [sectionSpeciality, setSectionSpeciality] = useState();

  const section_specialityOptions = () => {
    const level = sessionStorage.getItem("level");
    if (level === "Licence 1" || level === "Licence 2") {
      if (
        group === "G1" ||
        group === "G2" ||
        group === "G3" ||
        group === "G4"
      ) {
        setSectionSpecialityOptions([
          { value: "Section 1", label: "Section 1" },
        ]);
      } else if (
        group === "G5" ||
        group === "G6" ||
        group === "G7" ||
        group === "G8"
      ) {
        setSectionSpecialityOptions([
          { value: "Section 2", label: "Section 2" },
        ]);
      } else if (
        group === "G9" ||
        group === "G10" ||
        group === "G11" ||
        group === "G12"
      ) {
        setSectionSpecialityOptions([
          { value: "Section 3", label: "Section 3" },
        ]);
      } else if (
        group === "G13" ||
        group === "G14" ||
        group === "G15" ||
        group === "G16"
      ) {
        setSectionSpecialityOptions([
          { value: "Section 4", label: "Section 4" },
        ]);
      } else {
      }
    }

    if (level === "Licence 3" || level === "Master 1" || level === "Master 2") {
      let department = sessionStorage.getItem("department");
      if (department === "TLSI") {
        setSectionSpecialityOptions([
          { value: "GL", label: "GL" },
          { value: "SI", label: "SI" },
        ]);
      } else if (department === "IFA") {
        setSectionSpecialityOptions([
          { value: "TI", label: "TI" },
          { value: "SCI", label: "SCI" },
        ]);
      } else {
      }
    }
  };

  // setting QRsrc
  useEffect(() => {
    if (QRsrc === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (QRsrc === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [QRsrc]);

  //get the time stamp
  const getCurrentTimeStamp = () => {
    const today = new Date();
    return (
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    );
  };

  useEffect(() => {
    if (module && sceance && group) {
      setSessionDetails({
        SessionID: uuidv4(),
        module: module,
        group: group,
        sceance: sceance,
        level: sessionStorage.getItem("level"),
        department: sessionStorage.getItem("department"),
        date: new Date().toLocaleDateString(),
        timeStamp: getCurrentTimeStamp(),
      });
    }
  }, [module, sceance, group]);

  const ValidateAndCreateSesssion = (type) => {
    let values = { ...sessionDetails, sectionSpeciality: sectionSpeciality };
    createNewSession(values, type);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      <Wrapper>
        <Content>
          <LeftForm>
            <Header>Create new session</Header>
            <form>
              <div>
                <Label>Session ID</Label>
                <InputNotShared
                  defaultValue={sessionDetails.SessionID}
                  readOnly
                />
              </div>
              <div>
                <Label>Module name</Label>
                <InputNotShared defaultValue={sessionDetails.module} readOnly />
              </div>
              <SharedForm>
                <div>
                  <Label>Group</Label>
                  <InputShared defaultValue={sessionDetails.group} readOnly />
                </div>
                <div>
                  <Label>Sceance</Label>
                  <InputShared defaultValue={sessionDetails.sceance} readOnly />
                </div>
              </SharedForm>
              <SharedForm>
                <div>
                  <Label>Level</Label>
                  <InputShared defaultValue={sessionDetails.level} readOnly />
                </div>
                <div onClick={() => section_specialityOptions()}>
                  <Label style={{ fontSize: "12px", color: "#bf7fff" }}>
                    Choose section / speciality*
                  </Label>
                  <SelectDate
                    placeholder="choose..."
                    styles={customStylesSelect}
                    options={sectionSpecialityOptions}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#e5cbff",
                        primary: "#bf7fff",
                        neutral20: "#bf7fff",
                      },
                    })}
                    onChange={(e) => setSectionSpeciality(e.value)}
                  />
                </div>
              </SharedForm>

              <CreateButtonContainer>
                <AddSceance
                  onClick={() => ValidateAndCreateSesssion("manual")}
                  style={{ color: "#bf7fff", backgroundColor: "#e5cbff" }}
                >
                  Manually
                </AddSceance>
                <AddSceance
                  onClick={() => ValidateAndCreateSesssion("IOT")}
                  style={{
                    color: "#00cf00",
                    backgroundColor: "#e2ffe2",
                    width: "170px",
                  }}
                >
                  Use IOT (recomended)
                </AddSceance>
              </CreateButtonContainer>
            </form>
          </LeftForm>
          <Right>
            {loading ? (
              <HashLoader
                color={"#C278F8"}
                css={override}
                loading={loading}
                size={80}
              />
            ) : (
              <QRGenerator QRsrc={QRsrc} setModalIsOpen={setModalIsOpen} />
            )}
          </Right>
        </Content>
      </Wrapper>
    </Modal>
  );
};

export default CreateNewSession;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftForm = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //  border: 1px solid red;
`;

const Header = styled.h1`
  font-size: 20px;
  color: #bf7fff;
  margin-bottom: 20px;
`;

const Label = styled.h1`
  font-size: 16px;
  color: #c4c4c4;
  margin-bottom: 5px;
`;

const InputNotShared = styled.input`
  outline: none;
  width: 100%;
  height: 35px;
  border: 1px solid #c4c4c4;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  padding-left: 5px;
`;

const SharedForm = styled.div`
  width: 102%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputShared = styled.input`
  outline: none;
  width: 95%;
  height: 35px;
  border: 1px solid #c4c4c4;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  padding-left: 5px;
`;

const SelectDate = styled(Select)`
  width: 200px;
  border-radius: 5px;
`;

const CreateButtonContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  background-color: #f2e5ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddSceance = styled.div`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f2e5ff;
  }
`;
