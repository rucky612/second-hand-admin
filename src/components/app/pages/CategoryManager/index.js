import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import SubContent from '../../../base/layout/SubContent';
import Paper from '../../../base/data-display/Paper';
import PaperAction from '../../../base/common/PaperAction';
import SSRTable from '../../../base/data-display/SSRTable';
import Button from '../../../base/common/Button';
import strings from '../../../../localization/strings-category-manager';
import withModalRouter from '../../../base/feedback/Modal/withModalRouter';
import CategoryAddModal from './CategoryAddModal';
import { getCategoryReq, deleteCategoryReq } from '../../../../actions/category'

const { confirm } = Modal;

class CategoryManager extends Component {
  paperOptions = [
    {
      icon: (
        <PaperAction icon="plus">
          {strings.PAPER_TITLE_ADD_CATEGORY}
        </PaperAction>
      ),
      onClick: () => {
        const { modalState } = this.props;
        // eslint-disable-next-line
        modalState['ADD_CATEGORY'].toggleModal();
      },
    },
  ];

  constructor(props) {
    super(props);

    this.defaultState = {
      reqParams: {},
      columns: [
        {
          Header: strings.COL_CATEGORY_UPC,
          sortable: true,
          accessor: 'cg_id',
          maxWidth: 90,
        },
        {
          Header: strings.COL_CATEGORY_NAME,
          accessor: 'cg_name',
          sortable: false,
          filterable: true,
        },
        {
          Header: strings.COL_ACTION,
          sortable: false,
          resizable: false,
          accessor: 'cg_filter',
          maxWidth: 90,
          // set filter action search and reset btn
          actionable: true,
          Cell: (cell) => (
            <Button
              icon="close"
              size="small"
              bgcolor="danger"
              onClick={() => this.showDeleteConfirm(cell.row)}
            />
          )
        }
      ],
    };
    this.state = this.defaultState;
  }

  fetchCategories = (offset, limit, search, sorted) => {
    // eslint-disable-next-line
    const { requestCategories } = this.props;
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
    requestCategories(reqParams);
  };

  fetchDelete = (row) => {
    const { reqParams } = this.state;
    // eslint-disable-next-line
    const { deleteCategory } = this.props;
    deleteCategory(row.cg_name, reqParams);
  };

  handleSubmit = () => {};

  showDeleteConfirm = (row) => {
    confirm({
      title: strings.MODAL_DELETE_TITLE,
      okText: strings.MODAL_DELETE_OK,
      okType: 'danger',
      cancelText: strings.MODAL_DELETE_CANCEL,
      onOk: () => this.fetchDelete(row)
    });
  };

  render() {
    const { columns, reqParams } = this.state;
    // eslint-disable-next-line
    const { modalState, categoryState } = this.props;
    // eslint-disable-next-line
    const { visible, toggleModal } = modalState['ADD_CATEGORY'];
    // eslint-disable-next-line
    const { rows, count, isLoading } = categoryState;
    return (
      <SubContent headTitle={strings.SUB_HEADER_CATEGORY_MANAGER}>
        <CategoryAddModal visible={visible} toggleModal={toggleModal} reqParams={reqParams} />
        <Paper
          paperTitle={strings.PAPER_TITLE_CATEGORY_LIST}
          paperOptions={this.paperOptions}
        >
          <div>
            <form onSubmit={this.handleSubmit}>
              <SSRTable
                filterable
                urlPrefix="category"
                loading={isLoading}
                columns={columns}
                data={rows}
                totalCount={count}
                fetchAction={this.fetchCategories}
              />
            </form>
          </div>
        </Paper>
      </SubContent>
    );
  }
}

CategoryManager.propTypes = {
  // eslint-disable-next-line
  modalState: PropTypes.shape({
    visible: PropTypes.bool,
    toggleModal: PropTypes.func,
  }).isRequired,
};

export default connect(
  (state) => ({ categoryState: state.category }),
  { requestCategories : getCategoryReq, deleteCategory: deleteCategoryReq },
)(withModalRouter(CategoryManager, ['ADD_CATEGORY']));
