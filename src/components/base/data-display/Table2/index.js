import ReactTable from "react-table";
import styled from "styled-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import _isEqual from "lodash/isEqual";
import _findIndex from "lodash/findIndex";
import { Checkbox } from "antd";
import Pagination from "./Pagination";
import Loading from "./Loading";
import style from "./style";
import CustomTh from "./CustomTh";
import CustomTd from "./CustomTd";

/**
 * @link https://react-table.js.org/#/story/readme
 */

const getHoverColor = props => {
  if (props.disabled) return style.colorTableRowHover;
  return props.formMode ? style.colorTableRow : style.colorTableRowHover;
};

const CustomTable = styled(ReactTable)`
  border: none;

  & {
    .rt-resizer {
      width: 12px;
      right: -6px;
    }
    .rt-table {
      border-top: ${style.borderDefault};
      border-left: ${style.borderDefault};
      border-collapse: inherit;
    }
    .rt-tbody {
      overflow: visible;
    }
    .rt-thead {
      .rt-th {
        border-right: ${style.borderDefault} !important;
        padding: ${props =>
          `${props.columnVerticalPadding}px ${
            props.columnHorizontalPadding
          }px`};
        text-align: left;
        font-size: 1.3rem;
        font-weight: 700;
        color: ${style.colorColumnText};
        overflow: visible;
      }
    }
    .-sort-asc {
      box-shadow: none !important;
    }
    .-sort-desc {
      box-shadow: none !important;
    }

    .-header {
      box-shadow: none !important;
      border-bottom: ${style.borderColumnBottom};
      border-right: ${style.borderDefault};
      padding-right: ${props =>
        props.style && props.style.height ? "14px" : "0"};
    }
    .-filters {
      border-right: ${style.borderDefault};
      padding-right: ${props =>
        props.style && props.style.height ? "14px" : "0"};
    }

    .rt-tr-group {
      border-bottom: ${style.borderDefault} !important;
      background-color: ${props =>
        props.disabled ? style.colorTableRowHover : style.colorTableRow};
      :hover {
        background-color: ${props => getHoverColor(props)};
        cursor: ${props => (props.pointerCursor ? "pointer" : "initial")};
      }
    }

    .rt-tr {
      align-items: stretch;
    }

    .rt-td {
      color: ${style.colorColumnText};
      border-right: ${style.borderDefault} !important;
      padding: 10px 10px;
      font-size: 1.3rem;
      overflow: ${props => props.formMode && "visible"};
      min-height: ${style.tableDataMinHeight};
    }
  }
`;

const CheckboxCenter = styled(Checkbox)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

class SGTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      selection: []
    };
  }

  componentDidMount() {
    const { columns } = this.props;
    this.setState({
      cols: columns
    });
  }

  componentWillReceiveProps(nextProps) {
    const { cols } = this.state;
    if (!_isEqual(nextProps.columns, cols)) {
      this.setState({
        cols: nextProps.columns
      });
    }
    if (nextProps.checkboxAble && !this.hasCheckboxType(nextProps.columns)) {
      let rowData = [];
      this.setState({
        cols: [
          {
            Header: ({ data }) => {
              rowData = data;
              return "선택";
            },
            accessor: "checkboxType",
            Cell: ({ original }) => (
              <CheckboxCenter
                checked={this.isSelected(original, nextProps.selectKey)}
                onChange={() =>
                  this.toggleSelection(original, nextProps.selectKey)
                }
              />
            ),
            Filter: () => {
              const checkAll =
                rowData.length !== 0 &&
                this.isSelectedAll(rowData, nextProps.selectKey);
              return (
                <CheckboxCenter
                  checked={checkAll}
                  onChange={() => this.toggleAll(rowData, nextProps.selectKey)}
                />
              );
            },
            width: 48,
            justifyContent: "center",
            sortable: false
          },
          ...nextProps.columns
        ]
      });
    }
  }

  hasCheckboxType = cols => cols.some(col => col.accessor === "checkboxType");

  isSelectedAll = (data, key) => {
    const { selection } = this.state;
    return data.every(
      ({ _original }) => _findIndex(selection, [key, _original[key]]) !== -1
    );
  };

  isSelected = (row, key) => {
    const { selection } = this.state;
    return _findIndex(selection, [key, row[key]]) !== -1;
  };

  getSelectionItem = (prevSelects, row, key, checkAll) => {
    let selection = [...prevSelects];
    const keyIndex = _findIndex(selection, [key, row[key]]);
    if (keyIndex < 0) {
      selection.push(row);
    } else if (keyIndex >= 0 && checkAll) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    }
    return selection;
  };

  toggleSelection = (row, key) => {
    const { getCheckboxProps } = this.props;
    const selection = this.getSelectionItem(
      // eslint-disable-next-line
      this.state.selection,
      row,
      key,
      true
    );
    getCheckboxProps(selection);
    this.setState({ selection });
  };

  toggleAll = (data, key) => {
    const { getCheckboxProps } = this.props;
    // eslint-disable-next-line
    let selection = [...this.state.selection];
    const checkAll = this.isSelectedAll(data, key);
    data.forEach(({ _original }) => {
      selection = this.getSelectionItem(selection, _original, key, checkAll);
    });
    getCheckboxProps(selection);
    this.setState({ selection });
  };

  render() {
    const {
      columns,
      noDataText,
      style,
      pointerCursor,
      manual,
      loading,
      toggleSort,
      className,
      ...rest
    } = this.props;
    const { cols } = this.state;
    const LoadingComponent = () => <Loading loading={loading} />;

    return (
      <CustomTable
        className={className}
        toggleSort={toggleSort}
        loading={loading}
        manual={manual}
        pointerCursor={pointerCursor}
        style={style}
        PaginationComponent={Pagination}
        columns={cols}
        noDataText={noDataText}
        LoadingComponent={LoadingComponent}
        TdComponent={CustomTd}
        ThComponent={CustomTh}
        // TableComponent={(props) => {
        //   console.log(props)
        //   return (
        //     <div className="test">
        //       {props.children}
        //     </div>
        //   )
        // }}
        // getTableProps={(com) => {
        //   console.log(com.TableComponent())
        //   return {};
        // }}
        {...rest}
      />
    );
  }
}

const Cell = PropTypes.shape({
  // Renderer
  Cell: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Aggregated: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Pivot: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  PivotValue: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Expander: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  // All Columns
  sortable: PropTypes.bool, // use table default
  resizable: PropTypes.bool, // use table default
  filterable: PropTypes.bool, // use table default
  show: PropTypes.bool,
  minWidth: PropTypes.number,

  // Cells only
  className: PropTypes.string,
  style: PropTypes.object,
  getProps: PropTypes.func,

  // Pivot only
  aggregate: PropTypes.func,

  // Headers only
  headerClassName: PropTypes.string,
  headerStyle: PropTypes.object,
  getHeaderProps: PropTypes.func,

  // Footers only
  footerClassName: PropTypes.string,
  footerStyle: PropTypes.object,
  getFooterProps: PropTypes.object,
  filterMethod: PropTypes.func,
  filterAll: PropTypes.bool,
  sortMethod: PropTypes.func
});

SGTable.propTypes = {
  columns: PropTypes.arrayOf(Cell).isRequired,
  // Styling Props
  columnVerticalPadding: PropTypes.number,
  columnHorizontalPadding: PropTypes.number,
  noDataText: PropTypes.string,
  pointerCursor: PropTypes.bool,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  data: PropTypes.array,
  manual: PropTypes.bool,
  showPagination: PropTypes.bool,
  formMode: PropTypes.bool,
  disabled: PropTypes.bool,
  checkboxAble: PropTypes.bool,
  // eslint-disable-next-line
  selectKey: PropTypes.string,
  getCheckboxProps: PropTypes.func
};

SGTable.defaultProps = {
  columnVerticalPadding: 10,
  columnHorizontalPadding: 10,
  noDataText: "데이터가 없습니다",
  pointerCursor: false,
  loading: false,
  data: [],
  manual: false,
  showPagination: true,
  formMode: false,
  disabled: false,
  checkboxAble: false,
  selectKey: "id",
  getCheckboxProps: () => {}
};

export default SGTable;
