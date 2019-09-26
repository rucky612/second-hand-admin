/* eslint-disable react/require-default-props */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";
import style from "./style";
import Icon from "../../common/Icon";

const slideUp = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ClosingCss = css`
  animation: ${slideUp} 0.15s linear;
`;

const ClosedCss = css`
  display: none;
`;

const CustomAlerts = styled.div`
  position: relative;
  display: ${props => (props.icon ? "table" : "block")};
  margin-bottom: 1.3rem;
  color: ${props => {
    if (props.outline) {
      return props.color ? style.color(props.color) : "inherit";
    }
    if (props.color === !"warning") {
      return props.theme.white;
    }
    return "inherit";
  }};
  border: 1px solid
    ${props =>
      !props.color && props.outline
        ? props.theme.gray
        : style.color(props.color)};
  background-color: ${props =>
    props.outline ? props.theme.white : style.color(props.color)};
  padding: 0;
  transition: animation 0.15s linear;
  ${props => props.closing && ClosingCss}
  ${props => props.closed && ClosedCss}
`;

const IconWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 1.45rem 0.5rem 1.45rem 1.75rem;
  line-height: 0;
  width: 1%;
`;

const TextWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: auto;
  padding: 1.45rem 1.25rem;
`;

const ActionsWrap = styled.div`
  width: auto;
  display: table-cell;
  vertical-align: middle;
  text-align: right;
  padding: 1.45rem 1.75rem 1.45rem 1.25rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem 1.25rem;
  background-color: transparent;
  border: 0;
  color: ${props => (props.color ? style.color(props.color) : "inherit")}
  cursor: pointer;
  -webkit-appearance: none;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;

class Alerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false
    };
  }

  onClickClose = e => {
    const { onClose } = this.props;
    onClose && onClose(this.alertRef);
    this.setState({
      closing: true
    });
  };

  animationEnd = () => {
    this.setState({
      closed: true
    });
  };

  render() {
    const { closing, closed } = this.state;
    const { icon, action, strong, text, ...other } = this.props;
    return (
      <CustomAlerts
        ref={r => {
          this.alertRef = r;
        }}
        {...other}
        closing={closing}
        closed={closed}
        onAnimationEnd={this.animationEnd}
      >
        {icon && (
          <IconWrap>
            <Icon icon={icon} size="20px" />
          </IconWrap>
        )}
        <TextWrap>
          <strong>{strong}</strong>
          {text}
        </TextWrap>
        <ActionsWrap>
          {typeof action === "function" ? action() : action}
          {!action && (
            <CloseBtn onClick={this.onClickClose}>
              <Icon icon="la la-close" size="1.56rem" />
            </CloseBtn>
          )}
        </ActionsWrap>
      </CustomAlerts>
    );
  }
}

Alerts.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string
  ]),
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string
  ]),
  strong: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.oneOf([
    "brand",
    "primary",
    "success",
    "info",
    "warning",
    "danger"
  ]),
  outline: PropTypes.bool,
  onClose: PropTypes.func
};

Alerts.defaultProps = {
  icon: ""
};

export default Alerts;
