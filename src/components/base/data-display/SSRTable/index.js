import React, { Component } from "react";
import { withRouter } from "react-router"
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import queryString from "query-string";
import Table from "../Table2";
import Button from '../../common/Button';
import Input from '../../data-entry/Input';
import Select from '../../data-entry/Select';

const CountText = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
`;

/**
 * Server side data pagination
 */
class PaginationTable extends Component {
  constructor(props) {
    super(props);
    const { columns, initialLimit } = props;
    this.defaultState = {
      offset: 0,
      limit: initialLimit,
      sorted: {},
      columns: this.setColumnFilter(columns),
      filtered: this.getFilterToCols(columns),
      typedFiltered: {},
    };
    this.state = this.defaultState;
  }

  componentDidMount() {
    if (!this.hasQueryParam()) {
      this.replaceWithDefaultQueries();
    } else {
      // const { fetchAction, history, urlPrefix, initialLimit } = this.props;
      // const offset = this.getOffset(history, urlPrefix);
      // const limit = this.getLimit(history, urlPrefix, initialLimit);
      // const filters = this.getFilter(history);
      // const sorted = this.getSortObj(history);
      // fetchAction(offset, limit, filters, sorted);
      // this.setState({
      //   offset,
      //   limit,
      //   sorted
      // });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history, columns } = this.props;
    const { history: nextRouter, urlPrefix, initialLimit, fetchAction, columns: nextColumns } = nextProps;
    if (!this.hasQueryParam()) {
      this.replaceWithDefaultQueries();
    } else if(!_.isEqual(columns, nextColumns)) {
      this.setState({
        columns: this.setColumnFilter(nextColumns)
      });
    } else {
      const nextOffset = this.getOffset(history, urlPrefix);
      const nextLimit = this.getLimit(history, urlPrefix, initialLimit);
      const sortChanged = this.isSortChanged(history);
      const filterChanged = this.isFilterChanged(history);
      const pageChanged = this.isPageChanged(nextOffset, nextLimit);
      if (pageChanged || filterChanged || sortChanged) {
        const nextFilters = this.getFilter(nextRouter);
        const nextSorted = this.getSortObj(nextRouter);
        this.setState({
          offset: nextOffset,
          limit: nextLimit,
          sorted: nextSorted,
          filtered: nextFilters,
          typedFiltered: nextFilters
        });
        fetchAction(nextOffset, nextLimit, nextFilters, nextSorted);
      }
    }
  }

  createSelectFilter = (name, opts, placeholder = '') => {
    // eslint-disable-next-line
    const { filtered } = this.state;
    const options = [
      { value: "", label: "전체" },
      ...opts
    ];
    const value = options.filter(opt => filtered[name] === opt.value);
    return (
      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={(selected) => this.setFilterChanged({
          target: {
            value: selected.value,
            name
          }
        })}
      />
    );
  };

  createInputFilter = (name) => {
    const { filtered } = this.state;
    return (
      <Input
        value={filtered[name]}
        name={name}
        onChange={this.setFilterChanged}
      />
    );
  };

  setFilterChanged = (e) => {
    const { value, name } = e.target;
    const { filtered } = this.state;
    this.setState({
      filtered: {
        ...filtered,
        [name] : value
      }
    });
  };

  getFilterToCols = (columns) => {
    const obj = {};
    columns.forEach(col => {
      if(col.filterable || col.selectFilter) {
        obj[col.accessor] = ""
      }
    });
    return obj;
  };

  setColumnFilter = (columns) => columns.map(col => {
      if(col.filterable) {
        // eslint-disable-next-line
        col.Filter = () => this.createInputFilter(col.accessor);
      } else if(col.selectFilter) {
        // eslint-disable-next-line
        col.Filter = () => this.createSelectFilter(
          col.accessor,
          col.selectFilter.options,
          col.selectFilter.placeholder
        );
      } else if(!col.Filter) {
        if(col.actionable) {
          // eslint-disable-next-line
          col.Filter = () => (
            <div>
              <Button icon="search" size="small" onClick={this.routeFilter} />
              <Button
                onClick={this.routeResetFilter}
                icon="close"
                size="small"
                bgcolor="secondary"
                style={{
                  marginLeft: '8px',
                }}
              />
            </div>
          )
        } else {
          // eslint-disable-next-line
          col.filterable = false
        }
      }
      return col;
    });

  isSortChanged = (history) => {
    const { sorted } = this.state;
    const nextSorted = this.getSortObj(history);
    return !_.isEqual(sorted, nextSorted)
  };

  isFilterChanged = (history) => {
    const { typedFiltered } = this.state;
    const nextFilters= this.getFilter(history);
    return !_.isEqual(typedFiltered, nextFilters);
  };

  isPageChanged = (nextOffset, nextLimit) => {
    const { offset, limit } = this.state;
    return nextOffset !== offset || nextLimit !== limit;
  };

  hasQueryParam = () => {
    const { history, urlPrefix } = this.props;
    const prevQueries = queryString.parse(history.location.search);
    const checkOffset = prevQueries[`${urlPrefix}offset`];
    const checkLimit = prevQueries[`${urlPrefix}limit`];
    return !!checkOffset && !!checkLimit;
  };

  getOffset = (history, prefix) => {
    const queries = queryString.parse(history.location.search);
    const offsetKey = `${prefix}offset`;
    return queries && queries[offsetKey] ? parseInt(queries[offsetKey], 10) : 0;
  };

  getLimit = (history, prefix, initialLimit) => {
    const queries = queryString.parse(history.location.search);
    const limitKey = `${prefix}limit`;
    return queries && queries[limitKey] > 0
      ? parseInt(queries[limitKey], 10)
      : initialLimit;
  };

  getFilter = (history) => {
    const { filtered } = this.state;
    const queries = queryString.parse(history.location.search);
    const obj = {};
    Object.keys(filtered).forEach(key => {
      obj[key] = queries[key] || '';
    });
    return obj;
  };

  getSortObj = (history) => {
    const queries = queryString.parse(history.location.search);
    const pickSorted = _.pickBy(queries, (val, index) => index.startsWith('sort'));
    const obj = {};
    _.forEach(pickSorted, (val, index) => {
        obj[index.replace('sort', '')] = !!Number(val)
    });
    return obj;
  };

  sortToArr = (sortObj) => {
    const arr = [];
    _.forEach(sortObj, (val, index) => {
      arr.push({
        id: index,
        desc: val
      })
    });
    return arr;
  };

  filterToArr = (filterObj) => {
    const arr = [];
    _.forEach(filterObj, (val, index) => {
      arr.push({
        id: index,
        value: val
      });
    });
    return arr;
  };

  routePage = (offset, limit) => {
    const { history, urlPrefix } = this.props;
    const prevQueries = queryString.parse(history.location.search) || {};
    const search = `?${queryString.stringify({
      ...prevQueries,
      [`${urlPrefix}offset`]: offset,
      [`${urlPrefix}limit`]: limit
    })}`;
    history.push({
      pathname: history.location.pathname,
      search
    });
  };

  routeFilter = () => {
    const { filtered } = this.state;
    const { history, urlPrefix } = this.props;
    const prevQueries = queryString.parse(history.location.search) || {};
    const search = `?${queryString.stringify({
      ...prevQueries,
      [`${urlPrefix}offset`]: 0,
      ..._.mapValues(filtered, v => v)
    })}`;
    history.push({
      pathname: history.location.pathname,
      search
    });
  };

  routeResetFilter = () => {
    const { filtered, sorted } = this.defaultState;
    const { history, urlPrefix, initialLimit } = this.props;
    // const prevQueries = queryString.parse(history.location.search) || {};
    const search = `?${queryString.stringify({
      [`${urlPrefix}offset`]: 0,
      [`${urlPrefix}limit`]: initialLimit,
      ...filtered,
      ...sorted
    })}`;
    history.push({
      pathname: history.location.pathname,
      search
    });
  };

  routeSort = (sortArr) => {
    const { history } = this.props;
    const prevQueries = queryString.parse(history.location.search) || {};
    const queryObj = { ...prevQueries };
    sortArr.forEach(sort => {
      queryObj[`sort${sort.id}`] = sort.desc ? 1 : 0
    });
    const sort = `?${queryString.stringify(queryObj)}`;
    history.push({
      pathname: history.location.pathname,
      search: sort
    });
  };

  replaceWithDefaultQueries = () => {
    const { history, urlPrefix, initialLimit, fetchAction } = this.props;
    const prevQueries = queryString.parse(history.location.search) || {};
    const search = `?${queryString.stringify({
      ...prevQueries,
      [`${urlPrefix}offset`]: 0,
      [`${urlPrefix}limit`]: initialLimit,
    })}`;
    const state = { ...history.location.state };
    fetchAction(0, initialLimit, {}, {});
    history.replace({
      pathname: history.location.pathname,
      search,
      state
    });
  };

  render() {
    const { totalCount, data, columns: propsCols, history, initialLimit, urlPrefix,  ...rest } = this.props;
    const { offset, limit, sorted, filtered, columns } = this.state;
    const pages = Math.ceil(totalCount / limit);
    const page = Math.floor(offset / limit);
    const minRows = data.length > 0 ? data.length : limit;
    const visibleCount = data.length < limit ? data.length : limit;
    return (
      <div>
        <CountText>{`${visibleCount} / ${totalCount}`}</CountText>
        <Table
          minRows={minRows}
          columns={columns}
          data={data}
          page={page}
          pageSize={limit}
          pages={pages}
          filtered={this.filterToArr(filtered)}
          sorted={this.sortToArr(sorted)}
          onPageChange={page => {
            const offset = page * limit;
            this.routePage(offset, limit);
          }}
          onPageSizeChange={pageSize => {
            const limit = pageSize;
            const offset = 0;
            this.routePage(offset, limit);
          }}
          onSortedChange={this.routeSort}
          {...rest}
        />
      </div>
    );
  }
}

const Cell = PropTypes.shape({
  // Renderer
  Cell: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Aggregated: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Pivot: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  PivotValue: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Expander: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func
  ]),
  Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  // All Columns
  sortable: PropTypes.bool, // use table default
  resizable: PropTypes.bool, // use table default
  filterable: PropTypes.bool, // use table default
  show: PropTypes.bool,
  minWidth: PropTypes.number,

  // Cells only
  className: PropTypes.string,
  style: PropTypes.object,
  getProps: PropTypes.func,

  // Pivot only
  aggregate: PropTypes.func,

  // Headers only
  headerClassName: PropTypes.string,
  headerStyle: PropTypes.object,
  getHeaderProps: PropTypes.func,

  // Footers only
  footerClassName: PropTypes.string,
  footerStyle: PropTypes.object,
  getFooterProps: PropTypes.object,
  filterMethod: PropTypes.func,
  filterAll: PropTypes.bool,
  sortMethod: PropTypes.func,

  // set action search, reset btn
  actionable: PropTypes.bool
});

PaginationTable.propTypes = {
  columns: PropTypes.arrayOf(Cell).isRequired,
  // Styling Props
  columnVerticalPadding: PropTypes.number,
  columnHorizontalPadding: PropTypes.number,
  noDataText: PropTypes.string,
  pointerCursor: PropTypes.bool,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  data: PropTypes.array,
  manual: PropTypes.bool,
  // url param prefix
  // 하나의 페이지내 여러개의 테이블이 있 을경우 각각의 테이블에 다른 Prefix 를 설정해야한다.
  urlPrefix: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  fetchAction: PropTypes.func.isRequired,
  initialLimit: PropTypes.number,
  // eslint-disable-next-line
  // filterOptions: PropTypes.object,
  checkboxAble: PropTypes.bool,
  // eslint-disable-next-line
  selectKey: PropTypes.string,
  // eslint-disable-next-line
  getCheckboxProps: PropTypes.func,
  // eslint-disable-next-line
  onFetchData: PropTypes.func,
  // eslint-disable-next-line
  onFilteredChange: PropTypes.func,
  // eslint-disable-next-line
  onSortedChange: PropTypes.func
};

PaginationTable.defaultProps = {
  columnVerticalPadding: 10,
  columnHorizontalPadding: 10,
  noDataText: "데이터가 없습니다",
  pointerCursor: false,
  loading: false,
  data: [],
  manual: true,
  initialLimit: 10,
  // filterOptions: {},
  checkboxAble: false,
};

export default withRouter(PaginationTable);
