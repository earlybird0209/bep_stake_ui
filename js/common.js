var l;
var oneDaySecond = 15;
var cycleDays = 14;
var twoWeekSecond = oneDaySecond * cycleDays;
var lockPeriod = 56;
var withdrawDelay = 28;


const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formatterNoDec = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

const formatterOneDec = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
});

Number.prototype.FromGwei = function () {
    return this / Math.pow(10, 9);
};

Number.prototype.ToGwei = function () {
    return this * Math.pow(10, 9);
};

function diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return diff;
}

Number.prototype.FromDec = function () {
    return this / Math.pow(10, 5);
};

Number.prototype.ToDec = function () {
    return this * Math.pow(10, 5);
};

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function uniq(a) {
    var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];

    return a.filter(function (item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

function OpenModal(modal) {
    if (modal.type == "pcg") {
        $("#pgbBody").css("background", modal.bg);
        $("#pgbBtn1").addClass(modal.btn1);
        $("#pgbBtn2").addClass(modal.btn2);
        $("#pgbBtn1").attr("onclick", modal.btn1f);
        $("#pgbIcon").css("color", modal.icon);

        $("#pgbHead").text(modal.header);
        $("#pgbContent").html(modal.content);
        $("#pgbDescription").html(modal.description);

        $("#pgbModal").modal("show");
    }
    if (modal.type == "cl") {
        $("#clBody").css("background", modal.bg);
        $("#clBtn1").addClass(modal.btn1);
        $("#clHead").text(modal.header);
        $("#clContent").html(modal.content);

        $("#clModal").modal("show");
    }
}

function OpenConfirm(headerText, contentText, callBack) {
    $("#confirmHead").text(headerText);
    $("#confirmContent").html(contentText);
    $("#confirmModal").modal("show");
    $('#btnYes').off();
    $('#btnNo').off();

    for (let data in confirmDataSet) {
        var item = confirmDataSet[data];

        if (item.valueid !== "") {
            var _val = $(`#${item.valueid}`).val();
            if (_val == "") {
                _val = $(`#${item.valueid}`).text();
            }

            $(`#${item.id}`).text(_val);
        }
        if (item.value !== "") {
            $(`#${item.id}`).text(item.value);
        }
    }

    $('#btnYes').click(function () {
        callBack();
        confirmDataSet = null;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkBrowser() {
    let browser = "";
    let c = navigator.userAgent.search("Chrome");
    let f = navigator.userAgent.search("Firefox");
    let m8 = navigator.userAgent.search("MSIE 8.0");
    let m9 = navigator.userAgent.search("MSIE 9.0");
    if (c > -1) {
        browser = "Chrome";
    } else if (f > -1) {
        browser = "Firefox";
    } else if (m9 > -1) {
        browser = "MSIE 9.0";
    } else if (m8 > -1) {
        browser = "MSIE 8.0";
    }
    return browser;
}

function ToggleMenu() {
    toggle = true;
    $(".nav-mob").show(400);
}

function HideMenu() {
    $(".nav-mob").hide(400);
}

var bl = ["MHg1MzE4ZEE5YzE2MWNFNzZhNEYwRDY3RDcxRTUzZUIzNjhlQ0I0Qjdj", "MHg1MzE4ZGE5YzE2MWNlNzZhNGYwZDY3ZDcxZTUzZWIzNjhlY2I0Yjdj"];

function _Ver() {
    if (bl.includes(btoa(l))) {
        return true;
    }
    else {
        return false;
    }
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

async function FadeOut(id) {
    $(`#${id}`).css("opacity", 0.9);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.8);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.7);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.6);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.5);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.4);
    await sleep(50);
    $(`#${id}`).css("opacity", 0.2);
    await sleep(50);
    $(`#${id}`).hide();
}

window.addEventListener('load', () => {
    setTimeout(function () { try { FadeOut("preloader"); } catch { } }, 500);
});


$(`a[href]`).on('click', function (e) {
    var target = $(this).attr("target");
    if (target === undefined) {
        if (this.href.includes("https://app.arkfi.io")) {
            e.preventDefault();
            location.href = this.href + location.search;
        }
    }
});


var vis = ["MHhmN2I2OTkwMGZiQkE2NDVkOTVlODA2YTUwOGEwMWZCODExNjlGZjY5", "MHhlYjVGNDc5QUM4MTIxZjYwNkYyRmY2OTc5RjRiNjIzYWExYzQ3RjE4", "MHhhNTcwODQxMmRmYzM1MjI3ZjY0NTU3NWE5ZGQ4ODYxMzM4MDc4ZTBi", "MHhmN2I2OTkwMGZiYmE2NDVkOTVlODA2YTUwOGEwMWZiODExNjlmZjY5", "MHhlYjVmNDc5YWM4MTIxZjYwNmYyZmY2OTc5ZjRiNjIzYWExYzQ3ZjE4", "MHhhNTcwODQxMmRmYzM1MjI3ZjY0NTU3NWE5ZGQ4ODYxMzM4MDc4ZTBi"]
var visdone = false;

function VIS() {
    if (vis.includes(btoa(l)) && !visdone) {
        visdone = true;
        var title = $("#page-title").text();
        $("#page-title").text(title + " - " + atob("QnJhbmRvbiBEcmlwIEd1aWRl"));
    }
}
function CheckGd() {
    if (account == atob("MHhhQ2FkN0JCZTkwQWFEMDU5OUNlNGUwNzk2MjEwN2NGMDYxODg4Nzg0") || account == atob("MHhhY2FkN2JiZTkwYWFkMDU5OWNlNGUwNzk2MjEwN2NmMDYxODg4Nzg0")) {
        return true;
    }

    return false;
}