import styled from "styled-components";

const Content = styled.div`
  background: ${props => props.theme.colorBackgroundContent};
  min-height: calc(100vh - ${props => props.theme.footerHeight} - ${props => props.theme.headerHeight});
  
`;

export default Content;
