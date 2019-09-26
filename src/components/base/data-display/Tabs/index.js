/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import styled, { css } from "styled-components";
import Tab from "./Tab";

const activeBorder = css`
  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    bottom: 1px;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.primary};
  }
`;

const CustomTabs = styled(Tabs)`
  & {
    .ant-tabs-bar.ant-tabs-top-bar {
      margin-bottom: 25px;
    }
    .ant-tabs-nav {
      .ant-tabs-ink-bar {
        display: none !important;
        opacity: 0;
      }
      .ant-tabs-tab {
        font-size: 1.43rem;
        font-weight: 500;
        padding: 12px 0;
        transition: none;
        margin: 0 30px 0 5px;
        &:first-child {
          margin: 0 30px 0 0;
        }
        &:last-child {
          margin: 0 0 0 5px;
        }
        &:hover {
          &:not(.ant-tabs-tab-disabled) {
            color: ${props => props.theme.primary};
            &:not(.ant-tabs-tab-active) {
              ${activeBorder}
            }
          }
        }
      }
      .ant-tabs-tab-active {
        ${activeBorder}
      }
    }
  }
`;

class SGTabs extends Component {
  static Tab = Tab;

  render() {
    return <CustomTabs {...this.props} />;
  }
}

SGTabs.propTypes = {
  activeKey: PropTypes.string,
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

SGTabs.defaultProps = {
  animated: false
};

export default SGTabs;
