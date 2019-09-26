import React, { Component } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import FormLayout from "../../../../base/layout/FormLayout";
import FormBuilder from "../../../../base/data-entry/FormBuilder";
import FormFooterAction from "../../../common/FormFooterAction";
import FormItem from "../../../../base/data-entry/FormItem";

const Container = styled.div`
  display: block;
`;

const initialFormValues = {
  nickname: "sgsg123",
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const FormSchema = Yup.object().shape({
  nickname: Yup.string().required("이름을 적어주세요"),
  currentPassword: Yup.string().required("현재 비밀번호를 입력해주세요"),
  newPassword: Yup.string().required("새로운 비밀번호를 입력해주세요"),
  confirmPassword: Yup.string().required("비밀번호를 다시한번 입력해주세요")
});

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnLoading: false,
      formSheet: {
        nickname: {
          type: "custom",
          render: props => this.renderNickname(props)
        },
        currentPassword: {
          required: true,
          type: "input",
          label: "이전 비밀번호",
          config: {
            placeholder: "이전 비밀번호을 입력해주세요",
            type: "password",
            autoComplete: "off"
          }
        },
        newPassword: {
          required: true,
          type: "input",
          label: "새 비밀번호",
          config: {
            placeholder: "새 비밀번호을 입력해주세요",
            type: "password",
            autoComplete: "off"
          }
        },
        confirmPassword: {
          required: true,
          type: "input",
          label: "새 비밀번호 확인",
          config: {
            placeholder: "비밀번호를 한번더 입력해주세요",
            type: "password",
            autoComplete: "off"
          }
        }
      }
    };
  }

  handleValidate = values => {
    const error = {};
    const validateConfirm = values.newPassword !== values.confirmPassword;
    if (validateConfirm) {
      error.confirmPassword = "비밀번호가 일치하지 않습니다";
    }
    return error;
  };

  handleSubmit = (values, actions) => {
    // eslint-disable-next-line
    console.log(values, actions);
    this.setState({
      btnLoading: true
    });
    setTimeout(this.handleEdit, 1500);
  };

  renderNickname = props => {
    const formItemLayout = {
      labelCol: {
        xl: { span: 7 },
        lg: { span: 7 }
      },
      wrapperCol: {
        xl: { span: 17 },
        lg: { span: 17 }
      }
    };
    return (
      <FormItem label="아이디" {...formItemLayout}>
        <span>{props.initialValues.nickname}</span>
      </FormItem>
    );
  };

  render() {
    const { formSheet, btnLoading } = this.state;
    return (
      <Container>
        <FormLayout>
          <FormBuilder
            initialValues={initialFormValues}
            formData={formSheet}
            validationSchema={FormSchema}
            validate={this.handleValidate}
            onSubmit={this.handleSubmit}
            renderSubmitComponents={() => (
              <FormFooterAction
                onClick={() => {}}
                onCancelClick={() => {}}
                confirmTitle="확인"
                confirmLoading={btnLoading}
                hideCancelButton
              />
            )}
          />
        </FormLayout>
      </Container>
    );
  }
}

AccountInfo.propTypes = {};

export default AccountInfo;
