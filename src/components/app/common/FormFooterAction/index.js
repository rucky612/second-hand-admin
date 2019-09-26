import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LineSpace from "../LineSpace";
import Button from "../../../base/common/Button";

const Container = styled.div`
  text-align: right;
`;

class FormFooterAction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onClick,
      onCancelClick,
      confirmTitle,
      cancelTitle,
      hideCancelButton,
      confirmLoading
    } = this.props;
    return (
      <Container>
        <LineSpace />
        <Button
          loading={confirmLoading}
          onClick={e => {
            if (onClick) onClick(e);
          }}
          bgcolor="primary"
          size="large"
          htmlType="submit"
        >
          {confirmTitle}
        </Button>
        {!hideCancelButton && (
          <Button
            bgcolor="secondary"
            size="large"
            style={{ marginLeft: "12px" }}
            onClick={e => {
              if (onCancelClick) onCancelClick(e);
            }}
          >
            {cancelTitle}
          </Button>
        )}
      </Container>
    );
  }
}

FormFooterAction.propTypes = {
  confirmLoading: PropTypes.bool,
  confirmTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  onClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  hideCancelButton: PropTypes.bool
};

FormFooterAction.defaultProps = {
  confirmLoading: false,
  onClick: null,
  onCancelClick: null,
  confirmTitle: "확인",
  cancelTitle: "취소",
  hideCancelButton: false
};

export default FormFooterAction;
