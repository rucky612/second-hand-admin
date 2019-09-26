/* eslint-disable react/prop-types */
import React, { Component } from "react";
import queryString from "query-string";
import { history } from "../../../../index";

const withTabRouter = (WrappedComponent, defaultKey = "", prefix = "tab") =>
  class extends Component {
    constructor(props) {
      super(props);

      const { location } = history;
      const queryObj = queryString.parse(location.search);
      this.state = {
        tabKey: queryObj[prefix] || defaultKey
      };
    }

    componentDidMount() {
      this.redirectTab();
    }

    componentWillReceiveProps() {
      this.redirectTab();
    }

    redirectTab = () => {
      const { tabKey } = this.state;
      const { location } = history;
      const queryObj = queryString.parse(location.search);
      if (!queryObj[prefix]) {
        queryObj[prefix] = tabKey;
        const {state} = location;
        const query = queryString.stringify(queryObj);
        history.replace(`${location.pathname}?${query}`, {
          ...state
        });
      }
      if (queryObj[prefix] !== tabKey) {
        this.setState({ tabKey: queryObj[prefix] });
      }
    };

    handleTabChange = tab => {
      const { location } = history;
      const {state} = location;
      const queryObj = queryString.parse(location.search);
      queryObj[prefix] = tab;
      const query = queryString.stringify(queryObj);
      history.push(`${location.pathname}?${query}`, {
        ...state
      });
    };

    render() {
      const { tabKey } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          activeKey={tabKey}
          onTabChange={this.handleTabChange}
        />
      );
    }
  };

export default withTabRouter;
