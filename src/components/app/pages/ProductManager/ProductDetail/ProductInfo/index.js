import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from "react-router"
import _ from "lodash";
import * as Yup from 'yup';
import strings from "../../../../../../localization/strings-product-manager";
import FormLayout from "../../../../../base/layout/FormLayout";
import commonStrings from "../../../../../../localization/strings-common";
import FormBuilder from "../../../../../base/data-entry/FormBuilder";
import FormFooterAction from "../../../../common/FormFooterAction";
import { getCategoryReq } from '../../../../../../actions/category';
import { putProductReq } from '../../../../../../actions/product';

const FormSchema = Yup.object().shape({
  p_cg_id: Yup.string().required(strings.FORM_CATEGORY_REQUIRED),
  p_name: Yup.string().required(strings.FORM_NAME_REQUIRED),
  p_price: Yup.string().matches(/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/, strings.FORM_PRICE_INTEGER),
  // .positive(strings.FORM_PRICE_POSITIVE).integer(strings.FORM_PRICE_INTEGER),
  p_amount: Yup.number(strings.FORM_AMOUNT_INTEGER).positive(strings.FORM_AMOUNT_POSITIVE).integer(strings.FORM_AMOUNT_INTEGER)
});

const statusOpts = [
  { label: strings.TAG_DISPLAY_NOT, value: 0 },
  { label: strings.TAG_DISPLAY, value: 1 },
];

const initialForm = {
  p_category: "",
  p_name: "",
  p_description: "",
  p_price: "",
  p_amount: "",
  p_status: "",
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      initialValues: this.isEmptyRouteState()
        ? initialForm
        // eslint-disable-next-line
        : this.setInitialForm(initialForm, props.history.location.state),
      formData: {
        p_category: {
          type: "select",
          label: strings.FORM_LABEL_CATEGORY,
          options: this.isEmptyCategories() ? [] : this.getCategories(),
          required: true,
          config: {
            placeholder: strings.FORM_PH_CATEGORY,
          }
        },
        p_status: {
          type: "select",
          label: strings.FORM_LABEL_STATUS,
          options: statusOpts,
          required: true,
          config: {
            defaultValue: { label: strings.TAG_DISPLAY_NOT, value: 0 },
            placeholder: strings.FORM_PH_CATEGORY,
          }
        },
        p_name: {
          type: "input",
          label: strings.FORM_LABEL_NAME,
          required: true,
          config: {
            placeholder: strings.FORM_PH_NAME,
          }
        },
        p_description: {
          type: "input",
          label: strings.FORM_LABEL_NAME,
          // options: mocks.category1Opts.slice(1),
          required: true,
          config: {
            placeholder: strings.FORM_PH_DESCRIPTION,
          }
        },
        p_price: {
          type: "input",
          label: strings.FORM_LABEL_PRICE,
          // options: mocks.category1Opts.slice(1),
          required: true,
          config: {
            type: 'number',
            placeholder: strings.FORM_PH_PRICE,
          }
        },
        p_amount: {
          type: "input",
          label: strings.FORM_LABEL_AMOUNT,
          // options: mocks.category1Opts.slice(1),
          required: true,
          config: {
            type: 'number',
            placeholder: strings.FORM_PH_AMOUNT,
          }
        }
      }
    };
  };

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
    const { productForm } = this.props;
    const { formData, initialValues } = this.state;
    const categories = this.getCategories();
    if(!_.isEmpty(productForm.form) && !_.isEqual(initialValues, productForm.form)) {
      const getInitial = this.setInitialForm(initialForm, productForm.form);
      this.setState({
        initialValues: {
          ...getInitial
        }
      })
    }
    if(!_.isEqual(formData.p_category.options, categories)) {
      this.setState({
        formData: {
          ...formData,
          p_category: {
            ...formData.p_category,
            options: categories
          }
        }
      })
    }
  };

  setInitialForm = (initial, form) =>
    _.mapValues(initial, (v, index) => {
    if(index === "p_status") {
      // eslint-disable-next-line
      return _.find(statusOpts, { value: form[index] })
    }
    // eslint-disable-next-line
    return form[index]
  });

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

  getCategories = () => {
    // eslint-disable-next-line
    const { categoryState } = this.props;
    return _.map(categoryState.rows, obj => ({
      value: obj.cg_id,
      label: obj.cg_name,
    }));
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
    const { putProduct, match } = this.props;
    const product = {
      ...values,
      p_category: values.p_category.value,
      p_status: values.p_status.value,
      p_id: match.params.id
    };
    putProduct(product)
  };

  toggleEditMode = enabled => {
    this.setState({
      editable: enabled
    });
  };

  render() {
    const { productForm } = this.props;
    const { initialValues, formData, editable } = this.state;
    const { isLoading } = productForm;
    const confirmTitle = editable
      ? commonStrings.TITLE_OK
      : commonStrings.TITLE_EDIT;
    return (
      <div>
        <FormLayout>
          <FormBuilder
            hideRequiredMark
            config={{ disabled: !editable }}
            initialValues={initialValues}
            formData={formData}
            validationSchema={FormSchema}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            renderSubmitComponents={(_, resetForm) => (
              <FormFooterAction
                confirmLoading={isLoading}
                confirmTitle={confirmTitle}
                hideCancelButton={!editable}
                onCancelClick={e => {
                  e.preventDefault();
                  if (editable) {
                    this.toggleEditMode(false);
                    resetForm();
                  }
                }}
                onClick={e => {
                  const { editable } = this.state;
                  if (!editable) {
                    e.preventDefault();
                    this.toggleEditMode(true);
                  }
                }}
              />
            )}
          />
        </FormLayout>
      </div>
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
  (state) => ({ productForm: state.product, categoryState: state.category }),
  {
    requestCategories: getCategoryReq,
    putProduct: putProductReq
  },
)(withRouter(ProductDetail));
