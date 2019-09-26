import { combineReducers } from 'redux';
import products from './products';
import product from './product'
import category from './category';
import user from './user';
import order from './order';

export default () =>
  combineReducers({
    product,
    products,
    category,
    user,
    order
  });
