/**
 *
 *  @auth xlx_good@qq.com
 *  @date 17/6/21.
 *
 */

requirejs.config({
    baseUrl: '',
    paths:  {
        // base: 'js/base',
        // config: 'js/config',
        avalon: 'javascript/avalon.min',
        jquery: 'js/plugins/jquery/jquery-2.1.1.min',
        slimscroll: 'js/plugins/jquery/jquery.slimscroll',
        bootstrap: 'js/plugins/bootstrap/bootstrap.min',
        metisMenu: 'js/plugins/metisMenu/jquery.metisMenu',
        page: 'js/common/page',
        main: 'js/common/main',
        // api: 'js/api',
        // avalon: 'javascript/avalon'
    },
    shim: {
        'slimscroll':{
            deps: ['jquery']
        },
        'metisMenu':{
            deps: ['jquery']
        },
        'page':{
            deps: ['jquery']
        },
        'main':{
            deps: ['jquery', 'page']
        },
        'bootstrap': ['jquery']
    }
});


(function(win, dom, requirejs, initVm){
    var vm;
    requirejs(['avalon', 'jquery', 'slimscroll', 'bootstrap', 'metisMenu', 'page', 'main'], function(){
        //初始化vm
        vm = initVm(dom);
    });

})(window, document, requirejs, function(dom){
    var vm = avalon.define({
        $id:'container'
    })
    avalon.scan(dom.body);
    return vm;
});