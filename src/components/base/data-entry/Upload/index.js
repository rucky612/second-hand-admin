/* eslint-disable react/require-default-props */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Icon, Upload } from "antd";
import Modal from "../../feedback/Modal";
import strings from "../../../../localization/strings-base-components";

const { Dragger } = Upload;
const DisabledCss = css`
  .ant-upload-list.ant-upload-list-picture-card {
    opacity: 0.7;
    cursor: not-allowed;
    .ant-upload-list-item:hover {
      background: none;
      .ant-upload-list-item-info {
        background-color: #f3f0ff;
        &:before {
          opacity: 0;
        }
      }
      .ant-upload-list-item-actions {
        opacity: 0;
        a {
          pointer-events: none;
        }
        .anticon {
          pointer-events: none;
        }
      }
    }
  }
`;

const CustomUpload = styled(Upload)`
  & {
    .ant-upload.ant-upload-select.ant-upload-select-picture-card.ant-upload-disabled {
      border-color: #ebedf2;
      cursor: not-allowed;
    }
    .ant-upload-list-picture-card .ant-upload-list-item {
      width: 102px;
      height: 102px;
    }
  }
  ${props => props.disabled && DisabledCss}
`;

const CustomDragger = styled(Dragger)`
  & {
    .ant-upload.ant-upload-drag {
      margin-bottom: 18px;
    }
  }
  ${props => props.disabled && DisabledCss}
`;

class SGUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewImage: ""
    };
  }

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
  };

  handlePreview = file => {
    this.toggleModal();
    this.setState({
      previewImage: file.url || file.thumbUrl
    });
  };

  renderDragger = ({ fileList, onChange, disabled, onRemove, ...rest }) => (
    <CustomDragger
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={this.handlePreview}
      onRemove={!disabled && onRemove}
      disabled={disabled}
      {...rest}
    >
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">클릭 또는 드래그로 사진을 올려주세요.</p>
    </CustomDragger>
  );

  render() {
    const {
      fileList,
      onChange,
      maxUpload,
      buttonTitle,
      onRemove,
      disabled,
      multiple,
      ...rest
    } = this.props;
    const { visible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{buttonTitle}</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Modal
          title={strings.UPLOAD_MODAL_TITLE}
          visible={visible}
          footer={null}
          onCancel={this.toggleModal}
          mask={false}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        {
          multiple
            ? this.renderDragger(this.props)
            : (
              <CustomUpload
              // action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={this.handlePreview}
                onRemove={!disabled && onRemove}
                disabled={disabled}
                {...rest}
              >
                {fileList.length >= maxUpload ? null : uploadButton}
              </CustomUpload>
            )
        }
      </div>
    );
  }
}

SGUpload.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fileList: PropTypes.arrayOf(PropTypes.shape),
  onPreview: PropTypes.func,
  onRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onChange: PropTypes.func,
  maxUpload: PropTypes.number,
  buttonTitle: PropTypes.string,
  disabled: PropTypes.bool
};

SGUpload.defaultProps = {
  fileList: [],
  onChange: () => {},
  maxUpload: 3,
  buttonTitle: "Upload",
  disabled: false
};

export default SGUpload;
