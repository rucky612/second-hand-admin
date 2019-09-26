/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { darken } from "polished";
import style from "./style";

const CustomButton = styled(Button)`
  && {
    height: auto;
    border: 1px solid
      ${props =>
        props.bgcolor === "secondary"
          ? props.theme.paperBorderColor
          : style.color(props.bgcolor)};
    color: ${props => {
      if (props.outline) return style.color(props.bgcolor);
      if (props.bgcolor === "secondary") return props.theme.gray;
      if (props.bgcolor === "warning") return props.theme.black;
      return props.theme.white;
    }};
    box-shadow: none;
    cursor: pointer;
    background-color: ${props =>
      props.outline ? props.theme.white : style.color(props.bgcolor)};
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
    &:hover {
      color: ${props => {
        if (props.bgcolor === "secondary") return props.theme.gray;
        if (props.bgcolor === "warning") return props.theme.black;
        return props.theme.white;
      }};
      background-color: ${props =>
        props.outline
          ? style.color(props.bgcolor)
          : darken(0.1, style.color(props.bgcolor))};
      border-color: ${props =>
        props.outline
          ? style.color(props.bgcolor)
          : darken(0.1, style.color(props.bgcolor))};
    }
    &:focus {
      color: ${props => props.theme.white};
      background-color: ${props => darken(0.1, style.color(props.bgcolor))};
      border-color: ${props => darken(0.1, style.color(props.bgcolor))};
    }
    ${props => {
      switch (props.size) {
        case "small":
          return style.sm;
        case "large":
          return style.lg;
        case "default":
          return style.md;
        default:
          return style.md;
      }
    }}
  }
`;

class SGButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { outline, getNode, ...rest } = this.props;
    return (
      <CustomButton
        ref={node => {
          if (getNode) getNode(node);
        }}
        {...rest}
        outline={outline ? 1 : 0}
      />
    );
  }
}

SGButton.propTypes = {
  bgcolor: PropTypes.oneOf([
    "brand",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger"
  ]),
  size: PropTypes.oneOf(["large", "default", "small"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  htmlType: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      delay: PropTypes.number
    })
  ]),
  outline: PropTypes.bool,
  shape: PropTypes.oneOf(["circle", "default"]),
  block: PropTypes.bool,
  getNode: PropTypes.func
};

SGButton.defaultProps = {
  bgcolor: "brand",
  size: "default",
  disabled: false,
  ghost: false,
  htmlType: "button",
  loading: false,
  block: false,
  outline: false,
  onClick: () => {},
  getNode: null
};

export default SGButton;
