import React, { Component } from "react";
import { Tag } from "antd";
import PaginationTable from "../../../base/data-display/SSRTable";
import Button from "../../../base/common/Button";
import { requestLoginHistories } from "./mocks";
import strings from "../../../../localization/strings-login-histories";

const tagStyle = { minWidth: "60px", textAlign: "center" };

class LoginHistories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      count: 0,
      rows: [],
      columns: [
        {
          Header: strings.COL_LOGIN_STATE,
          accessor: "loginState",
          maxWidth: 90,
          sortable: false,
          // eslint-disable-next-line
          Cell: ({ row }) => {
            const isOnline = row.loginState.value === "login";
            return (
              <Tag style={tagStyle} color={isOnline && "green"}>
                {isOnline ? strings.TITLE_ONLINE : strings.TITLE_OFFLINE}
              </Tag>
            );
          }
        },
        {
          Header: strings.COL_LOGIN_DATE,
          accessor: "loginDate",
          maxWidth: 180
        },
        {
          Header: strings.COL_IP,
          accessor: "ip",
          maxWidth: 128
        },
        {
          Header: strings.COL_DEVICE,
          accessor: "device"
        },
        {
          Header: strings.COL_BROWSER,
          accessor: "browser",
          maxWidth: 130
        },
        {
          Header: strings.COL_VERSION,
          accessor: "version",
          maxWidth: 64
        },
        {
          Header: strings.COL_ACTION,
          maxWidth: 94,
          sortable: false,
          Cell: ({ row }) =>
            row.loginState.value === "login" && (
              <Button
                outline
                size="small"
                bgcolor="danger"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {strings.TITLE_LOGOUT}
              </Button>
            )
        }
      ]
    };
  }

  showTableLoading = () => {
    this.setState({
      tableLoading: true
    });
  };

  hideTableLoading = () => {
    this.setState({
      tableLoading: false
    });
  };

  fetchLoginHistories = (offset, limit) => {
    this.showTableLoading();
    requestLoginHistories(offset, limit, res => {
      this.setState({
        rows: res.rows,
        count: res.count
      });
      this.hideTableLoading();
    });
  };

  render() {
    const { rows, columns, count, tableLoading } = this.state;
    return (
      <PaginationTable
        loading={tableLoading}
        urlPrefix="loginHistories"
        data={rows}
        columns={columns}
        totalCount={count}
        fetchAction={(offset, limit) => {
          this.fetchLoginHistories(offset, limit);
        }}
      />
    );
  }
}

LoginHistories.propTypes = {};

export default LoginHistories;
