import styled from "styled-components";

const ContentLayout = styled.div`
  width: ${props => props.theme.drawerExpanded ? `calc(100% - ${props.theme.drawerWidth})` : `calc(100% - ${props.theme.drawerWidthMinimized})`};
  padding-top : ${props => props.theme.headerHeight};
  margin-left: ${props => props.theme.drawerExpanded ? props.theme.drawerWidth : props.theme.drawerWidthMinimized};
  height: 100%;
  overflow-y: auto;
  transition: all .3s;
`;

export default ContentLayout;
