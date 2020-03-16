var token = getTokenByLocal().token;
var cbid = -1;

var year = new Date().getFullYear();
function getFinanceByStatus(status, callback, cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "adfinance/getFinanceByStatus?status=" + status + "&&cbid=" + cbid,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data, status);
        }
    });
}
function bindingFinance(data, status) {
    if (data.success && data.data) {
        for (var i in data.data) {
            var item = data.data[i];
            var obj = 'tab-in';
            if (status === 0) {//tieen vao
                obj = 'tab-in';
            }
            else {
                obj = 'tab-out';
            }
            var j = parseInt(i) + 1;
            $("#" + obj).append(' <div class="k title-item-row">' +
                '<span class= " k t detail-row" >' + j + '</span >' +
                '<span class=" k t detail-row ">' + item.name + '</span>' +
                '<span class=" k t detail-row ">' + formatNumber(item.moneys) + ' đ' +
                '<i class="fa fa-trash-o" aria-hidden="true"onclick="deleteFinance(' + item.financeid + ')"></i>' +
                '</span>' +
                '</div >');
        }
    }
}

function validateFinance() {
    var name = $("#ip-name-finance").val();
    var money = $("#money").val();
    var checkinsert = true;
    if (checkStr(name.trim())) {
        removeClass('ip-name-finance');
    }
    else {
        addClass('ip-name-finance');
        checkinsert = false;
    }
    if (checkStr(money.trim())) {
        removeClass('money');
    }
    else {
        addClass('money');
        checkinsert = false;
    }
    if (checkinsert) {
        $("#err-insert-finance").hide();
        var data = {
            "name": name.trim(),
            "moneys": covertToString(money.trim()),
            "status": parseInt($("#sl-type-finance").children("option:selected").val()),
            "createday": $("#daymoney").val(),
            "cbid": cbid,
            "person": $("#person-finance").val(),
            "uscreate": getTokenByLocal().usid
        };
        if (cbid === -1) {
            bootbox.alert("Vui lòng chọn Chi bộ muốn thêm");
            return;
        }
        insertFinance(data);
    }
    else {
        $("#err-insert-finance").show();
        return;
    }
}
function insertFinance(data) {
    $.ajax({
        url: linkserver + "adFinance/insertFinance",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
        contentType: "application/json",
        error: function (err) {
            bootbox.alert({
                message: "Error :" + err.message
            });
        },
        success: function (data) {
            if (data.success) {
                $('#modalinsertfinance').modal('toggle');
                bootbox.alert({
                    message: "Thêm mới thông tin thành công!",
                    callback: function () {
                        emptyForm();
                        $(".title-item-row").remove();
                        getFinanceByStatus(0, bindingFinance, cbid);
                        getFinanceByStatus(1, bindingFinance, cbid);
                        getRevanue(year, bindingRevanue, cbid);
                        getTotalMoney(cbid);
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}

function emptyForm() {
    $("#ip-name-finance").val('');
    $("#money").val('');
    $("#person-finance").val('');
}

function deleteFinance(id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa trường này không?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "adfinance/deleteFinance?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    statusCode: {
                        401: function () {
                            window.location.href = "/login";
                        }
                    },
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        bootbox.alert("Xóa thông tin thành công");
                        $(".title-item-row").remove();
                        $("#ip-name-finance").val('');
                        $("#money").val('');
                        getFinanceByStatus(0, bindingFinance,cbid);
                        getFinanceByStatus(1, bindingFinance,cbid);
                        getRevanue(year, bindingRevanue,cbid);
                        getTotalMoney(cbid);
                    }
                });
            }
        }
    });

}
//validate
function addClass(obj) {
    $('#' + obj).addClass('err-ip');
}
function removeClass(obj) {
    $('#' + obj).removeClass('err-ip');
}
function checkStr(str) {
    var st = str.trim();
    if (st.length < 1) {
        return false;
    }
    return true;
}

$(document).ready(function () {
    //called when key is pressed in textbox
    $("#money").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
});

function drawChart(come, to) {
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Thống kê chi tiêu của Chi bộ trong năm 2019 '
        },
        subtitle: {
            text: 'Nguồn: Chi bộ trung tâm CNTT'
        },
        xAxis: {
            categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5  ', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
        },
        yAxis: {
            title: {
                text: 'Chi tiêu (vnđ)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Thu',
            data: come/*[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]*/
        }, {
            name: 'Chi',
            data: to/*[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]*/
        }],
        credits: {
            enabled: false
        },
    });
}


function getRevanue(year, callback, cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "adfinance/revanue?year=" + year + "&&cbid=" + cbid,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}
function bindingRevanue(data) {
    if (data.success && data.data) {
        var item = data.data;
        var k = 0;
        var z = 0;
        var arrcome = [];
        var arrto = [];
        for (var i = 0; i < 12; i++) {
            var j = parseInt(i) + 1;
            if (item.come[k] && item.come[k].month === j) {
                arrcome.push(item.come[k].total);
                k = k + 1;
            }
            else {
                arrcome.push(0);
            }
            if (item.to[z] && item.to[z].month === j) {
                arrto.push(item.to[z].total);
                z = z + 1;
            }
            else {
                arrto.push(0);
            }
        }
        drawChart(arrcome, arrto);
        //console.log(arrto);
        //console.log(arrcome);
    }
}

//date picker
$(document).ready(function () {
    $('#datepicker-money').datetimepicker({
        format: 'DD/MM/YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: [],
        calendarWeeks: false,
        viewMode: 'months',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    });
});
//getTotalMoney();
function getTotalMoney(cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "adfinance/getTotalMoney?cbid=" + cbid,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            $("#total-money").text('Tổng: ' + formatNumber(data.data) + ' vnđ');
        }
    });
}

getDangBo();
function getDangBo() {
    $.ajax({
        type: "get",
        url: linkserver + "addangbo/getalldangbo",
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data) {
                for (var i in data.data) {
                    var item = data.data[i].db;
                    $("#sl-dangbo").append('<option value=' + item.dbid + '>' + item.tendb + '</option>');
                }
                if (data.data[0]) {
                    getChiBoByDbId(data.data[0].db.dbid);
                }
            }
        }
    });
}

function getChiBoByDbId(id) {
    $.ajax({
        type: "get",
        url: linkserver + "adchibo/getChiBoByDb?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data) {
                $("#sl-chibo option").remove();
                for (var i in data.data) {
                    var item = data.data[i];
                    $("#sl-chibo").append('<option value=' + item.cbid + '>' + item.tencb + '</option>');
                }
                if (data.data[0]) {
                    cbid = data.data[0].cbid;
                    getFinanceByStatus(0, bindingFinance, cbid);
                    getFinanceByStatus(1, bindingFinance, cbid);
                    getRevanue(year, bindingRevanue, cbid);
                    getTotalMoney(cbid);
                }
                else {
                    cbid = -1;
                }
            }
        }
    });
}
$('#sl-dangbo').on('change', function () {
    getChiBoByDbId(parseInt(this.value));
});
$('#sl-chibo').on('change', function () {
    cbid = parseInt(this.value);
    getAllLivingAhderer(bindingAdherer, parseInt(this.value));
    getFinanceByStatus(0, bindingFinance, parseInt(this.value));
    getFinanceByStatus(1, bindingFinance, parseInt(this.value));
});