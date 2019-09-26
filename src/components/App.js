/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
// Third-party
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../style/vendor/custom-scrollbar.css";
import "../style/global.css";
import { Normalize } from "styled-normalize";
import { ThemeProvider } from "styled-components";
import { LocaleProvider } from "antd";
import koKR from "antd/lib/locale-provider/ko_KR";
import "react-day-picker/lib/style.css";

// Local
import RootLayout from "./base/layout/RootLayout";
import ContentLayout from "./base/layout/ContentLayout";
import Header from "./base/layout/Header";
import Content from "./base/layout/Content";
import Drawer from "./base/nav/Drawer";
import Footer from "./base/layout/Footer";
import themeLocal from "../style/theme";
import Login from "../routers/Login";
import ContentsRouter from "../routers/ContentsRouter";
import RouteUrls from "../constants/route-urls";

const LayoutPage = ({ toggleDrawer }) => (
  <RootLayout>
    <Drawer />
    <Header onToggle={toggleDrawer} />
    <ContentLayout>
      <Content>
        <ContentsRouter />
      </Content>
      <Footer />
    </ContentLayout>
  </RootLayout>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themeLocal
    };
  }

  toggleDrawer = () => {
    const { theme } = this.state;
    this.setState({
      theme: {
        ...theme,
        drawerExpanded: !theme.drawerExpanded
      }
    });
  };

  render() {
    const { theme } = this.state;
    return (
      <div>
        <Normalize />
        <LocaleProvider locale={koKR}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path={RouteUrls.LOGIN} component={Login} exact />
              <Route
                path="*"
                render={() => <LayoutPage toggleDrawer={this.toggleDrawer} />}
              />
            </Switch>
          </ThemeProvider>
        </LocaleProvider>
      </div>
    );
  }
}

export default App;
