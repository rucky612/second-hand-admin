/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Icon } from "antd";
import style from "./style";

const SortContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
`;

const SortIcon = styled(Icon)`
  display: block !important;
  color: ${props =>
    props.enabled ? style.colorSortEnabled : style.colorSortDisabled};
  font-size: 1rem;
`;

function CustomTh({ toggleSort, className, children, ...rest }) {
  const sortable = className.indexOf("-cursor-pointer") !== -1;
  const sortAsc = className.indexOf("-sort-asc") !== -1 ? 1 : 0;
  const sortDesc = className.indexOf("-sort-desc") !== -1 ? 1 : 0;

  return (
    <div
      className={classNames("rt-th", className)}
      onClick={e => {
        if (toggleSort) {
          toggleSort(e);
        }
      }}
      role="columnheader"
      tabIndex="-1" // Resolves eslint issues without implementing keyboard navigation incorrectly
      {...rest}
    >
      {sortable && (
        <SortContainer>
          <SortIcon type="caret-up" theme="filled" enabled={sortAsc} />
          <SortIcon
            type="caret-down"
            theme="filled"
            style={{ marginTop: "-2px" }}
            enabled={sortDesc}
          />
        </SortContainer>
      )}
      {children}
    </div>
  );
}

CustomTh.propTypes = {};

export default CustomTh;
