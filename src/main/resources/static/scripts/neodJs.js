var over_str = ['刑事检察', '刑事执行', '公益诉讼', '民事', '行政', '未检业务', '控告申诉', '检委办', '对台业务', '案管', '司法协助'];
var over_data = over_data = [7, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2];
var over_count = 0;
var over_anjian = ['朱某某逃逸案', '周某某盗窃案',
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
    var query = content;
    var neo = new Neo(connection);
    ll = ll.toString();
    localStorage.setItem("LeiBieName", ll);
    document.getElementById("caseList").innerHTML = "";
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
                    if (yy >= over_anjian.length) {
                        yy = 0;
                    }
                    // className + '-' + over_anjian[yy];
                    className = res[i].ajmc
                    yy++;
                    var bmsah = res[i].bmsah;
                    if (bmsah == null) {
                        bmsah = '汉东检刑诉受[2019]980000100216号';
                    }
                    var timeStr = res[i].cjsj.toString();
                    var is_complete = res[i].is_complete;
                    console.log(timeStr);

                    if (true) {
                        var time = timeStr.substring(0, 4) + "年" + timeStr.substring(5, 7) + "月" + timeStr.substring(8, 10) + "日";
                        str = "<li class=\"list-group-item\"><span style=\"float: left;margin-top:-2px;width:250px;text-align:left;\">" + className + "</span> " +
                            " <span style=\"margin-left:-50px;margin-top:-2px\">" + bmsah + "</span> " +
                            "<button style=\"margin-left: 6px;float: right;margin-top:-6px\" type=\"button\" class=\"btn btn-primary\" onclick=\"lineageSelect(\'" + bmsah + "\')\">" + "世系查询" + "</button> " +
                            "<span style=\"float:right;margin-right:200px;margin-top:-2px\">" + time + "</span>"
                        ;
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "刑事检察" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    bar1();
    bar2();
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
                over_str=[]
                for (i in res.table) {
                    item = res.table[i]
                    if (item["c"]>0) {
                        over_data.push(item["c"])
                        over_str.push(item["name"])
                    }
                    if (over_data.length>=10) {
                        break;
                    }
                }
                console.log("over data : ", over_data,over_str);
                //zhizhutu(over_data, over_str);
            }

        });
    } catch (e) {
        console.log(e);
        sweetAlert("Catched error", e, "error");
    }

}

function supervisionClick() {
    document.getElementById("relevantCase").style.visibility = "visible";
    var ss = document.getElementById("xieshizhixing_a").innerHTML + "案件";
    var ll = document.getElementById("xieshizhixing_a").innerHTML;
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
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
    document.getElementById("bar_label1").innerHTML = ll + "业务案卡项修改次数（平均）";
    document.getElementById("bar_label2").innerHTML = ll + "业务流程环节耗时（平均）";
    var query = null;
    query = "MATCH (n:BALB) WHERE n.class=\'" + "司法协助" + "\' WITH n MATCH p = (n) - [*1] -> (m) RETURN m,p,n";
    //query = "MATCH (n:BALB) where n.class=\'" + "公诉" + "\' Return n.caseId";
    clearNodeInfo();
    //document.getElementById("chart").innerHTML = "";
    rank(ll.toString());
    displayZhuZhuangTu("司法协助");
    executeNode(query, ss, ll);
}





window.onload = (function () {
    //todo dynamic configuration
    // var query = "MATCH (n:CASE) WITH n MATCH p=(n)-[*]->(m:Task) RETURN p,n,m";
    // execute(query);
    //canvas_data();
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
    /* console.log("gdgdfgfdgdfgdf");
     console.log(name_count);
     console.log(name_str);*/
    return name_count;
}


function rank(ll) {
    var name_str = new Array();
    var name_count = new Array();
    var temp = new Array();
    for (var i = 0; i < over_str.length; i++) {
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
    var minIndex = 0;
    //console.log(name_count);
    //console.log("name_count" + name_count);
    //console.log(name_str);
    /* setTimeout(function () {
         var t = 0;
         var c = name_count.length;
         var tm = new Array(11);
         for (var m = 0; m < c - 1; m++) {
             minIndex = m;
             for (var n = m + 1; n < c; n++) {
                 if (name_count[n] > name_count[minIndex]) {     // 寻找最小的数
                     minIndex = n;                 // 将最小数的索引保存
                 }
             }
             t = name_count[m];
             name_count[m] = name_count[minIndex];
             name_count[minIndex] = t;
             if (m <= 10) {
                 tm[m] = minIndex;
             }
         }
         var str = new Array(11);
         var data = new Array(11)
         for (h in name_count) {
             data[h] = name_count[h];
             str[h] = name_str[tm[h]];
             //str[h] = String.valueOf(str[h]).substring(0,1);
         }
         var strstr = [];
         var datadata = [];
         //console.log(name_count);
        // console.log(data);
         for (var ii = 0; ii < 11; ii++) {
             if (str[ii].length > 4) {
                 strstr[ii] = str[ii].substring(0, 4);

             } else {
                 strstr[ii] = str[ii];
             }
             datadata[ii] = data[ii];
         }
         //zhizhutu(datadata, strstr);
     }, 3000);*/
}

function toFIXED(num, n) {
    var numStr = num.toString()
    var index = numStr.indexOf('.')
    var result = numStr.slice(0, index + n)
    return Number(result);
}

/*function canvas_data() {
    $.ajax({
        type: "get",
        async: false,
        url: "/hxyActiviti/demo/gj/count-ajlb",
        success: function (res) {
            if (res) {
                var colors = ["#0792c9", "#1616d6", "#13cf74", "#c316ac", "#00c522", "#cac874", "#a7110a", "#d45f1c", "#c182b7", "#27ba7c", "#b5b4b1"]
                var caseSum = 0;
                for (i in res) {
                    caseSum += res[i]["c"];
                }
                var seriesData = [];
                for (i in res) {
                    item = res[i]
                    cnf = {
                        value: parseFloat(item["c"]) / parseFloat(caseSum),
                        color: colors.pop(),
                        label1: item["AJLB_MC"],
                        label2: toFIXED(parseFloat(item["c"]) / parseFloat(caseSum) * 100, 3) + "%"
                    }
                    seriesData.push(cnf)
                }

                var canvas = document.getElementById("pie_canvas");

                var config = {
                    width: 420,
                    height: 400,
                    series: seriesData,
                    canvas: canvas,
                    title: "案件信息",
                    callback: function (obj) {
                        //console.log(obj.label1);
                    }
                };
                pieChart.initSettings(config);
                pieChart.render();
            }
        }
    });


}

var pieChart = {
    title: "Pie Chart",
    width: 300,
    height: 300,
    series: [],  //格式[{"name":"","value":"","color":"","label1":"","label2":""}]
    chartCanvas: null,
    callback: null,
    legend: {
        show: true
    },
    label: {
        show: true,
        linelength: 60,
        linelength2: 60
    },
    circle: {
        cx: 0,
        cy: 0,
        radius: 0

    },
    initSettings: function (config) {
        this.chartCanvas = config.canvas;
        this.chartCanvas.width = config.width;
        this.chartCanvas.height = config.height;
        this.width = config.width;
        this.height = config.height;
        this.series = config.series;
        this.title = config.title;
        if (config.legend != undefined) {
            this.legend.show = config.legend.show;
        }
        if (config.label != undefined) {
            this.label.show = config.label.show;
        }
        this.callback = config.callback;
    },
    getRatioSum: function (j) {
        var sum = 0;
        for (var i = 0; i < j; i++) {
            sum += this.series[i].value;
        }
        return sum;
    },
    getRatioHalfSumDegrees: function (index) {
        var sum = this.getRatioSum(index);
        sum += (this.series[index].value / 2);
        return sum * Math.PI * 2;
    },
    getRatioHalfSumDegrees360: function (index) {
        var sum = this.getRatioSum(index);
        sum += (this.series[index].value / 2);
        return sum * 360;
    },
    renderLegend: function (ctx, length) {
    },
    renderLabel: function (ctx, length) {
        if (this.label.show) {
            for (var i = 0; i < length; i++) {
                this.renderLabelLine(ctx, i);
            }

        }
    },
    renderLabelLine: function (ctx, index) {
        ctx.save();
        ctx.translate(this.width / 2 - 5, this.height / 2);
        ctx.rotate(this.getRatioHalfSumDegrees(index));
        ctx.strokeStyle = this.series[index].color;
        ctx.moveTo(this.circle.radius + 1, 0);
        ctx.lineTo(this.circle.radius + this.label.linelength, 0);
        ctx.stroke();
        this.renderLabelLine2(ctx, index);
        ctx.restore();
    },
    renderLabelLine2: function (ctx, index) {
        ctx.save();
        ctx.translate(this.circle.radius + this.label.linelength, 0);
        var ro = this.getRatioHalfSumDegrees(index);
        ctx.rotate(-ro);
        var xro = this.getRatioHalfSumDegrees360(index);
        if ((xro > 270 && xro < 360) || (xro > 0 && xro < 90)) {
            ctx.strokeStyle = this.series[index].color;
            ctx.moveTo(0, 0);
            ctx.lineTo(this.label.linelength2, 0);
            ctx.stroke();
            ctx.fillText(this.series[index].label1, 10, -4);
            ctx.fillText(this.series[index].label2, 10, 14);
        } else {
            ctx.strokeStyle = this.series[index].color;
            ctx.moveTo(0, 0);
            ctx.lineTo(-this.label.linelength2, 0);
            ctx.stroke();
            ctx.fillText(this.series[index].label1, -40, -4);
            ctx.fillText(this.series[index].label2, -40, 14);
        }

        ctx.restore();
    },
    renderPie: function (ctx, length) {
        var lastpos = pos = 0;
        ctx.lineWidth = this.circle.radius * 0.4;
        for (var i = 0; i < length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = this.series[i].color;
            pos = lastpos + Math.PI * 2 * this.series[i].value;
            ctx.arc(this.circle.cx, this.circle.cy, this.circle.radius, lastpos, pos);
            ctx.stroke();
            lastpos = pos;
        }

    },
    renderPieImage: function (ctx, length) {

    },
    renderClick: function (event, obj) {
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var bbox = canvas.getBoundingClientRect();
        var loc = {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
        //console.log(loc);

        var dx = loc.x - obj.circle.cx;
        var dy = loc.y - obj.circle.cy;
        var dis = Math.floor(Math.sqrt(dx * dx + dy * dy));
        console.log("dis=" + dis + "  mRadius=" + obj.circle.radius);
        if (dis <= obj.circle.radius * 3.6 && dis >= obj.circle.radius * 1.2) {
            // draw tool tip text
            var angle = Math.atan2(dy, dx);
            if (angle <= 0) {
                angle = angle + 2 * Math.PI;
            }
            var deltaArc = 0;
            var index = 0;
            for (var i = 0; i < obj.series.length; i++) {
                var precent = obj.series[i].value;
                deltaArc += 2 * Math.PI * precent;
                if (angle <= deltaArc) {
                    index = i;
                    break;
                }
            }
            //console.log(obj.series[i]);
            obj.callback(obj.series[index]);
            //console.log(obj.series[index].label1);
        }
    },
    render: function () {
        this.circle.cx = this.width / 2;
        this.circle.cy = this.height / 2;
        this.circle.radius = (this.width - this.width * 0.5) / 2;
        var ctx = this.chartCanvas.getContext("2d");
        if (this.circle.radius <= 0) {
            ctx.strokeText("请设置布局大小.");
            return;
        }
        if (window.devicePixelRatio) {
            this.chartCanvas.style.width = this.width + "px";
            this.chartCanvas.style.height = this.height + "px";
            this.chartCanvas.height = this.height * window.devicePixelRatio;
            this.chartCanvas.width = this.width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        var length = this.series.length;
        var length = this.series.length;
        this.renderLabel(ctx, length);
        this.renderPie(ctx, length);
        var parent = this;
        // this.chartCanvas.setAttribute("class","canvasClass");
        this.chartCanvas.addEventListener('click', function (event) {
            parent.renderClick(event, parent);
            //console.log(parent);
        }, false);
    }

}*/

/*function zhizhutu(data, str) {
    var dataset = over_data;  // 数据集
    var strset = over_str;

    var width = 800;    // svg可视区域宽度
    var height = 400;   // svg可视区域高度
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width).attr("height", height)


    var padding = {top: 20, right: 20, bottom: 20, left: 50};   // 边距

    var xAxisWidth = 700; // x轴宽度
    var yAxisWidth = 300; // y轴宽度

    /!* x轴比例尺(序数比例尺) *!/
    var xScale = d3.scale.ordinal()
        .domain(strset)
        .rangeRoundBands([0, xAxisWidth], 0.2);

    /!* y轴比例尺(线性比例尺) *!/
    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset) + d3.max(dataset) / data.length])
        .range([0, yAxisWidth]);

    /!* rect *!/
    var rect = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "rectClass")
        .call(rectFun);

    /!* text *!/
    var text = svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .call(textFun);

    /!* 添加坐标轴 *!/
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    yScale.range([yAxisWidth, 0]);  // 重新设置y轴比例尺的值域,与原来的相反
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    svg.attr("style", "margin-top:-425px");
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("text-anchor", "start")
        .attr("transform", "rotate(15 -10 -10)")
        .attr("x", "-15");

    svg.append("g").attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")")
        .call(yAxis);

    /!* rect处理函数 *!/
    function rectFun(selection) {
        selection.attr("fill", "steelblue")
            .attr("x", function (d, i) {
                return padding.left + xScale(strset[i]) + 5;
            })
            .attr("y", function (d) {
                return height - padding.bottom - yScale(d);
            })
            .attr("class", function (d, i) {
                return "rectClass" + i;
            })
            .attr("width", xScale.rangeBand() - 10)
            .attr("height", function (d) {
                return yScale(d);
            });
    }

    /!* text处理函数 *!/

    function textFun(selection) {
        selection.attr("fill", "white")
            .attr("font-size", "14px").attr("text-anchor", "middle")
            //width:100px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;
            .attr("width", "40px").attr("overflow", "hidden")
            .attr("text-overflow", "ellipsis").attr("white-space", "nowrap")
            .attr("x", function (d, i) {
                return padding.left + xScale(strset[i]);
            })
            .attr("y", function (d) {
                return height - padding.bottom - yScale(d);
            })
            .attr("dx", xScale.rangeBand() / 2).attr("dy", "1em")
            .text(function (d) {
                return d;
            });
    }
}*/