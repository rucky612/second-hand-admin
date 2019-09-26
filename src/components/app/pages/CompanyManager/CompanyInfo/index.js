import React, { Component } from "react";
import * as Yup from "yup";
import FormBuilder from "../../../../base/data-entry/FormBuilder";
import AddressInputForm from "../../../common/AddressInputForm";
import Button from "../../../../base/common/Button";
import FormItem from "../../../../base/data-entry/FormItem";
import FormLayout from "../../../../base/layout/FormLayout";
import FormFooterAction from "../../../common/FormFooterAction";
import constants from "./constants";
import strings from "../../../../../localization/strings-company-manager";
import FormDateSelect from "../../../common/FormDateSelect";

const formItemNoLabelLayout = {
  wrapperCol: { xl: { span: 17, offset: 7 }, lg: { span: 17, offset: 7 } }
};

const formValidationSchema = Yup.object().shape({
  companyName: Yup.string().required(strings.FORM_ERR_COMPANY_NAME_REQUIRED)
});

const initialFormValues = {
  businessType: "",
  taxType: "",
  businessNo: "",
  companyName: "dd",
  ceoName: "",
  birth: "",
  companyBirth: "",
  companyAddress: {
    roadAddress: "",
    zipCode: "",
    jibunAddress: "",
    detailAddress: ""
  },
  headquarterAddress: {
    roadAddress: "",
    zipCode: "",
    jibunAddress: "",
    detailAddress: ""
  }
};

class CompanyInfo extends Component {
  // Dynamic form field
  birthFormData = {
    type: "custom",
    render: formProps => (
      <FormDateSelect formProps={formProps} label={strings.FORM_LABEL_BIRTH} />
    )
  };

  headQuarterAddressFormData = {
    type: "custom",
    render: ({ values, setFieldValue }) => {
      const { editable } = this.state;
      const curAddress = values.headquarterAddress;
      return (
        <div>
          <AddressInputForm
            address={curAddress}
            disabled={!editable}
            label={strings.FORM_LABEL_HEADQUARTER_ADDRESS}
            onAddressChange={address => {
              const updated = {
                ...curAddress,
                ...address
              };
              setFieldValue("headquarterAddress", updated);
            }}
          />
          {editable && (
            <FormItem {...formItemNoLabelLayout} offsetTop={0} offsetBottom={0}>
              <Button
                icon="copy"
                bgcolor="primary"
                size="small"
                outline
                onClick={() => {
                  const companyAddress = { ...values.companyAddress };
                  setFieldValue("headquarterAddress", companyAddress);
                }}
              >
                {strings.TITLE_COPY_COMPANY_ADDRESS}
              </Button>
            </FormItem>
          )}
        </div>
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      editLoading: false,

      formData: {
        companyName: {
          label: strings.FORM_LABEL_COMPANY_NAME,
          type: "input",
          required: true,
          config: {
            placeholder: strings.FORM_PH_COMPANY_NAME
          }
        },
        businessType: {
          label: strings.FORM_LABEL_BUSINESS_TYPE,
          type: "select",
          options: constants.businessOptions,
          config: {
            placeholder: strings.FORM_PH_BUSINESS_TYPE
          }
        },
        taxType: {
          label: strings.FORM_LABEL_TAX_TYPE,
          type: "select",
          options: constants.taxOptions,
          config: {
            placeholder: strings.FORM_PH_TAX_TYPE
          }
        },
        businessNo: {
          label: strings.FORM_LABEL_BUSINESS_NO,
          type: "input",
          config: {
            placeholder: strings.FORM_PH_BUSINESS_NO
          }
        },
        ceoName: {
          label: strings.FORM_LABEL_CEO,
          type: "input",
          config: {
            placeholder: strings.FORM_PH_CEO
          }
        },
        birth:
          initialFormValues.businessType &&
          (initialFormValues.businessType.value === "sole" ||
            initialFormValues.businessType.value === "freelancer")
            ? this.birthFormData
            : {},
        companyBirth: {
          type: "custom",
          render: formProps => {
            const { editable } = this.state;
            return (
              <FormDateSelect
                formProps={formProps}
                label={strings.FORM_LABEL_COMPANY_BIRTH}
                disabled={!editable}
              />
            );
          }
        },
        companyAddress: {
          type: "custom",
          render: ({ values, setFieldValue }) => {
            const { editable } = this.state;
            const curAddress = values.companyAddress;
            return (
              <AddressInputForm
                address={curAddress}
                label={strings.FORM_LABEL_BUSINESS_ADDRESS}
                disabled={!editable}
                onAddressChange={address => {
                  const updated = {
                    ...curAddress,
                    ...address
                  };
                  setFieldValue("companyAddress", updated);
                }}
              />
            );
          }
        },
        headquarterAddress:
          initialFormValues.businessType &&
          initialFormValues.businessType.value === "corporation"
            ? this.headQuarterAddressFormData
            : {}
      }
    };
  }

  handleValidate = values => {
    const { formData } = this.state;
    const updatedForm = formData;

    switch (values.businessType.value) {
      case "sole":
        updatedForm.birth = this.birthFormData;
        updatedForm.headquarterAddress = {};
        this.setState({
          formData: updatedForm
        });
        break;

      case "corporation":
        updatedForm.birth = {};
        updatedForm.headquarterAddress = this.headQuarterAddressFormData;
        this.setState({
          formData: updatedForm
        });
        break;

      case "freelancer":
        updatedForm.birth = this.birthFormData;
        updatedForm.headquarterAddress = {};
        this.setState({
          formData: updatedForm
        });
        break;
      default:
        break;
    }
  };

  handleSubmit = (values, actions) => {
    this.setState({
      editLoading: true
    });

    setTimeout(() => {
      this.setState({
        editable: false,
        editLoading: false
      });
    }, 1500);
  };

  toggleEditMode = enabled => {
    this.setState({
      editable: enabled
    });
  };

  render() {
    const { formData, editable, editLoading } = this.state;

    const confirmTitle = editable ? "확인" : "수정하기";
    return (
      <div>
        <FormLayout>
          <FormBuilder
            getFormik={node => {
              this.form = node;
            }}
            hideRequiredMark={!editable}
            config={{ disabled: !editable }}
            initialValues={initialFormValues}
            formData={formData}
            validationSchema={formValidationSchema}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            renderSubmitComponents={() => (
              <FormFooterAction
                confirmLoading={editLoading}
                confirmTitle={confirmTitle}
                hideCancelButton={!editable}
                onCancelClick={e => {
                  e.preventDefault();
                  if (editable) {
                    this.toggleEditMode(false);
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

CompanyInfo.propTypes = {};

export default CompanyInfo;
