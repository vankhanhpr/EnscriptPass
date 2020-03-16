
var fmlid = -1;
var token = getTokenByLocal().token;
function getFamilies(fileid, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "adfamily/getFamilies?fileid=" + fileid,
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
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}
function bindigFamilies(data) {
    if (data.success && data.data) {
        $(".item-fml").remove();
        for (var i in data.data) {
            var fml = data.data[i];
            var j = parseInt(i) + 1;
            $("#tab-family").append('<div class="k row-table item-fml">' +
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + fml.quanhe + '</span>' +
                '<span class="k t tt-table-dt">' + fml.name + '</span>' +
                '<span class="k t tt-table-dt">' + fml.nghenghiep + '</span>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal"' +
                'data-target="#modalupdatefamily" onclick="getDetailFamily(' + fml.fmlid + ',bindingFamilyById)"></i>' +
                '<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteFml(' + fml.fmlid +')"></i>' +
                '</div>' +
                '</div>');
        }
    }
}

function validateFormIsFml() {
    var check_update_fml = true;
    var namefml = $("#namefml").val();
    //var qhe = $("#sl-fml-qh").children("option:selected").text();
    var fmlwork = $("#fmlwork").val();
    var fmlchinhtri = $("#fmlchinhtri").val();

    if (!checkStr(namefml)) {
        addClass('namefml');
        check_update_fml = false;
    }
    else {
        removeClass('namefml');
    }
    if (!checkStr(fmlwork)) {
        addClass('fmlwork');
        check_update_fml = false;
    }
    else {
        removeClass('fmlwork');
    }
    if (!checkStr(fmlchinhtri)) {
        addClass('fmlchinhtri');
        check_update_fml = false;
    }
    else {
        removeClass('fmlchinhtri');
    }

    if (!check_update_fml) {
        $("#err-add-fml").show();
        return;
    }
    var fml = {
        'fileid': fileidmain,
        'quanhe': $("#sl-fml-qh option:selected").text(),
        'nghenghiep': fmlwork,
        'hoancanhkinhte': '',
        'lichsuchinhtri': fmlchinhtri,
        'name': namefml,
        'birthday': $("#fml-bd").val(),
    };
    insertFml(fml);
}
var bisfml = true;
function insertFml(data) {
    if (bisfml) {
        bisfml = false;
        $.ajax({
            url: linkserver + "adfamily/insertFamily",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bisfml = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bisfml = true;
                if (data.success) {
                    $('#modaladdfamily').modal('toggle');
                    bootbox.alert({
                        message: "Thêm thông tin thành công!",
                        callback: function () {
                            getFamilies(fileidmain, bindigFamilies);
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

function getDetailFamily(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "adfamily/getFmlById?id=" + id,
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
function bindingFamilyById(data) {
    if (data.success && data.data) {
        var fml = data.data;
        fmlid = fml.fmlid;
        $("#fmlnameud").val(fml.name);
        $("#sl-fml-qh-ud option[value='" + fml.quanhe + "']").prop("selected", true);
        $("#fmlworkud").val(fml.nghenghiep);
        $("#chinhtriud").val(fml.lichsuchinhtri);
        $("#bdud").val(formatDate(new Date(fml.birthday)));
    }
}

function validateUdFml() {
    var fmlnameud = $("#fmlnameud").val();
    var fmlworkud = $("#fmlworkud").val();
    var bol = true;
    if (!checkStr(fmlnameud)) {
        addClass('fmlnameud');
        bol = false;
    }
    else {
        removeClass('fmlnameud');
    }
    if (!checkStr(fmlworkud)) {
        addClass('fmlworkud');
        bol = false;
    }
    else {
        removeClass('fmlworkud');
    }
    if (bol) {
        var data = {
            'name': fmlnameud,
            'fmlid': fmlid,
            'quanhe': $("#sl-fml-qh-ud option:selected").text(),
            'nghenghiep': fmlworkud,
            'hoancanhkinhte': '',
            'lichsuchinhtri': $('#chinhtriud').val(),
            'birthday': $("#bdud").val()
        };
        updateFml(data);
    }
    else {
        $('#err-ud-fml').show();
    }
}
var bolfmlud = true;
function updateFml(model) {
    if (bolfmlud) {
        bolfmlud = false;
        $.ajax({
            url: linkserver + "adfamily/updateFamily",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(model),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bolfmlud = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bolfmlud = true;
                if (data.success) {
                    $('#modalupdatefamily').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật thông tin thành công!",
                        callback: function () {
                            getFamilies(fileidmain, bindigFamilies);
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
//delete family

function deleteFml(id) {
    bootbox.confirm("Bạn có chắc muốn xóa thông tin này?",
        function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "adfamily/deleteFml?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        if (data.success) {
                            bootbox.alert("Xóa thành công!");
                            getFamilies(fileidmain, bindigFamilies);
                        }
                        else {
                            bootbox.alert(data.message);
                        }
                    }
                });
            }
        });
}

//date picker
$(document).ready(function () {
    $('#datepicker-fml,#datepicker-fmlud').datetimepicker({
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
