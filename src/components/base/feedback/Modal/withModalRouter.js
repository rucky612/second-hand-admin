/* eslint-disable react/prop-types */
import React, { Component } from "react";
import queryString from "query-string";
import { history } from "../../../../index";

const withModalRouter = (WrappedComponent, prefixs = [""]) =>
  class extends Component {
    constructor(props) {
      super(props);

      const { location } = history;
      const queryObj = queryString.parse(location.search);
      const modalState = {};
      prefixs.forEach(modalKey => {
        modalState[modalKey] = {
          visible: this.checkOpen(queryObj[modalKey]),
          toggleModal: () => this.toggleModal(modalKey)
        };
      });
      this.state = {
        modalState
      };
    }

    componentDidMount() {
      this.redirectModal();
    }

    componentWillReceiveProps() {
      this.redirectModal();
    }

    redirectModal = () => {
      const { modalState } = this.state;
      const { location } = history;
      const { state } = location;
      const queryObj = queryString.parse(location.search);
      const cloneModal = { ...modalState };
      const checkModalParams = prefixs.every(
        modalKey => queryObj[`modal${modalKey}`]
      );
      prefixs.forEach(modalKey => {
        const key = `modal${modalKey}`;
        if (!queryObj[key]) {
          queryObj[key] = modalState[modalKey].visible ? "1" : "2";
        }
        if (this.checkOpen(queryObj[key]) !== modalState[modalKey].visible) {
          cloneModal[modalKey].visible = this.checkOpen(queryObj[key]);
        }
      });
      const query = queryString.stringify(queryObj);
      if (!checkModalParams) {
        history.replace(`${location.pathname}?${query}`, {
          ...state
        });
      }
      this.setState({
        modalState: cloneModal
      });
    };

    checkOpen = value => value === "1";

    toggleModal = key => {
      const modalKey = `modal${key}`;
      const { location } = history;
      const { state } = location;
      const queryObj = queryString.parse(location.search);
      queryObj[modalKey] = !this.checkOpen(queryObj[modalKey]) ? "1" : "2";
      const query = queryString.stringify(queryObj);
      const newPath = `${location.pathname}?${query}`;
      history.replace(newPath, {
        ...state
      });
    };

    render() {
      const { modalState } = this.state;
      return <WrappedComponent {...this.props} modalState={modalState} />;
    }
  };

export default withModalRouter;
