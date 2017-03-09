/**
 * Created by xlx on 2015/9/25.
 *  其它对flot 的插件扩展
 * <script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
 <script src="js/plugins/flot/jquery.flot.spline.js"></script>
 <script src="js/plugins/flot/jquery.flot.resize.js"></script>
 <script src="js/plugins/flot/jquery.flot.pie.js"></script>
 *
 *
 */
function setPlot(data,colors){// page,colors 都为数字，分别是数据和每条数据的颜色
    $.plot($("#flot-dashboard-chart"), data, {
        series: {
            lines: {
                show: true,//显示折现
                lineWidth: 1,//折线的宽度
                fill: true //填满
            },
            points: {
                radius: 0,//点的半径
                show: true//显示点
            },
            shadowSize: 2 //阴影
        },
        grid: { //对格子进行设置
            tickColor: "grey",//格子的颜色
            borderWidth: 1,//格子的宽度
            color:"black"//外边框显得颜色
        },
        colors: function(){
            if(colors){
                return colors;
            }
        }(),//每条折线的颜色
        yaxis: {
            ticks: 4//Y轴显示的格子数
        }
    });
}