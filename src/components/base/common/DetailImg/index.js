import React, { Component } from "react";
import styled from "styled-components"
import { Avatar } from "antd";
import PropTypes from "prop-types";
import Modal from "../../feedback/Modal";
import strings from "../../../../localization/strings-base-components";

const CustomAvatar = styled(Avatar)`
  &:hover {
    opacity: 0.8;
  }
`

class DetailImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
  };

  render() {
    const { imgArr, icon, avatarStyle } = this.props;
    const { visible } = this.state;
    return (
      // eslint-disable-next-line
      <div>
        <Modal
          title={strings.DETAIL_IMG_MODAL_TITLE}
          visible={visible}
          onCancel={this.toggleModal}
          onOk={this.toggleModal}
          footer={null}
        >
          {/*<img src={src} alt={alt} />*/}
        </Modal>
        <CustomAvatar
          src={imgArr[0].src}
          alt={imgArr[0].alt}
          style={avatarStyle}
          icon={icon}
          onClick={this.toggleModal}
        />
      </div>
    );
  }
}

DetailImg.propTypes = {
  // eslint-disable-next-line
  // imgArr: PropTypes.array(PropTypes.shape({
  //   src: PropTypes.string.isRequired,
  //   alt: PropTypes.string.isRequired,
  // })).isRequired,
  // eslint-disable-next-line
  avatarStyle: PropTypes.object,
  // eslint-disable-next-line
  icon: PropTypes.string
};

export default DetailImg;
