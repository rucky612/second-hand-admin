import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Input } from "antd";

const CustomSearch = styled(Input.Search)`
  :focus {
    box-shadow: none !important;
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { enterTitle, ...rest } = this.props;
    return <CustomSearch enterButton={enterTitle} {...rest} />;
  }
}

Search.propTypes = {
  enterTitle: PropTypes.string
};
Search.defaultProps = {
  enterTitle: null
};

export default Search;
