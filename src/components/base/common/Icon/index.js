import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import style from "./style"

const IconWrapper = styled.i`
  display: ${props => props.display};
  vertical-align: middle;
  text-align: ${props => props.align};
  width: ${props => props.width};
  font-size: ${props => props.size};
  color: inherit;
  & > svg {
    width: ${style.svgWidth};
  }
`;

const Icon = props => {
  const {
    icon,
    display,
    align,
    size,
    width,
    iconStyle,
    renderIcon,
    className,
    ...rest
  } = props;
  return renderIcon || (
    <IconWrapper
      {...rest}
      className={`${icon} ${className}`}
      display={display}
      align={align}
      size={size}
      width={width}
      style={iconStyle}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  display: PropTypes.string,
  align: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  // eslint-disable-next-line
  renderIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  // eslint-disable-next-line
  iconStyle: PropTypes.object
};

Icon.defaultProps = {
  icon: "",
  display: "inline-block",
  align: "left",
  size: style.fontSize,
  width: "auto"
};

export default Icon;
