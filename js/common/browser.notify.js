/**
 * Created by xlx on 2016/1/15.
 */
    //桌面提醒
(function(w){
    var notify = function(title, content,iconUrl) {
        title = title||"桌面提醒";
        content = content||"您看到此条信息桌面提醒设置成功";
        iconUrl = iconUrl||"http://xuhong.github.io/images/gravatar.png";
        if (window.webkitNotifications) {
            //chrome老版本
            if (window.webkitNotifications.checkPermission() == 0) {
                var notif = window.webkitNotifications.createNotification(iconUrl, title, content);
                notif.display = function() {}
                notif.onerror = function() {}
                notif.onclose = function() {}
                notif.onclick = function() {this.cancel();}
                notif.replaceId = 'Meteoric';
                notif.show();
            } else {
                window.webkitNotifications.requestPermission($jy.notify);
            }
        }
        else if("Notification" in window){
            console.log(Notification.permission);
            // 判断是否有权限
            if (Notification.permission === "granted") {
                var notification = new Notification(title, {
                    "icon": iconUrl,
                    "body": content
                });
                notification.onshow = function(){
                    console.log("You got me!");
                };
                notification.onclick = function() {
                    window.focus();
                };
                notification.onclose = function(){
                    console.log("notification closed!");
                };
                notification.onerror = function() {
                    console.log("An error accured");
                }
            }
            //如果没权限，则请求权限
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission) {
                    // Whatever the user answers, we make sure we store the
                    // information
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                    //如果接受请求
                    if (permission === "granted") {
                        var notification = new Notification(title, {
                            "icon": iconUrl,
                            "body": content
                        });
                    }
                });
            }
        }
    }
    w.bNotify = notify;
})(window)