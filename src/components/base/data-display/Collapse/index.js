import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomCollapse = styled.div`
  width: 100%;
  overflow: hidden;
  max-height: ${props => props.maxHeight};
  visibility: visible;
  transition: ${props => props.theme.collapseTransition};
  &.hidden {
    max-height: 0 !important;
    visibility: hidden !important;
  }
`;

const Collapse = props => {
  const { children, isOpen, maxHeight, ...rest } = props;
  return (
    <CustomCollapse
      {...rest}
      open={isOpen}
      maxHeight={maxHeight}
      className={isOpen ? "" : "hidden"}
    >
      {children}
    </CustomCollapse>
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool,
  maxHeight: PropTypes.string
};

Collapse.defaultProps = {
  isOpen: false,
  maxHeight: "100px"
};

export default Collapse;
