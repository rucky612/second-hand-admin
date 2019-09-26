import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from "react-router"
import _ from "lodash";
import * as Yup from 'yup';
import Modal from '../../../../../../base/feedback/Modal';
import FormLayout from "../../../../../../base/layout/FormLayout";
import FormBuilder from "../../../../../../base/data-entry/FormBuilder";
import { postProductImgReq } from '../../../../../../../actions/product-image';

const formItemLayout = {
  labelCol: {
    xl: { span: 1 },
    lg: { span: 1 }
  },
  wrapperCol: {
    xl: { span: 24 },
    lg: { span: 24 }
  }
};

const FormSchema = Yup.object().shape({
});

const initialForm = {
  p_iamge: '',
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: initialForm,
      formData: {
        p_image: {
          type: 'upload',
          fileList: [],
          config: {
            multiple: true,
            maxUpload: 6,
            formItemLayout,
            // onChange: this.resizeImage,
            customRequest: ({ onSuccess, onError, file }) => {
              new Promise(((resolve) => {
                setTimeout(() => {
                  resolve();
                  }, 100);
              })).then(() => {
                onSuccess(null, file);
              }).catch(() => {
                onError("error!")
              })
            }
          },
        },
      }
    };
  }

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
        postProductImg(photoList, match.params.id);
      }
    }
  };

  // eslint-disable-next-line
  submitMyForm = null;

  onModalSubmit = (e) => {
    // eslint-disable-next-line
    const { toggleModal } = this.props;
    if(this.submitMyForm) {
      this.submitMyForm(e);
      toggleModal(false);
    }
  };

  bindSubmitForm = submitForm => {
    this.submitMyForm = submitForm
  };

  render() {
    // eslint-disable-next-line
    const { isOpen, toggleModal } = this.props;
    const { initialValues, formData } = this.state;
    return (
      <Modal
        title="이미지 등록"
        visible={isOpen}
        onOk={this.onModalSubmit}
        onCancel={() => toggleModal(false)}
      >
        <FormLayout>
          <FormBuilder
            hideRequiredMark
            initialValues={initialValues}
            formData={formData}
            validationSchema={FormSchema}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            bindSubmit={this.bindSubmitForm}
            renderSubmitComponents={() => {}}
          />
        </FormLayout>
      </Modal>
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
  (state) => ({ productForm: state.product, productState: state.products }),
  {
    postProductImg: postProductImgReq,
  },
)(withRouter(ProductDetail));
