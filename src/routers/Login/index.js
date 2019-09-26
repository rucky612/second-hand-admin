/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import styled from 'styled-components';
import { darken } from 'polished';
import SGButton from '../../components/base/common/Button';
import mockAuth from './constants';
import FormBuilder from '../../components/base/data-entry/FormBuilder';
import Paper from '../../components/base/data-display/Paper';
import strings from '../../localization/strings-login-form';

const FormSchema = Yup.object().shape({
  id: Yup.string().required(strings.FORM_ERR_ID),
  password: Yup.string().required(strings.FORM_ERR_PASSWORD),
});

const LoginBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => darken(0.2, props.theme.primary)};
`;

const FormPaper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate3d(-50%, -60%, 0);
  border-radius: 4px;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  background-color: ${props => props.theme.white};
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTo: false,
      initialValues: {
        id: '',
        password: '',
      },
      formData: {
        id: {
          type: 'input',
          label: strings.FORM_LABEL_ID,
          required: true,
          config: {
            placeholder: strings.FORM_PH_ID,
          },
        },
        password: {
          type: 'input',
          label: strings.FORM_LABEL_PASSWORD,
          required: true,
          config: {
            type: 'password',
            autoComplete: 'off',
            placeholder: strings.FORM_PH_PASSWORD,
          },
        },
      },
    };
  }

  handleValidate = () => {};

  handleSubmit = () => {
    this.setState({ redirectTo: false });
    mockAuth.authenticate(() => {
      this.setState({ redirectTo: true });
    });
  };

  render() {
    const { initialValues, formData, redirectTo } = this.state;
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: '/home' } };
    if (redirectTo || mockAuth.isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <LoginBack>
        <FormPaper>
          <Paper paperTitle={strings.TITLE_LOGIN} style={{ marginBottom: '0' }}>
            <FormBuilder
              hideRequiredMark
              initialValues={initialValues}
              validationSchema={FormSchema}
              formData={formData}
              validate={this.handleValidate}
              onSubmit={this.handleSubmit}
              renderSubmitComponents={() => (
                <SGButton
                  onClick={e => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                  block
                  loading={mockAuth.isAuthenticated}
                  style={{ marginTop: '15px' }}
                >
                  로그인
                </SGButton>
              )}
            />
          </Paper>
        </FormPaper>
      </LoginBack>
    );
  }
}

export default Login;
