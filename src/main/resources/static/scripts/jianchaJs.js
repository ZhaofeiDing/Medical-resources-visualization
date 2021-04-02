var over_group = ['刑事检察', '刑事执行', '公益诉讼', '民事', '行政', '未检业务', '控告申诉', '检委办', '对台业务', '案管', '司法协助'];
var over_time = ['朱某某逃逸案', '周某某盗窃案',
    '张某某盗窃案', '郭某某漏税案', '刘某某投毒案', '贺某某纵火案', '王某某强奸案', '李某某贪污案'];

var connection = function () {
    configStr = localStorage.getItem("neoconfig");
    configJSON = JSON.parse(configStr)
    // console.log(configJSON.NEO_SERVER_URL, configJSON.NEO_SERVER_USER, configJSON.NEO_SERVER_PSW)
    config = {
        url: "http://" + configJSON.NEO_SERVER_URL + ":7474",
        user: configJSON.NEO_SERVER_USER,
        pass: configJSON.NEO_SERVER_PSW
    };
    return config;
}


function execute(content) {
    var neod3 = new Neod3Renderer();

    var neo = new Neo(connection);
    try {
        var query = content;
        //console.log("Executing Query", query);
        neo.executeQuery(query, {}, function (err, res) {
            res = res || {}
            var graph = res.graph;
            if (graph) {
                var c = $("#graph");
                c.empty();
                neod3.render("graph", c, graph);
            } else {
                if (err) {
                    console.log(err);
                    if (err.length > 0) {
                        sweetAlert("Cypher error", err[0].code + "\n" + err[0].message, "error");
                    } else {
                        sweetAlert("Ajax " + err.statusText, "Status " + err.status + ": " + err.state(), "error");
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
        sweetAlert("Catched error", e, "error");
    }
}

function trace() {
    var query = null;
    if ($("#caseTaskId").val()) {
        query = "MATCH (n) WHERE ID(n)=" + $("#caseTaskId").val() + " WITH n MATCH p = (m) - [*1.." + $("#actionLength").val() + "] -> (n) RETURN n,p";//$("#caseTaskId").val();
    } else {
        query = "  MATCH (n)-[r]->(m) RETURN n,r,m";
    }
    console.log("$(\"#caseTaskId\").val()---->" + $("#caseTaskId").val());
    clearNodeInfo();
    execute(query);
}

function inference() {
    var query = null;
    if ($("#caseTaskId").val()) {
        query = "MATCH (n) WHERE ID(n)=" + $("#caseTaskId").val() + " WITH n MATCH p = (n) - [*1.." + $("#actionLength").val() + "] -> (m) RETURN n,p";//$("#caseTaskId").val();
    } else {
        query = "  MATCH (n)-[r]->(m) RETURN n,r,m";
    }
    console.log("$(\"#caseTaskId\").val()---->" + $("#caseTaskId").val());
    clearNodeInfo();
    execute(query);
}

function executeQuery() {
    execute($("#executeQuery").val());
}

function executeClear() {
    execute("match(n)-[r]-(m) delete r,n,m");
}

function logImport() {
    var url = "${webRoot}/logImport";
    var params = {
        'caseId': $("#logIn").val(),
    };
    $.post(url, params, function (result) {
        if (result.code == '0') {
            console.log(result);
        } else {
            alertMsg(result.msg);
        }
    });
}

function clearNodeInfo() {

    //neo pane区域
    $(".nodeId").text("");
    $(".caseId").text("");
    $(".nodeName").text("");
}

function executeNode(content, ss, ll) {
    str = "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "刑事检察团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "刑事检察团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年10月20日" + "</span>";
    str += "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "刑事检察团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "刑事检察团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年10月26日" + "</span>";
    str += "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "未检业务团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "未检业务团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年10月21日" + "</span>";
    str += "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "公诉团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "公诉团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年11月20日" + "</span>";
    str += "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "刑事业务团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "刑事业务团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年12月10日" + "</span>";
    str += "<li class=\"list-group-item\" style=\"height: 45px;\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "民行团队" + "</span> "
        + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect1(\'" + "民行团队" + "\')\">" + "世系查询" + "</button> "
        + "<span style=\"float:right;margin-right:430px;margin-top:-2px\">" + "成立时间：2020年12月16日" + "</span>";
    document.getElementById("caseList").innerHTML += str;
    var query = content;
    var neo = new Neo(connection);
    ll = ll.toString();
    //localStorage.setItem("LeiBieName", ll);
    //document.getElementById("caseList").innerHTML = "";
    console.log(ll);
    $.ajax({
        type: "get",
        async: false,
        data: {"ajlb": ll},
        url: "/hxyActiviti/demo/gj/ajlb",
        success: function (res) {
            if (res) {
                var yy = 0;
                for (var i in res) {

                    console.log(res[i].bmsah);
                    var str = "";
                    var j = parseInt(i) + 1
                    var className = ss + j;
                    //var className = ss + j;
                    var className = ss;
                    if (yy >= over_group.length) {
                        yy = 0;
                    }
                    // className + '-' + over_anjian[yy];
                    className = res[i].ajmc
                    yy++;
                    var timeStr = res[i].cjsj.toString();
                    //var is_complete = res[i].is_complete;
                    //console.log(timeStr);
                    if (true) {
                        var time = timeStr.substring(0, 4) + "年" + timeStr.substring(5, 7) + "月" + timeStr.substring(8, 10) + "日";
                        /*str = "<li class=\"list-group-item\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + className + "</span> " +
                            " <span style=\"margin-left:-50px;margin-top:-2px\">" + bmsah + "</span> " +
                            "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect(\'" + bmsah + "\')\">" + "世系查询" + "</button> " +
                            + "<span style=\"float:right;margin-right:50px;margin-top:-2px\">" + time + "</span>"
                        ;*/
                        str = "<li class=\"list-group-item\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + "刑事检察团队" + "</span> "
                            + "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect()\">" + "世系查询" + "</button> "
                            + "<span style=\"float:right;margin-right:50px;margin-top:-2px\">" + "2020年十月20日" + "</span>"
                        document.getElementById("caseList").innerHTML += str;
                    }
                }
                var zz = getzz();
                change(1, zz);
            } else {

            }
        }
    });
}

function getzz() {
    var a = $("ul#caseList li");
    var zz = new Array(a.length);
    for (var i = 0; i < a.length; i++) {
        zz[i] = a[i].innerHTML;
    } //div的字符串数组付给zz
    // console.log("zz is" + zz);
    return zz;
}


var pageno = 1;
var gg;

function change(e, zz) {
    //console.log("zz is" + zz);
    gg = zz;
    pageno = e;
    var pagesize = 4; //每页多少条信息
    if (zz.length % pagesize == 0) {
        var pageall = zz.length / pagesize;
    } else {
        var pageall = parseInt(zz.length / pagesize) + 1;
    }   //一共多少页
    if (e < 1) {
        e = 1;
        pageno = 1;//就等于第1页 ， 当前页为1
    }
    if (e > pageall) {  //如果输入页大于最大页
        e = pageall;
        pageno = pageall; //输入页和当前页都=最大页
    }
    $("#caseList").html("");//全部清空
    console.log("html is" + $("#caseList").html(""));
    var html = "";
    for (var i = 0; i < pagesize; i++) {
        if (zz[(e - 1) * pagesize + i] == null) zz[(e - 1) * pagesize + i] = "<span style=\"color:white\">空白</span>";
        html += '<li class=\"list-group-item\">' + zz[(e - 1) * pagesize + i] + '</li>';//创建一页的li列表
    }
    $("ul#caseList").html(html);//给ul列表写入html
    var ye = "";
    for (var j = 1; j <= pageall; j++) {
        if (e == j) {
            ye = ye + "<span><button onClick='change(" + j + ",gg)' style='color:#FF0000'>" + j + "</button></span> "
        } else {
            ye = ye + "<button onClick='change(" + j + ",gg)'>" + j + "</button> "
        }
    }
    var pageContent = "";
    pageContent += '第<span id=\"a2\">' + pageno + '</span>/';
    pageContent += '<span id="a1">' + pageall + '</span>页';
    pageContent += '<span id="a3">' + ye + '</span>';
    pageContent += '<button  onClick="change(--pageno,gg)">上一页</button>';
    pageContent += '<button onClick="change(++pageno,gg)">下一页</button>';
    $("#page").html(pageContent);
}

monitorClick();

function monitorClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("xieshijiancha_a").innerHTML + "案件";
    var ll = document.getElementById("xieshijiancha_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    //document.getElementById("chartName").innerHTML = ll + "业务案卡数据项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "刑事检察" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    //rank(ll.toString());
    console.log("monitorClick");
    //displayZhuZhuangTu("刑事检察");
    executeNode(query, ss, ll);
}

function displayZhuZhuangTu(lbmc) {
    var neo = new Neo(connection);
    try {
        var query="match(n) where n.案件类别='"+lbmc+"' with n.caseId as CASEIDS unwind CASEIDS as id with id match (m) where m.caseId=id and (m.案卡项类型='案件相关' or m.案卡项类型='人员相关') with m.name as names unwind names as name return name,count(*) as c order by c DESC";
        neo.executeQuery(query, {}, function (err, res) {
            res = res || {}
            if(res && res.table) {
                console.log("executeQuery : ", query);
                over_data = []
                over_group=[]
                for (i in res.table) {
                    item = res.table[i]
                    if (item["c"]>0) {
                        over_data.push(item["c"])
                        over_group.push(item["name"])
                    }
                    if (over_data.length>=10) {
                        break;
                    }
                }
                console.log("over data : ", over_data,over_group);
                //zhizhutu(over_data, over_str);
            }

        });
    } catch (e) {
        console.log(e);
        sweetAlert("Catched error", e, "error");
    }

}

/*
function supervisionClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("xieshizhixing_a").innerHTML + "案件";
    var ll = document.getElementById("xieshizhixing_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "刑事执行" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();

    //document.getElementById("chart").innerHTML = "";
    //zhizhutu(over_data, over_str);
    //rank(ll.toString());
    displayZhuZhuangTu("刑事执行");
    executeNode(query, ss, ll);
}

function prosecutionClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("gongsu_a").innerHTML + "案件";
    var ll = document.getElementById("gongsu_a").innerHTML;
    // document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "公益诉讼" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    // document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    clearNodeInfo();
    displayZhuZhuangTu("公益诉讼");
    executeNode(query, ss, ll);
}


function minshiClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("minshi_a").innerHTML + "案件";
    var ll = document.getElementById("minshi_a").innerHTML;
    // document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "民事" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("民事");
    executeNode(query, ss, ll);
}

function xinzhengClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("xinzheng_a").innerHTML + "案件";
    var ll = document.getElementById("xinzheng_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "行政" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("行政");
    executeNode(query, ss, ll);
}

function weijianClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("weijian_a").innerHTML + "案件";
    var ll = document.getElementById("weijian_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "未检业务" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("未检业务");
    executeNode(query, ss, ll);
}

function konggaoClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("konggao_a").innerHTML + "案件";
    var ll = document.getElementById("konggao_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "控告申诉" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("控告申诉");
    executeNode(query, ss, ll);
}

function jianweiClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("jianwei_a").innerHTML + "案件";
    var ll = document.getElementById("jianwei_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "检委办" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("检委办");
    executeNode(query, ss, ll);
}

function duitaiClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("duitai_a").innerHTML + "案件";
    var ll = document.getElementById("duitai_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "对台业务" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("对台业务");
    executeNode(query, ss, ll);
}

function anguanClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("anguan_a").innerHTML + "案件";
    var ll = document.getElementById("anguan_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "案管" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("案管");
    executeNode(query, ss, ll);
}

function sifaClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("sifa_a").innerHTML + "案件";
    var ll = document.getElementById("sifa_a").innerHTML;
    //document.getElementById("chartName").innerHTML = ll + "案卡项修改次数";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "司法协助" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("司法协助");
    executeNode(query, ss, ll);
}
*/





window.onload = (function () {
    //todo dynamic configuration
    // var query = "MATCH (n:CASE) WITH n MATCH p=(n)-[*]->(m:Task) RETURN p,n,m";
    // execute(query);
});


function IsUniqueString(str, name_str) {
    flag = 1;
    for (k in name_str) {
        if (str == name_str[k]) flag = 0;
    }
    return flag;
}

function IsMarkString(str, name_str) {
    flag = 0;
    for (k in name_str) {
        if (str == name_str[k]) flag = k;
        //console.log(str)
    }
    return flag;
}

function nameCount(name, name_count, name_str) {
    if (IsUniqueString(name, name_str)) {
        name_count.push(1);
        name_str.push(name);
        over_count++;
    } else {
        name_count[IsMarkString(name, name_str)] = name_count[IsMarkString(name, name_str)] + 1;
    }
    return name_count;
}


/*
function rank(ll) {
    var name_str = new Array();
    var name_count = new Array();
    var temp = new Array();
    for (var i = 0; i < over_group.length; i++) {
        clearNodeInfo();
        var over_neo = new Neo(connection);
        try {
            var over_query = "MATCH (n) WHERE n.案件类别= \'" + ll + "\' WITH n MATCH p = (n) - [r:修改|:变化|:相关|:下一步] -> (m)  RETURN m,p";
            console.log(over_query);
            over_neo.executeQuery(over_query, {}, function (err, res) {
                res = res || {};
                var over_graph = res.graph;
                if (over_graph) {
                    var over_node = over_graph.nodes;
                    over_selectNode = JSON.parse(JSON.stringify(over_node));

                    for (i in over_selectNode) {
                        if (over_selectNode[i].name != null) {
                            // console.log(over_selectNode[i].name);
                            name_count = nameCount(over_selectNode[i].name, name_count, name_str);
                        }
                    }
                } else {
                    if (err) {
                        console.log(err);
                        if (err.length > 0) {
                            sweetAlert("Cypher error", err[0].code + "\n" + err[0].message, "error");
                        } else {
                            sweetAlert("Ajax " + err.statusText, "Status " + err.status + ": " + err.state(), "error");
                        }
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

}
*/

function toFIXED(num, n) {
    var numStr = num.toString()
    var index = numStr.indexOf('.')
    var result = numStr.slice(0, index + n)
    return Number(result);
}

function lineageSelect1(group){
    window.location.href="http://localhost:8083/hxyActiviti/group.html";
}

