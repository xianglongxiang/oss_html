/**
 * 1.实现表格的创建；
 * 2.参数说明：
     1）tb —table 对象，可以为 class id  dom标签
     2）data —table显示的数据,
     3）opt  — var opt = {
               key: 和 th里面的 data-opt="select"对应
               value: 写入的html
           }
        var opt = {"select":"<input type='checkbox' name='s'>"}
   3.th 设置
     field --数据的字段 <th  field="name" >姓名</th>
        var data = [{name:"张三"}]
     data-opt ---操作列对应的 html <th  data-opt="select">选择</th>
        var opt = {"select":"<input type='checkbox' name='s'>"}
     data-style —单列的样式 <th data-style="width:180px;background:red;color:white">选择</th>
 *  Created by xianglongxiang on 2015/11/3.
 */
(function($,window){

    var table = function(tb,data,opt){
        this.tb = tb;
        this.data = data;
        this.opt = opt;
        this.th = $(tb).find("th");
        this.len = this.th.length;//列数\
//        this.create();
        $(tb).dataTable({//使用jquery.dataTables.js
            "paging":   false,
            "ordering": true,
            "info":     false,
            "searching":true,
            "oLanguage":{
                "sSearch":"查找： "
            },
            "bSort": false,
            "aoColumns": [
                { "bSortable": false,"aTargets": [1] },
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": true }
            ],
            "aaSorting":[0]
        });
    }

    table.prototype.clear = function(){
        $(this.tb).find("tbody").html("");
    }
    table.prototype.setData = function(data){
        this.data = data;
        this.create();
    }
    table.prototype.create = function(){
        this.clear();
        for(var j=0;j<this.data.length;j++){
            var tr = document.createElement("tr");
            $(tr).attr({"data-index":j});
            for(var i=0;i<this.len;i++){
                var td = document.createElement("td");
                var th =  $(this.th[i]);
                if(th.attr("field")){
                    var field = th.attr("field");
                    var value = this.data[j][field];
                    td.innerHTML = value;
                }else{
                    var _opt = th.attr("page-opt");
                    td.innerHTML = opt[_opt];
                }
                if(th.attr("page-style")){
                    var style= th.attr("page-style");
                    this.setStyle(td,style);
                }
                tr.appendChild(td);
            }
            $(this.tb).find("tbody").append(tr);
        }
    }
    table.prototype.setStyle = function(td,style){
        var styles = style.split(";");
        if(styles.length>1){
            for(var z=0;z<styles.length;z++){
                var _style = styles[z].split(":");
                var _k = _style[0];
                var _v = _style[1];
                td.style[_k] = _v;
            }
        }else{
            var _style = style.split(":");
            var _k = _style[0];
            var _v = _style[1];
            td.style[_k] = _v;
        }
    }
    table.prototype.initPagination = function(index,per_num,total_mun,callback){//参数：index 当前页，per_num 每一页显示的数量, mun 数据总条数， callback 回调方法
        var tfoot = " <tfoot><tr><td colspan='"+this.len+"'><div id='Pagination'></div></td></tr></tfoot>";
        $(this.tb).append(tfoot);
        $("#Pagination").pagination(total_mun, {
            callback: callback,
            items_per_page:per_num,
            current_page:index,
            next_text:"下一页",
            prev_text:"上一页",
            load_first_page:false,
            num_display_entries:10
        });
    }
    window.table = table;
})(jQuery,window);