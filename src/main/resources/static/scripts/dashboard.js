
!function ($) {
    "use strict";

    var Dashboard = function () {
    };

    //creates Stacked chart
    Dashboard.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            resize: true, //defaulted to true
            gridLineColor: '#eeeeee',
            barColors: lineColors,
            labelTop:true,
            barRatio: 0.4,
            xLabelAngle: 35,
        });
    },

        //creates Donut chart
        Dashboard.prototype.createDonutChart = function (element, data, colors) {
            Morris.Donut({
                element: element,
                data: data,
                resize: true,
                colors: colors
            });
        },

        // pie
        $('.peity-pie').each(function () {
            $(this).peity("pie", $(this).data());
        });

    //donut
    $('.peity-donut').each(function () {
        $(this).peity("donut", $(this).data());
    });

    // line
    $('.peity-line').each(function () {
        $(this).peity("line", $(this).data());
    });


    Dashboard.prototype.init = function () {

        var $stckedData  = [
            { y: '刑事检察', a: 300, b: 180, c: 100 },
            { y: '刑事检务', a: 205,  b: 65, c: 80 },
            { y: '未检业务', a: 170, b: 90, c: 56 },
            { y: '民行', a: 75,  b: 85, c: 120 },
            { y: '公益诉讼', a: 60, b: 90, c: 100 },
            { y: '铁检', a: 75,  b: 65, c: 110 },
            { y: '控告', a: 60,  b: 50, c: 85 },
            { y: '申诉', a: 55,  b: 65, c: 52 },
            { y: '复核办', a: 50,  b: 40, c: 77 },
            { y: '案管需求', a: 45,  b: 65, c: 60 },
            { y: '检委办', a: 30, b: 30, c: 30 }
        ];
        this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b', 'c'], ['优', '良', '差'], ['#1699dd', '#655be6', '#ebeff2']);
        //creating donut chart
        var $donutData = [
            {label: "送审案件", value: 12},
            {label: "完结案件", value: 42},
            {label: "处理案件", value: 20}
        ];
        this.createDonutChart('morris-donut-example', $donutData, ['#f0f1f4', '#655be6', '#1699dd']);


    },
        //init
        $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.Dashboard.init();
    }(window.jQuery);