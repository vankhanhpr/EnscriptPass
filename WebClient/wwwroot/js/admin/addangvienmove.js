var token = getTokenByLocal().token;
getDangBo();
//dang bo and chi bo
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
                        //getBonusByCbId(data.data[0].cbid);
                    }
                }
            }
        }
    });
}

//change user type
var type = 0;
$('#sl-type-user').on('change', function () {
    type = parseInt(this.value);
    if (type === 0) {
        $('#form-body-usmove').show();
        $('#form-body-usercome').hide();
    }
    else {
        $('#form-body-usmove').hide();
        $('#form-body-usercome').show();
    }
    getUserMoved();
});

function getUserMoved() {
    var model = {
        'startday': $("#fromday").val(),
        'endday': $("#today").val(),
        'cbid': parseInt($("#sl-chibo").children("option:selected").val()),
        'type': type
    };
    $.ajax({
        url: linkserver + "aduser/getUserMoved",
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
                bindingUserMoved(data);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
function bindingUserMoved(data) {
    if (data.success) {
        if (type === 0) {
            $(".item-user-move").remove();
            if (data.data) {
                for (var i in data.data) {
                    var item = data.data[i];
                    var j = parseInt(i) + 1;
                    $('#form-body-usmove').append(`<div class="k row-item item-user-move">
                    <span class="k t text-item small-item">`+ j + `</span>
                    <span class="k t text-item small-item">`+ item.user.madv + `</span>
                    <span class="k t text-item big-item">`+ item.file.hotendangdung + `</span>
                    <span class="k t text-item item">`+ formatDate(new Date(item.file.ngayvaodangct)) + `</span>
                    <span class="k t text-item item">`+ formatDate(new Date(item.usermove.createday)) + `</span>
                    <span class="k t text-item big-item">`+ item.usermove.addresstogo + `</span>
                    <span class="k t text-item small-item">
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
        else {
            $(".item-user-move1").remove();
            if (data.data) {
                for (var i1 in data.data) {
                    var item1 = data.data[i1];
                    var j1 = parseInt(i1) + 1;
                    $('#form-body-usercome').append(`<div class="k row-item item-user-move1">
                        <span class="k t text-item small-item">`+ j1 + `</span>
                        <span class="k t text-item small-item">`+ item1.user.madv + `</span>
                        <span class="k t text-item big-item">`+ item1.file.hotendangdung + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item1.file.ngayvaodangct)) + `</span>
                        <span class="k t text-item item">`+ formatDate(new Date(item1.user.ngaydenchibo)) + `</span>
                        <span class="k t text-item big-item">`+ (item1.user.noisinhhoatcu ? item1.user.noisinhhoatcu : '') + `</span>
                        <span class="k t text-item small-item">
                        </span>
                    </div>`);
                }
            }
        }
    }
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
        getUserMoved();
    });
});

//chuyen sinh hoat dang den
//get title
function getTitle() {
    $.ajax({
        type: "get",
        url: linkserver + "adtitle/getAllTitle",
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
            bindingTitle(data);
        }
    });
}
function bindingTitle(data) {
    if (data.success && data.data) {
        $("#sl-title option").remove();
        for (var i in data.data) {
            var item = data.data[i];
            $("#sl-title").append('<option value="' + item.titleid + '">' + item.nametitle + '</option>');
        }
    }
}
//datetime picker
$(document).ready(function () {
    $('#datepicker-daytochibo').datetimepicker({
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
function emptyForm() {
    $("#ip-madv").val('');
    $("#adress-on-bussiness").val('');
    $("#ip-pass").val('');
    $("#ip-cf-pass").val('');
}
function addClass(obj) {
    $("#" + obj).addClass("err-ip");
}
function removeClass(obj) {
    $("#" + obj).removeClass("err-ip");
}

// brower picture
var formData = new FormData();
function getImage() {
    $("#upload-referral").click();
    $("#upload-referral").change(function () {
        readImageUpload(this);
    });
}
//add picture to view
function readImageUpload(input) {
    if (input.files && input.files[0]) {
        if (formData.get("giaygioithieu") !== null) {
            formData.delete("giaygioithieu");
        }
        formData.append("giaygioithieu", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".name-referral").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-referral").val("");
}
function validateForm() {
    var madv = $("#ip-madv").val();
    var oldadress = $("#adress-on-bussiness").val();
    var daytogo = $("#day-to-go").val();
    var title = parseInt($("#sl-title").children("option:selected").val());
    var pass = $("#ip-pass").val();
    var confilmpass = $("#ip-cf-pass").val();

    var checkinsert = true;
    if (madv.trim() === '') {
        checkinsert = false;
        addClass('ip-madv');
    }
    else {
        removeClass('ip-madv');
    }
    if (oldadress.trim() === '') {
        checkinsert = false;
        addClass('adress-on-bussiness');
    }
    else {
        removeClass('adress-on-bussiness');
    }
    if (pass !== confilmpass || pass.length < 6) {
        addClass('ip-pass');
        addClass('ip-cf-pass');
        checkinsert = false;
    }
    else {
        removeClass('ip-pass');
        removeClass('ip-cf-pass');
    }
    if (!checkinsert) {
        $("#err-validate").show();
        return;
    }
    else {
        $("#err-validate").hide();
    }
    formData.append('madv', madv.trim());
    formData.append('cbid', parseInt($("#sl-chibo").children("option:selected").val()));
    formData.append('ngaydenchibo', daytogo);
    formData.append('roleid', 1);
    formData.append('titleid', title);
    formData.append('active', 0);
    formData.append('password', pass.trim());
    formData.append('lydoden', 1);
    formData.append('noisinhhoatcu', oldadress.trim());
    insertUser(formData);
}
var bol = true;
function insertUser(data) {
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "aduser/moveUser",
            type: 'POST',
            dataType: 'json',
            async: false,
            data: data,
            headers: { 'authorization': `Bearer ${token}` },
            processData: false,
            contentType: false,
            cache: false,
            error: function (err) {
                bol = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bol = true;
                if (data.success) {
                    $('#modalinsertdangvien').modal('toggle');
                    bootbox.alert({
                        message: "Chuyển Đảng viên đến Chi bộ thành công!",
                        callback: function () {
                            emptyForm();
                            window.location.href = '/admin/manageuser';
                        }
                    });
                }
                else {
                    emptyForm();
                    $('#modalinsertdangvien').modal('toggle');
                    bootbox.alert(data.message);
                }
            }
        });
    }
}

//chuyen dang 
//get user
var formDataMove = new FormData();
function getUserByCb() {
    formDataMove = new FormData();
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
                $("#sl-user-move option").remove();
                if (data.data) {
                    for (var i in data.data) {
                        var item = data.data[i];
                        $("#sl-user-move").append('<option value=' + item.usid + '>' + item.hotendangdung + '(' + item.madv + ')' + '</option>');
                    }
                }
            }
        }
    });
}

//getimage user move
function getImageUsmove() {
    $("#upload-form-move").click();
    $("#upload-form-move").change(function () {
        readImageUploadUsMove(this);
    });
}
//add picture to view
function readImageUploadUsMove(input) {
    if (input.files && input.files[0]) {
        if (formDataMove.get("filereview") !== null) {
            formDataMove.delete("filereview");
        }
        formDataMove.append("filereview", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".name-form-move").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-form-move").val("");
}

//getimage user move
function getFormMyS() {
    $("#upload-myself").click();
    $("#upload-myself").change(function () {
        readFormMyS(this);
    });
}
//add picture to view
function readFormMyS(input) {
    if (input.files && input.files[0]) {
        if (formDataMove.get("tranfer") !== null) {
            formDataMove.delete("tranfer");
        }
        formDataMove.append("tranfer", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".name-myself").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-myself").val("");
}

function validateFormMove() {
    var checkmove = true;
    var address = $("#adress-to").val();
    if (address.trim()==='') {
        addClass("adress-to");
        checkmove = false;
    }
    else {
        removeClass("adress-to");
    }
    if (!formDataMove.get('filereview')) {
        addClass('filereview');
        checkmove = false;
    }
    else {
        removeClass('filereview');
    }
    if (!formDataMove.get('tranfer')) {
        addClass('tranfer');
        checkmove = false;
    }
    else {
        removeClass('tranfer');
    }
    //show warning
    if (!checkmove) {
        $('#err-move-user').show();
        return;
    }
    else {
        $('#err-move-user').hide();
        formDataMove.append('addresstogo', address);
        formDataMove.append('usid', parseInt($("#sl-user-move").children("option:selected").val()));
        moveDangVien();
    }
}
function moveDangVien() {
    $.ajax({
        url: linkserver + "UserMove/insertUserMove",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formDataMove,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        error: function (err) {
            bootbox.alert({
                message: "Có lỗi xảy ra xin vui lòng thử lại sau"
            });
        },
        success: function (data) {
            if (data.success) {
                bootbox.alert({
                    message: "Đã chuyển Đảng viên!",
                    callback: function () {
                        window.location = "/admin/dangvienmove";
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}
