import React from "react";
import PropTypes from "prop-types";
import AddressItem from "./AddressItem";

function AddressList({ addressList, onSelect }) {
  const renderAddressItem = () =>
    addressList.map(address => (
      <AddressItem
        key={address.jibunAddress}
        zipCode={address.zipCode}
        jibunAddress={address.jibunAddress}
        roadAddress={address.roadAddress}
        onSelect={() => {
          onSelect(address);
        }}
      />
    ));
  return (
    <div>
      <ul>{renderAddressItem()}</ul>
    </div>
  );
}

const Address = {
  zipCode: PropTypes.string,
  roadAddress: PropTypes.string,
  jibunAddress: PropTypes.string
};

AddressList.propTypes = {
  addressList: PropTypes.arrayOf(PropTypes.shape(Address)),
  onSelect: PropTypes.func
};

AddressList.defaultProps = {
  addressList: [],
  onSelect: () => {}
};

export default AddressList;
