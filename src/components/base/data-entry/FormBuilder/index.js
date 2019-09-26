import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Formik } from 'formik';
import { Checkbox } from 'antd';
import Input from '../Input';
import TextArea from '../TextArea';
import Select2 from '../Select';
import DatePicker from '../DatePicker';
import Upload from '../Upload';
import Repeater from '../../data-display/Table2/Repeater';
import RowRepeater from '../../data-display/Table2/RowRepeater';
import ErrorOnScroll from './ErrorOnScroll';
import FormItem from '../FormItem';

const formItemLayout = {
  labelCol: {
    xl: { span: 7 },
    lg: { span: 7 },
  },
  wrapperCol: {
    xl: { span: 17 },
    lg: { span: 17 },
  },
};

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
  }

  componentDidMount() {
    this.initialValueSetup = false;
  }

  handleFormSubmit = (values, actions) => {
    const { onSubmit } = this.props;
    onSubmit(values, actions, this.resetForm);
  };

  createTextArea = (
    key,
    data,
    { setFieldValue, setFieldTouched, errors, touched },
    config,
  ) => {
    const { initialValues } = this.props;
    const hasError = !!(errors[key] && touched[key]);
    return (
      <TextArea
        hasError={hasError}
        id={key}
        name={key}
        onBlur={() => {
          setFieldTouched(key, true);
        }}
        onChange={e => {
          const { value } = e.target;
          // eslint-disable-next-line
          _.debounce(function() {
            setFieldValue(key, value);
          }, 500)();
        }}
        getNode={node => {
          // Initial Value 설정.
          if (!this.inputRefs[key] && initialValues[key]) {
            this.inputRefs[key] = node;
            this.inputRefs[key].textAreaRef.value = initialValues[key];
          }
        }}
        size="large"
        {...data.config}
        {...config}
      />
    );
  };

  createInput = (
    key,
    data,
    { setFieldValue, setFieldTouched, errors, touched },
    config,
  ) => {
    const { initialValues } = this.props;
    const hasError = !!(errors[key] && touched[key]);
    return (
      <Input
        hasError={hasError}
        id={key}
        name={key}
        onBlur={() => {
          setFieldTouched(key, true);
        }}
        onChange={e => {
          const { value } = e.target;
          // eslint-disable-next-line
          _.debounce(function() {
            setFieldValue(key, value);
          }, 500)();
        }}
        getNode={node => {
          // Initial Value 설정.
          if (!this.inputRefs[key] && initialValues[key]) {
            this.inputRefs[key] = node;
            this.inputRefs[key].input.value = initialValues[key];
          } else if (false) {
            this.inputRefs[key].input.value = '11';
          }
        }}
        size="large"
        {...data.config}
        {...config}
      />
    );
  };

  createCheckBoxGroup = (key, data, { setFieldValue, values }, config) => {
    const { initialValues } = this.props;
    return (
      <Checkbox.Group
        id={key}
        options={data.options}
        value={
          values[key] && values[key].length > 0
            ? values[key]
            : [...initialValues[key]]
        }
        onChange={checkedValues => {
          setFieldValue(key, checkedValues);
        }}
        {...data.config}
        {...config}
      />
    );
  };

  createSelect = (
    key,
    data,
    { setFieldValue, handleBlur, errors, touched, values },
    config,
  ) => {
    const { initialValues } = this.props;
    const hasError = !!(errors[key] && touched[key]);
    return (
      <Select2
        id={key}
        options={data.options}
        onChange={value => {
          setFieldValue(key, value);
        }}
        value={values[key] ? values[key] : initialValues[key]}
        onBlur={handleBlur}
        hasError={hasError}
        size="large"
        menuPosition="fixed"
        {...data.config}
        isDisabled={config.disabled ? config.disabled : false}
      />
    );
  };

  createDatePicker = (
    key,
    data,
    { setFieldValue, setFieldTouched, values, errors, touched },
    config,
  ) => {
    const hasError = !!(errors[key] && touched[key]);
    const { initialValues } = this.props;
    return (
      <DatePicker
        id={key}
        onChange={date => {
          setFieldValue(key, date);
        }}
        onBlur={() => {
          setFieldTouched(key, true);
        }}
        selectedDay={values[key] || initialValues[key]}
        hasError={hasError}
        size="large"
        {...data.config}
        {...config}
      />
    );
  };

  createUpload = (
    key,
    data,
    { setFieldValue, setFieldTouched, values },
    config,
  ) => {
    const { initialValues } = this.props;
    const defaultList =
      initialValues[key] && initialValues[key].fileList
        ? initialValues[key].fileList
        : [];
    const fileList =
      values[key] && values[key].fileList ? values[key].fileList : defaultList;
    return (
      <Upload
        id={key}
        name={key}
        fileList={fileList}
        onChange={({ fileList }) => {
          setFieldTouched(key, true);
          setFieldValue(key, {
            fileList,
          });
        }}
        {...data.config}
        {...config}
      />
    );
  };

  createTableRepeater = (key, data, { setFieldValue, errors }, config) => {
    const { columns } = data;
    const { disabled } = config;
    return (
      <Repeater
        id={key}
        errors={errors[key]}
        columnInfos={columns}
        disabled={disabled}
        onDataChange={rows => {
          setFieldValue(key, rows);
        }}
      />
    );
  };

  createTableRowRepeater = (key, data, { setFieldValue, errors }, config) => {
    const { columns, onDataChange, changeColumn } = data;
    const { disabled } = config;
    return (
      <RowRepeater
        id={key}
        errors={errors[key]}
        columnInfos={columns}
        disabled={disabled}
        changeColumn={changeColumn}
        onDataChange={(rows, i, k) => {
          if (onDataChange) onDataChange(rows, i, k);
          setFieldValue(key, rows);
        }}
      />
    );
  };

  createCustomRender = (key, data, renderProps) => (
    <React.Fragment key={key}>{data.render(renderProps)}</React.Fragment>
  );

  renderFormControls = (formData, renderProps, config) => {
    const { errors, touched } = renderProps;
    const { hideRequiredMark } = this.props;

    return Object.keys(formData).map(key => {
      const data = formData[key];
      const formLayout =
        data.config && data.config.formItemLayout
          ? data.config.formItemLayout
          : data.config && data.config.align === 'vertical'
          ? {}
          : formItemLayout;
      const validateStatus = errors[key] && touched[key] ? 'error' : 'success';
      const message =
        errors[key] && touched[key] && data.type !== 'tableRepeater'
          ? errors[key]
          : '';
      let component = null;
      switch (data.type) {
        case 'input':
          component = this.createInput(key, data, renderProps, config);
          break;
        case 'textArea':
          component = this.createTextArea(key, data, renderProps, config);
          break;
        case 'select':
          component = this.createSelect(key, data, renderProps, config);
          break;
        case 'datePicker':
          component = this.createDatePicker(key, data, renderProps, config);
          break;
        case 'upload':
          component = this.createUpload(key, data, renderProps, config);
          break;
        case 'custom':
          component = this.createCustomRender(key, data, {
            ...renderProps,
            formLayout,
            validateStatus,
            message,
          });
          break;
        case 'tableRepeater':
          component = this.createTableRepeater(key, data, renderProps, config);
          break;
        case 'checkbox':
          component = this.createCheckBoxGroup(key, data, renderProps, config);
          break;
        case 'rowRepeater':
          component = this.createTableRowRepeater(
            key,
            data,
            renderProps,
            config,
          );
          break;
        default:
          return null;
      }

      return data.type === 'custom' ? (
        component
      ) : (
        <FormItem
          key={key}
          label={data.label}
          {...formLayout}
          validateStatus={validateStatus}
          help={message}
          required={data.required}
          hideRequiredMark={hideRequiredMark}
        >
          {component}
        </FormItem>
      );
    });
  };

  handleValidation = values => {
    const { validate } = this.props;
    return validate && validate(values);
  };

  setInitialValues = initialValues => {
    if (!this.initialValueSetup) {
      Object.keys(initialValues).forEach(key => {
        const ref = this.inputRefs[key];
        if (ref) {
          ref.value = initialValues[key];
        }
      });
      this.initialValueSetup = true;
    }
  };

  handleResetAll = resetForm => {
    const { initialValues } = this.props;
    if (this.initialValueSetup) {
      Object.keys(initialValues).forEach(key => {
        const ref = this.inputRefs[key];
        if (ref) {
          ref.input.value = initialValues[key];
        }
      });
      resetForm();
    }
  };

  render() {
    const {
      initialValues,
      formData,
      validationSchema,
      renderSubmitComponents,
      config,
      formRef,
      style,
      className,
    } = this.props;

    return (
      <Formik
        enableReinitialize
        ref={node => {
          if (formRef) {
            formRef(node);
          }
        }}
        validateOnBlur
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          this.actions = actions;
          this.handleFormSubmit(values, actions, this.resetForm);
        }}
        validate={this.handleValidation}
        validationSchema={validationSchema}
        render={renderProps => {
          const { bindSubmit } = this.props;
          const { handleSubmit, handleReset } = renderProps;
          if (typeof bindSubmit === 'function') {
            bindSubmit(renderProps.submitForm);
          }
          return (
            <form onSubmit={handleSubmit} className={className} style={style}>
              {this.renderFormControls(formData, renderProps, config)}
              {renderSubmitComponents &&
                renderSubmitComponents(handleSubmit, () =>
                  this.handleResetAll(handleReset),
                )}
              <ErrorOnScroll />
              {this.setInitialValues(initialValues)}
            </form>
          );
        }}
      />
    );
  }
}

FormBuilder.propTypes = {
  // eslint-disable-next-line
  initialValues: PropTypes.object.isRequired,
  // eslint-disable-next-line
  formData: PropTypes.object.isRequired,
  validate: PropTypes.func,
  // eslint-disable-next-line
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  bindSubmit: PropTypes.func,
  renderSubmitComponents: PropTypes.func.isRequired,
  // eslint-disable-next-line
  config: PropTypes.object,
  hideRequiredMark: PropTypes.bool,
  formRef: PropTypes.func,
};

FormBuilder.defaultProps = {
  validate: () => {},
  validationSchema: {},
  config: {},
  hideRequiredMark: false,
  formRef: null,
  bindSubmit: null,
};

export default FormBuilder;
