import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router"
import _ from "lodash";
import { Table, Tooltip, Modal } from "antd";
import moment from 'moment';
import strings from "../../../../../../../localization/strings-product-manager";
import FormLayout from "../../../../../../base/layout/FormLayout";
import commonStrings from "../../../../../../../localization/strings-common";
import FormFooterAction from "../../../../../common/FormFooterAction";
import { deleteProductImgReq } from '../../../../../../../actions/product-image';

const { confirm } = Modal;

const SGTable = styled(Table)`
  && table{
    table-layout: fixed;
    td {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

class ProductDelImg extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    const { history } = props;
    this.state = {
      editable: false,
      columns: [
        {
          title: strings.TABLE_COL_IMG,
          dataIndex: 'img',
          key: 'img',
          width: 90,
          render: (src) => <img alt="img" src={src} width={50} height={50} />
        },
        {
          title: strings.TABLE_COL_NAME,
          dataIndex: 'name',
          key: 'name',
          render: (name) => <Tooltip title={name}>{name}</Tooltip>
        },
        {
          title: strings.TABLE_COL_SIZE,
          dataIndex: 'size',
          key: 'size',
          width: 100,
        },
        {
          title: strings.TABLE_COL_DATE,
          dataIndex: 'date',
          key: 'date',
          width: 140,
          render: (date) => moment(date).format('YY-MM-DD')
        },
      ],
      data: _.isEmpty(history.location.state)
        ? []
        : this.getRowFromFiles(history.location.state.p_image),
      selected: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    // eslint-disable-next-line
    const { productForm } = this.props;
    if(!_.isEmpty(productForm.form) && productForm.form.p_image) {
      const rows = this.getRowFromFiles(productForm.form.p_image);
      if(!_.isEqual(rows, data)) {
        this.setState({
          data: rows
        })
      }
    }
  };

  getRowFromFiles = (fileList) => {
    if(fileList) {
      return fileList.map((file, i) => ({
        key: file.id,
        name: file.alt,
        img: file.src,
        size: file.size,
        date: file.date
      }))
    }
    return [];
  };

  handleValidate = values => {
    // need when you submit form
    switch (values.test.value) {
      default:
        break;
    }
  };

  handleSubmit = values => {
    // eslint-disable-next-line
    const { postProductImg, match } = this.props;
    if(!_.isEmpty(values)) {
      if (values.p_image && values.p_image.fileList && values.p_image.fileList.length !== 0) {
        const photoList = [ ...values.p_image.fileList ];
        postProductImg(photoList, match.params.id, () => this.setState({
          editable: false,
        }))
      }
    }
  };

  toggleEditMode = enabled => {
    this.setState({
      editable: enabled
    });
  };

  showDeleteConfirm = () => {
    const { selected } = this.state;
    confirm({
      title: strings.MODAL_DELETE_TITLE,
      okText: strings.MODAL_DELETE_OK,
      okType: 'danger',
      cancelText: strings.MODAL_DELETE_CANCEL,
      onOk: () => {
        // eslint-disable-next-line
        const { deleteProductImg } = this.props;
        this.toggleEditMode(false);
        deleteProductImg(selected);
      },
    });
  };

  rowCheck = (selectedRowKeys, selectedRows) => {
    this.setState({
      selected: selectedRows
    })
  };

  render() {
    // eslint-disable-next-line
    const { productForm, toggleModal } = this.props;
    const { columns, data, editable } = this.state;
    const { isLoading } = productForm;
    const confirmTitle = editable
      ? "등록"
      : commonStrings.TITLE_EDIT;
    const loadingComp = editable ? false : {
      indicator: <div />
    };
    return (
      <div>
        <FormLayout>
          <SGTable
            loading={loadingComp}
            pagination={false}
            columns={columns}
            rowSelection={{
              onChange: this.rowCheck
            }}
            dataSource={data}
            dropdownPrefixCls="test"
            onChange={() => {}}
          />
          <FormFooterAction
            confirmLoading={isLoading}
            confirmTitle={confirmTitle}
            hideCancelButton={!editable}
            cancelTitle="삭제"
            onCancelClick={e => {
              e.preventDefault();
              if (editable) {
                this.showDeleteConfirm()
              }
            }}
            onClick={e => {
              const { editable } = this.state;
              if (!editable) {
                e.preventDefault();
                this.toggleEditMode(true);
              } else {
                toggleModal(true);
              }
            }}
          />
        </FormLayout>
      </div>
    );
  }
}

ProductDelImg.propTypes = {
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
)(withRouter(ProductDelImg));
