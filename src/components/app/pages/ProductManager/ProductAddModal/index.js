import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { message } from 'antd';
import strings from '../../../../../localization/strings-product-manager';
import Modal from '../../../../base/feedback/Modal';
import FormBuilder from '../../../../base/data-entry/FormBuilder';
import { URL } from '../../../../../constants/config';
import { getCategoryReq } from '../../../../../actions/category';
import { getProductsReq } from '../../../../../actions/product';

const FormSchema = Yup.object().shape({
  p_cg_id: Yup.string().required(strings.FORM_CATEGORY_REQUIRED),
  p_name: Yup.string().required(strings.FORM_NAME_REQUIRED),
  p_price: Yup.string().matches(
    /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
    strings.FORM_PRICE_INTEGER,
  ),
  // .positive(strings.FORM_PRICE_POSITIVE).integer(strings.FORM_PRICE_INTEGER),
  p_amount: Yup.number(strings.FORM_AMOUNT_INTEGER)
    .positive(strings.FORM_AMOUNT_POSITIVE)
    .integer(strings.FORM_AMOUNT_INTEGER),
});

class ProductAddModal extends Component {
  constructor(props) {
    super(props);
    this.getOptions();
    this.state = {
      // this set initial value end set error
      initialValues: {
        p_cg_id: '',
        p_name: '',
        p_description: '',
        p_price: '',
        p_amount: '',
      },
      formData: {
        p_cg_id: {
          type: 'select',
          label: strings.FORM_LABEL_CATEGORY,
          options: [],
          required: true,
          config: {
            placeholder: strings.FORM_PH_CATEGORY,
          },
        },
        p_name: {
          type: 'input',
          label: strings.FORM_LABEL_NAME,
          required: true,
          config: {
            placeholder: strings.FORM_PH_NAME,
          },
        },
        p_description: {
          type: 'input',
          label: strings.FORM_LABEL_DESCRIPTION,
          config: {
            placeholder: strings.FORM_PH_DESCRIPTION,
          },
        },
        // p_image: {
        //   type: 'upload',
        //   label: strings.FORM_LABEL_IMAGE,
        //   fileList: [],
        //   config: {
        //     action:`${URL}/product/photo`,
        //     customRequest: (options) => {
        //       const data= new FormData();
        //       data.append('photo', options.file);
        //       const config= {
        //         "headers": {
        //           "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        //         }
        //       };
        //       axios.post(options.action, data, config)
        //         .then((res: any) => {
        //           options.onSuccess(res.data, options.file)
        //         }).catch((err) => {
        //           console.log({err})
        //           options.onError(err)
        //       })
        //     },
        //   },
        // },
        p_price: {
          type: 'input',
          label: strings.FORM_LABEL_PRICE,
          config: {
            type: 'number',
            placeholder: strings.FORM_PH_PRICE,
          },
        },
        p_amount: {
          type: 'input',
          label: strings.FORM_LABEL_AMOUNT,
          config: {
            type: 'number',
            placeholder: strings.FORM_PH_AMOUNT,
          },
        },
      },
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // eslint-disable-next-line
    const { categoryState } = nextProps;
    const { formData } = this.state;
    const checkLoadCategories =
      categoryState.rows.length !== formData.p_cg_id.options;
    if (checkLoadCategories) {
      const options = categoryState.rows.map(option => ({
        value: option.cg_id,
        label: option.cg_name,
      }));
      this.setState({
        formData: {
          ...formData,
          p_cg_id: {
            ...formData.p_cg_id,
            options,
          },
        },
      });
    }
  }

  getOptions = () => {
    // eslint-disable-next-line
    const { requestCategories } = this.props;
    requestCategories({ offset: 0, limit: 1000 });
  };

  // eslint-disable-next-line
  handleSubmit = ({ p_cg_id, p_image, ...restValues }) => {
    // eslint-disable-next-line
    const { toggleModal, requestProduct, reqParams } = this.props;
    const reqProduct = {
      p_cg_id: p_cg_id.value,
      ...restValues,
    };
    axios
      .post(`${URL}/product`, reqProduct)
      .then(() => {
        toggleModal();
        requestProduct(reqParams);
      })
      .catch(() => {
        message.error(
          '해당 상품은 이미 존재합니다. 다른 이름으로 설정해주세요.',
        );
      });
  };

  // eslint-disable-next-line
  submitMyForm = null;

  onModalSubmit = e => {
    if (this.submitMyForm) {
      this.submitMyForm(e);
    }
  };

  bindSubmitForm = submitForm => {
    this.submitMyForm = submitForm;
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

ProductAddModal.propTypes = {
  // eslint-disable-next-line
  visible: PropTypes.bool,
  // eslint-disable-next-line
  toggleModal: PropTypes.func,
};

export default connect(
  state => ({ productState: state.products, categoryState: state.category }),
  { requestCategories: getCategoryReq, requestProduct: getProductsReq },
)(ProductAddModal);
