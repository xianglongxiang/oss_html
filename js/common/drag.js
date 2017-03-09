/**
 * Created by xlx on 2015/9/24.
 * jquery-ui 实现拖拽的方法
 */
// jquery  拖拽
function WinMove() {
    var element = "[class*=col]";//element 的子元素可进行拖拽
    var handle = ".ibox-title";//element 的子元素下的 handle 进行拖拽
    var connect = "[class*=col]";//可拖拽到的对象
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        }).disableSelection();
};