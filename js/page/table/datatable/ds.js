/**
 * Created by xlx on 2016/1/9.
 * @description home.js
 */
(function(w,$){
    var tb;
    var home = {
        "init":function(){//初始化页面
            $('.content').load(config.path+"js/page/table/datatable/html/c1.html",function(){//加载页面
                home.main();
            });
        },
        "main":function(){//业务逻辑操作
            this.createTable();
            this.createOilList();
            this.createOrgThree();
        },
        "createTable":function(){
            //定义列表绑定数据源
            var columns = [
                {data: 'plateNumber'},
                {data: 'din'},
                {data: 'orgName'},
                {data: 'carModelName'},
                {data: 'buyDate'}
            ];
            //查询参数，回调函数
            var data = function(d){
                //其它条件
                d["plateNumber"] = $('#plateNumber').val();
                d["orgId"] = $('#orgId').val();
                d["engineNumber"] = $('#engineNumber').val();
                d["vin"] = $('#vin').val();
                d["oilId"] = $('#oilId').val();
            }
            //点击展开详细，回调函数
            var showDetail = function(tr){
                var row = tr.data();
                tr.child('<div class="label-detail"><p><label >车&nbsp;架&nbsp;号&nbsp;:</label><span>'+
                    row.vin+'</span></p><p><label>发&nbsp;动&nbsp;机&nbsp;号:</label><span>'+
                    row.engineNumber+'</span></p><p><label>登记证书号:</label><span>'+row.regist+
                    '</span></p><p><label>油&nbsp;品&nbsp;名&nbsp;称:</label><span>'+
                    (row.oilName==null?"--":row.oilName)+'</span></p></div>').show();
            }
            //table排序
            var orderArr = [[3, 'asc'],[1, 'asc']];
            //定义列渲染
            var columnDefs = [
                {
                    "render": function (data, type, row) {
                        return  "<span>"+data+"</span>";
                    },
                    "targets": 2//对应的列，从0开始
                }
            ];
            //初始化列表
            tb = SJTable.table.init("#grid",config.path+"js/page/table/datatable/data/tb.json", data, columns, {"orderArr":orderArr, "callback":showDetail,"columnDefs":columnDefs});
        },
        "createOrgThree":function(){
            //机构树
            $.ajax({
                type:"POST",
                url:config.path+'js/page/home/data/org.json',
                dataType:"json",
                success:function(resp){
                    if(resp.code == "0"){
                        //初始化机构树
                        SJztree.ztree.init("orgName",null,resp.data,{"isChk":false,"hiddenId":"orgId"});
                    }
                }
            });
        },
        "createOilList":function(){
            //油品下拉列表
            $.ajax({
                type:"POST",
                url:config.path+'js/page/home/data/oil.json',
                dataType:"json",
                success:function(resp){
                    if(resp.code == "0"){
                        //初始化下拉选项
                        $('#oilId').append('<option value="">请选择油品名称</option>');
                        var oils = resp.data;
                        for(var i=0;i<oils.length;i++){
                            var oil = oils[i];
                            $('#oilId').append('<option value="'+oil.typeId+'">'+oil.name+'</option>');
                        }
                    }
                }
            });
        }
    };
    $().ready(function(){
        //dom加载完执行
    });
    w.onload=home.init;//页面内容加载完
    //   w.home = home;//向外部开放
})(window,jQuery)
