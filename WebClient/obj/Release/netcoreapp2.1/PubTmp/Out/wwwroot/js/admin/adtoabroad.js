
var token = getTokenByLocal().token;
var brid = -1;
function getToabroadByFileId(id, callback) {
    showLoading();
    $.ajax({
        type: "get",
        url: linkserver + "AdAbroad/getToabroadByFileId?id=" + id,
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

function bindinAbroad(data) {
    if (data.success && data.data) {
        $(".tab-gotoabroad").remove();
        for (var i in data.data) {
            var item = data.data[i];
            $("#form-item-abroad").append('<div class="k row-table tab-gotoabroad">' +
                '<span class= "k t tt-table-dt" >' + formatDate(new Date(item.thoigiandi)) + '</span >' +
                '<span class="k t tt-table-dt">' + formatDate(new Date(item.thoigiantrove)) + '</span>' +
                '<span class="k t tt-table-dt">' + item.noiden + '</span>' +
                '<span class="k t tt-table-dt">' + item.lydo + '</span>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdateabroad" onclick="getAbroadById(' + item.brid + ')"></i>' +
                '<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteAbroad(' + item.brid + ')"></i>' +
                '</div>' +
                '</div>');
        }
    }
    destroyLoading();
}

function getCurrentDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function formatDaytogo() {
    var x = $('#daytogo').val();
    var tem = x.split("/");
    return tem[1] + '/' + tem[0] + '/' + tem[2];
}
var time='';
function getValue() {
    //time = $('#daytogo').val();
}
function setValue() {
   // $('#daytogo').val(time);
    //$('#daytoreturn').val($('#daytogo').val());
}
//datetime picker
$(document).ready(function () {
    $('#datepicker-daytogo,#datepicker-daytogo1').datetimepicker({
        format: 'DD/MM/YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: getCurrentDay(),
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
        viewMode: 'years',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    }).on('dp.change', function (e) {
        var x = new Date(e.date);
        var z = $("#daytoreturn").val().split('/');
        var y = new Date(z[2],z[1]-1,z[0]);
        if (y < x) {
            $("#daytoreturn").val(formatDate(new Date(x.setFullYear(x.getFullYear()))));
        }
    });
});
$(document).ready(function () {
    $('#datepicker-daytoreturn1,#datepicker-daytoreturn').datetimepicker({
        format: 'DD/MM/YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: formatDaytogo(),
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
        viewMode: 'years',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    });
});

function validateInsertForm() {
    var positionto = $("#positionto").val();
    var reasion = $("#reasion").val();
    var checkvalida = true;
    if (!checkStr(positionto.trim())) {
        checkvalida = false;
        addClass('positionto');
    }
    else {
        removeClass('positionto');
    }
    if (!checkStr(reasion.trim())) {
        checkvalida = false;
        addClass('reasion');
    }
    else {
        removeClass('reasion');
    }

    if (!checkvalida) {
        $("#err-validate-insert").show();
    }
    else {
        $("#err-validate-insert").hide();
        var model = {
            'fileid': fileid,
            'noiden': positionto.trim(),
            'lydo': reasion.trim(),
            'thoigiandi': $("#daytogo").val(),
            'thoigiantrove': $("#daytoreturn").val(),
        };
        insertAbroad(model);
    }
}

var checkinsertabroad = true;
function insertAbroad(model) {
    if (checkinsertabroad) {
        checkinsertabroad = false;
        $.ajax({
            url: linkserver + "AdAbroad/insertAbroad",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                checkinsertabroad = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                checkinsertabroad = true;
                if (data.success) {
                    $('#modalinsertabroad').modal('toggle');
                    bootbox.alert({
                        message: "Khai báo đi nước ngoài thành công!",
                        callback: function () {
                            getToabroadByFileId(fileid, bindinAbroad);
                        }
                    });
                }
                else {
                    bootbox.alert(data.message);
                }
            }
        });
    }
}

function addClass(obj) {
    $('#' + obj).addClass('err-ip');
}
function removeClass(obj) {
    $('#' + obj).removeClass('err-ip');
}
function checkStr(str) {
    var st = str.trim();
    if (st.length < 1) {
        //$('.err-validate').show();
        return false;
    }
    return true;
}

function getAbroadById(id) {
    $.ajax({
        type: "get",
        url: linkserver + "AdAbroad/getAbroadById?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data) {
                var item = data.data;
                brid = item.brid;
                $("#positiontoupdate").val(item.noiden);
                $("#daytogoupdate").val(formatDate(new Date(item.thoigiandi)));
                $("#daytoreturnupdate").val(formatDate(new Date(item.thoigiantrove)));
                $("#reasionupdate").val(item.lydo);
            }
        }
    });
}

function validateUpdateForm() {
    var positiontoupdate = $("#positiontoupdate").val();
    var reasionupdate = $("#reasionupdate").val();
    var checkvalidateupdate = true;
    if (!checkStr(positiontoupdate.trim())) {
        checkvalidateupdate = false;
        addClass('positiontoupdate');
    }
    else {
        removeClass('positiontoupdate');
    }
    if (!checkStr(reasionupdate.trim())) {
        checkvalidateupdate = false;
        addClass('reasionupdate');
    }
    else {
        removeClass('reasionupdate');
    }

    if (!checkvalidateupdate) {
        $("#err-validate-update").show();
    }
    else {
        $("#err-validate-update").hide();
        var model = {
            'brid': brid,
            'noiden': positiontoupdate.trim(),
            'lydo': reasionupdate.trim(),
            'thoigiandi': $("#daytogoupdate").val(),
            'thoigiantrove': $("#daytoreturnupdate").val()
        };
        updateAbroad(model);
    }
}

var checkupdate = true;
function updateAbroad(model) {
    if (checkupdate) {
        checkupdate = false;
        $.ajax({
            url: linkserver + "AdAbroad/updateAbroad",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                checkupdate = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                checkupdate = true;
                if (data.success) {
                    $('#modalupdateabroad').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật thông tin thành công!",
                        callback: function () {
                            getToabroadByFileId(fileid, bindinAbroad);
                        }
                    });
                }
                else {
                    bootbox.alert(data.message);
                }
            }
        });
    }
}

function deleteAbroad(id) {
    bootbox.confirm({
        message: "Bạn có chắc muốn xóa thông tin này không?",
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
                    url: linkserver + "AdAbroad/deleteAbroad?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        bootbox.alert("Xóa thông tin đi nước ngoài thành công!");
                        getToabroadByFileId(fileid, bindinAbroad);
                    }
                });
            }
        }
    });
}