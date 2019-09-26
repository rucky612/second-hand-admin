import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";
import style from "./style";

const { TextArea } = Input;

const getBorderByState = props => {
  // noinspection JSUnresolvedVariable
  if (props.haserror) return style.borderError;
  return style.borderDefault;
};

const getHighlightBorderByState = props => {
  // noinspection JSUnresolvedVariable
  if (props.haserror) return style.borderError;
  if (props.disabled) return style.borderDefault;
  return style.borderFocus;
};

const CustomTextArea = styled(TextArea)`
  && {
    border: ${props => getBorderByState(props)} !important;
    :hover {
      border: ${props => getHighlightBorderByState(props)} !important;
    }

    :focus {
      box-shadow: none;
      border: ${props => getHighlightBorderByState(props)} !important;
    }
  }
`;

class SGTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { hasError, getNode, ...rest } = this.props;
    // Native DOM camelcase issues
    const haserror = hasError ? 1 : 0;
    return (
      <CustomTextArea
        ref={node => {
          if (getNode) getNode(node);
        }}
        haserror={haserror}
        {...rest}
      />
    );
  }
}

SGTextArea.propTypes = {
  hasError: PropTypes.bool,
  getNode: PropTypes.func,
  rows: PropTypes.number,
};

SGTextArea.defaultProps = {
  hasError: false,
  getNode: null,
  rows: 1,
};

export default SGTextArea;
