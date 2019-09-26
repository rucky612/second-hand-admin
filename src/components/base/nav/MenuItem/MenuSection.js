import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.li`
  margin-top: 20px;
  height: 40px;
  padding-left: 24px;
  padding-right: 24px;
  display: table;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  display: table-cell;
  color: ${props => props.theme.colorMenuIconNormal};
  vertical-align: middle;
`;

function MenuSection({ title }) {
  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
    </Container>
  );
}

MenuSection.propTypes = {
  title: PropTypes.string.isRequired
};

export default MenuSection;
