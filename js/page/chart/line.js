/**
 * Created by xlx on 2015/12/16.
 */
var myChart;
option = {
    title: {
        text: "7日销售量变化",
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
            data: ["2015/12/10", "二", "三", "四", "五", "六", "七", "八", "九"]
        }
    ],
    yAxis: [
        {
            name: "新增个数"
        }
    ],
    tooltip : {
        trigger: 'axis'
    },
    series: [
        {
            name: "新增客户总数",
            type: "line",
            data: [100, 800, 90, 270, 81, 247, 741, 400, 669]

        },
        {
            name: "新增车辆总数",
            type: "line",
            data: [122, 222, 422, 811, 162, 322, 642, 128, 256]

        },
        {
            name: "新增车机总数",
            type: "line",
            data: [235, 343, 564, 232, 673, 234, 532, 345, 422]

        }
    ]
};

$().ready(function(){
    myChart = echarts.init(document.getElementById('main'));
    var ecConfig=econfig;
    myChart.setOption(option);
    $(".show-grate>div").on("click",function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
    myChart.on(ecConfig.EVENT.LEGEND_SELECTED, eCallback);
});
function eCallback(param) {
    var selected = param["selected"];
     $(".test1,.test2,.test3").show();
    if(selected["新增客户总数"]==false){
        $(".test1").hide()
    }
    if(selected["新增车机总数"]==false){
        $(".test2").hide()
    }
    if(selected["新增车辆总数"]==false){
        $(".test3").hide()
    }
}
