/* eslint-disable react/require-default-props,react/require-default-props */
import React, { Component } from "react";
import PropTypes from "prop-types";
import _isEqual from "lodash/isEqual";
import Table2 from "..";
import Input from "../../../data-entry/Input";
import Select from "../../../data-entry/Select";
import DatePicker from "../../../data-entry/DatePicker";
import Button from "../../../common/Button";
import FormItem from "../../../data-entry/FormItem";
import AsyncSelect from "../../../data-entry/Select/AsyncSelect";
import strings from "../../../../../localization/strings-common"

class RowRepeater extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      columnInfos: this.createColumns(props.columnInfos),
      changeCols: {},
      rows: [this.createEmptyRow()]
    };
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { columnInfos, changeColumn } = nextProps;
    // eslint-disable-next-line
    if (!_isEqual(columnInfos, this.props.columnInfos)) {
      this.setState({
        columnInfos: this.createColumns(columnInfos)
      });
    }
    // eslint-disable-next-line
    if (changeColumn && !_isEqual(changeColumn, this.props.changeColumn)) {
      const { changeCols } = this.state;
      this.setState({
        changeCols: {
          ...changeCols,
          [changeColumn.index]: [...changeColumn.cols]
        }
      });
    }
  }

  createEmptyRow = () => {
    const { columnInfos } = this.props;
    const emptyRow = {};
    columnInfos.forEach(columnInfo => {
      emptyRow[columnInfo.key] = "";
    });
    return emptyRow;
  };

  createColumns = colInfos => {
    const cols = colInfos.map((colInfo, i) => {
      if (i === 0) {
        this.colStartKey = colInfo.key;
      } else if (i === colInfos.length - 1) {
        this.colLastKey = colInfo.key;
      }

      return {
        ...colInfo,
        Header: colInfo.title,
        accessor: colInfo.key,
        sortable: false,
        Cell: cellInfo => {
          let finalCol = colInfo;
          if (this.state) {
            const { changeCols } = this.state;
            if (changeCols[cellInfo.index]) {
              finalCol = changeCols[cellInfo.index][i];
            }
          }
          return this.createCell(cellInfo, finalCol);
        },
      };
    });

    // Actions 컬럼 추가
    cols.push({
      Header: strings.COL_ACTION,
      accessor: "Action",
      maxWidth: 70,
      sortable: false,
      Cell: row => this.createDeleteButton(row.index)
    });

    return cols;
  };

  createDeleteButton = index => {
    const { disabled } = this.props;
    return (
      <Button
        disabled={index === 0 || disabled}
        size="small"
        bgcolor="danger"
        outline
        tabIndex={-1}
        onClick={() => {
          this.deleteRow(index);
        }}
      >
        삭제
      </Button>
    );
  };

  createCell = (cellInfo, colInfo) => {
    let component;
    const { index, column } = cellInfo;
    const { errors } = this.props;

    switch (colInfo.type) {
      case "input":
        component = this.createInputCell(cellInfo, colInfo);
        break;
      case "select":
        component = this.createSelectCell(cellInfo, colInfo);
        break;
      case "datePicker":
        component = this.createDatePickerCell(cellInfo, colInfo);
        break;
      default:
        component = this.createSelectCell(cellInfo, colInfo);
        break;
    }
    const message =
      errors && errors[index] && errors[index][column.id]
        ? errors[index][column.id]
        : "";
    const status =
      errors && errors[index] && errors[index][column.id] ? "error" : "success";

    return (
      <FormItem
        help={message}
        validateStatus={status}
        offsetTop={0}
        offsetBottom={0}
      >
        {component}
      </FormItem>
    );
  };

  createInputCell = (cell, colInfo) => {
    const { index, column } = cell;
    const { disabled, errors } = this.props;
    const hasError = !!(errors && errors[index] && errors[index][column.id]);
    return (
      <Input
        hasError={hasError}
        disabled={disabled || colInfo.disabled}
        onBlur={e => {
          e.preventDefault();
          const { value } = e.target;
          this.updateRow(index, column.id, value);
        }}
        onKeyDown={e => {
          this.handleTabKeyDown(e, column, index);
        }}
        getNode={node => {
          if (node && node.input) {
            this.handleNextElementFocus(node.input, column, index);
          }
        }}
      />
    );
  };

  createSelectCell = (cell, colInfo) => {
    const { index, column } = cell;
    const { disabled, errors } = this.props;
    const hasError = !!(errors && errors[index] && errors[index][column.id]);
    return colInfo.async && typeof colInfo.async === "function" ? (
      <AsyncSelect
        hasError={hasError}
        isDisabled={disabled || colInfo.disabled}
        loadOptions={colInfo.async}
        defaultOptions={colInfo.options}
        onChange={selected => {
          this.updateRow(index, column.id, selected);
        }}
        onKeyDown={e => {
          this.handleTabKeyDown(e, column, index);
        }}
        getNode={node => {
          if (node) {
            this.handleNextElementFocus(node, column, index);
          }
        }}
        {...colInfo.config}
      />
    ) : (
      <Select
        hasError={hasError}
        isDisabled={disabled || colInfo.disabled}
        options={colInfo.options}
        onChange={selected => {
          this.updateRow(index, column.id, selected);
        }}
        onKeyDown={e => {
          this.handleTabKeyDown(e, column, index);
        }}
        getNode={node => {
          if (node) {
            this.handleNextElementFocus(node, column, index);
          }
        }}
      />
    );
  };

  createDatePickerCell = cell => {
    const { index, column } = cell;
    const { disabled, errors } = this.props;
    const hasError = !!(errors && errors[index] && errors[index][column.id]);
    return (
      <DatePicker
        hasError={hasError}
        disabled={disabled}
        onChange={date => {
          this.updateRow(index, column.id, date);
        }}
        onKeyDown={e => {
          this.handleTabKeyDown(e, column, index);
        }}
        getNode={node => {
          if (node && node.input) {
            this.handleNextElementFocus(node.input, column, index);
          }
        }}
      />
    );
  };

  handleTabKeyDown = (e, column, index) => {
    if (column.id === this.colLastKey) {
      const { rows } = this.state;
      if (e.key === "Tab" && rows.length - 1 === index) {
        e.preventDefault();
        this.addRow();
        this.shouldFocusNext = true;
      }
    }
  };

  handleNextElementFocus = (element, column, index) => {
    // ref 의 컬럼 id가 첫번째 키일경우에만 포커스 대상이 된다.
    if (column.id === this.colStartKey) {
      if (element) {
        const { rows } = this.state;
        if (index === rows.length - 1 && this.shouldFocusNext) {
          element.focus();
          this.shouldFocusNext = false;
        }
      }
    }
  };

  addRow = () => {
    const { rows } = this.state;
    const { maxRepeatCount } = this.props;
    if (rows.length < maxRepeatCount) {
      this.setState({
        rows: [...rows, this.createEmptyRow()]
      });
    }
  };

  deleteRow = index => {
    const { rows } = this.state;
    this.setState({
      rows: rows.filter((row, i) => i !== index)
    });
  };

  updateRow = (index, key, value) => {
    const { rows } = this.state;
    const { onDataChange } = this.props;
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    this.setState(
      {
        rows: updatedRows
      },
      () => {
        if (onDataChange) onDataChange(rows, index, key);
      }
    );
  };

  render() {
    const { columnInfos, rows } = this.state;
    const { addButtonTitle, debugData, maxRepeatCount, disabled } = this.props;
    return (
      <div>
        <Table2
          disabled={disabled}
          formMode
          columns={columnInfos}
          data={rows}
          minRows={0}
          noDataText=""
          showPagination={false}
        />
        {rows.length < maxRepeatCount && !disabled && (
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <Button
              icon="plus"
              outline
              bgcolor="primary"
              onClick={() => {
                this.addRow();
              }}
            >
              {addButtonTitle}
            </Button>
          </div>
        )}

        {debugData && (
          <div>
            [
            {rows.map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i}>{`${JSON.stringify(row)},`}</p>
            ))}
            ]
          </div>
        )}
      </div>
    );
  }
}

const ColumnInfos = PropTypes.shape({
  title: PropTypes.string,
  key: PropTypes.string,
  type: PropTypes.oneOf(["input", "select"])
});

RowRepeater.propTypes = {
  disabled: PropTypes.bool,
  columnInfos: PropTypes.arrayOf(ColumnInfos),
  changeColumn: PropTypes.shape({
    cols: PropTypes.arrayOf(ColumnInfos),
    index: PropTypes.number
  }),
  addButtonTitle: PropTypes.string,
  debugData: PropTypes.bool,
  maxRepeatCount: PropTypes.number,
  onDataChange: PropTypes.func,
  // eslint-disable-next-line
  errors: PropTypes.array
};

RowRepeater.defaultProps = {
  onDataChange: null,
  disabled: false,
  maxRepeatCount: 20,
  debugData: false,
  columnInfos: [],
  errors: null,
  addButtonTitle: "추가하기"
};

export default RowRepeater;
