import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getMenuTitleColorByState = props => {
  if (props.isActive) {
    return props.theme.colorMenuActive;
  }
  return props.isSubMenu
    ? props.theme.colorMenuChildTitle
    : props.theme.colorMenuTitle;
};

const getMenuTitleHoverColorByState = props => {
  if (props.isActive) {
    return props.theme.colorMenuActive;
  }
  return props.isSubMenu ? props.theme.colorMenuTitle : props.theme.colorMenuHoverTitle;
};

const getIconColorByState = props => {
  if (props.isActive) {
    return props.theme.colorMenuActive;
  }
  return props.isExpanded
    ? props.theme.colorMenuIconSelected
    : props.theme.colorMenuIconNormal;
};

const ItemContainer = styled.li`
  font-size: 1.4rem;
  height: auto;
  display: block;
  background: ${props =>
    props.isExpanded ? props.theme.colorMenuBackgroundHover : "transparent"};
  transition: all 0.3s;
`;

const ItemWrapper = styled.a`
  width: 100%;
  padding: 9px 30px 9px ${props => (props.isSubMenu ? "40px" : "30px")};
  height: ${props => (props.isSubMenu ? "40px" : "44px")}
  cursor: pointer;
  display: table;
  color: ${props => getIconColorByState(props)};
  :hover {
    color: ${props =>
  props.isActive
    ? props.theme.colorMenuActive
    : props.theme.colorMenuIconSelected};
    background: ${props => props.theme.colorMenuBackgroundHover};
  }
`;

const MenuTitle = styled.span`
  font-weight: ${props => props.isActive ? 700 : 400};
  vertical-align: middle;
  color: ${props => getMenuTitleColorByState(props)};
  display: table-cell;
  opacity: ${props => (props.theme.drawerExpanded ? "1" : "0")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60px;
  transition: all 0.3s;
  :hover {
    color: ${props => getMenuTitleHoverColorByState(props)};
  }
`;

const Icon = styled.i`
  vertical-align: middle;
  display: table-cell;
  font-size: 1.8rem;
`;

const MenuIcon = styled(Icon)`
  width: 35px;
  text-align: left;
`;

const MenuBulletIcon = styled.span`
  vertical-align: middle;
  display: table-cell;
  font-size: 1.5rem;
  width: 25px;
`;

const MenuExpandIcon = styled(Icon)`
  text-align: center;
  font-size: 1rem;
  transform-origin: center;
  transform: ${props => (props.isExpanded ? "rotate(90deg)" : "rotate(deg)")};
  transition: transform 0.3s;
`;

function MenuItem(props) {
  /* eslint-disable-next-line */
  const { menu, children, isSubMenu, isExpanded, isActive, onClick } = props;
  const { icon } = menu;
  const iconClassName = !icon ? "" : icon;
  const handleItemClick = () => {
    onClick(menu);
  };
  return (
    <div>
      <ItemContainer isExpanded={isExpanded} isActive={isActive}>
        <ItemWrapper isSubMenu={isSubMenu} isActive={isActive} onClick={handleItemClick}>
          {isSubMenu ? (
            <MenuBulletIcon>&#8226;</MenuBulletIcon>
          ) : (
            <MenuIcon className={iconClassName} />
          )}
          <MenuTitle isSubMenu={isSubMenu} isActive={isActive}>
            {menu.title}
          </MenuTitle>
          {menu.children && menu.children.length > 0 && (
            <MenuExpandIcon
              isSubMenu={isSubMenu}
              isExpanded={isExpanded}
              className="fas fa-chevron-right"
            />
          )}
        </ItemWrapper>
        {children}
      </ItemContainer>
    </div>
  );
}

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSubMenu: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isActive: PropTypes.bool,
  menu: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    children: PropTypes.array
  }).isRequired
};

MenuItem.defaultProps = {
  isSubMenu: false,
  isExpanded: false,
  isActive: false
};

export default MenuItem;
