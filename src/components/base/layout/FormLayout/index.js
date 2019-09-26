import React from "react";
import PropTypes from "prop-types"
import { Row, Col } from "antd";

// eslint-disable-next-line react/prop-types
function FormLayout({ children, noPadding }) {
  return (
    <Row style={{ padding: noPadding ? "0" : "30px"  }}>
      <Col xl={{ span: 16, offset: 4 }}>
        {children}
      </Col>
    </Row>
  );
}

FormLayout.propTypes = {
  noPadding: PropTypes.bool,
}

FormLayout.defaultProps = {
  noPadding: false,
}

export default FormLayout;
