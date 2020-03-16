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
                        getBonusByCbId(data.data[0].cbid);
                    }
                }
            }
        }
    });
}

function getBonusByCbId(cbid) {
    var model = {
        'startday': $("#fromday").val(),
        'endday': $("#today").val(),
        'cbid': cbid
    };
    $.ajax({
        url: linkserver + "adbonus/getBonusByCbid",
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
                bindingBonus(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
function bindingBonus(data) {
    $(".main-row-item").remove();
    if (data.data) {
        for (var i in data.data) {
            var item = data.data[i];
            var j = parseInt(i) + 1;
            $("#form-body-bonus").append(`
                    <div class="k row-item main-row-item">
                        <span class="k t text-item small-item">`+ j + `</span>
                        <span class="k t text-item small-item">`+ item.madv + `</span>
                        <span class="k t text-item big-item">`+ item.hotendangdung + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item.ngayvaodangct)) + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item.daycreate)) + `</span>
                        <span class="k t text-item big-item">`+ item.noidung + `</span>
                        <span class="k t text-item small-item">
                            <i class="fa fa-trash-o ic-font" title="Xóa" onclick="confirmDeleteBonus(`+ item.bnid + `)" aria-hidden="true"></i>
                            <i class="fa fa-pencil-square-o ic-font"title="Chỉnh sửa" onclick="getBonusById(`+ item.bnid + `)" data-toggle="modal" data-target="#modalupdatebonus"></i>
                            <i class="fa fa-check-circle-o ic-font"title="Duyệt tài khoản" onclick="acceptBomus(`+ item.bnid + `,this)"  style ="color:` + (item.accept == true ? '#333333' : 'green') +`" aria-hidden="true"></i>
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
function acceptBomus(id, obj) {
    if (obj.style.color == 'green') { return; }
    $.ajax({
        type: "get",
        url: linkserver + "adbonus/acceptBonus?id=" + id,
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
var bnid = -1;
function getBonusById(id) {
    $.ajax({
        type: "get",
        url: linkserver + "adbonus/getBonusById?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.data && data.success) {
                var bn = data.data;
                bnid = id;
                bnid = bn.bnid;
                $("#namebonusud").val(bn.noidung);
                $("#orgbonusud").val(bn.donvi);
                $("#notebonusud").val(bn.ghichu);
                $("#timebonusud").val(formatDate(new Date(bn.daycreate)));
            }
        }
    });
}

function validateUpdateBonus() {
    var namebonusud = $("#namebonusud").val();
    var orgbonusud = $("#orgbonusud").val();
    var notebonusud = $("#notebonusud").val();
    var chekud = true;
    if (!checkStr(namebonusud.trim())) {
        addClass('namebonusud');
        chekud = false;
    }
    else {
        removeClass('namebonusud');
    }
    if (!checkStr(orgbonusud.trim())) {
        addClass('orgbonusud');
        chekud = false;
    }
    else {
        removeClass('orgbonusud');
    }
    if (!chekud) {
        $('#err-ud-bonus').show();
        return;
    }
    else {
        $('#err-ud-bonus').hide();
        var model = {
            'bnid': bnid,
            'noidung': namebonusud.trim(),
            'donvi': orgbonusud.trim(),
            'ghichu': notebonusud.trim(),
            'daycreate': $("#timebonusud").val()
        }
        updateBonus(model);
    }
}
var bobnud = true;
function updateBonus(model) {
    if (bobnud) {
        bobnud = false;
        $.ajax({
            url: linkserver + "adbonus/updateBonus",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bobnud = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bobnud = true;
                if (data.success) {
                    $('#modalupdatebonus').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật thông tin thành công!",
                        callback: function () {
                            getChiBoByDbId(parseInt($("#sl-chibo").children("option:selected").val()));
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
//delete 
function confirmDeleteBonus(id) {
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
                deleteBonus(id);
            }
        }
    });
}
function deleteBonus(id) {
    $.ajax({
        type: "get",
        url: linkserver + "adbonus/deleteBonus?id=" + id,
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
                getChiBoByDbId(parseInt($("#sl-chibo").children("option:selected").val()));
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
//insert
//add new bonus
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
function validateInsertBonus() {
    var namebonus = $("#namebonus").val();
    var orgname = $("#orgname").val();
    var bof = true;
    if (!checkStr(namebonus.trim())) {
        addClass('namebonus');
        bof = false;
    }
    else {
        removeClass('namebonus');
    }
    if (!checkStr(orgname.trim())) {
        addClass('orgname');
        bof = false;
    }
    else {
        removeClass('orgname');
    }
    if (bof) {
        $("#err-add-bonus").hide();
    }
    else {
        $("#err-add-bonus").show();
        return;
    }
    var data = {
        'fileid': parseInt($("#sl-user").children("option:selected").val()),
        'noidung': namebonus.trim(),
        'donvi': orgname.trim(),
        'ghichu': $("#note-add-bonus").val(),
        'daycreate': $("#bonus-addnew").val()
    };
    insertBonus(data);
}
var bnins = true;
function insertBonus(model) {
    if (bnins) {
        bnins = false;
        $.ajax({
            url: linkserver + "adbonus/insertBonus",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bnins = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bnins = true;
                if (data.success) {
                    $('#modaladdbonus').modal('toggle');
                    bootbox.alert({
                        message: "Thêm khen thưởng thành công!",
                        callback: function () {
                            getChiBoByDbId(parseInt($("#sl-chibo").children("option:selected").val()));
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
//date picker
$(document).ready(function () {
    $('#datepicker-addnewbn, #datepicker-bonusud').datetimepicker({
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

//filter 
function filterByBox() {
    var model = {
        'filter': $("#search-box").val(),
        'cbid': parseInt($("#sl-chibo").children("option:selected").val())
    };
    $.ajax({
        url: linkserver + "adbonus/filterBonusByBox",
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
               bindingBonus(data);
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
        getChiBoByDbId(parseInt($("#sl-chibo").children("option:selected").val()));
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
