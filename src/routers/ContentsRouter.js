import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouteUrls from '../constants/route-urls';
import PrivateRoute from './PrivateRoute';
import Home from '../components/app/Home';
import AccountManager from '../components/app/pages/AccountManager';
import CompanyManager from '../components/app/pages/CompanyManager';
import ProductManager from '../components/app/pages/ProductManager';
import ProductDetail from '../components/app/pages/ProductManager/ProductDetail';
import CategoryManager from '../components/app/pages/CategoryManager';
import UserManager from '../components/app/pages/UserManager';
import OrderManager from '../components/app/pages/OrderManager';

function ContentsRouter() {
  return (
    <div>
      <Switch>
        <Route path={RouteUrls.HOME} component={Home} exact />
        <PrivateRoute path={RouteUrls.ACCOUNT} component={AccountManager} />
        <PrivateRoute path={RouteUrls.ADD_COMPANY} component={Home} exact />
        <PrivateRoute
          path={RouteUrls.COMPANY_INFO}
          component={CompanyManager}
          exact
        />
        <PrivateRoute
          path={RouteUrls.USER}
          component={UserManager}
          exact
        />
        <PrivateRoute
          path={RouteUrls.PRODUCT}
          component={ProductManager}
          exact
        />
        <PrivateRoute
          path={`${RouteUrls.PRODUCT_DETAIL}${RouteUrls.REGEX_NUMBER}`}
          component={ProductDetail}
          exact
        />
        <PrivateRoute
          path={RouteUrls.CATEGORY}
          component={CategoryManager}
          exact
        />
        <PrivateRoute
          path={RouteUrls.ORDER}
          component={OrderManager}
          exact
        />
        <Redirect from={RouteUrls.PRODUCT_DETAIL} to={RouteUrls.PRODUCT} />
        <Redirect from="*" to={RouteUrls.HOME} />
      </Switch>
    </div>
  );
}

export default ContentsRouter;
