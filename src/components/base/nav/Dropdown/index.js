/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Dropdown } from "antd";
import style from "./style";

const Container = styled.div`
  position: absolute;
  background-color: ${props => props.theme.white};
  ${props => style.placement(props.placement, props.arrowable)};
  text-align: left;
  width: ${props => props.width};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)
`;

const Arrow = styled.div`
  position: absolute;
  display: inline-block;
  height: 0;
  width: 0;
  margin-left: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  ${props =>
    props.placement === "topLeft" ||
    props.placement === "topCenter" ||
    props.placement === "topRight"
      ? `border-top: 12px solid ${style.color(props.color)}`
      : `border-bottom: 12px solid ${style.color(props.color)}` 
  };
  ${props => style.arrow(props.placement)};
`;

const DropDown = props => {
  const { placement, children, overlay, width, arrowColor, arrowAble, ...other } = props;
  const menu = (
    <Container placement={placement} width={width} arrowable={arrowAble}>
      {arrowAble && <Arrow placement={placement} color={arrowColor} />}
      {overlay}
    </Container>
  );
  return (
    <Dropdown overlay={menu} placement={placement} {...other}>
      {children}
    </Dropdown>
  );
};

DropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func
  ]),
  disabled: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  placement: PropTypes.oneOf([
    "bottomLeft",
    "bottomCenter",
    "bottomRight",
    "topLeft",
    "topCenter",
    "topRight"
  ]),
  arrowAble: PropTypes.bool,
  arrowColor: PropTypes.oneOf([
    "brand",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger"
  ]),
  trigger: PropTypes.arrayOf(
    PropTypes.oneOf(["click", "hover", "contextMenu"])
  ),
  visible: PropTypes.bool,
  width: PropTypes.string,
  onVisibleChange: PropTypes.func
};

DropDown.defaultProps = {
  getPopupContainer: () => document.body,
  placement: "bottomLeft",
  trigger: ["hover"],
  width: "auto",
  arrowColor: "secondary",
  arrowAble: false,
};

export default DropDown;
