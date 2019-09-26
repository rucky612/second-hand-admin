import React from "react";
import styled from "styled-components";
import Button from "../Button";

const CustomButton = styled(Button)`
  && {
    padding: 0.9rem 2.6rem;
    font-size: 1.3rem;
    border-radius: 0.325rem;
  }
`;

const PaperAction = ({ children, ...rest }) => (
  <CustomButton bgcolor="primary" {...rest}>
    {children}
  </CustomButton>
);

export default PaperAction;
