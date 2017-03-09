/**
 * Created by xlx on 2015/12/15.
 */
var SJTable = {
    table: {
        init: function (obj, url, data, columns, settings) {// dom对象，ajax的后台接口，访问后台参数，显示的列，其它设置
            var tb = $(obj).DataTable({
                "ajax": {
                    url: url,
                    type: "post",
                    data: function(d){//设置后台的访问参数
                        d["orderby"] = SJTable.table.orderby(d);//序列化datatable 默认参数
                        if(data){
                            data(d);//添加 data方法中的参数
                        }
                    }
                },
                columns: function () {
                    var cols = [];
                    if (settings.callback) {
                        cols[0] = {
                            "class": 'details-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": ''
                        };
                    } else if (settings.checkbox) {
                        cols[0] = {
                            "class": '',
                            "orderable": false,
                            "data": null,
                            "defaultContent": '<input class="check" name="machine" type="checkbox">'
                        };
                    }
                    return cols.concat(columns);
                }(),
                "columnDefs": function () {//定义列渲染
                    if (settings.columnDefs) {
                        return settings.columnDefs;
                    } else {
                        return [];
                    }
                }(),
                "order": function () {//排序列
                    if (settings.orderArr) {
                        return settings.orderArr;
                    } else {//默认第一列，顺序排列
                        return [
                            [1, 'asc']
                        ];
                    }
                }(),
                "processing": false,
                "serverSide":function(){
                    if(settings.serverSide==false){
                        return false;
                    }
                    return true;
                    }(),
                "paging": true,
                "ordering": true,
                "info": true,
                "searching": false,
                "bLengthChange": false,
                "iDisplayLength": 10,//每一页显示的条数
                "pagingType": "full_numbers",
                "oLanguage": {
                    "sProcessing": "正在加载数据...",
                    "sSearch": "查找： ",
                    "sLengthMenu": "每页显示 _MENU_ 项记录",
                    "sZeroRecords": "没有符合条件的数据...",
                    //"sInfo": "当前数据为从第 _START_ 到第 _END_ 项数据,总共有 _TOTAL_ 项记录。",
                    "sInfo": "总 _TOTAL_ 项记录。",
                    "sInfoEmpty": "共 0 项记录。",
                    "sInfoFiltered": "(_MAX_)",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    }
                }
            });
            this.bindDetailsClick(obj,tb,settings.callback);
            return tb;
        },
        bindDetailsClick:function(obj,tb,callback){//绑定展开详细的事件
            $(obj + ' tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = tb.row(tr);
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                   callback(row);
                    tr.addClass('shown');
                }
            });
        },
        orderby: function (d) {//根据排序凭借参数字符串
            var order = d.order;
            var columns = d.columns;
            var sort = new Array();
            for (var i in order) {
                sort.push(columns[order[i]["column"]]["data"] + " " + order[i]["dir"]);
            }
            return sort.join(",");
        }
    }
}
