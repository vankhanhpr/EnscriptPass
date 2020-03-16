
var disciplineid = -1;
var token = getTokenByLocal().token;
function getDiscipline(fileid,callback) {
    $.ajax({
        type: "get",
        url: linkserver + "addiscipline/getDiscipline?fileid=" + fileid,
        data: null,
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}
function bindingDiscipline(data) {
    if (data.data && data.success) {
        $('.item-discipline').remove();
        for (var i in data.data) {
            var dis = data.data[i];
            var j = parseInt(i) + 1;
            $("#tab-boldiscipline").append('<div class="k row-table item-discipline">'+
                '<span class= "k t tt-table-dt" >' + j + '</span>' +
                '<span class="k t tt-table-dt">' + dis.noidung + '</span>' +
                '<span class="k t tt-table-dt">' + dis.donvi + '</span>' +
                '<span class="k t tt-table-dt">' + formatDate(new Date(dis.daycreate)) + '</span>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdatedesciption" onclick="getDisciptionById(' + dis.dsid + ',bindingDisciplineById)"></i>' +
                '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
                '</div>' +
            '</div>');
        }
    }
}

//insert discipline
function validateDis() {
    var disname = $("#disname").val();
    var orgadddis = $("#orgadddis").val();
    var timedisaddnew = $("#timedisaddnew").val();
    var notedisaddnew = $("#notedisaddnew").val();
    var bolcheckdisnew = true;
    if (!checkStr(disname.trim())) {
        addClass('disname');
        bolcheckdisnew = false;
    }
    else {
        removeClass('disname');
    }
    if (!checkStr(orgadddis.trim())) {
        addClass('orgadddis');
        bolcheckdisnew = false;
    }
    else {
        removeClass('orgadddis');
    }

    if (!bolcheckdisnew) {
        $('#err-add-discipline').show();
        return;
    }
    else {
        $('#err-add-discipline').hide();
        var model = {
            'fileid': fileidmain,
            'donvi': orgadddis.trim(),
            'noidung': disname.trim(),
            'ghichu': notedisaddnew.trim(),
            'daycreate': timedisaddnew
        };
        insertDiscipline(model);
    }
}

var check_inst_des = true;
function insertDiscipline(model) {
    if (check_inst_des) {
        check_inst_des = false;
        $.ajax({
            url: linkserver + "addiscipline/insertDiscipline",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                check_inst_des = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                check_inst_des = true;
                if (data.success) {
                    $('#modaladddesciption').modal('toggle');
                    bootbox.alert({
                        message: "Thêm kỉ luật thành công!",
                        callback: function () {
                            getDiscipline(fileidmain, bindingDiscipline);//discipline
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

$(document).ready(function () {
    $('#datepicker-add-des ,#datepicker-update-discipline').datetimepicker({
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

//get disciption by id
function getDisciptionById(id,callback) {
    $.ajax({
        type: "get",
        url: linkserver + "addiscipline/getDisciplineById?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}
function bindingDisciplineById(data) {
    if (data.success && data.data) {
        var dis = data.data;
        disciplineid = dis.dsid;
        $("#namedisciplineupdate").val(dis.noidung);
        $("#orgdisciplineupdate").val(dis.donvi);
        $("#timeupdatediscipline").val(formatDate(new Date(dis.daycreate)));
        $("#notedisciplineupdate").val(dis.ghichu);
    }
}

//update discipline
function validateDiscipline() {
    var namedisciplineupdate = $("#namedisciplineupdate").val();
    var orgdisciplineupdate= $("#orgdisciplineupdate").val();
    var timeupdatediscipline= $("#timeupdatediscipline").val();
    var notedisciplineupdate = $("#notedisciplineupdate").val();
    var bolcheckdisupdate = true;
    if (!checkStr(namedisciplineupdate.trim())) {
        addClass('namedisciplineupdate');
        bolcheckdisupdate = false;
    }
    else {
        removeClass('namedisciplineupdate');
    }
    if (!checkStr(orgdisciplineupdate.trim())) {
        addClass('orgdisciplineupdate');
        bolcheckdisupdate = false;
    }
    else {
        removeClass('orgdisciplineupdate');
    }
    if (!bolcheckdisupdate) {
        $("#err-update-discipline").show();
        return;
    }
    else {
        $("#err-update-discipline").hide();
        var model = {
            'dsid': disciplineid,
            'fileid': fileidmain,
            'donvi': orgdisciplineupdate.trim(),
            'noidung': namedisciplineupdate.trim(),
            'ghichu': notedisciplineupdate.trim(),
            'daycreate': timeupdatediscipline
        };
        updateDiscipline(model);
    }

}

var check_update_des = true;
function updateDiscipline(model) {
    if (check_inst_des) {
        check_update_des = false;
        $.ajax({
            url: linkserver + "addiscipline/updateDiscipline",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                check_update_des = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                check_update_des = true;
                if (data.success) {
                    $('#modalupdatedesciption').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật thông tin thành công!",
                        callback: function () {
                            getDiscipline(fileidmain, bindingDiscipline);//discipline
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