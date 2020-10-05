const menuList = [
  {
    title: 'Dashboard', // menu
    key: '/dashboard', // 対応するパス
    icon: 'dashboard', // アイコン名
    isPublic: true, // 公開
  },
  {
    title: '商品',
    key: '/product',
    icon: 'appstore',
    children: [ // submenu list
      {
        title: '種類管理',
        key: '/category',
        icon: 'bars'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: 'ユーザー管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '役割管理',
    key: '/role',
    icon: 'safety',
  },

  {
    title: 'グラフィックチャート',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '縦棒グラフ',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折れ線グラフ',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '円グラフ',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: '注文管理',
    key: '/order',
    icon: 'ordered-list',
  },
  {
    title: '促進販売',
    key: '/promotion',
    icon: 'info-circle',
  },
  {
    title: 'コメント',
    key: '/comment',
    icon: 'edit',
  },
  {
    title: 'サービス管理',
    key: '/service',
    icon: 'customer-service',
  },
  {
    title: '推薦サービス',
    key: '/recommendation',
    icon: 'customer-service',
  },
  {
    title: '在庫管理',
    key: '/stock',
    icon: 'stock',
  },
  // {
  //   title: '捜査管理',
  //   key: '/research',
  //   icon: 'windows',
  // },
  {
    title: '発送管理',
    key: '/shipping',
    icon: 'car',
  },
  {
    title: '支払管理',
    key: '/payment',
    icon: 'pay-circle',
  },
  {
    title: 'Home',
    key: '/home',
    icon: 'home'
  },
]

export default menuList