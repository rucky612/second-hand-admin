import React from "react";
import styled from "styled-components";
import style from "./style";

const Container = styled.div`
	margin-bottom: 2.2rem;
`;

const SectionTitle = styled.h3`
  color: ${style.colorSectionTitle};
  font-size: 1.7rem;
  font-weight: 700;
`;

// eslint-disable-next-line react/prop-types
function FormSection({ children }) {
  return (
    <Container>
      <SectionTitle>{children}</SectionTitle>
    </Container>
  );
}

FormSection.propTypes = {};

export default FormSection;
