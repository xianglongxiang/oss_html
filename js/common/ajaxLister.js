/**
 * Created by xlx on 2015/12/25.
 * 监听页面ajax 显示loading
 */
(function($){
  $().ready(function(){
      $(document).ajaxSend(function(event,request,settings){//显示loading
          if(filterUrl(settings)){
            return;
          }
          try{
              window.parent.page.showLoad();
          }catch(e){}
      });
      $(document).ajaxComplete(function(event,request, settings){//隐藏loading
          if(filterUrl(settings)){
              return;
          }
          try{
              window.parent.page.hideLoad();
          }catch(e){}
      });
      $(document).ajaxError(function(event,request, settings){//提示望楼错误
          try{
              window.parent.page.hideLoad();
          }catch(e){}
          alertify.error("网络错误");

      });
      $(document).ajaxSuccess(function(evt, request, settings){//截取网络错误信息
          if(request["responseJSON"]){
              var dataJSON = JSON.parse(request.responseText);
              if(dataJSON["code"]){
                 if(dataJSON["code"]!=0){
                     alertify.error(dataJSON["message"]);
                 }
              }
          }
      });
      function filterUrl(settings){//过滤掉定时刷新的接口
          var url = settings.url;
          if(url.indexOf("center/count")>0){
              return true;
          }
          return false
      }
  });
})(jQuery)
