/**
 * 1.监控页面http加载时间和访问后台的时间
 * Created by xianglongxiang on 2015/11/9.
 */
(function($,w){
    //监控 各个接口的访问时间
    var timing = function(){
        $(document).ajaxSend(function(evt, request, settings){
            performance.clearMarks();
            performance.clearMeasures();
            performance.mark("start");
        });
        $(document).ajaxComplete(function(evt, request, settings){
            performance.mark("end");
            performance.measure("difference", "start", "end");
            var marks = performance.getEntriesByType("mark");
            var measures = performance.getEntriesByType("measure");
            measures.forEach(function(measure){
                console.log("接口: " + settings.url+"耗时："+measure.duration);
            })
        });
    }
    w.onload = function(){
        timing();
        console.log("load time: " + (performance.timing.domComplete -
            performance.timing.domLoading ));
        performance.getEntriesByType("resource").forEach(function(r) {
            console.log(r.name + ": " + r.duration)
        });
    }
})(jQuery,window);