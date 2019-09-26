/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import styled, { css } from "styled-components";
import Tab from "../Tabs/Tab";
import style from "./style"

const activeBorder = css`
  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    bottom: 1px;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.brand};
  }
`;

const CustomTabs = styled(Tabs)`
  && {
    background-color: ${props => props.theme.white};
    border-radius: 4px;
    box-shadow: ${props => props.minHeight !== "auto" ? "none" : `0 1px 15px 1px rgba(69, 65, 78, 0.08)`};
    min-width: ${style.minWidth};
    overflow: visible;
    .ant-tabs-bar.ant-tabs-top-bar {
      margin-bottom: 0;
    }
    .ant-tabs-extra-content {
      line-height: ${style.height};
      padding-right: ${style.padding};
    }
    .ant-tabs-nav {
      .ant-tabs-ink-bar {
        display: none !important;
        opacity: 0;
      }
      .ant-tabs-tab {
        font-size: ${style.fontSize};
        padding: 0;
        transition: none;
        height: ${style.height};
        line-height: 4.6;
        margin: 0 30px 0 5px;
        &:first-child {
          margin: 0 30px 0 2.86rem;
        }
        &:hover {
          color: ${props => props.theme.brand};
          &:not(.ant-tabs-tab-active) {
            ${activeBorder}
          }
        }
      }
      .ant-tabs-tab-active {
        ${activeBorder};
        font-weight: 700;
      }
    }
    .ant-tabs-content {
      padding: 2.86rem;
      height: ${props => props.minHeight};
      overflow-y: ${props => props.minHeight !== "auto" ? "scroll" : "inherit"}
    }
  }
`;

class PaperTabs extends Component {
  static Tab = Tab;

  render() {
    return <CustomTabs {...this.props} />;
  }
}

PaperTabs.propTypes = {
  activeKey: PropTypes.string,
  minHeight: PropTypes.string,
  animated: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      inkBar: PropTypes.bool,
      tabPane: PropTypes.bool
    })
  ]),
  renderTabBar: PropTypes.func,
  defaultActiveKey: PropTypes.string,
  hideAdd: PropTypes.bool,
  size: PropTypes.oneOf(["large", "default", "small"]),
  tabBarExtraContent: PropTypes.node,
  tabBarGutter: PropTypes.number,
  tabBarStyle: PropTypes.object,
  tabPosition: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  type: PropTypes.oneOf(["line", "card", "editable-card"]),
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onTabClick: PropTypes.func
};

PaperTabs.defaultProps = {
  animated: false,
  minHeight: "auto",
};

export default PaperTabs;
