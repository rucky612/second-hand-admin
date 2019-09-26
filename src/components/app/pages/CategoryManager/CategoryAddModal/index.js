import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import strings from '../../../../../localization/strings-category-manager';
import Modal from '../../../../base/feedback/Modal';
import FormBuilder from '../../../../base/data-entry/FormBuilder';
import { URL } from '../../../../../constants/config';
import { getCategoryReq } from '../../../../../actions/category';

const FormSchema = Yup.object().shape({
  category: Yup.string().required(strings.FORM_CATEGORM_REQUIRED),
});

class CategoryAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this set formik error
      initialValues: {
        category: "",
      },
      formData: {
        category: {
          type: 'input',
          label: strings.FORM_LABEL_CATEGORY,
          config: {
            placeholder: strings.FORM_PH_CATEGORY,
          },
        },
      },
    };
  }

  handleSubmit = (values, { setErrors }) => {
    // eslint-disable-next-line
    const { toggleModal, requestCategories, reqParams } = this.props;
    axios.post(`${URL}/category`, { cg_name : values.category })
      .then(() => {
        toggleModal();
        requestCategories(reqParams)
      })
      .catch(() => setErrors({ category: strings.FORM_FETCH_ERR }));
  };

  // eslint-disable-next-line
  submitMyForm = null;

  onModalSubmit = (e) => {
    if(this.submitMyForm) {
      this.submitMyForm(e);
    }
  };

  bindSubmitForm = submitForm => {
    this.submitMyForm = submitForm
  };

  render() {
    const { initialValues, formData } = this.state;
    const { visible, toggleModal } = this.props;
    return (
      <Modal
        title={strings.MODAL_TITLE_ADD_ONE}
        visible={visible}
        onOk={this.onModalSubmit}
        onCancel={toggleModal}
        size="large"
      >
        <FormBuilder
          initialValues={initialValues}
          formData={formData}
          validationSchema={FormSchema}
          onSubmit={this.handleSubmit}
          bindSubmit={this.bindSubmitForm}
          renderSubmitComponents={() => {}}
        />
      </Modal>
    );
  }
}

CategoryAddModal.propTypes = {
  // eslint-disable-next-line
  visible: PropTypes.bool,
  // eslint-disable-next-line
  toggleModal: PropTypes.func,
  // eslint-disable-next-line
  reqParams: PropTypes.object.isRequired
};

export default connect(
  null,
  { requestCategories : getCategoryReq },
)(CategoryAddModal);
