import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { darken } from "polished";
import SGButton from "../../../common/Button";
import Menus from "../../../nav/Menus";
import MenusItem from "../../../nav/Menus/MenusItem";
import MenusDivder from "../../../nav/Menus/MenusDivider";
import RouteUrls from "../../../../../constants/route-urls";
import UrlTitle from "../../../../../constants/url-breadcomb-title";

const MenuHeader = styled.div`
  display: table;
  padding: 25px 20px;
  table-layout: fixed;
  background-color: ${props => props.theme.brand};
`;

const AvatarWrap = styled.div`
  display: table-cell;
  text-align: right;
  padding: 0 5px 0 0;
  vertical-align: middle;
  width: 70px;
`;

const AvatarDetail = styled.div`
  display: table-cell;
  width: 100%;
  text-align: left;
  vertical-align: middle;
  padding: 0 0 0 15px;
`;

const DetailText = styled.span`
  display: block;
  padding: 0;
  font-size: 1.69rem;
  font-weight: 400;
  color: #d9dae3;
`;

const DetailEmail = styled.span`
  display: inline-block;
  padding: 0 0 0 0;
  font-size: 1.3rem;
  color: #cbccd8;
`;

const MenuContent = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 15px 1px rgba(69, 65, 78, 0.2);
`;

const LogoutBtn = styled(props => (
  <SGButton bgcolor="secondary" outline size="small" {...props} />
))`
&& {
  border-radius: 60px;
  padding: 0.975rem 2.6rem;
  color: ${props => props.theme.brand}
  font-size: 1.3rem;
  line-height: 1.25;
  &:hover {
    color: ${props => props.theme.brand}
    background-color: ${props => darken(0.1, props.theme.white)};
  }
 }
`;

const DropdownContent = () => (
  <Menus>
    <MenusItem
      key="1"
      contentText={UrlTitle[RouteUrls.ACCOUNT_DEFAULT]}
      size={1.3}
      icon="la la-male"
      link={RouteUrls.ACCOUNT_DEFAULT}
    />
    <MenusItem
      key="2"
      contentText={UrlTitle[RouteUrls.ACCOUNT_USER]}
      size={1.3}
      icon="la la-user"
      link={RouteUrls.ACCOUNT_USER}
    />
    <MenusItem
      key="3"
      contentText={UrlTitle[RouteUrls.ACCOUNT_HISTORY]}
      size={1.3}
      icon="la la-history"
      link={RouteUrls.ACCOUNT_HISTORY}
    />
    <MenusDivder key="4" style={{ borderBottom: 0 }} />
    <MenusItem key="5">
      <LogoutBtn>Logout</LogoutBtn>
    </MenusItem>
  </Menus>
);

const HeaderProfile = () => (
  <div>
    <MenuHeader>
      <AvatarWrap>
        <Avatar
          size={70}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          icon="user"
        />
      </AvatarWrap>
      <AvatarDetail>
        <DetailText>회사명</DetailText>
        <DetailEmail>김김김</DetailEmail>
      </AvatarDetail>
    </MenuHeader>
    <MenuContent>{DropdownContent()}</MenuContent>
  </div>
);

export default HeaderProfile;
