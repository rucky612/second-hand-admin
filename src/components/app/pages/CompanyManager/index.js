import React, { Component } from "react";
import PropTypes from "prop-types";
import withTabRouter from "../../../base/data-display/PaperTab/withTabRouter";
import SubContent from "../../../base/layout/SubContent";
import PaperTab from "../../../base/data-display/PaperTab";
import Tab from "../../../base/data-display/Tabs/Tab";
import CompanyInfo from "./CompanyInfo";
import ExtraInfo from "./ExtraInfo";
import strings from "../../../../localization/strings-company-manager";

const tabData = {
  businessInfo: {
    title: strings.TAB_TITLE_BUSINESS_INFO,
    component: <CompanyInfo />
  },
  extraInfo: {
    title: strings.TAB_TITLE_EXTRA_INFO,
    component: <ExtraInfo />
  }
};

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTabs = () =>
    Object.keys(tabData).map(key => (
      <Tab tab={tabData[key].title} key={key}>
        {tabData[key].component}
      </Tab>
    ));

  render() {
    const { activeKey, onTabChange } = this.props;
    return (
      <SubContent headTitle={strings.SUB_HEADER_COMPANY_INFO} breadCrumbAble>
        <PaperTab activeKey={activeKey} onChange={onTabChange}>
          {this.renderTabs()}
        </PaperTab>
      </SubContent>
    );
  }
}

Company.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};
export default withTabRouter(Company, "businessInfo");
