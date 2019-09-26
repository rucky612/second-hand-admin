/* eslint-disable react/require-default-props,react/prop-types */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import _isNaN from "lodash/isNaN"
import PropTypes from "prop-types";
import styled from "styled-components";
import { Breadcrumb, Icon } from "antd";
import breadcrumbNameMap from "../../../../constants/url-breadcomb-title";
import style from "./style";

const { Item } = Breadcrumb;

const CustomBreadCrumb = styled(Breadcrumb)`
  display: inline-block;
  width: auto;
  height: ${style.height};
  margin: 0;
  padding: 0;
  & .ant-breadcrumb-separator {
    margin: 0 12px;
  }
`;

const CustomIcon = styled(Icon)`
  &&:hover {
    color: ${props => props.theme.brand}
  }
`;

const SGBreadcrumb = props => {
  const { match, separator } = props;
  const pathSnippets = match.path.split("/").filter(i => !_isNaN(Number(i)) || i === "alert" ? false : i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const joinString = "/"
    const url = `/${pathSnippets.slice(0, index + 1).join(joinString)}`;
    const replaceIdUrl = url.replace("/detail", `/detail/${match.params.id}`);
    return breadcrumbNameMap[url] && (
      <Item key={url}>
        <Link to={replaceIdUrl}>{breadcrumbNameMap[url]}</Link>
      </Item>
    );
  });
  const breadcrumbItems = [
    <Item key="home">
      <Link to="/">
        <CustomIcon type="home" />
      </Link>
    </Item>
  ].concat(extraBreadcrumbItems);
  return (
    <CustomBreadCrumb separator={separator}>{breadcrumbItems}</CustomBreadCrumb>
  );
};

SGBreadcrumb.propTypes = {
  // eslint-disable-next-line
  itemRender: PropTypes.func,
  // eslint-disable-next-line
  params: PropTypes.object,
  // eslint-disable-next-line
  routes: PropTypes.arrayOf(PropTypes.object),
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object
  ])
};

SGBreadcrumb.defaultProps = {
  separator: "-"
};

export default withRouter(SGBreadcrumb);
