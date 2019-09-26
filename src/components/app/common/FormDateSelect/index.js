import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import FormItem from "../../../base/data-entry/FormItem";
import SGSelect from "../../../base/data-entry/Select";
import commonStrings from "../../../../localization/strings-common";
import * as utils from "../../utils";

class FormDateSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectYears: null,
      selectMonth: null,
      selectDate: null
    };
  }

  setStateChange = state => {
    this.setState(
      {
        ...state
      },
      this.onDateChange
    );
  };

  checkDateMaxChange = (year, month) => {
    const { selectDate } = this.state;
    if (selectDate && month) {
      const nowDate = Number(selectDate);
      const dateMax = utils.getDaysOpts(year, month).length;
      if (nowDate > dateMax) {
        this.setState({
          selectDate: dateMax
        });
      }
    }
  };

  setYear = option => {
    const { selectYears, selectMonth } = this.state;
    if (!option) {
      this.setStateChange({
        selectYears: null
      });
    }
    if (option && option.value && selectYears !== option.value) {
      this.checkDateMaxChange(option.value, selectMonth);
      this.setStateChange({
        selectYears: option.value
      });
    }
  };

  setMonth = option => {
    const { selectYears, selectMonth } = this.state;
    if (!option) {
      this.setStateChange({
        selectMonth: null
      });
    }
    if (option && option.value && selectMonth !== option.value) {
      this.checkDateMaxChange(selectYears, option.value);
      this.setStateChange({
        selectMonth: option.value
      });
    }
  };

  setDate = option => {
    const { selectDate } = this.state;
    if (!option) {
      this.setStateChange({
        selectDate: null
      });
    }
    if (option && option.value && selectDate !== option.value) {
      this.checkDateMaxChange(selectDate, option.value);
      this.setStateChange({
        selectDate: option.value
      });
    }
  };

  onDateChange = () => {
    const { selectYears, selectMonth, selectDate } = this.state;
    const { onDateChange, formProps } = this.props;
    const { setFieldValue } = formProps;
    let date = null;
    if (selectYears && selectMonth && selectDate) {
      date = new Date(selectYears, selectMonth, selectDate);
      setFieldValue("productionDate", date);
    }

    if (onDateChange) {
      onDateChange({
        date,
        error: date ? null : "다른 필드도 선택해야 합니다."
      });
    }
  };

  validate = () => {};

  render() {
    const { formProps, label, disabled } = this.props;
    const { selectYears, selectMonth, selectDate } = this.state;
    const { validateStatus, message, formLayout } = formProps;
    const monthOpts = utils
      .getDaysOpts(selectYears, selectMonth)
      .map(date => date.date);
    const dateValue = selectDate
      ? { label: selectDate, value: selectDate }
      : null;
    return (
      <FormItem
        label={label}
        validateStatus={validateStatus}
        help={message}
        {...formLayout}
      >
        <Row gutter={10}>
          <Col span={8}>
            <SGSelect
              size="large"
              placeholder={commonStrings.OPTION.YEARS}
              isDisabled={disabled}
              menuPosition="fixed"
              options={utils.getYearsOpts()}
              onChange={this.setYear}
              onBlur={this.validate}
            />
          </Col>
          <Col span={8}>
            <SGSelect
              size="large"
              placeholder={commonStrings.OPTION.MONTH}
              menuPosition="fixed"
              isDisabled={disabled || !selectYears}
              options={utils.getMonthsOpts()}
              onChange={this.setMonth}
            />
          </Col>
          <Col span={8}>
            <SGSelect
              size="large"
              value={dateValue}
              placeholder={commonStrings.OPTION.DATE}
              menuPosition="fixed"
              isDisabled={disabled || !selectYears || !selectMonth}
              options={monthOpts}
              onChange={this.setDate}
            />
          </Col>
        </Row>
      </FormItem>
    );
  }
}

FormDateSelect.propTypes = {
  disabled: PropTypes.bool,
  // eslint-disable-next-line
  label: PropTypes.string,
  // eslint-disable-next-line
  formProps: PropTypes.object,
  // eslint-disable-next-line
  onDateChange: PropTypes.func
};

FormDateSelect.defaultProps = {
  disabled: false,
}

export default FormDateSelect;
