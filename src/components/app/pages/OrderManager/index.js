import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Tag, Menu, Dropdown, Button } from 'antd';
import SubContent from '../../../base/layout/SubContent';
import Paper from '../../../base/data-display/Paper';
import SSRTable from '../../../base/data-display/SSRTable';
import strings from '../../../../localization/strings-order-manager';
import { getOrdersReq, putOrderReq } from '../../../../actions/order'

const statusOptions = [
  { label: strings.OPTIONS_WEARING, value: '1' },
  { label: strings.OPTIONS_RELEASE, value: '2' },
  { label: strings.OPTIONS_TRANSPORT, value: '3' },
  { label: strings.OPTIONS_COMPLETE, value: '4' },
  { label: strings.OPTIONS_RETURN, value: '5' },
];

class OrderManager extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      columns: [
        // {
        //   Header: strings.COL_PRODUCT_UPC,
        //   sortable: true,
        //   accessor: 'p_id',
        //   maxWidth: 60,
        //   // Filter: () => this.createInputFilter('upc'),
        // },
        {
          Header: strings.COL_ORDER_PRODUCT,
          sortable: false,
          filterable: true,
          accessor: 'o_product',
        },
        {
          Header: strings.COL_ORDER_AMOUNT,
          sortable: false,
          filterable: true,
          accessor: 'o_amount',
        },
        {
          Header: strings.COL_ORDER_PRICE,
          sortable: false,
          filterable: true,
          accessor: 'o_price',
        },
        {
          Header: strings.COL_ORDER_USER,
          sortable: false,
          filterable: true,
          accessor: 'o_user',
        },
        {
          Header: strings.COL_ORDER_STATUS,
          sortable: false,
          accessor: 'o_status',
          maxWidth: 90,
          selectFilter: {
            options: statusOptions,
            placeholder: strings.COL_ORDER_STATUS
          },
          Cell: ({ original }) => this.renderTag(Number(original.o_status))
        },
        {
          Header: strings.COL_ACTION,
          accessor: 'o_action',
          sortable: false,
          resizable: false,
          maxWidth: 90,
          actionable: true,
          Cell: ({ original }) => (
            <Dropdown overlay={this.renderMenu(original.o_status, original.o_id)}>
              <Button
                icon="ellipsis"
                shape="circle"
              />
            </Dropdown>
          )
        },
      ],
    };
    this.state = this.defaultState;
  }

  componentDidMount() {
    // eslint-disable-next-line
    const { requestGetOrders } = this.props;
    requestGetOrders({ offset: 0, limit: 10 });
  };

  fetchOrders = (offset, limit, search, sorted) => {
    // eslint-disable-next-line
    const { requestGetOrders } = this.props;
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
    requestGetOrders(reqParams);
  };

  handleSubmit = () => {};

  // eslint-disable-next-line
  tagColor = (value) => {
    if(value === 1) {
      return null
    }
    if(value === 2) {
      return "purple";
    }
    if(value === 3) {
      return "green"
    }
    if(value === 4) {
      return "blue"
    }
    if(value === 5) {
      return "red"
    }
  };

  renderTag = (value) => (
    <div>
      {
        statusOptions.map((option, index) => (
          Number(value) === Number(option.value) && (
            // eslint-disable-next-line
            <Tag key={index} style={{ minWidth: "64px", textAlign: "center" }} color={this.tagColor(Number(option.value))}>
              {option.label}
            </Tag>
          )
        ))
      }
    </div>
  );

  renderMenu = (value, id) => (
    <Menu>
      {
        statusOptions.map((option, index) => (
          Number(value) !== Number(option.value) && (
            // eslint-disable-next-line
            <Menu.Item key={index} onClick={() => this.requestPutOrder(Number(option.value), id)}>
              {`주문 상황을 ${option.label}으로 변경`}
            </Menu.Item>
          )
        ))
      }
    </Menu>
  );


  requestPutOrder = (value, id) => {
    // eslint-disable-next-line
    const { requestPutOrder } = this.props;
    requestPutOrder({ o_status: value, o_id: id }, { offset: 0, limit: 10 })
  };

  render() {
    const { columns } = this.state;
    // eslint-disable-next-line
    const { ordersState } = this.props;
    // eslint-disable-next-line
    const { rows, count, isLoading } = ordersState;
    return (
      <SubContent headTitle={strings.SUB_HEADER_ORDER_MANAGER} breadCrumbAble>
        <Paper paperTitle={strings.PAPER_TITLE_ORDER_LIST}>
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <SSRTable
                filterable
                urlPrefix="users"
                loading={isLoading}
                columns={columns}
                data={rows}
                totalCount={count}
                fetchAction={this.fetchOrders}
              />
            </form>
          </div>
        </Paper>
      </SubContent>
    );
  }
}

OrderManager.propTypes = {
  // eslint-disable-next-line
};

export default connect(
  (state) => ({ ordersState: state.order }),
  {
    requestGetOrders: getOrdersReq,
    requestPutOrder: putOrderReq,
  },
)(OrderManager);
