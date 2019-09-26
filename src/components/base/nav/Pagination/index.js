/* eslint-disable no-nested-ternary,react/no-array-index-key,react/require-default-props */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "../../common/Icon";
import style from "./style";
import sortImg from "../../../../style/img/sort-solid.svg"

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  border-radius: ${style.borderRadius};
  margin: 2px 0 2px 13px;
  white-space: nowrap;
  justify-content: flex-end;
`;

const PaginationSelect = styled.select`
  appearance: none;
  position: relative;
  display: inline-block;
  padding: 0.4875rem 2.275rem 0.4875rem 0.975rem;
  font-family: sans-serif, Arial;
  background: url(${sortImg}) no-repeat 2.85rem;
  background-color: ${props => props.theme.white};
  background-size: 14px 12px;
  font-size: ${style.selectFontSize};
  border: 1px solid ${style.pagborderColor};
  border-radius: ${style.borderRadius};
  outline: none;
  &::-ms-expand {
    display: none;
  }
`;

const SelectWrap = styled.div`
  position: relative;
  &:focus,
  &:hover {
    ${PaginationSelect} {
      border: 1px solid ${props => props.theme.brand};
      cursor: pointer;
    }
  }
`;

const PaginationOption = styled.option``;

const PaginationItem = styled.li`
  margin-left: ${style.itemMarginLeft};
`;

const PaginationLink = styled.a`
  position: relative;
  display: flex;
  background-color: ${props =>
    props.arrow
      ? props.theme.secondary
      : props.active
      ? props.theme.primary
      : "transparent"};
  color: ${props => (props.active ? props.theme.white : "inherit")};
  border-radius: 50%;
  height: ${style.linkHeight};
  min-width: ${style.linkHeight};
  justify-content: center;
  align-items: center;
  font-size: ${style.linkFontSize};
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    & > i {
      color: ${props => props.theme.white};
    }
  }
`;

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLimit: 4,
      maxPageCount: this.checkTotalTypeNum()
        ? this.maxPageIndex(props.total, props.pageSize)
        : 0,
      nowPage: props.current || 1,
      perPage: props.pageSize || props.defaultPageSize,
      perPageOptions: props.perPageOptions
    };
  }

  componentWillReceiveProps(nextProps) {
    const { current, total, pageSize } = nextProps;
    const { nowPage, maxPageCount, perPage } = this.state;
    const currPage = pageSize || perPage;
    const currIndex = current || nowPage;
    if (this.checkTotalTypeNum()) {
      const maxIndex = this.maxPageIndex(total, currPage);
      const finalIndex = this.checkCurrOverMax(maxIndex, currIndex);
      if (!this.checkCurrent() && currIndex !== nowPage) {
        this.setState({
          nowPage: finalIndex
        });
      }
      if (!this.checkPageSize() && pageSize !== perPage) {
        this.setState({
          nowPage: finalIndex,
          perPage: pageSize,
          maxPageCount: maxIndex
        });
      }
      if (maxIndex !== maxPageCount) {
        this.setState({
          nowPage: finalIndex,
          maxPageCount: maxIndex
        });
      }
    }
  }

  checkTotalTypeNum = () => {
    const { total } = this.props;
    return typeof total === "number";
  };

  checkCurrOverMax = (max, curr) => (max >= curr ? curr : max);

  maxPageIndex = (total, perPage) => Math.ceil(total / perPage);

  checkCurrent = () => {
    const { current } = this.props;
    return typeof current !== "number";
  };

  checkPageSize = () => {
    const { pageSize } = this.props;
    return typeof pageSize !== "number";
  };

  pageClick = index => {
    const { onChange } = this.props;
    onChange(index);
    if (this.checkCurrent()) {
      this.setState({
        nowPage: index
      });
    }
  };

  arrowClick = addNum => {
    const { onChange } = this.props;
    const { nowPage, maxPageCount } = this.state;
    const nowIndex = nowPage + addNum;
    const check = nowIndex >= 1 && nowIndex <= maxPageCount;
    if (check) {
      onChange(nowIndex);
      if (this.checkCurrent()) {
        this.setState({
          nowPage: nowIndex
        });
      }
    }
  };

  optionClick = e => {
    const { nowPage } = this.state;
    const { total, onOptionChange } = this.props;
    onOptionChange(e.target.value);
    if (this.checkTotalTypeNum()) {
      const maxPage = this.maxPageIndex(total, e.target.value);
      if (this.checkPageSize()) {
        this.setState({
          nowPage: this.checkCurrOverMax(maxPage, nowPage),
          perPage: e.target.value,
          maxPageCount: maxPage
        });
      }
    }
  };

  renderItems = () => {
    const { pageLimit, maxPageCount, nowPage } = this.state;
    if (maxPageCount < pageLimit * 2) {
      return Array.from({ length: maxPageCount }, (item, index) => (
        <PaginationItem key={index}>
          <PaginationLink
            active={nowPage === index + 1}
            onClick={() => this.pageClick(index + 1)}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ));
    }
    if (nowPage <= pageLimit) {
      return Array.from({ length: pageLimit }, (item, index) => (
        <PaginationItem key={index}>
          <PaginationLink
            active={nowPage === index + 1}
            onClick={() => this.pageClick(index + 1)}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ));
    }
    if (nowPage > maxPageCount - pageLimit) {
      return Array.from({ length: pageLimit }, (v, i) => i)
        .reverse()
        .map((item, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              active={nowPage === maxPageCount - item}
              onClick={() => this.pageClick(maxPageCount - item)}
            >
              {maxPageCount - item}
            </PaginationLink>
          </PaginationItem>
        ));
    }
    return Array.from({ length: pageLimit - 1 }, (item, index) => (
      <PaginationItem key={index}>
        <PaginationLink
          active={index === 1}
          onClick={() => this.pageClick(nowPage + index - 1)}
        >
          {index + nowPage - 1}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  renderPages = () => {
    const { pageLimit, maxPageCount, nowPage } = this.state;
    const leftAble = nowPage > pageLimit && maxPageCount >= pageLimit * 2;
    const rightAble =
      nowPage <= maxPageCount - pageLimit && maxPageCount >= pageLimit * 2;
    return (
      <React.Fragment>
        {leftAble && (
          <PaginationItem>
            <PaginationLink onClick={() => this.pageClick(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {this.renderEllipsis(leftAble)}
        {this.renderItems()}
        {this.renderEllipsis(rightAble)}
        {rightAble && (
          <PaginationItem>
            <PaginationLink onClick={() => this.pageClick(maxPageCount)}>
              {maxPageCount}
            </PaginationLink>
          </PaginationItem>
        )}
      </React.Fragment>
    );
  };

  renderEllipsis = check =>
    check ? (
      <PaginationItem>
        <PaginationLink>
          <Icon icon="la la-ellipsis-h" display="inline-block" />
        </PaginationLink>
      </PaginationItem>
    ) : null;

  render() {
    const { label } = this.props;
    const { perPage, perPageOptions } = this.state;
    return (
      <PaginationWrapper>
        <span>{label}</span>
        {this.checkTotalTypeNum() && (
          <SelectWrap>
            <PaginationSelect value={perPage} onChange={this.optionClick}>
              {perPageOptions.map((item, index) => (
                // eslint-disable-next-line
                <PaginationOption key={index} value={item}>
                  {item}
                </PaginationOption>
              ))}
            </PaginationSelect>
          </SelectWrap>
        )}
        {this.checkTotalTypeNum() && (
          <PaginationList>
            <PaginationItem>
              <PaginationLink arrow onClick={() => this.arrowClick(-1)}>
                <Icon icon="la la-angle-left" display="inline-block" />
              </PaginationLink>
            </PaginationItem>
            {this.renderPages()}
            <PaginationItem>
              <PaginationLink arrow onClick={() => this.arrowClick(1)}>
                <Icon icon="la la-angle-right" display="inline-block" />
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        )}
      </PaginationWrapper>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  current: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  onOptionChange: PropTypes.func
};

Pagination.defaultProps = {
  label: false,
  defaultPageSize: 5,
  perPageOptions: [5, 10, 20],
  onChange: () => {},
  onOptionChange: () => {}
};

export default Pagination;
