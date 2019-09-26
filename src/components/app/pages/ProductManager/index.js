import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Popconfirm, Icon, Tag } from 'antd';
import SubContent from '../../../base/layout/SubContent';
import Paper from '../../../base/data-display/Paper';
import PaperAction from '../../../base/common/PaperAction';
import SSRTable from '../../../base/data-display/SSRTable';
import Button from '../../../base/common/Button';
import strings from '../../../../localization/strings-product-manager';
import routeUrls from '../../../../constants/route-urls';
import withModalRouter from '../../../base/feedback/Modal/withModalRouter';
import ProductAddModal from './ProductAddModal';
import DetailImg from '../../../base/common/DetailImg';
import { getCategoryReq } from '../../../../actions/category'
import { getProductsReq, deleteProductReq } from '../../../../actions/product'

class ProductManager extends Component {
  paperOptions = [
    {
      icon: (
        <PaperAction icon="plus">{strings.PAPER_TITLE_ADD_PRODUCT}</PaperAction>
      ),
      onClick: () => {
        const { modalState } = this.props;
        // eslint-disable-next-line
        modalState['ADD_PRODUCT'].toggleModal();
      },
    },
  ];

  constructor(props) {
    super(props);
    // get select category options
    this.getOptions();
    this.defaultState = {
      reqParams: {},
      columns: [
        // {
        //   Header: strings.COL_PRODUCT_UPC,
        //   sortable: true,
        //   accessor: 'p_id',
        //   maxWidth: 60,
        //   // Filter: () => this.createInputFilter('upc'),
        // },
        {
          Header: strings.COL_PRODUCT_CATEGORY,
          sortable: false,
          accessor: 'p_category',
          selectFilter: {
            options: [],
            placeholder: strings.COL_PRODUCT_CATEGORY
          },
          Cell: ({ original }) => original.p_category.label
        },
        {
          Header: strings.COL_PRODUCT_NAME,
          sortable: false,
          filterable: true,
          accessor: 'p_name',
        },
        {
          Header: strings.COL_PRODUCT_DESCRIPTION,
          sortable: false,
          accessor: 'p_description',
        },
        {
          Header: strings.COL_PRODUCT_PRICE,
          sortable: true,
          accessor: 'p_price',
        },
        {
          Header: strings.COL_PRODUCT_AMOUNT,
          sortable: true,
          accessor: 'p_amount',
        },
        {
          Header: strings.COL_PRODUCT_STATUS,
          sortable: false,
          accessor: 'p_status',
          Cell: ({ original }) => (
            <Tag style={{ minWidth: "60px", textAlign: "center" }} color={Number(original.p_status) !== 0 && "green"}>
              {Number(original.p_status) !== 0 ? strings.TAG_DISPLAY : strings.TAG_DISPLAY_NOT}
            </Tag>
            )
        },
        {
          Header: strings.COL_PRODUCT_PHOTO,
          sortable: false,
          accessor: 'p_image',
          filterable: false,
          maxWidth: 60,
          Cell: ({ original }) => original.p_image && original.p_image.length !== 0 ? (
            <DetailImg
              style={{ borderRadius: '50%', width: '32px', height: '32px' }}
              imgArr={original.p_image}
            />
            ) : (
              <Icon type="file-jpg" style={{ fontSize: '32px' }} />
            )
        },
        {
          Header: strings.COL_ACTION,
          accessor: 'p_action',
          sortable: false,
          resizable: false,
          maxWidth: 90,
          actionable: true,
          Cell: (cell) => (
            <Popconfirm title={strings.TABLE_CATEGORY_DELETE} onConfirm={() => this.fetchDelete(cell.row)}>
              <Button
                icon="close"
                size="small"
                bgcolor="danger"
              />
            </Popconfirm>
          )
        },
      ],
    };
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // eslint-disable-next-line
    const { categoryState } = nextProps;
    const { columns } = this.state;
    const checkLoadCategories = categoryState.rows.length !== columns[0].selectFilter.options.length;
    if(checkLoadCategories) {
      const options = categoryState.rows.map(option => ({
        value: String(option.cg_id),
        label: option.cg_name
      }));
      this.setState({
        columns: [
          {
            ...columns[0],
            selectFilter: {
              ...columns[0].selectFilter,
              options
            }
          },
          ...columns.slice(1)
        ]
      });
    }
  };

  getOptions = () => {
    // eslint-disable-next-line
    const { requestCategories } = this.props;
    requestCategories({ offset: 0, limit: 1000 });
  };

  fetchProducts = (offset, limit, search, sorted) => {
    // eslint-disable-next-line
    const { requestProducts } = this.props;
    const reqParams = {
      offset,
      limit,
    };
    if(!_.isEmpty(search)) {
      reqParams.search = search;
    }
    if(!_.isEmpty(sorted)) {
      reqParams.sorted = sorted;
    }
    this.setState({
      reqParams
    });
    requestProducts(reqParams);
  };

  fetchDelete = (row) => {
    const { reqParams } = this.state;
    // eslint-disable-next-line
    const { deleteProduct } = this.props;
    deleteProduct(row.p_name, reqParams);
  };

  handleSubmit = () => {};

  handleClickRow = (state, rowInfo, colInfo) => {
    if (rowInfo && colInfo.id !== 'p_pi_id' && colInfo.id !== 'p_action') {
      return {
        onClick: () => {
          // eslint-disable-next-line
          const { history } = this.props;
          history.push({
            pathname: `${routeUrls.PRODUCT_DETAIL}/${rowInfo.original.p_id}`,
            state: rowInfo.original,
          });
        },
        style: {
          cursor: "pointer"
        }
      };
    }
    return {};
  };

  render() {
    const { reqParams, columns } = this.state;
    // eslint-disable-next-line
    const { modalState, productState } = this.props;
    // eslint-disable-next-line
    const { visible, toggleModal } = modalState['ADD_PRODUCT'];
    // eslint-disable-next-line
    const { rows, count, isLoading } = productState;
    return (
      <SubContent headTitle={strings.SUB_HEADER_PRODUCT_MANAGER} breadCrumbAble>
        <ProductAddModal visible={visible} toggleModal={toggleModal} reqParams={reqParams} />
        <Paper
          paperTitle={strings.PAPER_TITLE_PRODUCT_LIST}
          paperOptions={this.paperOptions}
        >
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <SSRTable
                filterable
                getTdProps={this.handleClickRow}
                urlPrefix="product"
                loading={isLoading}
                columns={columns}
                data={rows}
                totalCount={count}
                fetchAction={this.fetchProducts}
              />
            </form>
          </div>
        </Paper>
      </SubContent>
    );
  }
}

ProductManager.propTypes = {
  // eslint-disable-next-line
  modalState: PropTypes.shape({
    visible: PropTypes.bool,
    toggleModal: PropTypes.func,
  }).isRequired,
};

export default connect(
  (state) => ({ productState: state.products, categoryState: state.category }),
  {
    requestCategories: getCategoryReq,
    requestProducts: getProductsReq,
    deleteProduct: deleteProductReq
  },
)(withModalRouter(ProductManager, ['ADD_PRODUCT']));
