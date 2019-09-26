import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Async } from "react-select";
import selectStyle from "../selectStyled";

const CustomSelect = styled(Async)`
  ${selectStyle}
`;

class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onChange,
      minWidth,
      getNode,
      loadOptions,
      defaultOptions,
      ...rest
    } = this.props;
    return (
      <CustomSelect
        minWidth={minWidth}
        className="react-select-container"
        classNamePrefix="react-select"
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        onChange={selectedOption => {
          if (onChange) onChange(selectedOption);
        }}
        ref={node => {
          if (getNode) getNode(node);
        }}
        {...rest}
      />
    );
  }
}

const Option = {
  label: PropTypes.string,
  value: PropTypes.string
};

AsyncSelect.propTypes = {
  defaultOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(Option)),
    PropTypes.bool
  ]),
  loadOptions: PropTypes.func.isRequired,
  cacheOptions: PropTypes.bool,
  onInputChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  size: PropTypes.oneOf(["large", "default", "small"]),
  minWidth: PropTypes.number,
  // eslint-disable-next-line
  defaultValue: PropTypes.object,
  getNode: PropTypes.func
};

AsyncSelect.defaultProps = {
  defaultOptions: false,
  cacheOptions: false,
  onInputChange: () => {},
  isDisabled: false,
  isMulti: false,
  hasError: false,
  size: "default",
  onChange: null,
  minWidth: 60,
  defaultValue: null,
  getNode: null
};

export default AsyncSelect;
