import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";

const SceanceStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "10px",
  }),
};

const TeacherManagePresence = () => {
  const navigation = useNavigate();
  const [manageGroup, setManageGroup] = useState([]);
  const [sceanceList, setSceanceList] = useState([]);
  const [currentSceance, setcurrentSceance] = useState();

  // console.log(manageGroup);
  // console.log(currentSceance);

  useEffect(() => {  
    const group = sessionStorage.getItem("groups");
    if (group.includes(",")) {
      setManageGroup(group.split(","));
    } else {
      const arr = [group];
      setManageGroup(arr);
    }

    //seting the sceance even if its array or normal to match our app
    const sceance = sessionStorage.getItem("sceance");
    if (sceance.includes(",")) {
      const list = sceance.split(",");
      const options = list.map((type) => ({
        value: type,
        label: type,
      }));

      setSceanceList(options);
      setcurrentSceance(options[0].value);
    } else {
      setSceanceList([
        {
          value: sceance,
          label: sceance,
        },
      ]);
      setcurrentSceance(sceance);
    }
  }, []);

  return (
    <Wrapper>
      <Content>
        <HeaderContainer>
          <div style={{ display: "flex" }}>
            <BackIcon onClick={() => navigation(-1)} />
            <Hearder>Choose Group</Hearder>
          </div>
          <div style={{ display: "flex" }}>
            <Hearder>Sceance type:</Hearder>
            {sceanceList.length > 0 && (
              <SelectSceance
                className="basic-single"
                classNamePrefix="select"
                styles={SceanceStyles}
                defaultValue={sceanceList[0]}
                options={sceanceList}
                onChange={(e) => setcurrentSceance(e.value)}
              />
            )}
          </div>
        </HeaderContainer>

        <GroupList>
          <Hearder>
            {currentSceance} -{" "}
            {sessionStorage.getItem("module")}
          </Hearder>
          <Groups>
            {manageGroup.map((group, index) => (
              <Folder key={index}
                to={`/teacher/${sessionStorage.getItem(
                  "module"
                )}/${currentSceance}/${group}`}
              >
                <Hearder>{group}</Hearder>{" "}
              </Folder>
            ))}
          </Groups>
        </GroupList>
      </Content>
    </Wrapper>
  );
};

export default TeacherManagePresence;

const Wrapper = styled.div`
  padding: 40px 40px 0 0px;
  width: 100%;
`;

const Content = styled.div`
  //border: 1px solid red;
`;

const SelectSceance = styled(Select)`
  width: 200px;
  margin-left: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackIcon = styled(FaArrowLeft)`
  color: #777b86;
  font-size: 23px;
  font-weight: 700;
  margin-right: 40px;
  cursor: pointer;
`;

const Hearder = styled.h1`
  font-size: 23px;
  font-weight: 700;
  color: #adb1c0;
`;

const GroupList = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const Groups = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Folder = styled(Link)`
  width: 200px;
  height: 130px;
  margin-top: 50px;
  position: relative;
  border-radius: 0 6px 6px 6px;
  box-shadow: 0 1px 1px #e3beff, 0 2px 4px #e3beff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c278f8;
  text-decoration: none;

  &:hover {
    background-color: #e3beff;
  }

  &::before {
    content: "";
    width: 50%;
    height: 12px;
    border-radius: 0 20px 0 0;
    border-top: 2px solid #c278f8;
    border-left: 2px solid #c278f8;
    position: absolute;
    top: -12px;
    left: 0px;
  }
`;
