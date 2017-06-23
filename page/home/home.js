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
        echarts: 'js/plugins/echarts/echarts-all',
        econfig: 'js/plugins/echarts/econfig',
    },
    shim: {
    }
});


(function(win, dom, requirejs, initVm){
    var vm, myChart;
    requirejs(['avalon', 'jquery', 'echarts', 'econfig'], function(){
        //初始化vm
        vm = initVm(dom);
        //初始化折线图
        myChart = initLine();
    });

})(window, document, requirejs, function(dom){
    var vm = avalon.define({
        $id: 'container',
    })
    return vm;
});
var option = {
    title: {
        text: "客户趋势统计",
        x: "center"
    },
    legend: {
        x: 'center',
        y:"bottom",
        data: ["新增客户总数", "新增车辆总数","新增车机总数"]
    },
    xAxis: [
        {
            type: "category",
            name: "时间",
            splitLine: {show: false},
            data: ["2015-12-10", "2015-12-11", "2015-12-12", "2015-12-13", "2015-12-14", "2015-12-15", "2015-12-16"]
        }
    ],
    yAxis: [
        {
            name: "销售量"
        }
    ],
    tooltip : {
        trigger: 'axis'
    },
    series: [
        {
            name: "销售量",
            type: "line",
            data: [100, 800, 90, 270, 81, 247, 741]
        }
    ]
};
function  initLine(){
    var myChart = echarts.init(document.getElementById('line'));
    myChart.setOption(option);
    myChart.on(econfig.EVENT.LEGEND_SELECTED, eCallback);
    return myChart;
}

function eCallback(param){
    console.log(param);
}
