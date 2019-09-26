import React, { Component } from "react";
import { withRouter } from "react-router"
import styled from "styled-components";
import menus from "../../../../constants/drawer-menus";
import MenuItem from "../MenuItem";
import MenuSection from "../MenuItem/MenuSection";

const List = styled.ul`
  padding: 30px 0 30px 0;
`;

const ChildList = styled.ul`
  overflow: hidden;
  max-height: ${props => (props.isExpanded ? `${props.maxHeight}px` : "0")};
  transition: all 0.3s;
`;

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandStatus: {},
      activeKey: ""
    };
  }

  componentWillMount() {
    // eslint-disable-next-line
    const { history } = this.props;
    this.updateActiveMenu(history.location.pathname);
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps, nextContext) {
    const { activeKey } = this.state
    const { history: newHistory } = nextProps;
    const newPath = newHistory.location.pathname;
    if (activeKey !== newPath.slice(1)) {
      this.updateActiveMenu(newPath);
    }
  }

  updateActiveMenu = pathName => {
    let activeKey = "";
    const expandStatus = {};
    for (let i = 0; i < menus.length; i++) {
      const pathInclude =
        pathName.indexOf(menus[i].url) !== -1 &&
        menus[i].url &&
        menus[i].url.length > 0;
      if (pathInclude) {
        activeKey = menus[i].key;
        break;
      } else if (menus[i].children && menus[i].children.length > 0) {
        for (let j = 0; j < menus[i].children.length; j++) {
          const pathInclude =
            pathName.indexOf(menus[i].children[j].url) !== -1 &&
            menus[i].children[j].url &&
            menus[i].children[j].url.length > 0;
          if (pathInclude) {
            expandStatus[menus[i].key] = true;
            activeKey = menus[i].children[j].key;
            break;
          }
        }
      }
    }
    this.setState({
      activeKey,
      expandStatus
    });
  };

  handleMenuItemClick = menu => {
    const hasChildren = menu.children && menu.children.length > 0;
    if (hasChildren) {
      const { expandStatus } = this.state;
      const isExpanded = !expandStatus[menu.key];
      this.setState({
        expandStatus: {
          [menu.key]: isExpanded
        }
      });
    } else {
      const { history } = this.props;
      if (history.location.pathname.indexOf(menu.url) === -1) {
        history.push(menu.url);
      } else {
        history.replace(menu.url)
      }
    }
  };

  renderMenuItems = (menuList, isSubMenu = false) => {
    const { expandStatus, activeKey } = this.state;
    return menuList.map(menu => {
      const isActive = menu.key === activeKey;
      const hasChildren = menu.children && menu.children.length > 0;
      const isExpanded = expandStatus[menu.key] === true;

      if (menu.section === true) {
        return <MenuSection key={menu.key} title={menu.title} />;
      }

      return (
        <MenuItem
          key={menu.key}
          isExpanded={isExpanded}
          menu={menu}
          isSubMenu={isSubMenu}
          isActive={isActive}
          onClick={this.handleMenuItemClick}
        >
          {hasChildren && (
            <ChildList
              isExpanded={isExpanded}
              maxHeight={menu.children.length * 40}
            >
              {this.renderMenuItems(menu.children, true)}
            </ChildList>
          )}
        </MenuItem>
      );
    });
  };

  render() {
    return (
      <div>
        <List>{this.renderMenuItems(menus)}</List>
      </div>
    );
  }
}

export default withRouter(MenuList);
