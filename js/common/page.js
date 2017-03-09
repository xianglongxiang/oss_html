/**
 * Created by xlx on 2015/9/21. 依赖于jquery 用于模拟浏览器打开网页的效果 在页面中打开页面
 */
function page(contentTab,pageTab,w){//传入参数 contentTab容器 tab标签 被按钮占用的宽度
    this.contentTab = contentTab||page.contentTab;
    this.pageTab = pageTab||page.pageTab;
    this.w = w||page.w;
    this.iframes=[];//记录iframe
    this.index = 0;//记录iframe个数
}
//默认初始化信息
page.contentTab = ".content-tab";
page.pageTab = ".page-tabs-content";
page.w = 200;
page.contentShow = "#content-main";//页面展示区域
//对象方法
page.prototype.prevTitle = function(){//标题 向上翻页
    var width = this.getContainW();
    var l = this.getContainLeft();
    var  marginLeft = l - ( width - this.w);
    var lastChildLeft = this.getLastChildLeft();
    if(( width - this.w)>lastChildLeft){
         return;
    }
    $(this.pageTab).css({"margin-left":marginLeft + "px"});
}
page.prototype.nextTitle = function(){//标题 向下翻页
       var width = this.getContainW();
       var l = this.getContainLeft();
       var  marginLeft = l +( width - this.w);
       if(marginLeft>0){
           marginLeft = 0;
       }
       $(this.pageTab).css({"margin-left":marginLeft + "px"});
}
page.prototype.addPage = function(obj,url,title){//添加页面
    if((typeof url)=="undefined"||url==""){
        return;
    }
    $(".active").removeClass("active");
    var frameObj= $(".page-tabs-content").find("a[page-id='"+url+"']");
    if(frameObj.length>0){
        frameObj.addClass("active");
        $(obj).find("iframe").hide();
        $(obj).find("iframe[src='"+url+"']").show();
        return;
    }
    this.index++;
    var a = " <a href='javascript:;'class='J_menuTab active' page-id='"+url+"'>"+title+"<i class='fa fa-times-circle'></i></a>";
    var iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.src = url;
    iframe.className = "iframe"+this.index;
    $(obj).find("iframe").hide();
    $(obj).append(iframe);
    $(this.pageTab).append(a);
    this.bind(obj);
    page.showLoad()
    iframe.onload = function(){
        page.hideLoad();
    }
}
page.prototype.bind = function(obj){
   $(".J_menuTab").unbind("click").bind("click",function(){//切换窗口
       var url = $(this).attr("page-id");
       $(obj).find("iframe").hide();
       console.log(url);
       $(obj).find("iframe[src='"+url+"']").show();
       $(".active").removeClass("active");
       $(this).addClass("active");
   });
    $(".J_menuTabs a .fa").unbind("click").bind("click",function(){//关闭窗口
        var hasActive = $(this).parent().hasClass("active");
        var url = $(this).parent().attr("page-id");
        $(obj).find("iframe[src='"+url+"']").remove();
        $(this).parent().remove();
        page.close(url);
    });
}
page.prototype.getLastChildLeft = function(){//标题最后一个距离左边的位置
    return parseFloat($(this.pageTab).find("a").last().position().left);
}
page.prototype.getContainW = function(){//标题栏容器的宽度 200 是两边按钮占用的宽度
    return parseFloat($(this.contentTab).css("width"));
}
page.prototype.getContainLeft = function(){//标题栏左移的位置
    return parseFloat($(this.pageTab).css("margin-left"));
}
page.prototype.targetBlank = function(url,title){//点击页面中的标签，另外打开一个页面
        if((typeof url)=="undefined"||url==""){
            return;
        }
        var data_id = $(".J_menuTabs .active").attr("page-id"); //打开页面的地址

        if(url.indexOf("?")>0){
            url = url +"&data_id="+data_id;
        }else{
            url = url +"?&data_id="+data_id;
        }
        $(".active").removeClass("active");
        var frameObj= $(".page-tabs-content").find("a[page-id='"+url+"']");
        if(frameObj.length>0){
            frameObj.addClass("active");
            $(page.contentShow).find("iframe").hide();
            $(page.contentShow).find("iframe[src='"+url+"']").show();
            return;
        }
        this.index++;
        var a = " <a href='javascript:;'class='J_menuTab active' page-id='"+url+"'>"+title+"<i class='fa fa-times-circle'></i></a>";
        var iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        iframe.src = url;
        iframe.className = "iframe"+this.index;
        $(page.contentShow).find("iframe").hide();
        $(page.contentShow).append(iframe);
        $(this.pageTab).append(a);
        this.bind(page.contentShow);
        page.showLoad()
        iframe.onload = function(){
            page.hideLoad();
        }
}
page.prototype.close = function(url){
    $("#content-main").find("iframe[src='"+url+"']").remove();
    $(".J_menuTabs .active").remove();
    page.close(url);
}
//属性方法
page.showLoad = function(){//显示loading
    $(".loader").show();
}
page.hideLoad = function(){//隐藏loading
    $(".loader").hide();
}
page.close = function(url){
    page.hideLoad();
    var data_id = url.split("&data_id=")[1];//返回页面地址
    var frameObj= $(".page-tabs-content").find("a[page-id='"+data_id+"']");
    if(frameObj.length>0){
        frameObj.addClass("active");
        $("#content-main").find("iframe").hide();
        $("#content-main").find("iframe[src='"+data_id+"']").show();
        return;
    }
    $("#content-main").find("iframe").last().show();
    $(".J_menuTabs a").last().addClass("active");
}
