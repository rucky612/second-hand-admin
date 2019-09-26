/* eslint-disable no-nested-ternary */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import style from "./style";

const CustomCell = styled(props => {
  switch (props.type) {
    case "td":
      return <td {...props} />;
    case "th":
      return <th {...props} />;
    default:
      return null;
  }
})`
  padding: ${props => (props.sort === 1 ? style.sortPadding : style.padding)};
  padding-bottom: ${props => props.type === "th" ? ".875rem" : style.padding};
  text-align: inherit;
  cursor: ${props =>
    props.type === "th"
      ? props.sort === 1
        ? "pointer"
        : "default"
      : props.cursor === 1
      ? "pointer"
      : "default"};
  position: relative;
  height: ${props => props.type === "th" ? "44px" : "41px"};
  vertical-align: middle;
  border: ${style.border};
  border-bottom: ${props => (props.type === "th" ? style.borderBottom : "")};
  font-weight: ${props => (props.type === "th" ? "700" : "500")};
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc((100vw - 398px) / ${props => props.maxwidth});
`;

const TableCell = props => <CustomCell {...props} />;

TableCell.propTypes = {
  type: PropTypes.string,
  maxwidth: PropTypes.number,
  cursor: PropTypes.number
};

TableCell.defaultProps = {
  type: "td",
  maxwidth: 1,
  cursor: 0,
};

export default TableCell;
