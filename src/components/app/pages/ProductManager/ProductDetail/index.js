import React, { Component } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import withTabRouter from "../../../../base/data-display/PaperTab/withTabRouter";
import SubContent from "../../../../base/layout/SubContent";
import PaperTab from "../../../../base/data-display/PaperTab";
import Tab from "../../../../base/data-display/Tabs/Tab";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import strings from "../../../../../localization/strings-product-manager";
import { getCategoryReq } from '../../../../../actions/category';
import { getProductReq, putProductReq } from '../../../../../actions/product';

const tabData = {
  productInfo: {
    title: strings.TAB_TITLE_INFO,
    component: <ProductInfo />
  },
  productImage: {
    title: strings.TAB_TITLE_IMAGE,
    component: <ProductImage />
  }
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // eslint-disable-next-line
    const { requestProduct, requestCategories, match } = this.props;
    if(this.isEmptyRouteState()) {
      const productId = match.params.id;
      requestProduct({ p_id: productId })
    }
    if(this.isEmptyCategories()) {
      requestCategories({ offset: 0, limit: 1000 })
    }
  };

  isEmptyRouteState = () => {
    // eslint-disable-next-line
    const { history } = this.props;
    return _.isEmpty(history.location.state);
  };

  isEmptyCategories = () => {
    // eslint-disable-next-line
    const { categoryState } = this.props;
    return categoryState.rows.length === 0;
  };

  renderTabs = () =>
    Object.keys(tabData).map(key => (
      <Tab tab={tabData[key].title} key={key}>
        {tabData[key].component}
      </Tab>
    ));

  render() {
    const { activeKey, onTabChange } = this.props;
    return (
      <SubContent headTitle={strings.SUB_HEADER_PRODUCT_DETAIL} breadCrumbAble>
        <PaperTab activeKey={activeKey} onChange={onTabChange}>
          {this.renderTabs()}
        </PaperTab>
      </SubContent>
    );
  }
}

ProductDetail.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default connect(
  (state) => ({ productForm: state.product, categoryState: state.category }),
  {
    requestCategories: getCategoryReq,
    requestProduct: getProductReq,
    putProduct: putProductReq
  },
)(withTabRouter(ProductDetail, "productInfo"));
