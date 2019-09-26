import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Row, Col, Tag } from "antd";

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 20px 10px;
  transition: background-color 0.3s;
  :hover {
    background-color: #f7f8fa;
  }
`;

const AddressTitle = styled.p`
	display: inline-block;
	margin: 0;
`;

const ZipCodeTitle = styled.div`
  text-align: right;
  vertical-align: middle;
`;

const CustomTag = styled(Tag)`
  min-width: 50px;
  text-align: center;
  && {
    margin-right: 16px;
  }
`;

function AddressItem({ zipCode, roadAddress, jibunAddress, onSelect }) {
  return (
    <li>
      <Container onClick={onSelect}>
        <Row type="flex" align="middle">
          <Col span={20}>
            <div>
              <CustomTag>도로명</CustomTag>
              <AddressTitle>{roadAddress}</AddressTitle>
            </div>
            <div style={{ marginTop: "10px" }}>
              <CustomTag>지번</CustomTag>
              <AddressTitle>{jibunAddress}</AddressTitle>
            </div>
          </Col>
          <Col span={4}>
            <ZipCodeTitle>{zipCode}</ZipCodeTitle>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

AddressItem.propTypes = {
  zipCode: PropTypes.string,
  roadAddress: PropTypes.string,
  jibunAddress: PropTypes.string,
  onSelect: PropTypes.func
};

AddressItem.defaultProps = {
  zipCode: "",
  roadAddress: "",
  jibunAddress: "",
  onSelect: () => {}
};

export default AddressItem;
