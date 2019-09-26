import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "antd";
import style from "./style";

const CustomFormItem = styled(Form.Item)`
  .ant-form-item-label {
    text-align: left;
    font-weight: 400;
  }

  .ant-form-item-required::before {
    left: -10px;
    top: 8px;
    position: absolute;
    content: "*";
  }

  .ant-form-item-label label {
    height: 20px;
    color: ${style.colorFormLabel};
    margin-left: 10px;
  }
  & .ant-form-explain {
    margin-top: 3px;
    color: #f4516c;
    font-size: 1.2rem;
  }
  && {
    padding-top: ${props => props.offsetTop}px;
    padding-bottom: ${props => props.offsetBottom}px;
    margin: 0;
    &:first-child {
      padding-top: 0;
    }
  }
`;

function FormItem({ children, required, hideRequiredMark, offsetTop, offsetBottom, ...rest }) {
  return (
    <CustomFormItem
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      required={required && !hideRequiredMark}
      colon={false}
      {...rest}
    >
      {children}
    </CustomFormItem>
  );
}

FormItem.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  hideRequiredMark: PropTypes.bool
};

FormItem.defaultProps = {
  required: false,
  hideRequiredMark: false,
  label: null,
  offsetTop: 10,
  offsetBottom: 10
};

export default FormItem;
