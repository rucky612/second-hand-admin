/* eslint-disable react/require-default-props,react/forbid-prop-types,no-nested-ternary */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import style from "../../../nav/Pagination/style";
import Icon from "../../../common/Icon";

const PaginationWrapper = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
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
  background-color: ${props => props.theme.white};
  background: ${style.colorSelectBg};
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

const SelectSortIcon = styled(Icon)`
  z-index: 2;
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 0.9rem;
  transform: translate3d(0, -50%, 0);
  cursor: pointer;
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

const defaultButton = props => {
  const { children, ...rest } = props;
  return (
    <PaginationLink arrow {...rest}>
      {children}
    </PaginationLink>
  );
};

class ReactTablePagination extends Component {
  constructor(props) {
    super(props);

    const { pages } = props;
    this.state = {
      pageIndexes: this.getPageIndexes(null, pages)
    };
  }

  componentDidMount() {
    const { pages } = this.props;
    this.setState({
      pageIndexes: this.getPageIndexes(null, pages)
    });
  }

  // eslint-disable-next-line
  componentWillReceiveProps(nextProps) {
    const { page, pages, manual } = this.props;
    const { page: nextPage, pages: nextPages } = nextProps;

    const pageLimitChanged = pages !== nextPages;
    const pageChanged = page !== nextPage;

    if (!manual) {
      if (pageChanged || pageLimitChanged) {
        this.setState({
          pageIndexes: this.getPageIndexes(null, nextPages)
        });

        if (pageLimitChanged) {
          const { onPageChange } = this.props;
          return onPageChange(0);
        }

        if (pageChanged) {
          return this.handlePageChange(nextProps.page + 1);
        }
      }
    } else if (pageChanged || pageLimitChanged) {
        this.setState({
          pageIndexes: this.getPageIndexes(nextProps.page + 1, nextPages)
        });
      }
  }

  filterPages = (pageIndexes, totalPages) =>
    pageIndexes.filter(page => page <= totalPages);

  getPageIndexes = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    }

    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    }

    if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    }

    return [1, 2, 3, 4, 5, total];
  };

  handlePageChange = curPage => {
    const { page, pages, onPageChange } = this.props;
    const activePage = page + 1;
    if (curPage === activePage) {
      return;
    }
    const pageIndexes = this.getPageIndexes(curPage, pages);
    this.setState({
      pageIndexes: this.filterPages(pageIndexes, pages)
    });
    onPageChange(curPage - 1);
  };

  renderPageIndexes = () => {
    const { pageIndexes } = this.state;
    const { page } = this.props;
    const activePage = page + 1;
    return pageIndexes.map((page, i, array) => (
      <PaginationLink
        style={{ marginRight: "4px" }}
        // eslint-disable-next-line
        key={i}
        active={page === activePage}
        onClick={() => this.handlePageChange(page)}
      >
        {array[i - 1] + 2 < page ? `...${page}` : page}
      </PaginationLink>
    ));
  };

  render() {
    const {
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      canPrevious,
      canNext,
      onPageSizeChange,
      PreviousComponent = defaultButton,
      NextComponent = defaultButton,
    } = this.props;

    const activePage = page + 1;
    return (
      <PaginationWrapper>
        {showPageSizeOptions && (
          <SelectWrap>
            <SelectSortIcon icon="fas fa-sort" />
            <PaginationSelect
              onChange={e => {
                const pageSize = Number(e.target.value);
                onPageSizeChange(pageSize);
              }}
              value={pageSize}
            >
              {pageSizeOptions.map((option, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </PaginationSelect>
          </SelectWrap>
        )}

        <PaginationList>
          <PreviousComponent
            style={{ marginRight: "4px" }}
            onClick={() => {
              if (!canPrevious) return;
              this.handlePageChange(activePage - 1);
            }}
            disabled={!canPrevious}
          >
            <Icon icon="la la-angle-left" display="inline-block" />
          </PreviousComponent>
          {this.renderPageIndexes()}
          <NextComponent
            onClick={() => {
              if (!canNext) return;
              this.handlePageChange(activePage + 1);
            }}
            disabled={!canNext}
          >
            <Icon icon="la la-angle-right" display="inline-block" />
          </NextComponent>
        </PaginationList>
      </PaginationWrapper>
    );
  }
}

ReactTablePagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  onPageChange: PropTypes.func,
  PreviousComponent: PropTypes.object,
  NextComponent: PropTypes.object,
  showPageSizeOptions: PropTypes.any,
  pageSizeOptions: PropTypes.any,
  pageSize: PropTypes.number,
  canPrevious: PropTypes.bool,
  canNext: PropTypes.bool,
  onPageSizeChange: PropTypes.func,
  manual: PropTypes.bool
};
export default ReactTablePagination;
