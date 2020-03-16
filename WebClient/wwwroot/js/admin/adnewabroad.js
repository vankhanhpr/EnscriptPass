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
                        // getBonusByCbId(data.data[0].cbid);
                    }
                }
            }
        }
    });
}

function getUserByCbId() {
    var model = {
        'startday': $('#starday').val(),
        'endday': $('#endday').val(),
        'cbid': parseInt($("#sl-chibo").children("option:selected").val())
    };
    $.ajax({
        url: linkserver + "AdAbroad/getUserByCbId",
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
                bindingToaBroad(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
function bindingToaBroad(data) {
    if (data.success) {
        $('.item-toabroad').remove();
        if (data.data) {
            for (var i in data.data) {
                var item = data.data[i];
                var j = parseInt(i) + 1;
                $('#form-item-abroad').append(`<div class="k row-item item-toabroad">
                                    <span class="k t text-item small-item">`+ j + `</span>
                                    <span class="k t text-item small-item">`+ item.madv + `</span>
                                    <span class="k t text-item big-item">`+ item.hotendangdung + `</span>
                                    <span class="k t text-item item">`+ formatDate(new Date(item.thoigiandi)) + `</span>
                                    <span class="k t text-item item">`+ formatDate(new Date(item.thoigiantrove)) + `</span>
                                    <span class="k t text-item big-item">`+ item.noiden + `</span>
                                    <span class="k t text-item small-item">
                                        <i class="fa fa-trash-o ic-font"title="Xóa" onclick="confirmDelete(`+ item.brid + `)" aria-hidden="true"></i>
                                        <i class="fa fa-pencil-square-o ic-font"title="Cập nhật" onclick="getAbroadById(`+ item.brid + `)" data-toggle="modal" data-target="#modalupdateabroad"></i>
                                        <i class="fa fa-check-circle-o ic-font"title="Duyệt" onclick="acceptAbroad(`+ item.brid + `,this)"  style ="color:` + (item.accept == false ? '#333333' : 'green') +`" aria-hidden="true"></i>
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
//accept to a broad
function acceptAbroad(id,obj) {
    if (obj.style.color == 'green') { return; }
    $.ajax({
        type: "get",
        url: linkserver + "AdAbroad/acceptToaBroad?id=" + id,
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
//insert toabroad
function getUserByCb() {
    //showTabInsert();
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
                showTabInsert();
            }
        }
    });
}
function updateDrop() {
    document.getElementById("sl-user").fstdropdown.rebind();
}
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
            'fileid': parseInt($("#sl-user").children("option:selected").val()),
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
                            getUserByCbId();
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

function confirmDelete(id) {
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
                deleteToaBroad(id);
            }
        }
    });
}
function deleteToaBroad(id) {
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
            getUserByCbId();
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
        getUserByCbId(parseInt($("#sl-chibo").children("option:selected").val()));
    });
});
//datetime picker update insert
$(document).ready(function () {
    $('#datepicker-daytogo').datetimepicker({
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
        var x = e.date;
        var z = $("#daytoreturn").val().split('/');
        var y = new Date(z[2], z[1] - 1, z[0]);

        if (x > y) {
            var tem = formatDate(new Date(x));
            $("#daytoreturn").val(tem);
        }
        showTabInsert();
    });

    $('#datepicker-daytogo1').datetimepicker({
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
        var x1 = e.date;
        var z1 = $("#daytoreturnupdate").val().split('/');
        var y1 = new Date(z1[2], z1[1] - 1, z1[0]);

        if (x1 > y1) {
            var tem1 = formatDate(new Date(x1));
            $("#daytoreturnupdate").val(tem1);
        }
    });
});

function showTabInsert() {
    $('#datepicker-daytoreturn').datetimepicker({
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
    }).on('dp.change', function (e) {
        var x = new Date(e.date);
        var z = $("#daytoreturn").val().split('/');
        var y = new Date(z[2], z[1] - 1, z[0]);
        if (y < x) {
            $("#daytoreturn").val(formatDate(new Date(x.setFullYear(x.getFullYear()))));
        }
    });
}

$(document).ready(function () {
    
    $('#datepicker-daytoreturn1').datetimepicker({
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
        var y = new Date(z[2], z[1] - 1, z[0]);
        if (y < x) {
            $("#daytoreturn").val(formatDate(new Date(x.setFullYear(x.getFullYear()))));
        }
    });
});

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


//update
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
                            getUserByCbId();
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
function filterByBox() {
    var model = {
        'filter': $("#search-box").val(),
        'cbid': parseInt($("#sl-chibo").children("option:selected").val())
    };
    $.ajax({
        url: linkserver + "AdAbroad/filterByBox",
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
                bindingToaBroad(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}