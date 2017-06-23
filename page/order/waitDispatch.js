/**
 *
 *  @auth xlx_good@qq.com
 *  @date 17/6/21.
 *
 */

requirejs.config({
    baseUrl: '../../',
    paths:  {
        avalon: 'javascript/avalon.min',
        jquery: 'js/plugins/jquery/jquery-2.1.1.min',
        pagination: 'lib/pagination/jquery.pagination',
        WdatePicker: 'js/plugins/DatePicker/WdatePicker'
    },
    shim: {
        pagination: {
            deps: ['jquery']
        }
    }
});


(function(win, dom, requirejs, initVm){
    var vm;
    requirejs(['avalon', 'jquery', 'pagination', 'WdatePicker'], function(){
        //初始化vm
        vm = initVm(dom);
        setPagination(100, 1);
    });

})(window, document, requirejs, function(dom){
    var vm = avalon.define({
        $id: 'container',
        form:{
            category: '40',
            site: null,
            keyword: '',
            state: null,
        },
        /**
         * 查询
         * */
        search: function(){
            console.log(vm.form);
        }

    })
    avalon.scan(dom.body);
    return vm;
});

/**
 * 设置翻页
 * @param <number> 总条数
 * @param <number> 当前页码
 * */
function setPagination(total, current){
    $('.pagination').pagination(total,{
        items_per_page: 10, //  每页显示条数
        current_page: current,
        num_display_entries: 20, // 显示的页面个数
        next_text: '下一页',
        prev_text: '上一页',
        num_edge_entries: 2, //省略号后面显示的页码个数
        callback: function(index){
            console.log(index);
        }
    });
}
