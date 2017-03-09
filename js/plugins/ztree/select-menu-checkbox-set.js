var setting = {
	check: {
		enable: true,
		chkboxType: {"Y":"ps", "N":"ps"}
	},
	view: {
		showIcon: false,
		dblClickExpand: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onCheck: onCheck
	}
};
function onCheck(e, treeId, treeNode) {
	 
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getCheckedNodes(true),
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		if(nodes[i].id!='1'){
			v += nodes[i].name + ",";
		}
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	var dataSel = $("#dataSel");
	dataSel.attr("value", v);
}
function showMenu(input) {
	$(window).bind('resize',function(){
		$("#menuContent").css('width',parseInt($(input).css('width').split("px")[0])+4+"px");
		$("#menuContent").slideDown("fast");
	});
	$("#menuContent").css('width',parseInt($(input).css('width').split("px")[0])+4+"px");
	$("#menuContent").slideDown("fast");
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$(window).unbind("resize");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "dataSel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

var codeSetting = {
	check: {
		enable: true,
		chkboxType: {"Y":"s", "N":"s"}
	},
	view: {
		showIcon: false,
		dblClickExpand: false,
		showLine:false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onCheck: onCodeCheck
	}
};
function onCodeCheck(){
	var zTree = $.fn.zTree.getZTreeObj("codeTree"),
	nodes = zTree.getCheckedNodes(true),
	cv = "";
	ci = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		cv += nodes[i].name + ",";
		ci += nodes[i].id + ",";
	}
	if (cv.length > 0 ) cv = cv.substring(0, cv.length-1);
	if (ci.length > 0 ) ci = ci.substring(0, ci.length-1);
	var dataid = $("#dataid");
	var dataname = $("#dataname");
	dataid.attr("value", ci);
	dataname.attr("value", cv);
}
function showCodeMenu(dom){
	$(window).bind('resize',function(){
		$("#menuCodeContent").css('width',parseInt($(dom).css('width').split("px")[0])+4+"px");
		$("#menuCodeContent").slideDown("fast");
	});
	$("#menuCodeContent").css('width',parseInt($(dom).css('width').split("px")[0])+4+"px");
	$("#menuCodeContent").slideDown("fast");
	$("body").bind("mousedown", onCodeBodyDown);
}
function hideCodeMenu() {
	$("#menuCodeContent").fadeOut("fast");
	$(window).unbind("resize");
	$("body").unbind("mousedown", onCodeBodyDown);
}
function onCodeBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "dataname" || event.target.id == "menuCodeContent" || $(event.target).parents("#menuCodeContent").length>0)) {
		hideCodeMenu();
	}
}
//刘俊伟 无chekbox ztree
var nocheckSetting = {
		
		check: {
			enable: false,

		},
		view: {
			showIcon: false,
			dblClickExpand: false,
			showLine:false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: onClick
		}
	};

function onClick(e, treeId, treeNode) {
	var dataSel = $("#dataNocheckSel");
	dataSel.attr("value", treeNode.name);
	var url1="${application.getContextPath()}/groupManage/changeGroup";
	alert(treeNode.Id);
    $.post(url1,{groupid:treeNode.Id},function(date){ 
   
  });
}
function showNoCheckMenu(input) {
	
	$(window).bind('resize',function(){
		$("#menunoCheckContent").css('width',parseInt($(input).css('width').split("px")[0])+4+"px");
		$("#menunoCheckContent").slideDown("fast");
	});
	$("#menunoCheckContent").css('width',parseInt($(input).css('width').split("px")[0])+4+"px");
	$("#menunoCheckContent").slideDown("fast");
	$("body").bind("mousedown", onnoCheckDown);
}
function hideNocheckMenu() {
	$("#menunoCheckContent").fadeOut("fast");
	$(window).unbind("resize");
	$("body").unbind("mousedown", onnoCheckDown);
}
function onnoCheckDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "dataSel" || event.target.id == "menunoCheckContent" || $(event.target).parents("#menunoCheckContent").length>0)) {
		hideNocheckMenu();
	}
}