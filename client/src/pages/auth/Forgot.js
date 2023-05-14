import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

import logo from "../../asserts/images/logo.png";

const override = css`
  position: absolute;
  opacity: 1;
`;

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [resend, setResend] = useState("Send Link");
  const [loading, setLoading] = useState(false);

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

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:5000/forgot", {
        email,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setLoading(false);
          successMessage("Email was sent succefully !!");
          setEmail("");
          setResend("Resend Link");
        }
        if (res.data.status === "FAILED") {
          setLoading(false);
          errorMessage("Email was not sent succefully, Try again !!");
        }
        if (res.data.status === "NON") {
          setLoading(false);
          errorMessage("No user with this email, verify Email !!");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && (
        <HashLoader
          color={"#C278F8"}
          css={override}
          loading={loading}
          size={50}
        />
      )}
      <Content
        style={{
          opacity: loading && 0.4,
          pointerEvents: loading && "none",
        }}
      >
        <Link to={"/login"}>
          <BackIcon>Back to Login</BackIcon>
        </Link>
        <InnerContent>
          <Logo src={logo} alt="logo" />
          <Header>Forgot Your Password?</Header>
          <Discription>
            Enter your email below to receive a link to Reset your password
          </Discription>
          <InputContainer>
            <Input
              value={email}
              type="email"
              placeholder="email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <Button type="submit" onClick={(e) => sendEmail(e)}>
            {resend}
          </Button>
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

export default Forgot;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 350px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const InnerContent = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackIcon = styled.div`
  position: absolute;
  font-size: 16px;
  color: #c4c4c4;

  &:hover {
    color: #c278f8;
  }
`;

const Logo = styled.img`
  margin-bottom: 40px;
  width: 150px;
`;

const Header = styled.h1`
  font-size: 25px;
  font-family: "poppins";
  color: #c278f8;
  text-align: center;
  margin-bottom: 10px;
`;

const Discription = styled.p`
  font-size: 16px;
  text-align: center;
  color: #8f8f8f;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 35px;
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  overflow: hidden;
`;
const Input = styled.input`
  outline: none;
  height: 100%;
  width: 100%;
  font-size: 16px;
  border: none;
  padding: 0 10px;
`;

const Button = styled.button`
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  width: 90%;
  margin-top: 30px;
  color: #fff;
  border: none;
  border-radius: 8px;
  background-color: #c278f8;

  &:hover {
    background-color: #ae3fff;
  }
`;
