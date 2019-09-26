import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";
import style from "../Select/style";

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

const CustomInput = styled(Input)`
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

class SGInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getNode, hasError, ...rest } = this.props;
    return (
      <CustomInput
        haserror={hasError ? 1 : 0}
        ref={node => {
          getNode(node);
        }}
        {...rest}
      />
    );
  }
}

SGInput.propTypes = {
  getNode: PropTypes.func,
  label: PropTypes.string,
  hasError: PropTypes.bool
};

SGInput.defaultProps = {
  getNode: () => {},
  label: "",
  hasError: false
};

export default SGInput;
