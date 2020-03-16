
var bnid = -1;
var token = getTokenByLocal().token;
function getBonus(fileid, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "adbonus/getBonuss?id="+fileid,
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
function bindingBonus(data) {
    if (data.success && data.data) {
        $(".item-bonus").remove();
        for (var i in data.data) {
            var bonus = data.data[i];
            var j = parseInt(i) + 1;
            $("#tab-bonus").append('<div class="k row-table item-bonus">'+
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + bonus.noidung + '</span>' +
                '<span class="k t tt-table-dt">' + bonus.donvi + '</span>' +
                '<span class="k t tt-table-dt">' + formatDate(new Date(bonus.daycreate)) + '</span>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdatebonus" onclick="getBonusById(' + bonus.bnid + ',bindingBonusByUpdate)"></i>' +
                '<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteBonus(' + bonus.bnid + ')"></i>' +
                '</div>' +
                '</div >');
        }
        
    }
}

//add new bonus
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
        'fileid': fileidmain,
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
                            getBonus(fileidmain, bindingBonus);//get bonus
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

//insert bonus
function getBonusById(id,callback) {
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
            callback(data);
        }
    });
}
function bindingBonusByUpdate(data) {
    if (data.data && data.success) {
        var bn = data.data;
        bnid = bn.bnid;
        $("#namebonusud").val(bn.noidung);
        $("#orgbonusud").val(bn.donvi);
        $("#notebonusud").val(bn.ghichu);
        $("#timebonusud").val(formatDate(new Date(bn.daycreate)));
    }
}
//update bonus

function validateUpdateBonus() {
    var namebonusud= $("#namebonusud").val();
    var orgbonusud= $("#orgbonusud").val();
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
                            getBonus(fileidmain, bindingBonus);//get bonus
                        }
                    })
                }
                else {
                    bootbox.alert(data.message);
                }
            }
        });
    }
}
//delete bonus
function deleteBonus(id) {
    bootbox.confirm("Bạn có chắc muốn xóa thông tin này?",
        function (result) {
            if (result) {
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
                            getBonus(fileidmain, bindingBonus);//get bonus
                        }
                        else {
                            bootbox.alert(data.message);
                        }
                    }
                });
            }
        });
}