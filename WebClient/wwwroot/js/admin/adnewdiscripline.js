var token = getTokenByLocal().token;
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
$('#ft-db').on('change', function () {
    getChiBoByDbId(parseInt(this.value));
});
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
            if (data.success) {
                $("#sl-chibo option").remove();
                if (data.data) {
                    for (var i in data.data) {
                        var item = data.data[i];
                        $("#sl-chibo").append('<option value=' + item.cbid + '>' + item.tencb + '</option>');
                    }
                    if (data.data[0]) {
                        getDiscriplineByCbid(data.data[0].cbid);
                    }
                }
            }
        }
    });
}
$('#sl-chibo').on('change', function () {
    getDiscriplineByCbid(parseInt(this.value));
});

//get discripline
function getDiscriplineByCbid(cbid) {
    var model = {
        'startday': $("#fromday").val(),
        'endday': $("#today").val(),
        'cbid': cbid
    };
    $.ajax({
        url: linkserver + "addiscipline/getDisByCbid",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(model),
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
                bindingDis(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}

function bindingDis(data) {
    if (data.success) {
        $(".main-row-item").remove();
        if (data.data) {
            for (var i in data.data) {
                var item = data.data[i];
                var j = parseInt(i) + 1;
                $("#form-body-dis").append(`
                    <div class="k row-item main-row-item">
                        <span class="k t text-item small-item">`+ j + `</span>
                        <span class="k t text-item small-item">`+ item.madv + `</span>
                        <span class="k t text-item big-item">`+ item.hotendangdung + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item.ngayvaodangct)) + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item.daycreate)) + `</span>
                        <span class="k t text-item big-item">`+ item.noidung + `</span>
                        <span class="k t text-item small-item">
                            <i class="fa fa-trash-o ic-font"title="Xóa" onclick="confirm(`+ item.dsid + `)" aria-hidden="true"></i>
                            <i class="fa fa-pencil-square-o ic-font"title="Chỉnh sửa" onclick="getDisciptionById(`+ item.dsid + `)" data-toggle="modal" data-target="#modalupdatedesciption"></i>
                            <i class="fa fa-check-circle-o ic-font"title="Duyệt" onclick="acceptDis(`+ item.dsid + `,this)"  style ="color:` + (item.accept == true ? '#333333' : 'green') +`" aria-hidden="true"></i>
                        </span>
                    </div>`);
            }
            if (data.data && data.data[0]) {
                $("#tab-nodata").hide();
            }
            else {
                $("#tab-nodata").show();
            }
        }
    }
}
//accept discripline
function acceptDis(id, obj) {
    if (obj.style.color == 'green') { return; }
    $.ajax({
        type: "get",
        url: linkserver + "addiscipline/acceptDiscripline?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success) {
                $(obj).css('color', 'green');
            }
        }
    });
}

//insert discipline
function getUserByCb() {
    var id = parseInt($("#sl-chibo").children("option:selected").val());
    $.ajax({
        type: "get",
        url: linkserver + "addiscipline/getUserByCbid?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success) {
                $("#sl-user option").remove();
                if (data.data) {
                    for (var i in data.data) {
                        var item = data.data[i];
                        $("#sl-user").append('<option value=' + item.fileid + '>' + item.hotendangdung + '(' + item.madv + ')' + '</option>');
                        updateDrop();
                    }
                }
            }
        }
    });
}
function updateDrop() {
    document.getElementById("sl-user").fstdropdown.rebind();
}
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
            'fileid': parseInt($("#sl-user").children("option:selected").val()),
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
                            getDiscriplineByCbid(parseInt($("#sl-chibo").children("option:selected").val()));
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


//delete
function confirm(id) {
    bootbox.confirm({
        message: "Bạn có chắc muốn xóa?",
        buttons: {
            confirm: {
                label: 'Xác nhận',
                className: 'btn-success'
            },
            cancel: {
                label: 'Hủy',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                deleteDis(id);
            }
        }
    });
}
function deleteDis(id) {
    $.ajax({
        type: "get",
        url: linkserver + "addiscipline/deleteDis?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success) {
                bootbox.alert("Xóa thông tin thành công!");
                getDiscriplineByCbid(parseInt($("#sl-chibo").children("option:selected").val()));
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
//update
var disid = -1;
function getDisciptionById(id) {
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
            if (data.success && data.data) {
                var dis = data.data;
                disid = id;
                disciplineid = dis.dsid;
                $("#namedisciplineupdate").val(dis.noidung);
                $("#orgdisciplineupdate").val(dis.donvi);
                $("#timeupdatediscipline").val(formatDate(new Date(dis.daycreate)));
                $("#notedisciplineupdate").val(dis.ghichu);
            }
        }
    });
}
function validateDiscipline() {
    var namedisciplineupdate = $("#namedisciplineupdate").val();
    var orgdisciplineupdate = $("#orgdisciplineupdate").val();
    var timeupdatediscipline = $("#timeupdatediscipline").val();
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
            'dsid': disid,
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
                            getDiscriplineByCbid(parseInt($("#sl-chibo").children("option:selected").val()));
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
//filter
function filterDisByBox() {
    var model = {
        'filter': $("#search-box").val(),
        'cbid': parseInt($("#sl-chibo").children("option:selected").val())
    };
    $.ajax({
        url: linkserver + "addiscipline/filterDisByBox",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(model),
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
                bindingDis(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}


//date picker
$(document).ready(function () {
    $('#datepicker-startday,#datepicker-endday').datetimepicker({
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
    }).on('dp.change', function (e) {
        getDiscriplineByCbid(parseInt($("#sl-chibo").children("option:selected").val()));
    });
});
//show errror
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
