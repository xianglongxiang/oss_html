
/**
 * Created by xlx on 2015/12/14.
 */
var SJztree = {
    ztree:{
        id:'',//ztree的显示框ID
        init:function(id, setting, zNodes, params){//初始化
            return SJztree.ztree.create(id, setting, zNodes, params);//增加一个general false的时候访问机构树，true 使用传入的参数
        },
        show:function(id){//显示机构树
            SJztree.ztree.id = id;
            $('#'+SJztree.ztree.id+'_menuContent').slideDown("fast");//显示机构树
            $("body").bind("mousedown", SJztree.ztree.onBodyDown);//添加鼠标点击事件
        },
        hide:function(){//隐藏机构树
            $('#'+SJztree.ztree.id+'_menuContent').fadeOut("fast");//隐藏机构树
            $("body").unbind("mousedown", SJztree.ztree.onBodyDown);//取消鼠标点击事件
        },
        onBodyDown:function(event){//机构树外点击事件
            if (!(event.target.id == "#"+SJztree.ztree.id+"_menuContent" || $(event.target).parents("#"+SJztree.ztree.id+"_menuContent").length>0)) {//如果点击事件不在机构树内
                SJztree.ztree.hide(SJztree.ztree.id);////隐藏机构树
            }
        },
        destroy:function(){//销毁机构树
            $('#'+SJztree.ztree.id+'_menuContent').remove();
        },
        create:function(id, setting, zNodes, params){//2015.8.10  create by xianglongxiang
            SJztree.ztree.id = id;//文本框ID
            var html = '<div id="'+id+'_menuContent" class="menuContent" style="display:none;position:absolute;z-index:9999;">'+
                '<ul id="'+id+'_ztree" class="ztree" style="margin-top:0;width:100%;background-color:#FFF;max-height:250px;overflow:auto;-moz-border-radius: 5px;-webkit-border-radius: 5px;box-shadow:0 0 6px #555;-moz-box-shadow:0 0 6px #555;-webkit-box-shadow:0 0 6px #555;"></ul>'+
                '</div>';
            $('#'+id).after(html);//将机构树层追加到文本框后
            var isChk = false;//是否可多选机构，默认为单选机构
            if(params['isChk']){
                isChk = params['isChk'];
            }
            var hiddenId = params['hiddenId'];//隐藏域ID
            if(setting == null){//当配置为空时的默认配置
                setting = {
                    view:{
                        fontCss:function(treeId, treeNode){
                            return treeNode.orgType == 2 ? {color:"#335A95"} : {};
                        }
                    },
                    check: {
                        enable: isChk,
                        autoCheckTrigger: false
                    },
                    data: {
                        key: {
                            name: "name"
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'orgId',
                            pIdKey: 'parentId',
                            rootPId: ''
                        }
                    },
                    callback: {
                        onClick: function(e, treeId, treeNode) {//点击事件
                            if(!isChk){//机构单选
                                $("#"+hiddenId).val(treeNode.orgId);//将机构节点的机构ID放置到ID隐藏域
                                $("#"+id).val(treeNode.name);//将机构节点的机构名称放置到文本域
                                SJztree.ztree.hide(id);//隐藏机构树
                            }else{//机构多选
                                var ztreeObj = $.fn.zTree.getZTreeObj(id+'_ztree');//获取机构树对象
                                ztreeObj.checkNode(treeNode,!treeNode.checked,true);//点击机构名称，关联对应机构多选框操作
                                if($("#"+hiddenId).val().length>0){//如果第一个字符不为","
                                    $("#"+hiddenId).val(","+$("#"+hiddenId).val()+",");//ID隐藏域添加第一个字符为","
                                    $("#"+id).val(","+$("#"+id).val()+",");//文本域添加第一个字符为","
                                }else{
                                    $("#"+hiddenId).val(",");//ID隐藏域添加第一个字符为","
                                    $("#"+id).val(",");//文本域添加第一个字符为","
                                }
                                if(treeNode.checked){//节点选中
                                    $("#"+hiddenId).val($("#"+hiddenId).val()+treeNode.orgId+",");//将选中机构的ID放置到ID隐藏域
                                    $("#"+id).val($("#"+id).val()+treeNode.name+",");//将选中机构的名称放置到文本域
                                }else{//节点取消选中
                                    $("#"+hiddenId).val($("#"+hiddenId).val().replace(","+treeNode.orgId+",",","));//将选中机构的ID从ID隐藏域去掉
                                    $("#"+id).val($("#"+id).val().replace(","+treeNode.name+",",","));//将选中机构的名称从文本域去掉
                                }
                                if($("#"+hiddenId).val().length>1){//如果第一个字符为","
                                    $("#"+hiddenId).val($("#"+hiddenId).val().substring(1, $("#"+hiddenId).val().length-1));//ID隐藏域去掉第一个字符","
                                    $("#"+id).val($("#"+id).val().substring(1, $("#"+id).val().length-1));//文本域去掉第一个字符","
                                }else{
                                    $("#"+hiddenId).val('');//ID隐藏域去掉第一个字符","
                                    $("#"+id).val('');//文本域去掉第一个字符","
                                }
                            }
                            $("#"+hiddenId).change();
                        },
                        onCheck: function(e, treeId, treeNode) {//多选框勾选事件
                            var nodes =treeNode.children;
                            var isCheck=treeNode.checked;
                            if(nodes==undefined){
                                SJztree.ztree.addNodeToTxt(hiddenId,id,treeNode);
                                return;
                            }
                            else{
                                SJztree.ztree.addNodeToTxt(hiddenId,id,treeNode);
                                for(var i=0; i<nodes.length;i++){
                                    ztreeMenu.checkNode(nodes[i],isCheck);
                                    SJztree.ztree.addNodeToTxt(hiddenId,id,nodes[i]);//显示机构树
                                }
                            }
                        }
                    }
                };
            }
            for(var i=0; i<zNodes.length; i++){
                if(zNodes[i].children){
                    zNodes[i].icon="img/zuzhijigou.png";
                }else{
                    zNodes[i].icon="img/bumen.png";
                }
            }
            var ztreeMenu = $.fn.zTree.init($('#'+id+'_ztree'), setting, zNodes);//初始化ztree
            ztreeMenu.setting.check.chkboxType = { "Y" : "", "N" : "" };//取消父子级联关系
            var node = ztreeMenu.getNodeByParam("level", 0, null);
            ztreeMenu.expandNode(node, true, false, true);

            if(params['id']){//如果存在初始化选中的机构
                orgIds = params['id'];//获取初始化选中的机构ID
                var orgIdArr = orgIds.split(",");//将初始化选中的机构ID转化为数组
                for(var i=0;i<orgIdArr.length;i++){//循环每一个机构ID
                    var node = ztreeMenu.getNodeByParam("id", orgIdArr[i], null);//获取机构节点
                    ztreeMenu.checkNode(node, true, true);//将机构节点选中
                    $("#"+hiddenId).val($("#"+hiddenId).val()+","+node.orgId);//将机构节点的机构ID放置到ID隐藏域
                    $("#"+id).val($("#"+id).val()+","+node.name);//将机构节点的机构名称放置到文本域
                }
                $("#"+hiddenId).val($("#"+hiddenId).val().substring(1));//去除ID隐藏域的第一个字符","
                $("#"+id).val($("#"+id).val().substring(1));//去除文本域的第一个字符","
            }
            $("#"+id).bind('click',function(){//文本域设置点击事件
                SJztree.ztree.show(id);//显示机构树
            });
            return ztreeMenu;//返回树对象
        },
        addNodeToTxt:function(hiddenId,id,node){
            if($("#"+hiddenId).val().length>0){//如果第一个字符不为","
                $("#"+hiddenId).val(","+$("#"+hiddenId).val()+",");//ID隐藏域添加第一个字符为","
                $("#"+id).val(","+$("#"+id).val()+",");//文本域添加第一个字符为","
            }else{
                $("#"+hiddenId).val(",");//ID隐藏域添加第一个字符为","
                $("#"+id).val(",");//文本域添加第一个字符为","
            }
            if(node.checked){//节点选中
                //var reg1 = new RegExp(node.orgId);
                //var reg2 = new RegExp(node.name);
                //$("#"+hiddenId).val($("#"+hiddenId).val().replace(reg1,""));
                //$("#"+id).val($("#"+id).val().replace(reg2,""));
                if($("#"+hiddenId).val().indexOf(node.orgId)==-1){//如果没有添加机构
                    $("#"+hiddenId).val($("#"+hiddenId).val()+node.orgId+",");//将选中机构的ID放置到ID隐藏域
                    $("#"+id).val($("#"+id).val()+node.name+",");//将选中机构的名称放置到文本域
                }
            }else{//节点取消选中
                var reg1 = new RegExp(","+node.orgId+",","g");
                var reg2 = new RegExp(","+node.name+",","g");
                $("#"+hiddenId).val($("#"+hiddenId).val().replace(reg1,","));//将选中机构的ID从ID隐藏域去掉
                $("#"+id).val($("#"+id).val().replace(reg2,","));//将选中机构的名称从文本域去掉
            }
            if($("#"+hiddenId).val().length>1){//如果第一个字符为","
                $("#"+hiddenId).val($("#"+hiddenId).val().substring(1, $("#"+hiddenId).val().length-1));//ID隐藏域去掉第一个字符","
                $("#"+id).val($("#"+id).val().substring(1, $("#"+id).val().length-1));//文本域去掉第一个字符","
            }else{
                $("#"+hiddenId).val('');//ID隐藏域去掉第一个字符","
                $("#"+id).val('');//文本域去掉第一个字符","
            }
            $("#"+hiddenId).change();
        }
    }
};