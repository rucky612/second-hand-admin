/* eslint-disable linebreak-style */
import RouteUrls from './route-urls';

const icons = {
  archive: 'la la-archive',
  dashboard: 'la la-dashboard',
  account: 'la la-user',
  catalog: 'la la-book',
  stock: 'la la-shopping-cart',
  customer: 'la la-users',
  order: "la la-pencil"
};

export default [
  {
    title: '대시보드',
    key: 'dashboard',
    url: RouteUrls.HOME,
    icon: icons.dashboard,
  },
  {
    title: 'CUSTOMER',
    key: 'section-customer',
    section: true,
  },
  {
    title: '고객관리',
    key: 'customer-manager',
    url: RouteUrls.USER,
    icon: icons.customer,
  },
  {
    title: 'PRODUCT',
    key: 'section-sales',
    section: true,
  },
  {
    title: '상품관리',
    key: 'product-manager',
    url: RouteUrls.PRODUCT,
    icon: icons.catalog,
  },
  {
    title: '카테고리 관리',
    key: 'category',
    url: RouteUrls.CATEGORY,
    icon: icons.stock,
  },
  {
    title: 'ORDER',
    key: 'section-orders',
    section: true,
  },
  {
    title: '주문 관리',
    key: 'order',
    url: RouteUrls.ORDER,
    icon: icons.order,
  },
];
