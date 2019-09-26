/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Layout from "../../../base/layout/SubContent";
import AccountInfo from "./AccountInfo";
import DefaultInfo from "./DefaultInfo";
import Tab from "../../../base/data-display/Tabs/Tab";
import withTabRouter from "../../../base/data-display/PaperTab/withTabRouter";
import PaperTabs from "../../../base/data-display/PaperTab";
import LoginHistories from "../../common/LoginHistories";
import RouteUrls from "../../../../constants/route-urls";
import UrlTitle from "../../../../constants/url-breadcomb-title";

const Wrapper = styled.div`
  padding: 3rem;
`;

const Account = ({ activeKey, onTabChange }) => (
  <Layout headTitle={UrlTitle[RouteUrls.ACCOUNT]} breadCrumbAble>
    <PaperTabs activeKey={activeKey} onChange={onTabChange}>
      <Tab
        tab={UrlTitle[RouteUrls.ACCOUNT_DEFAULT]}
        key="default"
      >
        <Wrapper>
          <DefaultInfo />
        </Wrapper>
      </Tab>
      <Tab tab={UrlTitle[RouteUrls.ACCOUNT_USER]} key="user">
        <Wrapper>
          <AccountInfo />
        </Wrapper>
      </Tab>
      <Tab
        tab={UrlTitle[RouteUrls.ACCOUNT_HISTORY]}
        key="history"
      >
        <LoginHistories />
      </Tab>
    </PaperTabs>
  </Layout>
);

export default withTabRouter(Account);
