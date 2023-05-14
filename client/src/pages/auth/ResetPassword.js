import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const override = css`
  position: absolute;
  opacity: 1;
`;

const ResetPassword = () => {
  const params = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [linkValidity, setLinkValidity] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(params);
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

  useEffect(() => {
    VerifyLink();
  }, []);

  const VerifyLink = async () => {
    setLoading(true);
    await axios
      .get(
        `http://localhost:5000/reset-password/${params.email}/${params.token}`
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setLinkValidity(true);
          setLoading(false);
        }
        if (res.data.status === "NON") {
          errorMessage("404: invalid Link or Link Expired, retry !!");
          setLinkValidity(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        errorMessage(err);
        console.log(err);
        setLoading(false);
      });
  };

  const ResetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        `http://localhost:5000/reset-password/${params.email}/${params.token}`,
        {
          password,
          confirmPassword,
        }
      )
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          successMessage("Successfully changed");
          setLoading(false);

          //redirect to login after 5 seconds

          console.log(res.data);
        }
        if (res.data.status === "NON") {
          errorMessage("Credentials invalid, Try agian or start again");
          setLoading(false);
        }
        if (res.data.status === "PASS") {
          errorMessage("Password do not match!!");
          setLoading(false);
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
          opacity: loading || (!linkValidity && 0.4),
          pointerEvents: !linkValidity && "none",
        }}
      >
        <Link to={"/login"}>
          <BackIcon>Back to Login</BackIcon>
        </Link>
        <InnerContent>
          <Header>Reset Password</Header>
          <Discription>
            To reset your password please fill the field below and click reset
          </Discription>
          <InputContainer>
            <Input
              value={password}
              type="password"
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              value={confirmPassword}
              type="password"
              placeholder="confirm password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputContainer>
          <Button type="submit" onClick={(e) => ResetEmail(e)}>
            Reset Password
          </Button>
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

export default ResetPassword;

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

  & > h5 {
    text-align: left;
  }
`;

const BackIcon = styled.div`
  position: absolute;
  font-size: 16px;
  color: #c4c4c4;

  &:hover {
    color: #c278f8;
  }
`;

const Header = styled.h1`
  font-size: 28px;
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
  margin-bottom: 10px;
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
  font-size: 14px;
  border: none;
  padding: 0 10px;
`;

const Button = styled.button`
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  width: 90%;
  margin-top: 20px;
  color: #fff;
  border: none;
  border-radius: 8px;
  background-color: #c278f8;

  &:hover {
    background-color: #ae3fff;
  }
`;
