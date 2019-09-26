import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spin, Icon } from "antd";

const loadingIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading } = this.props;
    return (
      loading && (
        <div className="-loading -active">
          <div className="-loading-inner" style={{top:"44%"}}>
            <Spin indicator={loadingIcon} />
          </div>
        </div>
      )
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool
};

Loading.defaultProps = {
  loading: false
};

export default Loading;
