import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";
import logo from "../asserts/images/logoNav.png";
import MenuLinkIcon from "./MenuLinkIcon";

//icons and images
import { BiBarChartAlt, BiUser } from "react-icons/bi";
import {
  GiTeacher,
  GiDiploma,
  GiTiedScroll,
  GiSandsOfTime,
} from "react-icons/gi";
import { FaGraduationCap, FaBook } from "react-icons/fa";
import {
  HiOutlineAcademicCap,
  HiAcademicCap,
  HiOutlineLogout,
} from "react-icons/hi";
import { FcOvertime } from "react-icons/fc";

const AdminNav = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(sessionStorage.getItem("MenuActiveIcon"));
  }, []);

  const changeActiveIcon = (selected) => {
    sessionStorage.setItem("MenuActiveIcon", selected);
    setActive(selected);
  };

  const logoutButton = () => {
    sessionStorage.clear();
    setTimeout(
      () => (window.location.href = "http://localhost:3000/login"),
      500
    );
  };

  return (
    <Wrapper>
      <Content>
        <Logo src={logo} alt="logo" />
        <Menu>
          <MenuLinkIcon 
            Name="Dashboard"
            path="/admin/dashboard"
            Icon={BiBarChartAlt}
            Active={active === "dashboard" ? true : false}
            onClick={() => {
              changeActiveIcon("dashboard");
            }}
          />
          {/* <MenuLinkIcon
            Name="Profile"
            path="/admin/profile"
            Icon={BiUser}
            Active={active === "Profile" ? true : false}
            onClick={() => {
              changeActiveIcon("Profile");
            }}
          /> */}
          <MenuLinkIcon
            Name="Teacher"
            path="/admin/teacher"
            Icon={GiTeacher}
            Active={active === "Teacher" ? true : false}
            onClick={() => {
              changeActiveIcon("Teacher");
            }}
          />
          <Header>STUDENTS</Header>
          <Divider />
          <Move>
            <MenuLinkIcon
              Name="Licence 1"
              path="/admin/section/licence1"
              Icon={HiOutlineAcademicCap}
              Active={active === "Licence 1" ? true : false}
              onClick={() => {
                changeActiveIcon("Licence 1");
              }}
            />
            <MenuLinkIcon
              Name="Licence 2"
              path="/admin/section/licence2"
              Icon={HiAcademicCap}
              Active={active === "Licence 2" ? true : false}
              onClick={() => {
                changeActiveIcon("Licence 2");
              }}
            />
            <MenuLinkIcon
              Name="Licence 3"
              path="/admin/speciality/licence3"
              Icon={GiDiploma}
              Active={active === "Licence 3" ? true : false}
              onClick={() => {
                changeActiveIcon("Licence 3");
              }}
            />
            <MenuLinkIcon
              Name="Master 1"
              path="/admin/speciality/master1"
              Icon={FaGraduationCap}
              Active={active === "Master 1" ? true : false}
              onClick={() => {
                changeActiveIcon("Master 1");
              }}
            />
            <MenuLinkIcon
              Name="Master 2"
              path="/admin/speciality/master2"
              Icon={GiTiedScroll}
              Active={active === "Master 2" ? true : false}
              onClick={() => {
                changeActiveIcon("Master 2");
              }}
            />
          </Move>
          <Header>EXTRA</Header>
          <Divider />
          <Move>
            <MenuLinkIcon
              Name="Modules"
              path="/admin/modules"
              Icon={FaBook}
              Active={active === "Modules" ? true : false}
              onClick={() => {
                changeActiveIcon("Modules");
              }}
            />
            <MenuLinkIcon
              Name="Schedules"
              path="/admin/schedules"
              Icon={FcOvertime}
              Active={active === "Schedules" ? true : false}
              onClick={() => {
                changeActiveIcon("Schedules");
              }}
            />
          </Move>
          <LogoutDivider />
          <MenuLinkIcon
            Name="Logout"
            path="/login"
            Icon={HiOutlineLogout}
            Active={active === "Logout" ? true : false}
            onClick={() => {
              logoutButton();
            }}
          />
        </Menu>
      </Content>
    </Wrapper>
  );
};

export default AdminNav;

const Wrapper = styled.div`
  background-color: #f1f3f7;
  width: 300px;
  height: 100vh;
  //border-right: 1px solid #ffffff;
`;

const Content = styled.div`
  //  border: 1px solid red ;
  padding: 20px 40px 0 35px;
`;

const Logo = styled.img`
  width: 130px;
`;

const Menu = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-right: 2px solid white;
  border-radius: 20px;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #777b86;
  margin-bottom: 2px;
  margin-top: 10px;
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

const Move = styled.div`
  padding-left: 20px;
`;

const LogoutDivider = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 10px;
`;
