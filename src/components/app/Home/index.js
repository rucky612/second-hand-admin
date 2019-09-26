import React, { Component } from "react";
import { Row, Col } from "antd";
import constants from "./constants";
import PageLayout from "../../base/layout/SubContent/index";
import UrlTitle from "../../../constants/url-breadcomb-title";
import RouteUrl from "../../../constants/route-urls";
import HomePaper from "./HomePaper";

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPaper = () =>
    Object.keys(constants).map(key => (
      <Col span={12} key={key}>
        <HomePaper formItemLayout={formItemLayout} mockString={constants[key]} />
      </Col>
    ));

  render() {
    return (
      <PageLayout headTitle={UrlTitle[RouteUrl.HOME]} breadCrumbAble>
        <Row gutter={28.6}>
          {this.renderPaper()}
        </Row>
      </PageLayout>
    );
  }
}

export default Home;
