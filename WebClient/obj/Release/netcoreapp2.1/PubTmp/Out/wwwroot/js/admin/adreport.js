var token = getTokenByLocal().token;
//datetime picker
$(document).ready(function () {
    $('#datepicker-startday ,#datepicker-endday').datetimepicker({
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
getDangBo();
function getChiBoById(id) {
    $.ajax({
        type: "get",
        url: linkserver + "adchibo/getChiBoByDb?id=" + id,
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
                $("#select-chibo option").remove();
                for (var i in data.data) {
                    var cb = data.data[i];
                    $("#select-chibo").append('<option value=' + cb.cbid + '>' + cb.tencb + '</option>');
                }
                if (data.data.length > 0) {
                    getRevanue(data.data[0].cbid, bindingRevanue);
                }

            }
        }
    });
}
function filterUser() {
    nextTabButton(0);
    getUser(bindingUserByChiBo);
}
$('#select-chibo').on('change', function () {
    getRevanue(parseInt(this.value), bindingRevanue);
    getUser(parseInt(this.value), bindingUserByChiBo);
});
$('#select-dangbo').on('change', function () {
    getChiBoById(parseInt(this.value));
    $(".form-item-user").remove();
});

function getRevanue(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "dashboard/getRevanue?id=" + id,
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
        var revanue = data.data;
        var arr =
            [
                ['Chính thức', revanue.chinhthuc],
                ['Dự bị', revanue.dubi],
                ['Chuyển đến', revanue.ketnap],
                ['Chuyển đi', revanue.chuyendi],
                ['Kết nạp', revanue.chuyenden],
                ['Từ trần', revanue.tutran],
                ['Khai trừ', revanue.khaitru],
                ['Xóa tên', revanue.xoaten],
                ['Xin khỏi Đảng', revanue.rakhoidang],
                ['Đi nước ngoài', revanue.dinuocngoai],
                ['Tổng số', revanue.all]
            ];
        drawChart(arr, data.data.namechibo);
    }
}
function drawChart(arr,namechibo) {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Thống kê tình hình Đảng viên Chi bộ ' + namechibo+' năm ' + new Date().getFullYear().toString()
        },
        subtitle: {
            text: 'Nguồn: TT CNTT'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Số lượng Đảng viên (người)'
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Số lượng: <b>{point.y:.0f} người</b>'
        },
        series: [{
            name: 'Population',
            data: arr,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}
function getUser(callback) {

    var fromday = $("#fromday").val();
    var endday = $("#endday").val();

    var gender = parseInt($("#sl-gender").children("option:selected").val());
    var tongiao = $("#sl-tongiao").children("option:selected").text();
    var bangcap = parseInt($("#sl-bangcap").children("option:selected").val());
    var lyluanct = parseInt($("#sl-lyluanct").children("option:selected").val());
    var chucvu = parseInt($("#sl-title").children("option:selected").val());
    var phongban = parseInt($("#sl-org").children("option:selected").val());
    var chibo = parseInt($("#select-chibo").children("option:selected").val());
    var chuyendang = parseInt($("#sl-chuyendang").children("option:selected").val());
    if (isNaN(chibo)) { return; }
    var data = {
        'startday': fromday,
        'endday': endday,
        'gender': gender,
        'tongiao': tongiao,
        'bangcap': bangcap,
        'lyluanct': lyluanct,
        'chucvu': chucvu,
        'phongban': phongban,
        'cbid': chibo,
        'chuyendang': chuyendang
    };

    $.ajax({
        url: linkserver + "adreport/filterUser",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
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
function bindingUserByChiBo(data) {
    if (data.success && data.data) {
        $(".form-item-user").remove();
        for (var i in data.data) {
            var item = data.data[i];
            if (item.file) {
                $("#form-show-info-user").append(` <div class="k form-item-user">
                <div class="k left-text img-avt-user" style="background-image:url(`+ (item.file.avatar ? linkfileuser + item.file.avatar : '/images/admin/avt-us-defaul.png') + `)"></div>
                <div class="k t left-text">`+ item.user.madv +`</div>
                <div class="k t left-text">`+ item.file.hotendangdung + `</div>
                <div class="k t left-text">`+ formatDate(new Date(item.file.createday)) +`</div>
                <div class="k t left-text">`+ formatDate(new Date(item.user.ngaydenchibo)) +`</div>
            </div>`);
            }
        }
        if (data.data && data.data[0]) {
            $("#tab-nodata").hide();
        }
        else {
            $("#tab-nodata").show();
        }
    }
}
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
            if (data.data.length > 0 && data.success) {
                for (var i in data.data) {
                    var item = data.data[i].db;
                    $("#select-dangbo").append(' <option value=' + item.dbid + '>' + item.tendb + '</option>');
                }
                getChiBoById(data.data[0].db.dbid);
            }
        }
    });
}
//filter 
function nextTabButton(tab) {
    $(".form-show-info-user").hide();
    switch (tab) {
        case 0:
            $("#form-show-info-user").show();
            break;
        case 1:
            $("#tab-user-bonus").show();
            break;
        case 2:
            $("#tab-user-des").show();
            break;
        case 3:
            $("#tab-user-toabroad").show();
            break;
    }
}
function showBonus(callback) {
    nextTabButton(1);
    var chibo = parseInt($("#select-chibo").children("option:selected").val());
    if (isNaN(chibo)) { return;}
    var data = {
        'startday': $('#fromday').val(),
        'endday': $('#endday').val(),
        'cbid': chibo
    };
    $.ajax({
        url: linkserver + "adreport/getUserBonus",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
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
        $(".form-item-user").remove();
        for (var i in data.data) {
            var item = data.data[i];
            $("#tab-user-bonus").append(`<div class="k form-item-user">
                <div class="k left-text img-avt-user"style=" background-image:url(`+ (item.avatar ? linkfileuser + item.avatar : '/images/admin/avt-us-defaul.png') + `)"></div>
                <div class="k t left-text">`+ item.madv +`</div>
                <div class="k t left-text">`+item.hotendangdung+`</div>
                <div class="k t left-text">`+ item.noidung + `</div>
                <div class="k t left-text">`+ formatDate(new Date(item.daycreate)) +`</div>
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
//filter dang vien co ki luat trong thoi gian
function getUserDes(callback) {
    nextTabButton(2);
    var chibo = parseInt($("#select-chibo").children("option:selected").val());
    if (isNaN(chibo)) { return; }
    var data = {
        'startday': $('#fromday').val(),
        'endday': $('#endday').val(),
        'cbid': chibo
    };
    $.ajax({
        url: linkserver + "adreport/getUserDesS",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
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
function bindingUserDes(data) {
    if (data.success && data.data) {
        $('.form-item-user').remove();
        for (var i in data.data) {
            var item = data.data[i];
            $("#tab-user-des").append(`<div class="k form-item-user">
                <div class="k left-text img-avt-user"style=" background-image:url(`+ (item.avatar ? linkfileuser + item.avatar : '/images/admin/avt-us-defaul.png') + `)"></div>
                <div class="k t left-text">`+ item.madv + `</div>
                <div class="k t left-text">`+ item.hotendangdung +`</div>
                <div class="k t left-text">`+ item.noidung + `</div>
                <div class="k t left-text">`+ formatDate(new Date(item.daycreate)) +`</div>
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
//filter dang vien di nước ngoài
function getUserToaBroad(callback) {
    nextTabButton(3);
    var chibo = parseInt($("#select-chibo").children("option:selected").val());
    if (isNaN(chibo)) { return; }
    var data = {
        'startday': $('#fromday').val(),
        'endday': $('#endday').val(),
        'cbid': chibo
    };
    $.ajax({
        url: linkserver + "adreport/getUserToaBroad",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
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
function bindingUserToabroad(data) {
    if (data.success && data.data) {
        $('.form-item-user').remove();
        for (var i in data.data) {
            var item = data.data[i];
            $('#tab-user-toabroad').append(`<div class="k form-item-user">
                <div class="k left-text img-avt-user"style="background-image:url(`+ (item.avatar ? linkfileuser + item.avatar : '/images/admin/avt-us-defaul.png') + `)"></div>
                <div class="k t left-text">`+ item.madv + `</div>
                <div class="k t left-text">`+ item.hotendangdung + `</div>
                <div class="k t left-text">`+ item.lydo + `</div>
                <div class="k t left-text">`+ formatDate(new Date(item.thoigiandi)) +`</div>
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

//get don vi va phong ban
getOrg();
getTitle();
function getOrg() {
    $.ajax({
        type: "get",
        url: linkserver + "AdOrganization/getAllOrganization",
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
                    var item = data.data[i];
                    $('#sl-org').append('<option value=' + item.ogid +'>' + item.nameog +'</option>');
                }
            }
        }
    });
}
function getTitle() {
    $.ajax({
        type: "get",
        url: linkserver + "AdTitle/getAllTitle",
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data) {
                for (var i in data.data) {
                    var item = data.data[i];
                    $('#sl-title').append('<option value=' + item.titleid + '>' + item.nametitle +'</option>');
                }
            }
        }
    });
}