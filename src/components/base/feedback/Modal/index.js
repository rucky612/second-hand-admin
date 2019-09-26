/* eslint-disable react/forbid-prop-types */
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import _has from "lodash/has";
import { Modal } from "antd";
import SGButton from "../../common/Button";
import Icon from "../../common/Icon";
import style from "./style";

const BtnWrapper = styled.div`
  line-height: ${style.footerHeight}px;
`;

const MediaCss = css`
  @media only screen and (max-width: 1120px) {
    max-width: calc(100vw - 20px) !important;
  }
`;

const SGModal = styled(props => {
  const defaultFooter = _has(props, "footer") ? (
    props.footer
  ) : (
    <BtnWrapper>
      <SGButton onClick={props.onOk} {...props.okButtonProps}>
        {props.okText}
      </SGButton>
      <SGButton
        onClick={props.onCancel}
        bgcolor="secondary"
        {...props.cancelButtonProps}
      >
        {props.cancelText}
      </SGButton>
    </BtnWrapper>
  );
  return (
    <Modal
      icon={<Icon icon="power-off" />}
      {...props}
      bodyStyle={props.bodyStyle}
      footer={defaultFooter}
      width={props.width ? props.width : style.size(props.size)}
    />
  );
})`
  &.ant-modal {
    padding-bottom: 0;
    ${props => props.width !== "small" && MediaCss}
    .ant-modal-close {
      .ant-modal-close-x {
        width: ${style.closeHeight};
        height: ${style.closeHeight};
        line-height: ${style.closeHeight};
        font-size: ${style.titleFontSize};
      }
    }
    .ant-modal-header {
      padding: ${style.headerPadding};
      .ant-modal-title {
        display: table-cell;
        vertical-align: middle;
        height: ${style.headerHeight};
        color: inherit;
        font-size: ${style.titleFontSize};
        font-weight: 700;
      }
    }
    .ant-modal-body {
      max-height: calc(100vh - 265px);
      overflow-y: ${props => (props.tabAble ? "hidden" : "scroll")};
      padding: ${props => (props.tabAble ? "0" : style.padding)};
    }
    .ant-modal-footer {
      width: 100%;
      background-color: ${props => props.theme.white};
      height: ${style.footerHeight}px;
      padding: 0 ${style.padding};
    }
  }
`;

SGModal.propTypes = {
  tabAble: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(["large", "default", "small"]),
  zIndex: PropTypes.number,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  closable: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  afterClose: PropTypes.func,
  bodyStyle: PropTypes.object,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  forceRender: PropTypes.bool,
  getContainer: PropTypes.instanceOf("HTMLElement"),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  maskStyle: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okButtonProps: PropTypes.shape({
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
    block: PropTypes.bool
  }),
  cancelButtonProps: PropTypes.shape({
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
    block: PropTypes.bool
  })
};

SGModal.defaultProps = {
  okText: "확인",
  cancelText: "취소",
  tabAble: false,
  centered: true,
  size: "small",
  destroyOnClose: true
};

export default SGModal;
