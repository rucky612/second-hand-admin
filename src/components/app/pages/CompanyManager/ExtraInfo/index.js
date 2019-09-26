import React, { Component } from "react";
import * as Yup from "yup";
import FormLayout from "../../../../base/layout/FormLayout";
import FormFooterAction from "../../../common/FormFooterAction";
import FormBuilder from "../../../../base/data-entry/FormBuilder";
import { phoneNumRegex } from "../../../utils";
import strings from "../../../../../localization/strings-company-manager";
import commonStrings from "../../../../../localization/strings-common";

const formValidationSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneNumRegex, strings.FORM_ERR_PHONE_INVALID),
  email: Yup.string().email(strings.FORM_ERR_EMAIL_INVALID)
});

const initialFormValues = {
  stamp: {
    fileList: []
  },
  logo: {
    fileList: []
  }
};

class ExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      editable: false,

      formData: {
        phone: {
          type: "input",
          label: strings.FORM_LABEL_COMPANY_PHONE,
          config: {
            placeholder: strings.FORM_PH_COMPANY_PHONE
          }
        },
        fax: {
          type: "input",
          label: strings.FORM_LABEL_COMPANY_FAX,
          config: {
            placeholder: strings.FORM_PH_COMPANY_FAX
          }
        },
        email: {
          type: "input",
          label: strings.FORM_LABEL_COMPANY_EMAIL,
          config: {
            placeholder: strings.FORM_PH_COMPANY_EMAIL
          }
        },
        stamp: {
          label: strings.FORM_LABEL_COMPANY_STAMP,
          type: "upload"
        },
        logo: {
          label: strings.FORM_LABEL_COMPANY_LOGO,
          type: "upload"
        },
        crmLogo: {
          label: strings.FORM_LABEL_CRM_LOGO,
          type: "upload"
        }
      }
    };
  }

  handleSubmit = (values, actions) => {
    // eslint-disable-next-line
    console.log(values, actions);
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        confirmLoading: false,
        editable: false
      });
    }, 1000);
  };

  toggleEditMode = enabled => {
    this.setState({
      editable: enabled
    });
  };

  render() {
    const { formData, editable, confirmLoading } = this.state;
    const footerActionTitle = editable
      ? commonStrings.TITLE_OK
      : commonStrings.TITLE_EDIT;

    return (
      <FormLayout>
        <FormBuilder
          hideRequiredMark={!editable}
          config={{ disabled: !editable }}
          initialValues={initialFormValues}
          formData={formData}
          validationSchema={formValidationSchema}
          onSubmit={this.handleSubmit}
          renderSubmitComponents={() => (
            <FormFooterAction
              confirmLoading={confirmLoading}
              onClick={e => {
                if (!editable) {
                  e.preventDefault();
                  this.toggleEditMode(true);
                }
              }}
              onCancelClick={() => {
                this.toggleEditMode(false);
              }}
              hideCancelButton={!editable}
              confirmTitle={footerActionTitle}
            />
          )}
        />
      </FormLayout>
    );
  }
}

export default ExtraInfo;
