/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import styled from "styled-components";

const { TabPane } = Tabs;

const CustomTab = styled(TabPane)``;

const Tab = props => <CustomTab {...props} />;

Tab.propTypes = {
  forceRender: PropTypes.bool,
  tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Tab.defaultProps = {
  forceRender: true,
};
export default Tab;
