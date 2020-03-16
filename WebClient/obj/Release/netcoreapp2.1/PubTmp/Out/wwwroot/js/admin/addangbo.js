checkToken();
function toggeChibo(obj) {
   
    var y = obj.className;
    if (y == "fa fa-angle-down") {//kiem tra dang dong
        var x = $(obj).parent().parent();
        var y = x.find(".f-chibo");
        $(y).show(400);
        //$(obj).removeClass("fa-plus");
        //$(obj).addClass("fa-minus");
        $(obj).addClass("down");
    }
    else {//da ma ra
        var x = $(obj).parent().parent();
        var y = x.find(".f-chibo");
        $(y).hide(400);
        //$(obj).addClass("fa-plus");
        //$(obj).removeClass("fa-minus");
        $(obj).removeClass("down");
    }
}
var dbid = -1;
var truthuoc = 0;
var truthuocaddnew = 0;
var active = 0;
var token = getTokenByLocal().token;
getDangBo(bindingDangBo);
//get dang bo
function getDangBo(callback) {
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
            callback(data);
        }
    });
}
function bindingDangBo(data) {
    $(".row-table").remove();
    if (data.success && data.data.length > 0) {
        for (var i in data.data) {
            var item = data.data[i];
            var view = "";
            if (item.chibo.length > 0) {
                for (var j in item.chibo) {
                    var cb = item.chibo[j];
                    view += '<span class="k t t-name-chibo">' + cb.tencb + '</span>';
                }
            }
            var db = item.db;
            $("#f-item-db").append('<div class="k row-table">' +
                '<span class="k t tt-table-dt">' + db.tendb + '</span >' +
                '<span class="k t tt-table-dt">' + formatDate(new Date(db.ngaythanhlap)) + '</span>' +
                '<span class="k t tt-table-dt">' + (db.active == true ? '<i class="fa fa-toggle-on" aria-hidden="true"></i> Hoạt động' : '<i class="fa fa-toggle-off" aria-hidden="true"></i> Khóa') + '</span>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdatedangbo" onclick="showTabEditDB(' + db.dbid + ')"></i>' +
                //'<i class="fa fa-plus" aria-hidden="true" onclick="toggeChibo(this)"></i>' +
                '<i class="fa fa-angle-down" aria-hidden="true" onclick="toggeChibo(this)" ></i>' +
                '</div>' +
                '<div class="k f-chibo" style="display:none">' +
                view +
                '</div>' +
                '</div>');
        }
    }
}
//edit dangbo
function showTabEditDB(id) {
    cleanFormEdit();
    getDangBoNotAttached(id);

}
function getDetailDangBo(id) {
    $.ajax({
        type: "get",
        url: linkserver + "addangbo/getDangBoById?id=" + id,
        data: null,
        dataType: 'json',
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        headers: { 'authorization': `Bearer ${token}` },
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data != null) {
                dbid = data.data.dbid;
                $("#ip-name-db").val(data.data.tendb);
                $("#day-create-db").val(formatDate(new Date(data.data.ngaythanhlap)));
                $("#sl-db-att option[value='" + data.data.tructhuoc + "']").prop("selected", true);
                $("#sl-db-active option[value='" + data.data.active + "']").prop("selected", true);
            }
        }
    });
}
//clean from edit dangbo
function cleanFormEdit() {
    $("#ip-name-db").val("");
}
//get dangno not attached
function getDangBoNotAttached(id) {
    $.ajax({
        type: "get",
        url: linkserver + "addangbo/getDangBoNotAttached?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success) {
                $("#sl-db-att option").remove();
                $("#sl-db-att").append('<option value="0">Không trực thuộc</option>');
                for (var i in data.data) {
                    var item = data.data[i];
                    $("#sl-db-att").append('<option value=' + item.dbid + '>' + item.tendb + '</option>');
                }

            }
            getDetailDangBo(id);
        }
    });
}
//show dangbo to select insert
function binddingDangBoToSl(data) {
    if (data.success) {
        $("#sl-db-att-addnew option").remove();
        $("#sl-db-att-addnew").append('<option value="0">Không trực thuộc</option>');
        for (var i in data.data) {
            var item = data.data[i].db;
            $("#sl-db-att-addnew").append('<option value=' + item.dbid + '>' + item.tendb + '</option>');
        }
    }
}
//update infor dangbo
function updateDangBo() {
    var bol = true;
    var data = {
        'dbid': dbid,
        'tendb': $("#ip-name-db").val(),
        'tructhuoc': parseInt(truthuoc),
        'active': $("#sl-ud-danngbo ").children("option:selected").val(),
        'ngaythanhlap': $("#day-create-db").val()
    };
    var name = $("#ip-name-db").val();
    if (name.trim() == '') {
        $("#ip-name-db").css('border', '1px solid rgba(255,0,0,0.3');
        return;
    }
    else {
        $("#ip-name-db").css('border', '1px solid rgba(51,51,51,0.3');
    }
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "addangbo/updateDangBo",
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
                    $('#modalupdatedangbo').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật thông tin thành công!",
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

//onchange truthuoc,active
$('#sl-db-att').on('change', function () {
    truthuoc = this.value;
});

$('#sl-db-att-addnew').on('change', function () {
    truthuocaddnew = this.value;
});

$('#sl-db-active').on('change', function () {
    active = this.value;
});

//datetime picker
$(document).ready(function () {
    $('#datepicker ,#datepicker-is').datetimepicker({
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

//insert dang bo
function insertDangbo() {
    var bol = true;
    var data = {
        'tendb': $("#name-db-addnew").val(),
        'tructhuoc': parseInt(truthuocaddnew),
        'active': 0,
        'ngaythanhlap': $("#day-create-db").val()
    };
    var name = $("#name-db-addnew").val();
    if (name.trim() == '') {
        $("#name-db-addnew").css('border', '1px solid red');
        return;
    }
    else {
        $("#name-db-addnew").css('border', '1px solid rgba(51,51,51,0.1)');
    }
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "addangbo/insertDangBo",
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
                    $('#modaladddangbo').modal('toggle');
                    bootbox.alert({
                        message: "Thêm Đảng bộ thành công!",
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

function serchDangBo(callback) {
    var filter = $("#search-box").val();
    if (!filter) {
        filter = "";
    }
    $.ajax({
        type: "get",
        url: linkserver + "addangbo/searchDangBo?filter=" + filter,
        data: null,
        dataType: 'json',
        statusCode: {
            401: function () {
                window.location.href = "/login";
            }
        },
        headers: { 'authorization': `Bearer ${token}` },
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}