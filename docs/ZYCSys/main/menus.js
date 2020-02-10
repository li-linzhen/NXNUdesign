import Common from '../../public/script/common';
function ModuleMenus() {
  this.mainMenus = [
    {
      name: '程序测试',
      to: '/ZYC/TestManagePage',
      icon: 'profile',
      childItems: []
    },
    {
      name: '经营概括',
      to: '/ZYC/RunManagePage',
      icon: 'profile',
      childItems: []
    },{
      name: '销售管理',
      to: '/ZYC/SaleManagePage',
      icon: 'pay-circle',
      childItems: []
    }
    ,{
      name: '商品管理',
      to: '/ZYC/GoodsManage',
      icon: 'skin',
      childItems: Common.getFilterList([
        {
          name: '门店商品列表',
          to: '/ZYC/GoodsManage/StoreGoodsList'
        },
        {
          name: '总仓商品列表',
          to: '/ZYC/GoodsManage/MainGoodsList'
        }
        ,
        {
          name: '新增商品',
          to: '/ZYC/GoodsManage/AddGoods'
        },
      ])
    },
    {
      name: '仓库管理',
      to: '/ZYC/StoreManage',
      icon: 'home',
      childItems: Common.getFilterList([
        {
          name: '新增挑拨',
          to: '/ZYC/StoreManage/AddExchange'
        },
        {
          name: '出入库记录',
          to: '/ZYC/StoreManage/StoreRecord'
        },
      ])
    }
    ,{
      name: '会员管理',
      to: '/ZYC/VipManagePage',
      icon: 'user',
      childItems: []
    }
    ,{
      name: '账号管理',
      to: '/ZYC/AccountManage',
      icon: 'idcard',
      childItems: Common.getFilterList([
        {
          name: '门店账号',
          to: '/ZYC/AccountManage/StoreAccount'
        },
        {
          name: '后台账号',
          to: '/ZYC/AccountManage/BackstageAccount'
        }
      ])
    }
    ,{
      name: '图表分析',
      to: '/ZYC/ChartAnalysis',
      icon: 'bar-chart',
      childItems: Common.getFilterList([
        {
          name: '销售分析',
          to: '/ZYC/ChartAnalysis/SaleAnalysis'
        },
        {
          name: '商品分析',
          to: '/ZYC/ChartAnalysis/GoodsAnalysis'
        }
      ])
    }
    ,{
      name: '门店设置',
      to: '/ZYC/StoreSetup',
      icon: 'shop',
      childItems: Common.getFilterList([
        {
          name: 'Logo设置',
          to: '/ZYC/StoreSetup/LogoSetup'
        }
      ])
    },
    {
      name: '例子',
      to: 'CMS',
      icon: 'profile',
      childItems: Common.getFilterList([
        {
          name: '货主',
          to: '/ZYC/CMS/CargoOwnerPage'
        },
        {
          name: '示例',
          to: '/ZYC/CMS/DemoPage'
        }
      ])
    }
  ];
  this.topMenus = [];
}

module.exports = new ModuleMenus(this);
