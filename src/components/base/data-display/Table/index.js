/* eslint-disable react/no-array-index-key,react/require-default-props,react/destructuring-assignment */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _some from "lodash/some";
import _isEqual from "lodash/isEqual";
import TableCell from "../TableCell";
import Icon from "../../common/Icon";
import Pagination from "../../nav/Pagination";
import style from "./style";

const TableWrapper = styled.div`
  position: relative;
`;

const TableScrollAble = styled.div`
  overflow-x: hidden;
  overflow-y: ${props => (props.maxHeight === "none" ? "unset" : "auto")};
  max-height: ${props =>
    props.maxHeight === "none" ? "none" : props.maxHeight};
  margin-bottom: ${props => (props.dataLength ? "0" : style.marginBottom)};
`;

const CustomTable = styled.table`
  width: 100%;
  clear: both;
  border-spacing: 0;
  border: ${style.border};
  font-size: ${style.fontSize};
  table-layout: ${props => (props.tablefixed === 1 ? "fixed" : "none")};
`;

const TableBody = styled.tbody`
  max-height: ${style.bodyMaxHeight};
`;

const CustomRow = styled.tr`
  &:hover {
    td {
      background-color: ${style.hoverRowColor};
    }
  }
`;

const TableOptionsList = styled.ul`
  margin-bottom: 10px;
  text-align: right;
`;

const TableOptsItem = styled.li`
  display: inline-block;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
`;

const SortWrap = styled.div`
  position: absolute;
  top: 33%;
  right: ${style.sortRight};
  display: inline-block;
  width: ${style.sortWidth};
  height: ${style.sortWidth};
  float: right;
`;

const SortIcon = styled(Icon)`
  position: absolute;
  top: ${props => (props.top ? "-3px" : "3px")};
  right: 0;
`;

const NoDataAlert = styled.div`
  display: inline-block;
  width: 100%;
  height: ${style.alertHeight};
  border: ${style.alertBorder};
  text-align: center;
  line-height: 7;
  margin-bottom: ${style.alertMarginBottom};
`;

const HiddenSpan = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.current || 1,
      perPage: props.pageSize || props.defaultPageSize
    };
  }

  componentWillReceiveProps(nextProps) {
    const { current, data, pageSize, total } = nextProps;
    const { pageIndex, perPage } = this.state;
    const cloneData = [...this.props.data];
    const currPage = pageSize || perPage;
    if (this.checkTotalTypeNum()) {
      const maxPage = this.maxPage(total, currPage);
      const currIndex = current || pageIndex;
      const finalCurrent = this.checkCurrOverMax(maxPage, currIndex);
      if (!this.checkCurrent() && currIndex !== pageIndex) {
        this.setState({
          pageIndex: finalCurrent
        });
      }
      if (!this.checkPageSize() && pageSize !== perPage) {
        this.setState({
          perPage: pageSize,
          pageIndex: finalCurrent
        });
      }
      if (cloneData.length !== 0 && !_isEqual(data, cloneData)) {
        this.setState({
          pageIndex: finalCurrent
        });
      }
    }
  }

  maxPage = (max, pageSize) => Math.ceil(max / pageSize);

  checkTotalTypeNum = () => {
    const { total } = this.props;
    return typeof total === "number";
  };

  checkCurrOverMax = (max, curr) => (max >= curr ? curr : max);

  checkCurrent = () => {
    const { current } = this.props;
    return typeof current !== "number";
  };

  checkPageSize = () => {
    const { pageSize } = this.props;
    return typeof pageSize !== "number";
  };

  onMaxRowChange = value => {
    const { pageIndex } = this.state;
    const { onPageOptionChange, total } = this.props;
    onPageOptionChange(value);
    if (this.checkTotalTypeNum()) {
      const maxPage = this.maxPage(total, value);
      if (this.checkPageSize()) {
        this.setState({
          pageIndex: this.checkCurrOverMax(maxPage, pageIndex),
          perPage: value
        });
      }
    }
  };

  onPageChange = value => {
    const { onPageChange } = this.props;
    onPageChange(value);
    if (this.checkCurrent()) {
      this.setState({
        pageIndex: value
      });
    }
  };

  cursorPointer = sortFunc => (typeof sortFunc === "function" ? 1 : 0);

  onRowClick = (row, index) => {
    const { onRowSelect } = this.props;
    if (onRowSelect) {
      onRowSelect(row, index);
    }
  };

  onCellClick = (row, index) => {
    const { onCellSelect } = this.props;
    if (onCellSelect) {
      onCellSelect(row, index);
    }
  };

  renderColumn = () => {
    const { data, columns } = this.props;
    return columns.map((col, index) => (
      <TableCell
        key={index}
        type="th"
        onClick={() => col.sortAble && col.sortAble(data)}
        sort={this.cursorPointer(col.sortAble)}
        maxwidth={columns.length}
      >
        <HiddenSpan>
          {col.title}
          {col.sortAble && (
            <SortWrap>
              <SortIcon icon="la-sort-up" top />
              <SortIcon icon="la-sort-down" />
            </SortWrap>
          )}
        </HiddenSpan>
      </TableCell>
    ));
  };

  renderColSearch = () => {
    const { columns } = this.props;
    return _some(columns, "searchAble") ? (
      <tr>
        {columns.map((col, index) => (
          <TableCell key={index} type="th">
            {col.searchAble && col.searchAble(col)}
          </TableCell>
        ))}
      </tr>
    ) : null;
  };

  renderRow = () => {
    const { perPage, pageIndex } = this.state;
    const { data, sliceAble} = this.props;
    return data.map((row, index) =>
      !sliceAble ||
      (this.checkTotalTypeNum() &&
        (index + 1 <= perPage * pageIndex &&
          index + 1 > perPage * (pageIndex - 1))) ? (
            <CustomRow key={index} onClick={e => this.onRowClick(row, index, e)}>
              {this.renderCell(row, index)}
            </CustomRow>
      ) : null
    );
  };

  renderCell = (row, rowIndex) => {
    const { columns, onRowSelect, onCellSelect } = this.props;
    const checkCursor = (onRowSelect || onCellSelect) ? 1 : 0
    return columns.map((col, index) => (
      <TableCell
        key={index}
        onClick={e => this.onCellClick(row, rowIndex, e)}
        maxwidth={columns.length}
        cursor={checkCursor}
      >
        {this.renderCellData(col, row, rowIndex)}
      </TableCell>
    ));
  };

  renderCellData = (col, row, rowIndex) => {
    if (col.render) {
      return col.render(row, rowIndex);
    }
    if (
      typeof row[col.dataIndex] === "string" ||
      typeof row[col.dataIndex] === "number"
    ) {
      return <HiddenSpan>{row[col.dataIndex]}</HiddenSpan>;
    }
    return "null";
  };

  render() {
    const { perPage, pageIndex } = this.state;
    const {
      data,
      total,
      perPageOptions,
      maxHeight,
      tableFixed,
      pageDisable,
      headerOpts
    } = this.props;
    return (
      <TableWrapper>
        <TableOptionsList>
          {headerOpts.map((item, i) => (
            <TableOptsItem key={i}>{item}</TableOptsItem>
          ))}
        </TableOptionsList>
        <TableScrollAble maxHeight={maxHeight} dataLength={!data.length}>
          <CustomTable tablefixed={tableFixed ? 1 : 0}>
            <thead>
              <tr>{this.renderColumn()}</tr>
              {this.renderColSearch()}
            </thead>
            <TableBody>{this.renderRow()}</TableBody>
          </CustomTable>
        </TableScrollAble>
        {this.checkTotalTypeNum() && !data.length && (
          <NoDataAlert>No Data</NoDataAlert>
        )}
        {this.checkTotalTypeNum() && !pageDisable && (
          <Pagination
            total={total}
            current={pageIndex}
            defaultPageSize={Number(perPage)}
            pageSize={Number(perPage)}
            perPageOptions={perPageOptions}
            onOptionChange={this.onMaxRowChange}
            onChange={this.onPageChange}
          />
        )}
      </TableWrapper>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      searchAble: PropTypes.func
    })
  ),
  headerOpts: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ),
  sliceAble: PropTypes.bool,
  tableFixed: PropTypes.bool,
  pageDisable: PropTypes.bool,
  total: PropTypes.number.isRequired,
  current: PropTypes.number,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  onRowSelect: PropTypes.func,
  onCellSelect: PropTypes.func,
  onPageChange: PropTypes.func,
  onPageOptionChange: PropTypes.func
};

Table.defaultProps = {
  data: [],
  columns: [],
  sliceAble: false,
  tableFixed: false,
  pageDisable: false,
  headerOpts: [],
  defaultPageSize: 10,
  perPageOptions: [5, 10, 20],
  maxHeight: "none",
  onPageChange: () => {},
  onPageOptionChange: () => {}
};

export default Table;
