/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
    var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,g,e){k=!1;var f=b.outerHeight()-c.outerHeight();g&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),f),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());g=
    l*(b[0].scrollHeight-b.outerHeight());e&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),f),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
    !0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var q=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
    h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)q=parseInt(a.scrollTo);else if("scrollBy"in f)q+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(q,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;q=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
    width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
    WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(q);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
    function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
    x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);


var historicShares=0;
var TotalShares=0;

//JS

$.ajaxSetup({
    cache: false
});

var templateCache = {};
function getTemplate(path, callback){
    if(templateCache.hasOwnProperty(path)){
        callback(templateCache[path]);
    }
    else {
        $.get(path, function(template){
            templateCache[path] = template;
            callback(template);
        });
    }
}

function renderTemplate(templatePath, data, done){
    getTemplate(templatePath, function(template) {
        var rowHtml = Mustache.render(template, data);
        done(rowHtml);
    });
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function roundpercentage(){
var rowList = $('#roundShares');
TotalShares=0;
var listitems = rowList.find('.CurrentRoundItem').get();
listitems.forEach(function (item){
var id = $(item).attr('id').split('-')[1];

var v = parseFloat($('#CurrentRoundItem-Share-'+id).text());

TotalShares+=v;

});

listitems.forEach(function (item){
var id = $(item).attr('id').split('-')[1];
var share = parseFloat($('#CurrentRoundItem-Share-'+id).text());
var percent=((share/TotalShares)*100).toFixed(2)+" %";
$('#CurrentRoundItem-SharePercent-'+id).text(percent);
});

}


function sortRowList(containerId,childClass,childValueIdPrefix){
    var rowList = $('#'+containerId);
// console.log(rowList);
    var listitems = rowList.find('.'+childClass).get();
// // console.log(childClass);
// console.log(listitems);

    listitems.sort(function(a, b) {
        var id_a = $(a).attr('id').split('-')[1];
        var id_b = $(b).attr('id').split('-')[1];
        var value_a = parseFloat($('#'+childValueIdPrefix+'-'+id_a).text());
        var value_b = parseFloat($('#'+childValueIdPrefix+'-'+id_b).text());
        return value_b - value_a;
    });
	// console.log(listitems);

 // console.log(listitems);
    $.each(listitems, function(idx, itm) {
      rowList.append(itm);
      // console.log("appended:" + itm);
    });
}

function onShareList(jsonData){
    $('#shareList').empty();

renderTemplate('/templates/AllRoundShareHeader.template', data, function(html){
                $('#shareList').prepend(html);
            });


    var nxt = new NxtAddress();

    for(var accountId in jsonData){
        var data = jsonData[accountId];
        data.share = ((data.share/historicShares)*100).toFixed(2);
        if(data.deadline == -1){
            data.deadline = "----";
            data.deadlineStr = "----";
        }
        else {
            data.accountRS = data.accountId;
            var duration = moment.duration(data.deadline*1000);
            data.deadlineStr = moment.utc(data.deadline*1000).format("HH : mm : ss");
        }

        if(data.deadline > 60*60 ){
            data.deadlineStr = duration.humanize();
        }
        if(jsonData.deadlineStr == 'Invalid date'){
            jsonData.deadlineStr = '---';
        }
        if(nxt.set(data.accountId)){
            jsonData[data.accountId].accountRS = nxt.toString();
        }
        var roundShareRow = $('#AllRoundItem-'+data.accountId);
        if(roundShareRow.length <= 0){
            renderTemplate('/templates/AllRoundShare.template', data, function(html){
                $('#shareList').prepend(html);
            });
        }
        else{
            $('#AllRoundItem-Deadline-'+data.accountId).html(data.deadline);
            $('#AllRoundItem-Share-'+data.accountId).html(data.share);
        }
    }
    sortRowList('shareList','AllRoundItem','AllRoundItem-Share');
}

function onSentList(jsonData){
    $('#lastSentTx').empty();
    var nxt = new NxtAddress();
    for(var i=0 ; i<jsonData.length ; i++){
        jsonData[i].accountRS = jsonData[i].accountId;
        if(nxt.set(jsonData[i].accountId)){
            jsonData[i].accountRS = nxt.toString();
        }
        var momentObj = moment(jsonData[i].sendTime);
        jsonData[i].amountStr = jsonData[i].amount.toFixed(2);
        jsonData[i].sendTimeStr = momentObj.format("DD/MM HH:mm:ss");
        renderTemplate('/templates/RecentPaymentItem.template', jsonData[i], function(html){
            $('#lastSentTx').prepend(html);
        });
    }
}

var userBalance = {};
function onRoundShare(jsonData){
jsonData.sharepercent = '---';

jsonData.share = jsonData.share.toFixed(2);
    jsonData.balance = '---';
    if(jsonData.deadline == -1){
        jsonData.deadline = "----";
        jsonData.deadlineStr = "----";
    }
    else {
        var duration = moment.duration(jsonData.deadline * 1000);
        jsonData.deadlineStr = moment.utc(jsonData.deadline*1000).format("HH : mm : ss");
        if (jsonData.deadline > 60 * 60) {
            jsonData.deadlineStr = duration.humanize();
        }
        if (jsonData.deadlineStr == 'Invalid date') {
            jsonData.deadlineStr = '---';
        }
    }
    if(userBalance.hasOwnProperty(jsonData.accountId)){
        jsonData.balance = userBalance[jsonData.accountId].toFixed(1);
    }
    var roundShareRow = $('#CurrentRoundItem-'+jsonData.accountId);
    if(roundShareRow.length <= 0){
        getTemplate('/templates/CurrentRoundShare.template', function(template) {
            jsonData.accountRS = jsonData.accountId;
            var nxt = new NxtAddress();
            if(nxt.set(jsonData.accountId)){
                jsonData.accountRS = nxt.toString();
            }

            var rowHtml = Mustache.render(template, jsonData);
            $('#roundShares').prepend(rowHtml);
        });
    }
    else{
        $('#CurrentRoundItem-Deadline-'+jsonData.accountId).html(jsonData.deadlineStr);
        $('#CurrentRoundItem-Share-'+jsonData.accountId).html(jsonData.share);
    }
roundpercentage();
    sortRowList('roundShares','CurrentRoundItem','CurrentRoundItem-Share');
}

var logRowCount = 0;
function onLog(data){
    logRowCount++;

    var consoleContainer = $('#consoleContainer');
    consoleContainer.append('<div class="consoleRow">'+data+'<div/>');

    if(logRowCount > 50){
        consoleContainer.children('.consoleRow:first').remove();
    }


    consoleContainer.stop().animate({
        scrollTop: consoleContainer[0].scrollHeight
    }, 800);

    consoleContainer.slimScroll({ scrollTo: consoleContainer[0].scrollHeight });





}

/*
function initBlocktimeChart() {
    var blocktimeChartGaugeElement = $('#BlocktimeGauge');
    var chartHeight = blocktimeChartGaugeElement.parent().innerWidth();
    blocktimeChartGaugeElement.width(chartHeight);
    blocktimeChartGaugeElement.height(chartHeight);
    blocktimeChartGaugeElement.easyPieChart({
        barColor: "#ff8911",
        scaleColor: false,
        trackColor: "#B16402",
        lineWidth: 9,
        lineCap: "square",
        size: chartHeight,
        animate: 500
    });
}
*/

function resizeCanvas(element){
    var ctx = element.get(0).getContext("2d");
    element.width(element.parent().width()+'px');
    element.height(element.parent().height()+'px');
    ctx.canvas.width = element.parent().width();
    ctx.canvas.height = element.parent().height();
}

var blockHistory = [];
var NetDiffChart;
var BlockTimeChart;
var PaymentsChart;
var BestDeadlineChart;
var TotalSharesChart;
var TotalMinersChart;

/*
function initMiningChart(){
    var lineChartOptions = {
        showScale: false,
        scaleBeginAtZero : false,
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : false,
        barStrokeWidth : 0,
        barValueSpacing : 3,
        barDatasetSpacing : 1,
        pointHitDetectionRadius : 3,
        datasetFill : false,
        pointDot : true,
        pointDotRadius : 1.5,
        responsive: true,
        bezierCurve : false,
        maintainAspectRatio: false,
        tooltipFillColor: "rgba(64,64,64,0.6)",
        tooltipFontSize: 12
    };

    var NetDiffChartData = {
        labels: [],
        datasets: [
            {
                label: "Network Difficulty",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasNetDiff = $("#CanvasNetDiff");
    var CanvasNetDiffCtx = CanvasNetDiff.get(0).getContext("2d");
    resizeCanvas(CanvasNetDiff);
    NetDiffChart = new Chart(CanvasNetDiffCtx).Line(NetDiffChartData, lineChartOptions);

    var BlockTimeChartData = {
        labels: [],
        datasets: [
            {
                label: "Block Mining Time",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasBlockTime = $("#CanvasBlockTime");
    var CanvasBlockTimeCtx = CanvasBlockTime.get(0).getContext("2d");
    resizeCanvas(CanvasBlockTime);
    BlockTimeChart = new Chart(CanvasBlockTimeCtx).Line(BlockTimeChartData, lineChartOptions);

    var PaymentsChartData = {
        labels: [],
        datasets: [
            {
                label: "Payments",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasPayments = $("#CanvasPayments");
    var CanvasPaymentsCtx = CanvasPayments.get(0).getContext("2d");
    resizeCanvas(CanvasPayments);
    PaymentsChart = new Chart(CanvasPaymentsCtx).Line(PaymentsChartData, lineChartOptions);

    var BestDeadlineChartData = {
        labels: [],
        datasets: [
            {
                label: "Best Deadline",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasBestDeadline = $("#CanvasBestDeadline");
    var CanvasBestDeadlineCtx = CanvasBestDeadline.get(0).getContext("2d");
    resizeCanvas(CanvasBestDeadline);
    BestDeadlineChart = new Chart(CanvasBestDeadlineCtx).Line(BestDeadlineChartData, lineChartOptions);

    var TotalSharesChartData = {
        labels: [],
        datasets: [
            {
                label: "Total Shares",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasTotalShares = $("#CanvasTotalShares");
    var CanvasTotalSharesCtx = CanvasTotalShares.get(0).getContext("2d");
    resizeCanvas(CanvasTotalShares);
    TotalSharesChart = new Chart(CanvasTotalSharesCtx).Line(TotalSharesChartData, lineChartOptions);

    var TotalMinersChartData = {
        labels: [],
        datasets: [
            {
                label: "Total Miners",
                fillColor: "#FFA300",
                strokeColor: "#FFA300",
                pointStrokeColor: "#FFA300",
                highlightFill: "#B16402",
                highlightStroke: "#B16402",
                pointColor: "#FFA300",
                pointHighlightFill: "#B16402",
                data: []
            }
        ]
    };

    var CanvasTotalMiners = $("#CanvasTotalMiners");
    var CanvasTotalMinersCtx = CanvasTotalMiners.get(0).getContext("2d");
    resizeCanvas(CanvasTotalMiners);
    TotalMinersChart = new Chart(CanvasTotalMinersCtx).Line(TotalMinersChartData, lineChartOptions);

    $('#chartContainer-BlockTime').hide();
    $('#chartContainer-Payments').hide();
    $('#chartContainer-TotalShares').hide();
    $('#chartContainer-TotalMiners').hide();
}
*/

function updateMiningChart(){/*
    NetDiffChart.resize();
    BlockTimeChart.resize();
    PaymentsChart.resize();
    BestDeadlineChart.resize();
    TotalSharesChart.resize();
    TotalMinersChart.resize();

    for(var i=0; i<blockHistory.length-1 ; i++){
        var height = blockHistory[i].blockHeight;
        var netDiff = blockHistory[i].netDiff;
        var payments = blockHistory[i].totalPayments;
        var totalShare = blockHistory[i].totalShare;
        var totalMiners = blockHistory[i].submitters;
        var bestDeadline = blockHistory[i].bestDeadline;

        if(bestDeadline == -1){
            bestDeadline = 0;
        }
        var blockTime = 0;
        if(i > 0){
            blockTime = (blockHistory[i-1].startTime - blockHistory[i].startTime)/1000;
        }

        if(i < NetDiffChart.datasets[0].points.length){
            NetDiffChart.datasets[0].points[i].value = netDiff.toFixed(1);
            NetDiffChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            NetDiffChart.addData([netDiff], 'Block#'+height);
        }


        if(i < BlockTimeChart.datasets[0].points.length){
            BlockTimeChart.datasets[0].points[i].value = blockTime;
            BlockTimeChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            BlockTimeChart.addData([blockTime], 'Block#'+height);
        }


        if(i < PaymentsChart.datasets[0].points.length){
            PaymentsChart.datasets[0].points[i].value = payments.toFixed(2);
            PaymentsChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            PaymentsChart.addData([payments], 'Block#'+height);
        }


        if(i < BestDeadlineChart.datasets[0].points.length){
            BestDeadlineChart.datasets[0].points[i].value = bestDeadline;
            BestDeadlineChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            BestDeadlineChart.addData([bestDeadline], 'Block#'+height);
        }


        if(i < TotalSharesChart.datasets[0].points.length){
            TotalSharesChart.datasets[0].points[i].value = totalShare.toFixed(2);
            TotalSharesChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            TotalSharesChart.addData([totalShare], 'Block#'+height);
        }


        if(i < TotalMinersChart.datasets[0].points.length){
            TotalMinersChart.datasets[0].points[i].value = totalMiners;
            TotalMinersChart.datasets[0].points[i].label = 'Block#'+height;
        }
        else{
            TotalMinersChart.addData([totalMiners], 'Block#'+height);
        }
    }

    for(var n=0 ; n<NetDiffChart.datasets[0].points.length/2 ; n++){
        var val = NetDiffChart.datasets[0].points[n].value;
        var label = NetDiffChart.datasets[0].points[n].label;
        var len = NetDiffChart.datasets[0].points.length;

        NetDiffChart.datasets[0].points[n].value = NetDiffChart.datasets[0].points[len - (n+1)].value;
        NetDiffChart.datasets[0].points[n].label = NetDiffChart.datasets[0].points[len - (n+1)].label;

        NetDiffChart.datasets[0].points[len - (n+1)].value = val;
        NetDiffChart.datasets[0].points[len - (n+1)].label = label;
    }
    NetDiffChart.update();


    for(var n=0 ; n<TotalMinersChart.datasets[0].points.length/2 ; n++){
        var val = TotalMinersChart.datasets[0].points[n].value;
        var label = TotalMinersChart.datasets[0].points[n].label;
        var len = TotalMinersChart.datasets[0].points.length;

        TotalMinersChart.datasets[0].points[n].value = TotalMinersChart.datasets[0].points[len - (n+1)].value;
        TotalMinersChart.datasets[0].points[n].label = TotalMinersChart.datasets[0].points[len - (n+1)].label;

        TotalMinersChart.datasets[0].points[len - (n+1)].value = val;
        TotalMinersChart.datasets[0].points[len - (n+1)].label = label;
    }
    TotalMinersChart.update();

    for(var n=0 ; n<TotalSharesChart.datasets[0].points.length/2 ; n++){
        var val = TotalSharesChart.datasets[0].points[n].value;
        var label = TotalSharesChart.datasets[0].points[n].label;
        var len = TotalSharesChart.datasets[0].points.length;

        TotalSharesChart.datasets[0].points[n].value = TotalSharesChart.datasets[0].points[len - (n+1)].value;
        TotalSharesChart.datasets[0].points[n].label = TotalSharesChart.datasets[0].points[len - (n+1)].label;

        TotalSharesChart.datasets[0].points[len - (n+1)].value = val;
        TotalSharesChart.datasets[0].points[len - (n+1)].label = label;
    }
    TotalSharesChart.update();

    for(var n=0 ; n<BestDeadlineChart.datasets[0].points.length/2 ; n++){
        var val = BestDeadlineChart.datasets[0].points[n].value;
        var label = BestDeadlineChart.datasets[0].points[n].label;
        var len = BestDeadlineChart.datasets[0].points.length;

        BestDeadlineChart.datasets[0].points[n].value = BestDeadlineChart.datasets[0].points[len - (n+1)].value;
        BestDeadlineChart.datasets[0].points[n].label = BestDeadlineChart.datasets[0].points[len - (n+1)].label;

        BestDeadlineChart.datasets[0].points[len - (n+1)].value = val;
        BestDeadlineChart.datasets[0].points[len - (n+1)].label = label;
    }
    BestDeadlineChart.update();

    for(var n=0 ; n<PaymentsChart.datasets[0].points.length/2 ; n++){
        var val = PaymentsChart.datasets[0].points[n].value;
        var label = PaymentsChart.datasets[0].points[n].label;
        var len = PaymentsChart.datasets[0].points.length;

        PaymentsChart.datasets[0].points[n].value = PaymentsChart.datasets[0].points[len - (n+1)].value;
        PaymentsChart.datasets[0].points[n].label = PaymentsChart.datasets[0].points[len - (n+1)].label;

        PaymentsChart.datasets[0].points[len - (n+1)].value = val;
        PaymentsChart.datasets[0].points[len - (n+1)].label = label;
    }
    PaymentsChart.update();

    for(var n=0 ; n<BlockTimeChart.datasets[0].points.length/2 ; n++){
        var val = BlockTimeChart.datasets[0].points[n].value;
        var label = BlockTimeChart.datasets[0].points[n].label;
        var len = BlockTimeChart.datasets[0].points.length;

        BlockTimeChart.datasets[0].points[n].value = BlockTimeChart.datasets[0].points[len - (n+1)].value;
        BlockTimeChart.datasets[0].points[n].label = BlockTimeChart.datasets[0].points[len - (n+1)].label;

        BlockTimeChart.datasets[0].points[len - (n+1)].value = val;
        BlockTimeChart.datasets[0].points[len - (n+1)].label = label;
    }
    BlockTimeChart.update();

    TotalMinersChart.update();
    NetDiffChart.update();
    TotalSharesChart.update();
    BestDeadlineChart.update();
    PaymentsChart.update();
    BlockTimeChart.update();*/
}

var miningInfo = {};
function onMiningInfo(jsonData) {
    miningInfo = jsonData;
    updateRoundTime();
}

function updateRoundTime(){
    if(miningInfo.hasOwnProperty('height')){
        var currentTime   = new Date().getTime();
        var roundStart    = miningInfo.roundStart;
        var bestDeadline  = miningInfo.bestDeadline*1000;
        var targetTime    = roundStart + bestDeadline;
        var elapsed       = currentTime - roundStart;
	var pendingbalance= miningInfo.poolPendingBalance;

        var progress      = 100 * elapsed / bestDeadline;

        $("#r-progressbar").width(progress + '%');
	
        var momentDeadline = moment.utc(bestDeadline).format("HH:mm:ss.S");
        var momentElapsed  = moment.utc(elapsed).format("HH:mm:ss.S");
	var netPB=miningInfo.netDiff/1024;
	var poolPB=0;
	 poolPB=(miningInfo.poolCapacity/1048576).toFixed(2);

	//if(miningInfo.totalShare>0) TotalShares=miningInfo.totalShare;
	historicShares=miningInfo.historicShares;	
        // $('#BlocktimeGauge').data('easyPieChart').update(progress);
        $('#BestDeadlineLabel').html(momentDeadline);
        $('#RoundElapseTimeLabel').html(momentElapsed);
        $('#CurrentBlockLabel').html(miningInfo.height);
        $('#NetDiffLabel').html(netPB.toFixed(0));
        $('#MinersLabel').html(miningInfo.submitters);
       $('#poolPendingBalanceLabel').html(pendingbalance);
	if(poolPB>0) $('#poolCapacityLabel').html(poolPB);
	$('#poolBalanceLabel').html(miningInfo.poolBalance);
	// $('#TotalShareLabel').html(miningInfo.totalShare.toFixed(3));
	
    }
}

function initTemplateCache(done){
    getTemplate('/templates/CurrentRoundShare.template', function(template) {
        getTemplate('/templates/AllRoundShare.template', function(template){
            getTemplate('/templates/RecentPaymentItem.template', function(template){
                done();
            });
        });
    });
}

$(document).ready(function(){
    var $progressbar = $('#r-progressbar');



    initTemplateCache(function(){
        var serverUrl = window.location.protocol+'//'+location.hostname+':4443';
        var socket = io.connect(serverUrl,{"force new connection":true, transports:['websocket']});
        var root = $('body');

        root.on('click','.chartGroupSelectorBtn',function(event){
            var id = event.target.id;
            var group = id.split('-')[1];
            var statId = id.split('-')[2];

            $('.chartGroupBtn-'+group).removeClass('chartGroupSelectorBtnActive');
            $('#'+id).addClass('chartGroupSelectorBtnActive');

            $('.canvasArea-'+group).hide();
            $('#chartContainer-'+statId).show();
            updateMiningChart();
        });

        socket.on('log', onLog);

                   socket.on('ping', function(data){
                       socket.emit('pong', {beat: 1});
                   });

                   socket.on('sentList', function(data){
                       var jsonData = JSON.parse(data);
                       onSentList(jsonData);
                   });

                   socket.on('shareList',function(data){
                       var jsonData = JSON.parse(data);
                       onShareList(jsonData);
                   });

                   socket.on('miningInfo', function(data){
                       var jsonData = JSON.parse(data);
                       onMiningInfo(jsonData);
                   });

                   socket.on('roundShares', function(data){
                       var jsonData = JSON.parse(data);
                       onRoundShare(jsonData);
                   });

                   socket.on('blockHistory', function(data){
                       var jsonData = JSON.parse(data);
                       blockHistory = jsonData;
                       updateMiningChart();
                   });

                   socket.on('balance', function(data){
                       var jsonData = JSON.parse(data);
                       userBalance = jsonData;
                   });

                   socket.on('submitNonce', function(data){
                       var jsonData = JSON.parse(data);
                      //  console.log(jsonData);
                   });

        $('#chatInput').keypress(function(e) {
            if(e.which == 13) {
                var text = escapeHtml($('#chatInput').val());
                if(text.length > 256){
                    text = text.substring(0, 255);
                }

                socket.emit('chat',text);
                $('#chatInput').val('');
            }
        });

        // initBlocktimeChart();
        // initMiningChart();
        setInterval(updateRoundTime,1000);
    });
});





$(function () {
    $('.scroll300').slimscroll({
        height: '250px',
        alwaysVisible: true
    });
});
