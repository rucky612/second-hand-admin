import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleApiWrapper, Map } from "google-maps-react";
import _ from "lodash";
import styled from "styled-components";
import FormItem from "../../../base/data-entry/FormItem";
import Input from "../../../base/data-entry/Input";
import Button from "../../../base/common/Button";
import AddressSearchModal from "../AddressSearchModal";
import strings from "../../../../localization/strings-address-form";
import commonStrings from "../../../../localization/strings-common";
import { GOOGLE_MAP_API_KEY } from "../../../../config/keys";

const MapStyled = styled(Map)`
  position: relative !important;
  height: 200px !important;
`;

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

const formItemNoLabelLayout = {
  wrapperCol: { xl: { span: 17, offset: 7 }, lg: { span: 17, offset: 7 } }
};

class AddressInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      addressData: {
        roadAddress: "",
        jibunAddress: "",
        zipCode: "",
        detailAddress: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { address } = this.props;
    const { address: nextAddress } = nextProps;

    if (address && !_.isEqual(address, nextProps)) {
      this.setState({
        addressData: nextAddress
      });
      if (this.addressDetailInput) {
        this.addressDetailInput.value = nextAddress.detailAddress;
      }
    }
  }

  toggleAddressSearchModal = isOpen => {
    this.setState({
      modalOpen: isOpen
    });
  };

  renderAddressForm = () => {
    const { addressData = {} } = this.state;
    const { disabled, label, google } = this.props;
    return (
      <div style={{ padding: "10px 0" }}>
        <FormItem
          label={label}
          {...formItemLayout}
          offsetTop={0}
          offsetBottom={10}
        >
          <div style={{ display: "flex" }}>
            <Input
              value={addressData.zipCode || ""}
              size="large"
              style={{ width: "80px" }}
              placeholder={strings.FORM_PH_ZIP_CODE}
              disabled
            />
            <Input
              value={addressData.roadAddress || ""}
              size="large"
              style={{ marginLeft: "10px" }}
              placeholder={strings.FORM_PH_ADDRESS}
              disabled
            />
            <Button
              disabled={disabled}
              style={{ marginLeft: "10px" }}
              icon="search"
              outline
              onClick={() => {
                this.toggleAddressSearchModal(true);
              }}
              bgcolor="primary"
            >
              {commonStrings.TITLE_SEARCH}
            </Button>
          </div>
        </FormItem>
        <FormItem {...formItemNoLabelLayout} offsetTop={0} offsetBottom={10}>
          <Input
            getNode={node => {
              if (node && node.input) {
                this.addressDetailInput = node.input;
              }
            }}
            onBlur={this.handleDetailAddressChange}
            disabled={disabled}
            size="large"
            placeholder={strings.FORM_PH_ADDRESS_DETAIL}
          />
        </FormItem>
        <FormItem {...formItemNoLabelLayout} offsetTop={0} offsetBottom={0}>
          <MapStyled google={google} />
        </FormItem>
      </div>
    );
  };

  setAddress = newAddress => {
    const { addressData } = this.state;
    this.setState({
      addressData: {
        ...addressData,
        newAddress
      }
    });
  };

  handleSelectAddress = address => {
    this.setAddress(address);
    const { onAddressChange } = this.props;
    this.toggleAddressSearchModal(false);
    onAddressChange(address);
    setTimeout(() => {
      this.addressDetailInput.focus();
    }, 50);
  };

  handleDetailAddressChange = e => {
    const { value } = e.target;
    const { addressData } = this.state;
    const { onAddressChange } = this.props;

    const updated = {
      ...addressData,
      detailAddress: value
    };
    this.setState({
      addressData: updated
    });
    onAddressChange(updated);
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <div>
        {this.renderAddressForm()}
        <AddressSearchModal
          visible={modalOpen}
          onSelectAddress={this.handleSelectAddress}
          onCancel={() => {
            this.toggleAddressSearchModal(false);
          }}
        />
      </div>
    );
  }
}

AddressInputForm.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onAddressChange: PropTypes.func.isRequired,
  // eslint-disable-next-line
  address: PropTypes.object
};

AddressInputForm.defaultProps = {
  label: strings.TITLE_ADDRESS,
  disabled: false,
  address: null
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(AddressInputForm);
