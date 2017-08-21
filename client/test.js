var logRowCount = 0;
var blockHistory = [];
var NetDiffChart;
var BlockTimeChart;
var PaymentsChart;
var BestDeadlineChart;
var TotalSharesChart;
var TotalMinersChart;
var $progressbar = $('#round-progressbar');
var $BestDeadlineLabel = $('#BestDeadlineLabel');
var $RoundElapseTimeLabel = $('#RoundElapseTimeLabel');
var $CurrentBlockLabel = $('#CurrentBlockLabel');
var $NetDiffLabel = $('#NetDiffLabel');
var $MinersLabel = $('#MinersLabel');
var $TotalShareLabel = $('#TotalShareLabel');
if (window.location.protocol === 'http:') {
    window.location.href = 'https://' + window.location.host;
}
$.ajaxSetup({cache: true});
var templateCache = {};

function getTemplate(path, callback) {
    if (templateCache.hasOwnProperty(path)) {
        callback(templateCache[path]);
    }
    else {
        $.get(path, function (template) {
            templateCache[path] = template;
            callback(template);
        });
    }
}

function capacityHuman(capacity) {
    var res = capacity + ' Gb';
    if (capacity > 1000000) {
        res = (capacity / 1024).toFixed(3) + ' Pb';
    } else if (capacity > 10000) {
        res = (capacity / 1024).toFixed(2) + ' Tb';
    } else if (capacity > 1000) {
        res = (capacity / 1024).toFixed(3) + ' Tb';
    }
    return res;
}

function renderTemplate(templatePath, data, done) {
    getTemplate(templatePath, function (template) {
        var rowHtml = Mustache.render(template, data);
        done(rowHtml);
    });
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function sortRowList(containerId, childClass, childValueIdPrefix) {
    var rowList = $('#' + containerId);
    var listItems = rowList.children('tr').get();
    listItems.sort(function (a, b) {
        var id_a = $(a).attr('id').split('-')[1];
        var id_b = $(b).attr('id').split('-')[1];
        var value_a = parseFloat($('#' + childValueIdPrefix + '-' + id_a).text());
        var value_b = parseFloat($('#' + childValueIdPrefix + '-' + id_b).text());
        value_a = isNaN(value_a) ? -1 : value_a;
        value_b = isNaN(value_b) ? -1 : value_b;
        return value_b - value_a;
    });
    $.each(listItems, function (idx, itm) {
        rowList.append(itm);
    });
}

function onShareList(jsonData) {
    $('#shareList').empty();
    window.jsonData = jsonData;
    var nxt = new NxtAddress();
    var list = [];
    for (var accountId in jsonData) {
        list.push(jsonData[accountId]);
    }
    list.sort(function (a, b) {
        return a['share'] - b['share'];
    });
    for (var i in list) {
        var data = list[i];
        data.share = data.share.toFixed(2);
        if (data.deadline === -1) {
            data.deadline = "----";
            data.deadlineStr = "----";
        }
        else {
            data.accountRS = data.accountId;
            var duration = moment.duration(data.deadline * 1000);
            data.deadlineStr = moment.utc(data.deadline * 1000).format("HH:mm:ss");
        }
        if (data.deadline > 1) {
            data.deadlineStr = duration.humanize();
        }
        if (jsonData.deadlineStr === 'Invalid date') {
            jsonData.deadlineStr = '---';
        }
        if (nxt.set(data.accountId)) {
            jsonData[data.accountId].accountRS = nxt.toString();
        }
        var roundShareRow = $('#AllRoundItem-' + data.accountId);
        if (roundShareRow.length <= 0) {
            renderTemplate('/templates/AllRoundShare.template', data, function (html) {
                $('#shareList').prepend(html);
            });
        }
        else {
            $('#AllRoundItem-Deadline-' + data.accountId).html(data.deadline);
            $('#AllRoundItem-Share-' + data.accountId).html(data.share);
        }
    }
}

function onSentList(jsonData) {
    $('#lastSentTx').empty();
    var nxt = new NxtAddress();
    for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].accountRS = jsonData[i].accountId;
        if (nxt.set(jsonData[i].accountId)) {
            jsonData[i].accountRS = nxt.toString();
        }
        var momentObj = moment(jsonData[i].sendTime);
        jsonData[i].amountStr = jsonData[i].amount.toFixed(2);
        jsonData[i].sendTimeStr = momentObj.format("DD/MM HH:mm:ss");
        renderTemplate('/templates/RecentPaymentItem.template', jsonData[i], function (html) {
            $('#lastSentTx').prepend(html);
        });
    }
}

var userBalance = {};
var timerId1;

function onRoundShare(jsonData) {
    jsonData.share = jsonData.share.toFixed(2);
    jsonData.balance = '---';
    if (jsonData.deadline === -1) {
        jsonData.deadline = "----";
        jsonData.deadlineStr = "----";
    }
    else {
        var duration = moment.duration(jsonData.deadline * 1000);
        jsonData.deadlineStr = moment.utc(jsonData.deadline * 1000).format("HH:mm:ss");
        if (jsonData.deadline > 86400 * 365) {
            jsonData.deadlineStr = (jsonData.deadline / (86400 * 365)).toFixed(1) + ' years'
        } else if (jsonData.deadline > 86400 * 30) {
            jsonData.deadlineStr = (jsonData.deadline / (86400 * 30)).toFixed(1) + ' months'
        } else if (jsonData.deadline > 86400 * 3) {
            jsonData.deadlineStr = (jsonData.deadline / 86400).toFixed(1) + ' days'
        }
        if (jsonData.deadlineStr === 'Invalid date') {
            jsonData.deadlineStr = '---';
        }
    }
    if (userBalance.hasOwnProperty(jsonData.accountId)) {
        jsonData.balance = userBalance[jsonData.accountId].toFixed(1);
    }
    jsonData.capacityHuman = capacityHuman(jsonData.capacity);
    var roundShareRow = $('#CurrentRoundItem-' + jsonData.accountId);
    $('#CurrentRoundItem-Deadline-' + jsonData.accountId).html(jsonData.deadlineStr);
    $('#CurrentRoundItem-Share-' + jsonData.accountId).html(jsonData.share);
    $('#CurrentRoundItem-Capacity-' + jsonData.accountId).html(jsonData.capacityHuman);
    if (roundShareRow.length <= 0) {
        getTemplate('/templates/CurrentRoundShare.template', function (template) {
            jsonData.accountRS = jsonData.accountId;
            var nxt = new NxtAddress();
            if (nxt.set(jsonData.accountId)) {
                jsonData.accountRS = nxt.toString();
            }
            var rowHtml = Mustache.render(template, jsonData);
            $('#roundShares').prepend(rowHtml);
        });
    }
    else {
        $('#CurrentRoundItem-Deadline-old-' + jsonData.accountId).html(jsonData.deadlineStr);
        $('#CurrentRoundItem-Share-old-' + jsonData.accountId).html(jsonData.share);
    }
    clearTimeout(timerId1);
    timerId1 = setTimeout(function () {
        sortRowList('shareList', 'AllRoundItem', 'CurrentRoundItem-Share');
        sortRowList('roundShares', 'CurrentRoundItem', 'CurrentRoundItem-Share');
    }, 100)
}

function onLog(data) {
    logRowCount++;
    $('#consoleLog').append('<div class="consoleRow">' + data + '<div/>');
    if (logRowCount > 50) {
        $('body').children('.consoleRow:first').remove();
    }
}

function updateMiningChart() {
    return;
    NetDiffChart.resize();
    BlockTimeChart.resize();
    PaymentsChart.resize();
    BestDeadlineChart.resize();
    TotalSharesChart.resize();
    TotalMinersChart.resize();
    for (var i = 0; i < blockHistory.length - 1; i++) {
        var height = blockHistory[i].blockHeight;
        var netDiff = blockHistory[i].netDiff;
        var payments = blockHistory[i].totalPayments;
        var totalShare = blockHistory[i].totalShare;
        var totalMiners = blockHistory[i].submitters;
        var bestDeadline = blockHistory[i].bestDeadline;
        if (bestDeadline == -1) {
            bestDeadline = 0;
        }
        var blockTime = 0;
        if (i > 0) {
            blockTime = (blockHistory[i - 1].startTime - blockHistory[i].startTime) / 1000;
        }
        if (i < NetDiffChart.datasets[0].points.length) {
            NetDiffChart.datasets[0].points[i].value = netDiff.toFixed(1);
            NetDiffChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            NetDiffChart.addData([netDiff], 'Block#' + height);
        }
        if (i < BlockTimeChart.datasets[0].points.length) {
            BlockTimeChart.datasets[0].points[i].value = blockTime;
            BlockTimeChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            BlockTimeChart.addData([blockTime], 'Block#' + height);
        }
        if (i < PaymentsChart.datasets[0].points.length) {
            PaymentsChart.datasets[0].points[i].value = payments.toFixed(2);
            PaymentsChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            PaymentsChart.addData([payments], 'Block#' + height);
        }
        if (i < BestDeadlineChart.datasets[0].points.length) {
            BestDeadlineChart.datasets[0].points[i].value = bestDeadline;
            BestDeadlineChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            BestDeadlineChart.addData([bestDeadline], 'Block#' + height);
        }
        if (i < TotalSharesChart.datasets[0].points.length) {
            TotalSharesChart.datasets[0].points[i].value = totalShare.toFixed(2);
            TotalSharesChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            TotalSharesChart.addData([totalShare], 'Block#' + height);
        }
        if (i < TotalMinersChart.datasets[0].points.length) {
            TotalMinersChart.datasets[0].points[i].value = totalMiners;
            TotalMinersChart.datasets[0].points[i].label = 'Block#' + height;
        }
        else {
            TotalMinersChart.addData([totalMiners], 'Block#' + height);
        }
    }
    for (var n = 0; n < NetDiffChart.datasets[0].points.length / 2; n++) {
        var val = NetDiffChart.datasets[0].points[n].value;
        var label = NetDiffChart.datasets[0].points[n].label;
        var len = NetDiffChart.datasets[0].points.length;
        NetDiffChart.datasets[0].points[n].value = NetDiffChart.datasets[0].points[len - (n + 1)].value;
        NetDiffChart.datasets[0].points[n].label = NetDiffChart.datasets[0].points[len - (n + 1)].label;
        NetDiffChart.datasets[0].points[len - (n + 1)].value = val;
        NetDiffChart.datasets[0].points[len - (n + 1)].label = label;
    }
    NetDiffChart.update();
    for (var n = 0; n < TotalMinersChart.datasets[0].points.length / 2; n++) {
        var val = TotalMinersChart.datasets[0].points[n].value;
        var label = TotalMinersChart.datasets[0].points[n].label;
        var len = TotalMinersChart.datasets[0].points.length;
        TotalMinersChart.datasets[0].points[n].value = TotalMinersChart.datasets[0].points[len - (n + 1)].value;
        TotalMinersChart.datasets[0].points[n].label = TotalMinersChart.datasets[0].points[len - (n + 1)].label;
        TotalMinersChart.datasets[0].points[len - (n + 1)].value = val;
        TotalMinersChart.datasets[0].points[len - (n + 1)].label = label;
    }
    TotalMinersChart.update();
    for (var n = 0; n < TotalSharesChart.datasets[0].points.length / 2; n++) {
        var val = TotalSharesChart.datasets[0].points[n].value;
        var label = TotalSharesChart.datasets[0].points[n].label;
        var len = TotalSharesChart.datasets[0].points.length;
        TotalSharesChart.datasets[0].points[n].value = TotalSharesChart.datasets[0].points[len - (n + 1)].value;
        TotalSharesChart.datasets[0].points[n].label = TotalSharesChart.datasets[0].points[len - (n + 1)].label;
        TotalSharesChart.datasets[0].points[len - (n + 1)].value = val;
        TotalSharesChart.datasets[0].points[len - (n + 1)].label = label;
    }
    TotalSharesChart.update();
    for (var n = 0; n < BestDeadlineChart.datasets[0].points.length / 2; n++) {
        var val = BestDeadlineChart.datasets[0].points[n].value;
        var label = BestDeadlineChart.datasets[0].points[n].label;
        var len = BestDeadlineChart.datasets[0].points.length;
        BestDeadlineChart.datasets[0].points[n].value = BestDeadlineChart.datasets[0].points[len - (n + 1)].value;
        BestDeadlineChart.datasets[0].points[n].label = BestDeadlineChart.datasets[0].points[len - (n + 1)].label;
        BestDeadlineChart.datasets[0].points[len - (n + 1)].value = val;
        BestDeadlineChart.datasets[0].points[len - (n + 1)].label = label;
    }
    BestDeadlineChart.update();
    for (var n = 0; n < PaymentsChart.datasets[0].points.length / 2; n++) {
        var val = PaymentsChart.datasets[0].points[n].value;
        var label = PaymentsChart.datasets[0].points[n].label;
        var len = PaymentsChart.datasets[0].points.length;
        PaymentsChart.datasets[0].points[n].value = PaymentsChart.datasets[0].points[len - (n + 1)].value;
        PaymentsChart.datasets[0].points[n].label = PaymentsChart.datasets[0].points[len - (n + 1)].label;
        PaymentsChart.datasets[0].points[len - (n + 1)].value = val;
        PaymentsChart.datasets[0].points[len - (n + 1)].label = label;
    }
    PaymentsChart.update();
    for (var n = 0; n < BlockTimeChart.datasets[0].points.length / 2; n++) {
        var val = BlockTimeChart.datasets[0].points[n].value;
        var label = BlockTimeChart.datasets[0].points[n].label;
        var len = BlockTimeChart.datasets[0].points.length;
        BlockTimeChart.datasets[0].points[n].value = BlockTimeChart.datasets[0].points[len - (n + 1)].value;
        BlockTimeChart.datasets[0].points[n].label = BlockTimeChart.datasets[0].points[len - (n + 1)].label;
        BlockTimeChart.datasets[0].points[len - (n + 1)].value = val;
        BlockTimeChart.datasets[0].points[len - (n + 1)].label = label;
    }
    BlockTimeChart.update();
    TotalMinersChart.update();
    NetDiffChart.update();
    TotalSharesChart.update();
    BestDeadlineChart.update();
    PaymentsChart.update();
    BlockTimeChart.update();
}

var miningInfo = {};

function onMiningInfo(jsonData) {
    miningInfo = jsonData;
    updateRoundTime();
}

function updateRoundTime() {
    if (miningInfo.hasOwnProperty('height')) {
        var currentTime = new Date().getTime();
        var roundStart = miningInfo.roundStart;
        var bestDeadline = miningInfo.bestDeadline * 1000;
        var targetTime = roundStart + bestDeadline;
        var elapsed = currentTime - roundStart;
        var progress = 100 * elapsed / bestDeadline;
        var momentDeadline = moment.utc(bestDeadline).format("HH:mm:ss");
        var momentElapsed = moment.utc(elapsed).format("HH:mm:ss");
        $progressbar.width(progress + '%');
        $BestDeadlineLabel.html(momentDeadline);
        $RoundElapseTimeLabel.html(momentElapsed);
        $CurrentBlockLabel.html(miningInfo.height);
        $NetDiffLabel.html((miningInfo.netDiff / 1024).toFixed(3));
        $MinersLabel.html(miningInfo.submitters);
        $TotalShareLabel.html(miningInfo.totalShare.toFixed(3));
    }
}

function updateRoundTimeMS() {
    if (miningInfo.hasOwnProperty('height')) {
        $RoundElapseTimeLabel.html(moment.utc((new Date().getTime()) - miningInfo.roundStart).format("HH:mm:ss.SS"));
    }
}

function initTemplateCache(done) {
    getTemplate('/templates/CurrentRoundShare.template', function (template) {
        getTemplate('/templates/AllRoundShare.template', function (template) {
            getTemplate('/templates/RecentPaymentItem.template', function (template) {
                done();
            });
        });
    });
}

$(document).ready(function () {
    $progressbar = $('#round-progressbar');
    $BestDeadlineLabel = $('#BestDeadlineLabel');
    $RoundElapseTimeLabel = $('#RoundElapseTimeLabel');
    $CurrentBlockLabel = $('#CurrentBlockLabel');
    $NetDiffLabel = $('#NetDiffLabel');
    $MinersLabel = $('#MinersLabel');
    $TotalShareLabel = $('#TotalShareLabel');
    $('.slimScroll-container').slimScroll({height: '350px', alwaysVisible: true});
    initTemplateCache(function () {
        var serverUrl = window.location.protocol + '//' + location.hostname + ':443';
        var socket = io.connect(serverUrl, {"force new connection": false, transports: ['websocket']});
        var root = $('body');
        root.on('click', '.chartGroupSelectorBtn', function (event) {
            var id = event.target.id;
            var group = id.split('-')[1];
            var statId = id.split('-')[2];
            $('.chartGroupBtn-' + group).removeClass('chartGroupSelectorBtnActive');
            $('#' + id).addClass('chartGroupSelectorBtnActive');
            $('.canvasArea-' + group).hide();
            $('#chartContainer-' + statId).show();
            updateMiningChart();
        });
        socket.on('log', onLog);
        socket.on('ping', function (data) {
            console.log(data);
            socket.emit('pong', {beat: 1});
        });
        socket.on('sentList', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            onSentList(jsonData);
        });
        socket.on('shareList', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            onShareList(jsonData);
        });
        socket.on('miningInfo', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            onMiningInfo(jsonData);
        });
        socket.on('roundShares', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            onRoundShare(jsonData);
        });
        socket.on('blockHistory', function (data) {
            var jsonData = JSON.parse(data);
            blockHistory = jsonData;
            console.log(jsonData);
            updateMiningChart();
        });
        socket.on('balance', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            userBalance = jsonData;
        });
        socket.on('submitNonce', function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
        });
        $('#chatInput').keypress(function (e) {
            if (e.which == 13) {
                var text = escapeHtml($('#chatInput').val());
                if (text.length > 256) {
                    text = text.substring(0, 255);
                }
                socket.emit('chat', text);
                $('#chatInput').val('');
            }
        });
        setInterval(updateRoundTime, 1000);
    });
});