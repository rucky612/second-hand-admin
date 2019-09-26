import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Typography from "../../common/Typography/index";
import LinkTo from "../../common/LinkTo";
import Icon from "../../common/Icon";
import style from "./style";

const CustomPaper = styled.div`
  display: block;
  background-color: ${props => props.theme.white};
  box-shadow: 0 1px 15px 1px rgba(69, 65, 78, 0.08);
  margin-bottom: ${style.marginBottom};
  min-width: ${style.minWidth};
`;
const FlexBox = css`
  display: flex;
`;
const FlexCenter = css`
  align-items: center;
`;

const PaperHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 ${style.padding};
  height: ${style.headerHeight};
  position: relative;
  border-bottom: ${style.headerBorder} ${props => props.theme.paperBorderColor};
`;

const PaperCaption = styled.div`
  ${FlexBox}
  ${FlexCenter}
  align-content: flex-start;
`;

const PaperOptions = styled.div`
  ${FlexBox}
  ${FlexCenter}
  align-content: flex-end;
`;

const PaperList = styled.ul`
  ${FlexBox}
  ${FlexCenter}
  padding: 0;
  margin: 0;
`;

const PaperItem = styled.li`
  ${FlexBox}
  ${FlexCenter}
  padding: 8px 8px;
  &:hover > i {
    color: ${props => props.theme.logoBtnHover};
  }
  &:last-child {
    padding: 8px 0px 8px 8px;
  }
`;

const PaperBody = styled.div`
  position: relative;
  color: ${props => props.theme.paperBodyColor};
  padding: ${style.padding};
`;

const Paper = props => {
  const { children, paperTitle, paperOptions, paperIcon } = props;
  return (
    <CustomPaper {...props}>
      <PaperHeader>
        <PaperCaption>
          {paperIcon && (
            <Icon
              display="inline-block"
              icon={paperIcon}
              size="2.4rem"
              width="35px"
            />
          )}
          {typeof paperTitle === "string" ? (
            <Typography
              variant="span"
              size={style.headFontSize}
              weight={style.headFontWeight}
              color={style.headColor}
            >
              {paperTitle}
            </Typography>
          ) : (
            paperTitle
          )}
        </PaperCaption>
        <PaperOptions>
          <PaperList>
            {paperOptions.map((item, index) => (
              /* eslint-disable react/no-array-index-key */
              <LinkTo key={index} onClick={item.onClick}>
                <PaperItem>{item.icon}</PaperItem>
              </LinkTo>
            ))}
          </PaperList>
        </PaperOptions>
      </PaperHeader>
      <PaperBody>{children}</PaperBody>
    </CustomPaper>
  );
};

Paper.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func
  ]),
  paperTitle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  paperIcon: PropTypes.string,
  paperOptions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node,
        PropTypes.func
      ]),
      onClick: PropTypes.func,
      link: PropTypes.string
    })
  )
};

Paper.defaultProps = {
  paperTitle: "",
  paperIcon: "",
  paperOptions: []
};

export default Paper;
