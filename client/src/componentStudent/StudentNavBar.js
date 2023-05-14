import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import logoImage from "../asserts/images/logo.png";
import ProfileLogo from "../components/ProfileLogo";
import { FiLogOut } from "react-icons/fi";

const StudentNavBar = ({ toggle, firstName, profileStyle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  //geting this last so its already set before getting it
  // setTimeout(() => {
  //   setFirstName(sessionStorage.getItem("firstName"));
  // }, 0)

  useEffect(() => {
    window.addEventListener("scroll", changNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const logoutButton = () => {
    sessionStorage.clear();
    setTimeout(
      () => (window.location.href = "http://localhost:3000/login"),
      500
    );
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav} style={profileStyle}>
          <NavbarContainer>
            <NavLogo to="/student/home" onClick={toggleHome}>
              <img src={logoImage} />
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinksNonScroll
                  to="/student/time-table"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Time-table
                </NavLinksNonScroll>
              </NavItem>
              <NavItem>
                <NavLinksNonScroll
                  to="/student/absence-justification"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Absence/Justification
                </NavLinksNonScroll>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="statistics"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  My Stats
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="rules"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Rules
                </NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtnContainer>
              <NavBtnLink
                to="/login"
                onClick={() => {
                  logoutButton();
                }}
              >
                Log out
                <FiLogOut style={{ marginLeft: "5px" }} />
              </NavBtnLink>
              <NavBtn title="profile" to={"/student/profile"}>
                <ProfileLogo
                  Text={firstName ? firstName.slice(0, 1) : ""}
                  Name={firstName ? firstName.slice(0, 7) + "..." : ""}
                  style={{ color: "#fff" }}
                />
              </NavBtn>
            </NavBtnContainer>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default StudentNavBar;

const Nav = styled.nav`
  background-color: ${({ scrollNav }) => (scrollNav ? "#000" : "transparent")};
  border-bottom: ${({ scrollNav }) =>
    scrollNav ? "1px solid #fff" : "transparent"};
  border-radius: 0 0 5px 5px;
  height: 80px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
`;

const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  /* thid is for whenever you scroll it highlist what ever link you are on */
  /* &.active {
    border-bottom: 3px solid #bd62ff;
  } */
`;

const NavLinksNonScroll = styled(LinkR)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const NavBtnContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled(LinkR)`
  display: flex;
  align-items: center;
  text-decoration: none;
  //justify-content: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavBtnLink = styled(LinkR)`
  border-radius: 5px;
  background: #ff6262;
  white-space: nowrap;
  padding: 8px 15px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #ff6262;
  }
`;
