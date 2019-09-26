import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Avatar } from "antd";
import DropDown from "../../nav/Dropdown";
import HeaderProfile from "./HeaderProfile";

const Container = styled.header`
  display: table;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  background: ${props => props.theme.colorWhite};
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0 1px 15px 1px ${props => props.theme.colorDefaultShadow};
  z-index: 100;
  overflow: hidden;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: table-cell;
  vertical-align: top;
  width: ${props =>
    props.theme.drawerExpanded
      ? props.theme.drawerWidth
      : props.theme.drawerWidthMinimized};
  height: 100%;
  background: ${props => props.theme.colorMenuHeaderCollapse};
  transition: all 0.3s;
`;

const LogoWrapper = styled.div`
  display: table;
  position: relative;
  padding: 0 30px;
  height: 100%;
  width: 100%;
`;

const LogoTitle = styled.span`
  display: ${props => (props.theme.drawerExpanded ? "table-cell" : "none")};
  vertical-align: middle;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colorWhite2}
  letter-spacing: 2px;
  transition: all 0.3s;
`;

const ToggleButtonWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: right;
  visibility: hidden;
`;

const ToggleIcon = styled.i`
  font-size: 2.2rem;
  color: ${props => props.theme.colorMenuIconNormal};
  text-align: center;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.colorMenuIconSelected};
  }
  transition: color 0.3s;
`;

const HeaderWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  width: auto;
  height: 100%;
  float: right;
`;

const ContentList = styled.ul`
  list-style: none;
  display: table;
  height: 100%;
  margin: 0 20px 0 30px;
`;

const ContentItem = styled.li`
  display: table-cell;
  height: 100%;
  vertical-align: middle;
  padding: 0 12px;
`;

function Header(props) {
  const { onToggle } = props;

  return (
    <Container>
      <LogoContainer>
        <LogoWrapper>
          <LogoTitle>TITLE ERP</LogoTitle>
          <ToggleButtonWrapper>
            <ToggleIcon className="fas fa-bars" onClick={onToggle} />
          </ToggleButtonWrapper>
        </LogoWrapper>
      </LogoContainer>
      <HeaderWrapper>
        <ContentList>
          <ContentItem>
            <DropDown
              width="325px"
              placement="bottomRight"
              arrowType="right"
              arrowColor="brand"
              trigger={["click"]}
              overlay={<HeaderProfile />}
              arrowAble
            >
              <Avatar
                size={41}
                icon="user"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </DropDown>
          </ContentItem>
        </ContentList>
      </HeaderWrapper>
    </Container>
  );
}

Header.propTypes = {
  onToggle: PropTypes.func
};

Header.defaultProps = {
  onToggle: () => {}
};

export default Header;
