import React from "react";
import styled from "styled-components";
import { Menu } from "antd";

const { Divider } = Menu;

const CustomDivider = styled(Divider)`
  &&.ant-menu-item-divider {
    height: 0;
    margin: 15px 0;
    border-bottom: 1px solid ${props => props.theme.contentColor};
    overflow: unset;
  }
`;

const MenusDivider = props => <CustomDivider {...props} />;

export default MenusDivider;
