/**
 *
 *  @auth xlx_good@qq.com
 *  @date 17/6/21.
 *
 */

requirejs.config({
    baseUrl: '',
    paths:  {
        avalon: 'javascript/avalon.min',
        jquery: 'js/plugins/jquery/jquery-2.1.1.min',
        slimscroll: 'js/plugins/jquery/jquery.slimscroll',
        navPage: 'nav-page',
    },
    shim: {
        'slimscroll':{
            deps: ['jquery']
        }
    }
});


(function(win, dom, requirejs, initVm){
    var vm;
    requirejs(['avalon', 'jquery', 'slimscroll', 'navPage'], function(){
        //初始化vm
        vm = initVm(dom);
    });

})(window, document, requirejs, function(dom){
    var vm = avalon.define({
        $id:'container',
        pageList: navPage,
        currentPage: '主页', //导航栏 当前page
        showPage: '主页', // 当前打开页面
        miniMenu: false,
        navIndex: 0, //顶部导航位置
        openPageList: [],
        /**
         * 1.展开/隐藏菜单；2.打开页面
         * @param  <object> 页面对象
         * */
        clickMenu: function(page){
            vm.currentPage = page.name;
            page.active = !page.active;
            if(page.url != ''){
                vm.showPage = page.name;
                if(vm.openPageList.indexOf(page) == -1){
                    vm.openPageList.push(page);
                }
            }
        },
        /**
         * 关闭页面
         * */
        close: function(page){
            var index = vm.openPageList.indexOf(page);
            if(page.name == vm.showPage){
                vm.showPage = vm.openPageList[index-1].name;
            }
            if(vm.openPageList.length-1 == vm.navIndex){
                vm.marginLeft(-4);
            }
            vm.openPageList.splice(index,1);
        },
        /**
         * 顶部菜单翻页位移的距离
         * @param <number>  翻页数量
         * @return <number> 距离左边的距离
         * */
        marginLeft: function(num){
            var tabs = document.getElementsByClassName('J_menuTab');
            var marginLeft = 0;
            vm.navIndex += num;
            if(vm.navIndex > tabs.length-1){
                vm.navIndex =  tabs.length-1;
            }
            if(vm.navIndex < 0){
                vm.navIndex = 0;
            }
            for(var i=0; i<vm.navIndex; i++){
                marginLeft += parseFloat(getEelementWidth(tabs[i]).replace('px', ''));
            }
            dom.getElementsByClassName('page-tabs-content')[0].style.marginLeft =  -marginLeft + 'px';
        },
        /**
         * 定位当前选项卡
         * */
        fixedPos: function(){
            for(var i=0; i< vm.openPageList.length; i++){
                if(vm.openPageList[i].name == vm.showPage){
                    vm.marginLeft(i);
                    return;
                }
            }
        },
        /**
         * 关闭全部选项卡
         * */
        closeAll: function(){
            vm.openPageList.splice(1,vm.openPageList.length-1);
            vm.showPage = vm.openPageList[0].name;
            vm.fixedPos();
        },
        closeOther: function(){
            var index = 0;
            for(var i=1; i< vm.openPageList.length; i++){
                if(vm.openPageList[i].name == vm.showPage){
                    index = i;
                    break;
                }
            }
            vm.openPageList.splice(index+1, vm.openPageList.length);
            vm.openPageList.splice(1, index-1);
        }

    })
    avalon.scan(dom.body);
    menuScroll();
    vm.clickMenu(vm.pageList[0])
    return vm;
});

// 获取元素的宽度
function getEelementWidth(element){
    if(element.currentStyle){
        return element.currentStyle['width'];
    }else{
        return window.getComputedStyle(element,null)['width'];
    }
}

// 左侧菜单滚动条
function menuScroll(){

    var scrollH = document.documentElement.clientHeight - 65
    //滚动条
    $("#side-menu").slimscroll({
        size: "5px",
        height: scrollH
    });
    $("#side-menu").css({"height": scrollH + "px"});
    $(".slimScrollDiv").css({"height": scrollH + "px"});
}

