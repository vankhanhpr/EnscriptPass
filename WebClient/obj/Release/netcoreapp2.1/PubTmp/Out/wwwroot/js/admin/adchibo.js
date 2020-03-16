checkToken();
var dbid = 0;
var dbud = 0;
var active = 0;
var cbid = 0;
var token = getTokenByLocal().token;
getDangBo(bindingDangBo,0);

function getDangBo(callback,id) {
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
            callback(data,id);
        }
    });
}

function bindingDangBo(data,id) {
    if (data.success && data.data.length > 0) {
        for (var i in data.data) {
            var item = data.data[i].db;
            $("#ft-db").append('<option value="' + item.dbid + '">' + item.tendb + '</option>');
        }
        dbid = data.data[0].db.dbid;
        getChiBoByDbId(data.data[0].db.dbid, bindingChiBo);
    }
}
//get chibo by dbid
function getChiBoByDbId(id,callback) {
    $.ajax({
        type: "get",
        url: linkserver + "adchibo/getChiBoByDb?id="+id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}

function bindingChiBo(data) {
    if (data.success) {
        $(".row-table").remove();
        if (data.data && data.data.length > 0) {
            for (var i in data.data) {
                var item = data.data[i];
                $("#f-inf-chb").append('<div class="k row-table">' +
                    '<span class= "k t tt-table-dt" >' + item.tencb + '</span >' +
                    '<span class="k t tt-table-dt">' + formatDate(new Date(item.ngaythanhlap)) + '</span>' +
                    '<span class="k t tt-table-dt">'+(item.active === true?'Hoạt động':'Khóa')+'</span>' +
                    '<div class="k t tt-table-dt">' +
                    '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdatechibo" onclick="showFormUdCb(' + item.cbid + ')"></i>' +
                    '</div>' +
                    '</div >');
            }
        }
    }
}

function bindingChiBoToFilter(data) {
    if (data.success) {
        if (data.data && data.data.length > 0) {
            for (var i in data.data) {
                var item = data.data[i].db;
                $("#sl-db-att").append('<option value="' + item.dbid + '">' + item.tendb + '</option>');
            }
        }
        else {
            $('#modalinsertchibo').modal('toggle');
            bootbox.alert("Vui lòng thêm ít nhất 1 Đảng bộ trước khi thêm mới Chi bộ");
        }
    }
    else {
        bootbox.alert("Có lỗi xảy ra, vui lòng kiếm tra lại nhập liệu!");
    }
}

$('#ft-db').on('change', function () {
    getChiBoByDbId(parseInt(this.value), bindingChiBo);
});
$('#sl-db-att').on('change', function () {
    dbid = parseInt(this.value);
});

$('#sl-db-att-ud').on('change', function () {
    dbud = parseInt(this.value);
});
$('#dl-sl-cb').on('change', function () {
    active = parseInt(this.value);
});
//insert
var bol = true;
function insertChiBo() {
    var data = {
        'tencb': $("#ip-name-cb").val(),
        'dbid': dbid,
        'active': 0,
        'ngaythanhlap': $("#day-create-cb").val()
    };
    var name = $("#ip-name-cb").val();
    if (name.trim() == '') {
        $("#ip-name-cb").css('border', '1px solid rgba(255,0,0,0.3');
        return;
    }
    else {
        $("#ip-name-cb").css('border', '1px solid rgba(51,51,51,0.1');
    }
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "adchibo/insertChiBo",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bol = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bol = true;
                if (data.success) {
                    $('#modalinsertchibo').modal('toggle');
                    $("#ip-name-cb").val("");
                    bootbox.alert({
                        message: "Thêm Chi bộ thành công!",
                        callback: function () {
                            getDangBo(bindingDangBo);
                        }
                    });
                }
                else {
                    bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
                }
            }
        });
    }
}

//datetime picker
$(document).ready(function () {
    $('#datepicker-addnew,#datepicker-udcb').datetimepicker({
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

//show form update chibo
var bof = true;
function showFormUdCb(id) {
    if (bof) {
        bof = false;
        cbid = id;
        getDangBo(bindingToSlUd, id);
    }
}
function bindingToSlUd(data, id) {
    bof = true;
    if (data.success) {
        $("#sl-db-att-ud option").remove();
        for (var i in data.data) {
            var item = data.data[i].db;
            $("#sl-db-att-ud").append('<option value="' + item.dbid + '">' + item.tendb + '</option>');
        }
        $.ajax({
            type: "get",
            url: linkserver + "adchibo/getChiBoById?id=" + id,
            data: null,
            headers: { 'authorization': `Bearer ${token}` },
            dataType: 'json',
            contentType: "application/json",
            error: function (err) {
                //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
            },
            success: function (data) {
                if (data.success) {
                    dbud = data.data.dbid;
                    $("#ip-name-db-ud").val(data.data.tencb);
                    $("#sl-db-att-ud option[value='" + data.data.dbid + "']").prop("selected", true);
                    $("#day-update-cb").val(formatDate(new Date(data.data.ngaythanhlap)));
                }
            }
        });
    }
}
//update chibo

var boud = true;
function updateChiBo() {
    var data = {
        'cbid': parseInt(cbid),
        'tencb': $("#ip-name-db-ud").val(),
        'dbid': dbud,
        'active': $("#sl-active-chibo").children("option:selected").val(),
        'ngaythanhlap': $("#day-update-cb").val()
    };
    var name = $("#ip-name-db-ud").val();
    if (name.trim() == '') {
        $("#ip-name-db-ud").css('border', '1px solid rgba(255,0,0,0.3)');
        return;
    }
    else {
        $("#ip-name-db-ud").css('border', '1px solid rgba(51,51,51,0.1)');
    }
    if (boud) {
        boud = false;
        $.ajax({
            url: linkserver + "adchibo/updateChiBo",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                boud = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                boud = true;
                if (data.success) {
                    $('#modalupdatechibo').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật Chi bộ thành công!",
                        callback: function () {
                            getChiBoByDbId(dbud, bindingChiBo);
                            $("#ft-db option[value='" + dbud + "']").prop("selected", true);
                        }
                    });
                }
                else {
                    bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
                }
            }
        });
    }
}

function searchChiBo(callback) {
    var filter = $("#search-box").val();
    $.ajax({
        type: "get",
        url: linkserver + "adchibo/searchChiBo?filter=" + filter + "&&id=" + dbid,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}