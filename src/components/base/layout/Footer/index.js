import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  padding: 0 30px;
  display: table;
  background: ${props => props.theme.colorWhite};
  height: ${props => props.theme.footerHeight};
  box-shadow: -2px -8px 41px -14px ${props => props.theme.colorDefaultShadow};
  width: 100%;
`;

const FooterTitle = styled.span`
  display: table-cell;
  vertical-align: middle;
  color: #a9a9aa;
  font-size: 1.2rem;
`;

function Footer() {
  return (
    <Container>
      <FooterTitle>2018 © testCop, Inc</FooterTitle>
    </Container>
  );
}

export default Footer;
