/* eslint-disable no-undef,react/prop-types */
import React, { Component } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "antd";
import { accountInfo, userInfo } from "../constants";
import FormLayout from "../../../../base/layout/FormLayout";
import FormBuilder from "../../../../base/data-entry/FormBuilder";
import FormFooterAction from "../../../common/FormFooterAction";
import { phoneNumRegex } from "../../../utils";

const initialFormValues = userInfo;

const FormSchema = Yup.object().shape({
  name: Yup.string().required("이름을 입력해주세요"),
  authority: Yup.string().required("권한을 선택해주세요"),
  email: Yup.string().email("올바르지않은 이메일 형식 입니다"),
  phone: Yup.string().matches(phoneNumRegex, "올바르지않은 전화번호 형식입니다")
});

const Container = styled.div`
  display: block;
`;

class DefaultInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAble: false,
      btnLoading: false,
      formSheet: {
        photoList: {
          type: "upload",
          label: "사진",
          fileList: [],
          config: {
            maxUpload: 1
          }
        },
        authority: {
          type: "select",
          label: "권한",
          required: true,
          options: accountInfo.authorOptions,
          config: {
            placeholder: "권한을 선택해주세요"
          }
        },
        name: {
          type: "input",
          label: "이름",
          required: true,
          config: {
            placeholder: "이름을 입력해주세요"
          }
        },
        position: {
          type: "select",
          label: "직책",
          options: accountInfo.positionOptions,
          config: {
            placeholder: "직책을 선택해주세요"
          }
        },
        email: {
          type: "input",
          label: "이메일",
          config: {
            placeholder: "이메일을 입력해주세요"
          }
        },
        phone: {
          type: "input",
          label: "전화번호",
          config: {
            placeholder: "전화번호를 입력해주세요"
          }
        }
      }
    };
  }

  handleEdit = () => {
    const { editAble } = this.state;
    this.setState({
      editAble: !editAble,
      btnLoading: false
    });
  };

  handleValidate = values => {
    const error = {};
    // if (values.photoList.fileList.length < 5) {
    //   error.photoList = "사진을 5장 이상 입력하셔야 합니다";
    // }
    return error;
  };

  handleCancel = () => {
    this.formRef.resetForm(initialFormValues);
    this.handleEdit();
  };

  handleSubmit = (values, actions) => {
    console.log(values, actions, "submit");
    this.setState({
      btnLoading: true
    });
    setTimeout(this.handleEdit, 2000);
  };

  render() {
    const { formSheet, editAble, btnLoading } = this.state;
    const disabled = !editAble;
    return (
      <Container>
        <FormLayout>
          <FormBuilder
            formRef={form => {
              this.formRef = form;
            }}
            hideRequiredMark={disabled}
            initialValues={initialFormValues}
            formData={formSheet}
            validationSchema={FormSchema}
            onSubmit={this.handleSubmit}
            validate={this.handleValidate}
            config={{ disabled }}
            renderSubmitComponents={() => (
              <FormFooterAction
                onClick={e => {
                  if (disabled) {
                    e.preventDefault();
                    this.handleEdit();
                  }
                }}
                onCancelClick={e => {
                  e.preventDefault();
                  this.handleCancel();
                }}
                editAble={editAble}
                confirmTitle={disabled ? "수정" : "확인"}
                cancelTitle="취소"
                hideCancelButton={disabled}
                confirmLoading={btnLoading}
              />
            )}
          />
        </FormLayout>
      </Container>
    );
  }
}

export default Form.create()(DefaultInfo);
