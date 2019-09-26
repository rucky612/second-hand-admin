import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Tag, Menu, Dropdown, Button } from 'antd';
import SubContent from '../../../base/layout/SubContent';
import Paper from '../../../base/data-display/Paper';
import SSRTable from '../../../base/data-display/SSRTable';
import strings from '../../../../localization/strings-user-manager';
import { getUsersReq, putUserReq } from '../../../../actions/user'

const statusOptions = [
  { label: strings.OPTIONS_ACTIVE, value: '1' },
  { label: strings.OPTIONS_STOP, value: '2' },
  { label: strings.OPTIONS_DORMANCY, value: '3' },
];

  class UserManager extends Component {
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
          Header: strings.COL_USER_NAME,
          sortable: false,
          filterable: true,
          accessor: 'u_name',
        },
        {
          Header: strings.COL_USER_EMAIL,
          sortable: false,
          filterable: true,
          accessor: 'u_email',
        },
        {
          Header: strings.COL_USER_ADDRESS,
          sortable: false,
          filterable: true,
          accessor: 'u_address',
        },
        {
          Header: strings.COL_USER_PHONE,
          sortable: false,
          filterable: true,
          accessor: 'u_phone',
        },
        {
          Header: strings.COL_USER_STATUS,
          sortable: false,
          accessor: 'u_status',
          maxWidth: 90,
          selectFilter: {
            options: statusOptions,
            placeholder: strings.COL_USER_STATUS
          },
          Cell: ({ original }) => this.renderTag(Number(original.u_status))
        },
        {
          Header: strings.COL_ACTION,
          accessor: 'u_action',
          sortable: false,
          resizable: false,
          maxWidth: 90,
          actionable: true,
          Cell: ({ original }) => (
            <Dropdown overlay={this.renderMenu(original.u_status, original.u_id)}>
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
    const { requestGetUsers } = this.props;
    requestGetUsers({ offset: 0, limit: 10 });
  };

  fetchUsers = (offset, limit, search, sorted) => {
    // eslint-disable-next-line
    const { requestGetUsers } = this.props;
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
    requestGetUsers(reqParams);
  };

  handleSubmit = () => {};

  // eslint-disable-next-line
  tagColor = (value) => {
    if(value === 1) {
      return "green"
    }
    if(value === 2) {
      return "red";
    }
    if(value === 3) {
      return null
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
              <Menu.Item key={index} onClick={() => this.requestPutUser(Number(option.value), id)}>
                {`유저상태를 ${option.label}으로 변경`}
              </Menu.Item>
            )
          ))
        }
    </Menu>
  );
  

  requestPutUser = (value, id) => {
    // eslint-disable-next-line
    const { requestPutUser } = this.props;
    requestPutUser({ u_status: value, u_id: id }, { offset: 0, limit: 10 })
  };

  render() {
    const { columns } = this.state;
    // eslint-disable-next-line
    const { usersState } = this.props;
    // eslint-disable-next-line
    const { rows, count, isLoading } = usersState;
    return (
      <SubContent headTitle={strings.SUB_HEADER_USER_MANAGER} breadCrumbAble>
        <Paper paperTitle={strings.PAPER_TITLE_USER_LIST}>
          <div>
            <form onSubmit={this.handleSearchSubmit}>
              <SSRTable
                filterable
                urlPrefix="users"
                loading={isLoading}
                columns={columns}
                data={rows}
                totalCount={count}
                fetchAction={this.fetchUsers}
              />
            </form>
          </div>
        </Paper>
      </SubContent>
    );
  }
}

UserManager.propTypes = {
  // eslint-disable-next-line
};

export default connect(
  (state) => ({ usersState: state.user }),
  {
    requestGetUsers: getUsersReq,
    requestPutUser: putUserReq,
  },
)(UserManager);
