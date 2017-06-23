/**
 *  页面导航
 *  @auth xlx_good@qq.com
 *  @date 17/6/21.
 *
 */

(function(win){

    var goodsManage = [
        {name: '编辑商品', url: 'page/goods/edit.html', subclass: [], icon: '', active: false},
        {name: '待售商品', url: 'page/goods/forSale.html', subclass: [], icon: '', active: false},
        {name: '在售商品', url: 'page/goods/onSale.html', subclass: [], icon: '', active: false},
    ];
    var orderManage = [
        {name: '代发货订单', url: 'page/order/waitDispatch.html', subclass: [], icon: '', active: false},
        {name: '订单列表', url: 'page/order/list.html', subclass: [], icon: '', active: false},
    ];
    var dataManage = [
        {name: '日销售统计', url: 'page/statistics/day.html', subclass: [], icon: '', active: false},
        {name: '商品销售统计', url: 'page/statistics/sale.html', subclass: [], icon: '', active: false},
    ];
    var accountManage = [
        {name: '账户信息', url: 'page/account/account.html', subclass: [], icon: '', active: false},
    ];

    win.navPage = [
        {name: '主页', url: 'page/home/home.html', subclass: [], icon: 'fa-home', active: true},
        {name: '商品管理', url: '', subclass: goodsManage, icon: 'fa-list-alt', active: false},
        {name: '订单管理', url: '', subclass: orderManage, icon: 'fa-shopping-cart', active: false},
        {name: '数据统计', url: '', subclass: dataManage, icon: 'fa-bar-chart', active: false},
        {name: '账号信息', url: '', subclass: accountManage, icon: 'fa-users', active: false},
    ];
})(window);