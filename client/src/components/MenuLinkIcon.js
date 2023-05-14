import React from "react";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

const MenuLinkIcon = ({ Name, Icon, Active, onClick, path }) => {

  return (
    <LinkContainer onClick={onClick} to={path}>
      <LinkIcon style={{ color: Active ? '#C278F8' : '#787B85' }}> <Icon /> </LinkIcon>
      <Link style={{ color: Active ? '#C278F8' : '#787B85' }}> {Name}</Link>
    </LinkContainer>
  );
};

export default MenuLinkIcon;

const LinkContainer = styled(LinkR)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  text-decoration:none ;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
`;

const LinkIcon = styled.div`
margin-right: 10px;
font-size: 18px;
font-weight: 500;
`;

const Link = styled.h1`
font-size: 16px;
font-weight: 700;
`;
