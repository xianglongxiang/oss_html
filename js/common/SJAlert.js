/**
 * Created by xlx on 2016/1/13.
 * @des 提示效果
 */
(function(w){
    var createPrompt=function(content){
        var d = document.createElement("div");
        d.innerHTML = "<div class='alert-title'>提示</div><div class='alert-content'>"+content+"</div>";
        d.className = "alert-layer animated1 fadeInDown";
        var body = document.getElementsByTagName("body")[0];
        var dy = document.createElement("div");
        dy.className = "a-layer";
        body.appendChild(d);
        body.appendChild(dy);
        setTimeout(function(){
            d.className = "alert-layer animated1 fadeOutUp";
            setTimeout(function(){
                body.removeChild(d);
                body.removeChild(dy);
            },1000);
        },2000);
    }
    w.SJAlert = createPrompt;
})(window)