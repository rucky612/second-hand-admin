import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import style from "./style";

const CustomBadge = styled.span`
  display: inline-block;
  padding: 0px 10px;
  line-height: 20px;
  min-height: 20px;
  min-width: 20px;
  font-size: 1.04rem;
  vertical-align: middle;
  text-align: center;
  letter-spacing: 0.6px;
  border-radius: 4px;
  background-color: ${props => style.color(props.color)};
  color: ${props => {
    if (props.color === "white" || props.color === "waring") return "inherit";
    return props.theme.white;
  }};
`;

const Badge = props => {
  const { children, ...other } = props;
  return <CustomBadge {...other}>{children}</CustomBadge>;
};

Badge.propTypes = {
  color: PropTypes.oneOf([
    "brand",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger"
  ]),
  size: PropTypes.oneOf(["large", "default", "small"]),
  type: PropTypes.oneOf(['basic', 'wide', 'dot', 'round']),
};

Badge.defaultProps = {
  color: "brand",
  size: "default",
  type: 'round'
};

export default Badge;
