/**
 * 1.index 页面初始化
 * Created by xianglongxiang on 2015/9/22.
 */

(function($,w){
    $().ready(function(){
      //  getAutho();
        init();
        scrollBar();
        smoothlyMenu();
        setSize();
        $(".dropdown-toggle").dropdown('toggle');
    });
    function init(){
        //定位当前选项卡
        $(".J_tabShowActive").click(function(){
            var left = $(".page-tabs .active").position().left;
            if(left!=0){
                $(".page-tabs-content").css({"margin-left":-left+"px"});
            }
        });
        //关闭所有选项卡
        $(".J_tabCloseAll").click(function(){
            $("iframe").not(":first").remove();
            $("iframe:first").show();
            $(".page-tabs-content a").not(":first").remove();
            $(".page-tabs-content a:first").addClass("active");
        });
        //关闭其它选项卡
        $(".J_tabCloseOther").click(function(){
            var dataId = $(".page-tabs .active").attr("data-id");
            var iframe =  $("iframe[src='"+dataId+"']");
            $("iframe").not(":first").not(iframe).remove();
            $(".page-tabs-content").find("a").not(":first").not(".active").remove();
        });
        //标题栏翻页
        var tabs = new page(".content-tabs",".page-tabs-content",200);
        $(".roll-left").unbind("click").bind("click",function(){ //向下翻页
            tabs.nextTitle();
        });
        $(".roll-right").unbind("click").bind("click",function(){//向上翻页
            tabs.prevTitle();
        });
        //打开页面
        $("#side-menu a").unbind("click").bind("click",function(){
            var url = $(this).attr("data-url");
            var title = $(this).attr("data-title");
            tabs.addPage("#content-main",url,title);
        });
        $("#side-menu>li>a").unbind("click").bind("click",function(){
            var url = $(this).attr("data-url");
            if(!url){
                var that=$(this);
                var liPa=that.parent("li");
                if(liPa.hasClass("activeClass")){
                    liPa.removeClass("activeClass");
                }else{
                    $(".activeClass").removeClass("activeClass");
                    liPa.addClass("activeClass");
                }
            }
        });
        w.tabs = tabs;
    }
    function getAutho() {
        $.ajax({
            type: "POST",
            url: path + '/resources?&' + Math.random(),
            dataType: "json",
            success: function (resp) {
                if (resp.code == "0") {
                    var authdata = resp.data;
                    //  console.log(authdata)
                    drawAuth(authdata);
                } else {
                    alert(resp.message);
                }
            },
            error: function (e) {
                alert(e);
            }
        });
    }
    function drawAuth(auth){
        var parentHtml = "";
        for(var i=0;i<auth.length;i++){
            var parent = auth[i];
            parentHtml+= "<li><a href=\"javascript:void(0)\"><i class=\""+parent['img']+"\"></i>" +
                "<span class=\"nav-label\">"+parent['name']+"</span><span class=\"fa arrow\"></span></a>";
            var childs = parent['childAuths'];
            parentHtml+="<ul class=\"nav nav-second-level\">";
            for(var j=0;j<childs.length;j++){
                var child=childs[j];
                parentHtml+= "<li><a href=\"javascript:void(0)\"" +
                    "data-url=\""+path+""+child['url']+"\" data-title=\""+child['name']+"\">"+child['name']+"</a>" +
                    "</li>"
            }
            parentHtml+="</ul>";
            parentHtml+="</li>";
        }

        $("#side-menu").append(parentHtml);
    }
    // 调整页面的大小
    function setSize(){
        $(window).bind("load resize", function() {
            if ($(this).width() < 769) {
                $('body').addClass('body-small')
            } else {
                $('body').removeClass('body-small')
            }
            scrollBar();
        });
    }
    //滚动条
    function scrollBar(){
        $("#side-menu").slimscroll({
            size: "5px",
            height:function(){
                return document.documentElement.clientHeight - 65;
            }()
        });
        $("#side-menu").css({"height":document.documentElement.clientHeight - 65+"px"});
        // 菜单栏
        $('#side-menu').metisMenu();
        $(".slimScrollDiv").css({"height":document.documentElement.clientHeight-65+"px"});
    }
    // 菜单栏放大缩小
    function smoothlyMenu() {
        $(".navbar-minimalize").unbind("click").bind("click",function () {
            $("body").toggleClass("mini-navbar");
            if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                // Hide menu in order to smoothly turn on when maximize menu
                $('#side-menu').hide();
                // For smoothly turn on menu
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 100);
            } else if ($('body').hasClass('fixed-sidebar')){
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 300);

            } else {
                // Remove all inline style from jquery fadeIn function to reset menu state
                $('#side-menu').removeAttr('style');
            }
        });
    }
})(jQuery,window)
