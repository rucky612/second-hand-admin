import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DatePicker from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import "moment/locale/ko";
import "./datepicker-style.css";
import style from "./style";

const getHeightBySize = props => {
  switch (props.size) {
    case "small":
      return "24px";
    case "large":
      return "40px";
    default:
      return "32px";
  }
};

const getBorderByState = props => {
  if (props.hasError) return style.borderError;
  return style.borderDefault;
};

const getHighlightBorderByState = props => {
  if (props.hasError) return style.borderError;
  if (props.disabled) return style.borderDefault;
  return style.borderFocus;
};

const DatePickerWrapper = styled.div`
  & {
    width: 100%;
    input {
      background: ${props =>
        props.disabled
          ? style.colorInputBgDisabled
          : style.colorInputBgEnabled};
      color: ${props =>
        props.disabled ? style.colorInputTextDisabled : style.colorInputText};
      width: 100%;
      height: ${props => getHeightBySize(props)};
      line-height: ${props => getHeightBySize(props)};
      padding: 0 11px;
      border-radius: 3px;
      border: ${props => getBorderByState(props)};
      transition: border 0.3s;
      ::placeholder {
        color: ${style.colorPlaceholder};
        line-height: ${props => getHeightBySize(props)};
      }
      :hover {
        border: ${props => getHighlightBorderByState(props)};
      }

      :focus {
        border: ${props => getHighlightBorderByState(props)};
      }
    }
    .DayPickerInput-OverlayWrapper {
      .DayPickerInput-Overlay {
        position: fixed;
        left: auto;
      }
    }
  }
`;

class SGDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDateChange = date => {
    const { onChange } = this.props;
    if (date) {
      if (onChange) onChange(date);
    }
  };

  render() {
    const {
      placeholder,
      size,
      hasError,
      onBlur,
      selectedDay,
      disabled,
      getNode,
      onKeyDown,
      ...rest
    } = this.props;
    return (
      <DatePickerWrapper size={size} hasError={hasError} disabled={disabled}>
        <DatePicker
          // showOverlay
          dayPickerProps={{
            locale: "ko",
            localeUtils: MomentLocaleUtils,
            selectedDays: selectedDay
          }}
          ref={node => {
            if (getNode) {
              getNode(node);
            }
          }}
          formatDate={formatDate}
          parseDate={parseDate}
          onDayChange={this.handleDateChange}
          onDayPickerHide={() => {
            onBlur();
          }}
          inputProps={{
            readOnly: true,
            disabled,
            onKeyDown: e => {
              if (onKeyDown) {
                onKeyDown(e);
              }
            }
          }}
          autoComplete="off"
          placeholder={placeholder}
          value={selectedDay}
          {...rest}
        />
      </DatePickerWrapper>
    );
  }
}

SGDatePicker.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["large", "default", "small"]),
  hasError: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  // eslint-disable-next-line
  selectedDay: PropTypes.any,
  disabled: PropTypes.bool,
  getNode: PropTypes.func,
  onKeyDown: PropTypes.func
};

SGDatePicker.defaultProps = {
  size: "default",
  hasError: false,
  placeholder: "",
  selectedDay: "",
  onChange: null,
  disabled: false,
  onBlur: () => {},
  getNode: null,
  onKeyDown: null
};

export default SGDatePicker;
