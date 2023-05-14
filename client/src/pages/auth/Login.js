import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiLockAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../asserts/images/logo.png";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = (message) => {
    toast.error(`${message && message}`, {
      style: {
        background: "rgba(255,51,51, 0.7)",
        color: "#fff",
      },
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password, 
      });
      console.log(res);
      if (res.data.status === "SUCCESS") {
        const { email, type, firstName, id_user } = res.data.result[0];
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("type", type);
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("id_user", id_user);
 
        //try to put a more stable navigation 
        if (type === "admin") { 
          window.location.href = "http://localhost:3000/admin/dashboard";
        } else if (type === "teacher") {
          window.location.href = "http://localhost:3000/teacher/home";
        } else if (type === "ChelfDepartment") {
          window.location.href =
            "http://localhost:3000/teacher/chelf/dashboard";
        } else if (type === "student") {
          window.location.href = "http://localhost:3000/student/home";
        } else {
          console.log(res);
        }
      }
      if (res.data.status === "FAILED") {
        errorMessage(res.data.message);
      }
    } catch (error) {
      errorMessage(`${error.message} or Server Down`);
      console.log(error.message);
    }
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <Content>
        <Left>
          <LeftContent>
            <Logo src={logo} alt="logo" />
            <Welcome>Welcome Back!!</Welcome>
            <Text>
              Please login with your personal info as an Administrator or a
              Teacher to gain access !!
            </Text>
          </LeftContent>
        </Left>
        <Right>
          <RightContent>
            <Lock />
            <SignIn> Sign In </SignIn>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Fogort to={"/forgot"}>
              {" "}
              <p>forgot your password? Reset it</p>
            </Fogort>
            <Submit type="submit" onClick={(e) => login(e)}>
              {" "}
              Login{" "}
            </Submit>
          </RightContent>
        </Right>
      </Content>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 700px;
  border-radius: 20px;
  height: 450px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  background-color: #9300ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContent = styled.div`
  text-align: center;
  padding: 12px;
  color: #ffffff;
  margin-top: -50px;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  width: 150px;
`;

const Welcome = styled.h1`
  font-family: "Poppins";
  margin-bottom: 5px;
`;
const Text = styled.p`
  font-size: 13px;
  opacity: 0.9;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
`;

const RightContent = styled.div`
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c4c4c4;
`;

const Lock = styled(BiLockAlt)`
  font-size: 50px;
`;
const SignIn = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 90%;
  height: 35px;
  margin: 0 0 20px 0;
  border-radius: 20px;
  border: none;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  padding-left: 15px;
  outline: none;
  transition: 0.1s;

  &:hover {
    border: 2px solid #a649ea;
  }
`;

const Fogort = styled(Link)`
  cursor: pointer;
  margin-bottom: 15px;
  text-decoration: none;
  color: #c4c4c4;

  &:hover {
    color: #a649ea;
  }
`;

const Submit = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  background-color: #9300ff;
  color: white;

  &:hover {
    background-color: #a649ea;
  }
`;
