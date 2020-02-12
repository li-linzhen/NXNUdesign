/*   eslint-disable   */

import ZYCLayout from './ZYCLayout';
import Home from '../login/LoginPage';
import Common from '../public/script/common';
import AsyncComponent from '../lib/Components/AsyncComponent';
import CargoOwnerPage from './CMS/xxx/XxxPage';
import DemoPage from './CMS/demo/DemoPage';
import ProfileManagePage from './ProfileManage/ProfileManagePage'
import TestManagePage from './TestManage/TestManagePage'
import TestDetail from './TestManage/components/TestDetail'
import ItemBankManage from './ItemBankManage/ItemBankManage'

import RunManagePage from './RunManage/RunManagePage'
import SaleManagePage from './SaleManage/SaleManagePage'
import GoodsManagePage from './GoodsManage/GoodsManagePage' 
import MainGoodsList from './GoodsManage/components/MainGoodsList'
import AddGoods from './GoodsManage/components/AddGoods'
import StoreManagePage from './StoreManage/StoreManagePage'
import StoreRecord from './StoreManage/components/StoreRecord'
import VipManagePage from './VipManage/VipManagePage'
import VipDetail from './VipManage/components/VipDetail'
import AccountManagePage from './AccountManage/AccountManagePage'
import ChartAnalysisPage from './ChartAnalysis/ChartAnalysisPage'
import StoreSetupPage from './StoreSetup/StoreSetupPage'

/***************    基本路由    *********************/
let mainRoutes = [
  {
    path: 'CMS/CargoOwnerPage',
    component: CargoOwnerPage
  },
  {
    path: 'CMS/DemoPage',
    component: DemoPage
  },
  {
    path: 'ProfileManagePage',
    component: ProfileManagePage
  },
  {
    path: 'TestManagePage',
    indexRoute: { component: TestManagePage },
    childRoutes: [{
      path: 'TestDetail',
      component: TestDetail
    }]
  },
  {
    path: 'ItemBankManage',
    component: ItemBankManage
  },

  {
    path: 'RunManagePage',
    component: RunManagePage
  },
  {
    path: 'SaleManagePage',
    component: SaleManagePage
  },
  {
    path: 'GoodsManage',
    indexRoute: { component: GoodsManagePage },
    childRoutes: [{
      path: 'StoreGoodsList',
      component: GoodsManagePage
    },
    {
      path: 'MainGoodsList',
      component: MainGoodsList
    },
    {
      path: 'AddGoods',
      component: AddGoods
    },
    ]
  },
  {
    path: 'StoreManage',
    indexRoute: { component: StoreManagePage },
    childRoutes: [{
      path: 'AddExchange',
      component: StoreManagePage
    },
    {
      path: 'StoreRecord',
      component: StoreRecord
    },
    ]
  },

  {
    path: 'VipManagePage',
    indexRoute: { component: VipManagePage },
    childRoutes: [{
      path: 'VipDetail',
      component: VipDetail
    }]
  },
  {
    path: 'AccountManage',
    indexRoute: { component: AccountManagePage },
    childRoutes: [{
      path: 'StoreAccount',
      component: AccountManagePage
    },
    {
      path: 'BackstageAccount',
      component: AccountManagePage
    },
    ]
  },
  {
    path: 'ChartAnalysis',
    indexRoute: { component: ChartAnalysisPage },
    childRoutes: [{
      path: 'SaleAnalysis',
      component: ChartAnalysisPage
    },
    {
      path: 'GoodsAnalysis',
      component: ChartAnalysisPage
    },
    ]
  },
  {
    path: 'StoreSetup',
    indexRoute: { component: StoreSetupPage },
    childRoutes: [{
      path: 'LogoSetup',
      component: StoreSetupPage
    }]},
   // {
  //   path: 'GoodsManagePage',
  //   component: GoodsManagePage
  // },

];

// 过滤 路由
let controlledDoorManageRoutesArr = getGivenMenuList(mainRoutes);
function getGivenMenuList(menuListSource) {
  return menuListSource;
  let menuLists = Common.getMenuList() || [], menuListGiven = [], menuArr = [];
  menuLists.map(item => {
    if (item && item.path) {
      menuArr.push(item.path);
    }
  });
  if (menuArr.length !== menuLists.length) {
    console.error('菜单数据列表数据有无效数据，请检查！');
    return;
  }
  menuListSource.map(item => {
    let f = false;
    for (let i = 0; i < menuArr.length; i++) {
      if (menuArr[i].indexOf(item.path) !== -1) {
        f = true;
        break;
      }
    }
    if (f) {
      menuListGiven.push(item)
    };
  });
  return menuListGiven;
}

/***************   总路由    *********************/
let oriangeRoute = '/ZYC/';

module.exports = {
  path: '/ZYC',
  component: ZYCLayout,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: oriangeRoute,
      indexRoute: { component: TestManagePage },
      childRoutes: mainRoutes
    },
  ]
};

