/**
 * Created by xlx on 2015/12/16.
 */
(function(){
    var myChart;
    optionBar = {
        title : {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip : {
            trigger: 'axis'
        },
        color:["#4096B5"],
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'value',
                boundaryGap : [0, 0.01]
            }
        ],
        yAxis : [
            {
                type : 'category',
                data: ["广东", "浙江", "四川", "重庆", "北京", "天津"]
            }
        ],
        series : [
            {
                type:'bar',
                barMaxWidth:10,
                data:[20, 24, 56, 60, 211, 300]
            }
        ]
    };
    optionMap = {
        title : {
            text: '',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x:'left',
            data:['客户数']
        },
        dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
        },
        toolbox: {
            show: true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        roamController: {
            show: true,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        series : [
            {
                name: '客户数',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[
                    {name: '广东',value: 20},
                    {name: '浙江',value: 24},
                    {name: '四川',value: 56},
                    {name: '重庆',value:60},
                    {name: '北京',value:211},
                    {name: '天津',value: 300}
                ]
            }
        ]
    };
    $().ready(function(){
        myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(optionBar);
        $(".switch span").on("click",function(){
            var that = $(this);
            if(that.hasClass("click-able")){
                that.removeClass("click-able");
                if(that.hasClass("map")){
                    myChart.setOption(optionMap);
                    $(".distribute").addClass("click-able");
                }else{
                    myChart.setOption(optionBar);
                    $(".map").addClass("click-able");
                }
            }
        });
    })
})()
