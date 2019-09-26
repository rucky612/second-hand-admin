import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Typography from "../../common/Typography";
import Icon from "../../common/Icon";
import SGBreadcrumb from "../../nav/Breadcrumb";
import style from "./style";

const Layout = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  padding: ${style.padding} ${style.padding} 0 ${style.padding};
  align-items: center;
  min-width: ${style.headerMinWidth};
`;

const MarginAuto = styled.div`
  margin-right: auto;
  & > * {
    vertical-align: middle;
  }
`;

const Content = styled.div`
  padding: ${style.padding};
`;

const Head = styled(Typography)`
  border-right: ${props =>
  props.borderable !== 0 ? style.headBorderRight : "none"};
  padding: 7px 25px 7px 0;
  margin: 0 15px 0 0;
  color: ${style.headColor};
  font-weight: 700;
`;

const ButtonIcon = styled(Icon)`
  position: absolute;
  width: ${style.iconWidth};
  height: ${style.iconWidth};
  top: 50%;
  left: 50%;
  transform: translate3d(-60%, -50%, 0);
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-45%, -50%, 0);
  }
`;

const HeaderButton = styled.button`
  display: inline-block;
  position: relative;
  width: ${style.buttonWidth};
  height: ${style.buttonWidth};
  background-color: ${props => props.theme.white};
  border-radius: 50%;
  border: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.primary};
    ${ButtonIcon} {
      color: ${props => props.theme.white};
    }
  }
`;

const SubContent = props => {
  // eslint-disable-next-line
  const { children, breadCrumbAble, headerBtn, headTitle, headerContent } = props;
  const Button =
    headerBtn && (typeof headerBtn === "function" ? (
      headerBtn()
    ) : (
      <HeaderButton>
        <ButtonIcon icon="la-ellipsis-h" size={style.iconFontSize} />
      </HeaderButton>
    ));
  return (
    <Layout>
      <Header>
        <MarginAuto>
          <Head
            variant="h3"
            display="inline-block"
            size={style.headFontSize}
            borderable={breadCrumbAble ? 1 : 0}
          >
            {headTitle}
          </Head>
          {breadCrumbAble && <SGBreadcrumb />}
          {headerContent}
        </MarginAuto>
        {Button}
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

SubContent.propTypes = {
  headTitle: PropTypes.string,
  breadCrumbAble: PropTypes.bool,
  // eslint-disable-next-line
  headerBtn: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  // eslint-disable-next-line
  headerContent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func
  ])
};

SubContent.defaultProps = {
  headTitle: "",
  headerBtn: false,
  breadCrumbAble: false
};

export default SubContent;
