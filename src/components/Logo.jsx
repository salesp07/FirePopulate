import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 160px;
  height: auto;
`;

const Logo = () => {
  return <StyledImg src="./firebase-logo-blue.svg" alt="firebase-logo" />;
};

export default Logo;
