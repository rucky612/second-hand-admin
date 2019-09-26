import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const TableDataWrapper = styled.div`
	display: flex;
	align-items: center;
  height: 100%;
  width: 100%;
`;

const TableDataContent = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function CustomTd({ toggleSort, className, children, ...rest }) {
  return (
    <div className={classNames("rt-td", className)} role="gridcell" {...rest}>
      <TableDataWrapper>
        <TableDataContent>{children}</TableDataContent>
      </TableDataWrapper>
    </div>
  );
}

CustomTd.propTypes = {};

export default CustomTd;
