/**
 * Created by xlx on 2015/12/28.
 * 选中后高亮
 */
(function($){
   setTimeout(function(){
       $("table").delegate("tr","click",function(){
           $("tr.success").removeClass("success");
           $(this).addClass("success");
       });
   },1000);
})(jQuery)
