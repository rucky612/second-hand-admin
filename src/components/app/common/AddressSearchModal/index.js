import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Alert } from "antd";
import Modal from "../../../base/feedback/Modal";
import Search from "../../../base/data-entry/Search";
import AddressList from "./AddressList";
import * as mockAddress from "../../utils/mockAddress";

const ModalContent = styled.div`
  //margin-top: 20px;
  //min-height: 400px;
  //max-height: 600px;
  //overflow-y: auto;
`;

class AddressSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      addressList: []
    };
  }

  handleSearch = async e => {
    if (e && e.target && e.target.value) {
      const searchOpts = {
        confmKey: mockAddress.ADDRESS_KEY,
        currentPage: 1,
        countPerPage: 10,
        keyword: e.target.value,
        resultType: "json"
      };
      const res = await axios.post(mockAddress.ADDRESS_URL, null, {
        params: searchOpts
      });
      if (!res.data.results.juso) {
        this.setState({
          error: res.data.results.common.errorMessage
            ? res.data.results.common.errorMessage
            : "주소를 상세히 입력해주세요"
        });
      }
      if (res.data && res.data.results && res.data.results.juso) {
        this.setState({
          error: "",
          addressList: res.data.results.juso.map(address => ({
            zipCode: address.zipNo,
            roadAddress: address.roadAddr,
            jibunAddress: address.jibunAddr
          }))
        });
      }
    }
  };

  handleAddressSelect = address => {
    const { onSelectAddress } = this.props;
    onSelectAddress(address);
  };

  // eslint-disable-next-line
  renderError = () => {
    const { error } = this.state;
    if (error && error.length !== 0) {
      return (
        <Alert
          message={error}
          showIcon
          closable
          style={{ marginBottom: "10px" }}
          type="error"
        />
      );
    }
  };

  render() {
    const { addressList } = this.state;
    const { visible, onCancel } = this.props;

    return (
      <Modal
        destroyOnClose
        visible={visible}
        width="630px"
        title="주소 검색"
        centered
        footer={null}
        onCancel={onCancel}
      >
        {this.renderError()}
        <Search
          onBlur={this.handleSearch}
          placeholder="도로명 또는 지번주소를 입력해주세요"
          size="large"
        />
        <ModalContent>
          <AddressList
            addressList={addressList}
            onSelect={this.handleAddressSelect}
          />
        </ModalContent>
      </Modal>
    );
  }
}

AddressSearchModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSelectAddress: PropTypes.func.isRequired
};

AddressSearchModal.defaultProps = {
  visible: false,
  onCancel: () => {}
};

export default AddressSearchModal;
