/* eslint-disable react/require-default-props */
import React from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Menu } from "antd";
import Icon from "../../../common/Icon";
import Badge from "../../../common/Badge";

const { Item } = Menu;

const CustomItem = styled(Item)`
  &&&.ant-menu-item {
    margin: 0;
    padding: 0;
    line-height: 1;
    height: auto;
    font-size: ${props => props.size}rem;
    &.ant-menu-item-selected {
      background-color: transparent;
    }
  }
`;
const TableCss = css`
  display: table;
  width: 100%;
  height: 100%;
`;

const CellCss = css`
  display: table-cell;
  height: 100%;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  line-height: 0;
`;

const ItemLink = styled(Link)`
  && {
    ${TableCss};
    table-layout: fixed;
    position: relative;
    text-decoration: none;
    outline: none !important;
    vertical-align: middle;
    padding: 9px 0;
  }
`;

const ItemContent = styled.div`
  ${CellCss};
  width: 100%;
`;

const TextWrap = styled.div`
  ${TableCss}
`;

const ItemText = styled.span`
  ${CellCss};
  width: 100%;
  font-size: inherit;
`;

const BadgeWrap = styled.div`
  ${CellCss};
  font-size: inherit;
`;

const DefautItem = (text, badge, icon, size, link = "#") => (
  <ItemLink to={link}>
    {icon && (
      <Icon
        icon={icon}
        display="table-cell"
        size={`${size + 0.5}rem`}
        width="35px"
      />
    )}
    <ItemContent>
      <TextWrap>
        <ItemText>{text}</ItemText>
        {badge && (
          <BadgeWrap>
            <Badge>{badge}</Badge>
          </BadgeWrap>
        )}
      </TextWrap>
    </ItemContent>
  </ItemLink>
);

const MenusItem = props => {
  const { children, contentText, badgeText, icon, size, link, ...other } = props;
  return (
    <CustomItem size={size} {...other}>
      {children || DefautItem(contentText, badgeText, icon, size, link)}
    </CustomItem>
  );
};

MenusItem.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.number,
  contentText: PropTypes.string,
  badgeText: PropTypes.string,
  link: PropTypes.string,
};

MenusItem.defaultProps = {
  disabled: false,
  size: 1.56
};

export default MenusItem;
