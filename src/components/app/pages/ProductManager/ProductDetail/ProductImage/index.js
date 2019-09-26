import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ProductAddImg from "./ProductAddImg";
import ProductDelImg from "./ProductDelImg";
import { deleteProductImgReq } from '../../../../../../actions/product-image';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isOpen: false
    };
  };

  toggleModal = (isOpen) => {
    this.setState({
      isOpen
    })
  };

  render() {
    const { count, isOpen } = this.state;
    return (
      <div>
        <ProductAddImg {...this.props} count={count} isOpen={isOpen} toggleModal={this.toggleModal} />
        <ProductDelImg {...this.props} bindSubmitForm={this.bindSubmitForm} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

ProductDetail.propTypes = {
  // eslint-disable-next-line
  activeKey: PropTypes.string,
  // eslint-disable-next-line
  onTabChange: PropTypes.func
};

export default connect(
  (state) => ({ productForm: state.product }),
  {
    deleteProductImg: deleteProductImgReq
  },
)(withRouter(ProductDetail));
