import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Select from "react-select";
import selectStyled from "./selectStyled";

const CustomSelect = styled(Select)`${selectStyled}`;

class SGSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  allowMenuScroll = (e) => {
    const targetName = e.target.className || "";
    return !targetName.includes("react-select__menu-list");
  };

  render() {
    const { options, onChange, minWidth, getNode, ...rest } = this.props;
    return (
      <CustomSelect
        minWidth={minWidth}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        onChange={(selectedOption, aciton) => {
          if (onChange) onChange(selectedOption, aciton);
        }}
        ref={node => {
          if (getNode) getNode(node);
        }}
        menuPosition="fixed"
        closeMenuOnScroll={this.allowMenuScroll}
        {...rest}
      />
    );
  }
}

const Option = {
  label: PropTypes.string,
  value: PropTypes.any
};

SGSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(Option)),
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  size: PropTypes.oneOf(["large", "default", "small"]),
  minWidth: PropTypes.number,
  // eslint-disable-next-line
  defaultValue: PropTypes.object,
  getNode: PropTypes.func
};

SGSelect.defaultProps = {
  options: [],
  hasError: false,
  size: "default",
  isDisabled: false,
  isMulti: false,
  onChange: null,
  minWidth: 60,
  defaultValue: null,
  getNode: null
};

export default SGSelect;
