import React from "react";
import styled from "styled-components";
import ScrollArea from "react-custom-scroll";
import MenuList from "../MenuList";

const Container = styled.div`
  width: ${props =>
    props.theme.drawerExpanded
      ? props.theme.drawerWidth
      : props.theme.drawerWidthMinimized};
  min-height: calc(100vh - ${props => props.theme.headerHeight});
  position: fixed;
  left: 0;
  right: 0;
  top: ${props => props.theme.headerHeight};
  background: ${props => props.theme.colorMenuBackground};
  transition: all 0.3s;
`;

function Drawer() {
  return (
    <Container>
      <ScrollArea heightRelativeToParent="calc(100vh - 7rem)">
        <MenuList />
      </ScrollArea>
    </Container>
  );
}

export default Drawer;
