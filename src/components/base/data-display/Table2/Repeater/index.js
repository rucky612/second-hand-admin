import React, { Component } from "react";
import PropTypes from "prop-types";
import Table2 from "..";
import Input from "../../../data-entry/Input";
import TextArea from "../../../data-entry/TextArea";
import Select from "../../../data-entry/Select";
import DatePicker from "../../../data-entry/DatePicker";
import Button from "../../../common/Button";
import FormItem from "../../../data-entry/FormItem";

class TableRepeater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.createColumns(props.columnInfos),
      rows: [this.createEmptyRow()]
    };
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
    const columns = colInfos.map((colInfo, i) => {
      if (i === 0) {
        this.colStartKey = colInfo.key;
      } else if (i === colInfos.length - 1) {
        this.colLastKey = colInfo.key;
      }
      return {
        Header: colInfo.title,
        accessor: colInfo.key,
        sortable: false,
        Cell: cellInfo => this.createCell(cellInfo, colInfo)
      };
    });

    // Actions 컬럼 추가
    columns.push({
      Header: "액션",
      maxWidth: 70,
      sortable: false,
      Cell: ({ index }) => this.createDeleteButton(index)
    });

    return columns;
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
        component = this.createInputCell(cellInfo);
        break;
      case "select":
        component = this.createSelectCell(cellInfo, colInfo);
        break;
      case "datePicker":
        component = this.createDatePickerCell(cellInfo);
        break;
      case "textArea":
        component = this.createTextAreaCell(cellInfo);
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

  createInputCell = cell => {
    const { index, column } = cell;
    const { disabled, errors } = this.props;
    const hasError = !!(errors && errors[index] && errors[index][column.id]);
    return (
      <Input
        hasError={hasError}
        disabled={disabled}
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
    return (
      <Select
        hasError={hasError}
        isDisabled={disabled}
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

  createTextAreaCell = cell => {
    const { index, column } = cell;
    const { disabled, errors } = this.props;
    const hasError = !!(errors && errors[index] && errors[index][column.id]);
    return (
      <TextArea
        hasError={hasError}
        disabled={disabled}
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
        if (onDataChange) onDataChange(rows);
      }
    );
  };

  render() {
    const { columns, rows } = this.state;
    const { addButtonTitle, debugData, maxRepeatCount, disabled } = this.props;
    return (
      <div>
        <Table2
          disabled={disabled}
          formMode
          columns={columns}
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
  type: PropTypes.oneOf(["input", "datePicker", "select", "textArea"])
});

TableRepeater.propTypes = {
  disabled: PropTypes.bool,
  columnInfos: PropTypes.arrayOf(ColumnInfos),
  addButtonTitle: PropTypes.string,
  debugData: PropTypes.bool,
  maxRepeatCount: PropTypes.number,
  onDataChange: PropTypes.func,
  // eslint-disable-next-line
  errors: PropTypes.array
};

TableRepeater.defaultProps = {
  onDataChange: null,
  disabled: false,
  maxRepeatCount: 5,
  debugData: false,
  columnInfos: [],
  errors: null,
  addButtonTitle: "추가하기"
};

export default TableRepeater;
