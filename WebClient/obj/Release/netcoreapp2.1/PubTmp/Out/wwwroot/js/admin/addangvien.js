checkToken();
var bolft = true;
var cbid = 0;
var role = 1;
var titleid = 0;
var page = 0;
var pagesize = 10;
var usidud = -1;
var token = getTokenByLocal().token;
getUser(bindingUser, page, pagesize)
//lazyload user
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        page = page + 1;
        bindingUserLazyLoad(bindingUser, page, pagesize);
    }
});
//select insert  user
$('#sl-chb-addnew').on('change', function () {
    cbid = parseInt(this.value);
});
$('#sl-role-addnew').on('change', function () {
    role = parseInt(this.value);
});
$('#sl-title-addnew').on('change', function () {
    titleid = parseInt(this.value);
});

//show come form user
$('#reason-create').on('change', function () {
    var reasion = parseInt(this.value);
    if (reasion === 1) {
        $("#go-on-business-old").show(300);
    }
    else {
        $("#go-on-business-old").hide(300);
    }
});

//select update user 
$('#sl-chb-ud').on('change', function () {
    cbid = parseInt(this.value);
});
$('#sl-role-ud').on('change', function () {
    role = parseInt(this.value);
});
$('#sl-title-ud').on('change', function () {
    titleid = parseInt(this.value);
});

getAllChiBo(bindingChiBoToFilter);
function bindingChiBoToFilter(data) {
    if (data.success && data.data) {
        for (var i in data.data) {
            var item = data.data[i];
            $("#select-chibo-filter").append('<option value=' + item.cbid + '>' + item.tencb + '</option>');
        }
    }
}

function showTabFilter() {
    if (bolft) {
        bolft = false;
        $(".tab-filter").hide(400);
        $(".ic-show-ft").toggleClass("down");
    }
    else {
        bolft = true;
        $(".tab-filter").show(400);
        $(".ic-show-ft").toggleClass("down");

    }
}

//datetime picker
$(document).ready(function () {
    $('#datepicker-addnew, #datepicker-update').datetimepicker({
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
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    });
});

//get all users
function getUser(callback, page, pagesize) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getalluser?page=" + page + "&&pagesize=" + pagesize + "",
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
function bindingUser(data) {
    $(".item-dv").remove();
    if (data.success && data.data.length > 0) {
        for (var i in data.data) {
            var user = data.data[i].user;
            var file = data.data[i].file;
            var viewkey = "";
            //if (user.active) {
            //    viewkey =   '<div class="k bd-bnt">' +
            //                '<span  data-toggle="modal" data-target="#modalchuyendang">' +
            //                '<span class="k t bnt-ed-dv" onclick="openTabBlockUser(' + user.usid + ',true) "> Khóa </span></span>' +
            //                '</div>';
            //}
            //else {
            //    viewkey = '<div class="k bd-bnt">' +
            //        '<span>' +
            //        '<span class="k t bnt-ed-dv" onclick="openTabBlockUser(' + user.usid + ',false) "> Mở khóa </span></span>' +
            //        '</div>';
            //}
            var view = '<div class="k item-dv">' +
                '<div class="k img-avt-dv" style="background-image:url(' + (file && file.avatar != null ? linkfileuser + file.avatar :'/images/admin/avt-us-defaul.png') + ')" ></div >' +
                '<div class="k f-name f-name-big">' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">HỌ & TÊN: </span>' + (file && file.hotendangdung != null ? file.hotendangdung : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">NGÀY SINH: </span>' + (file && file.ngaythangnamsinh != null ? formatDate(new Date(file.ngaythangnamsinh)) : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">SĐT: </span> ' + (file && file.sdt != null ? file.sdt : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">EMAIL: </span>' + (file && file.email != null ? file.email : '') + '' +
                '</span>' +
                '</div>' +
                '<div class="k f-name">' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">MÃ ĐẢNG VIÊN: </span>' + user.madv + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">NGÀY VÀO ĐẢNG: </span>' + formatDate(new Date(user.ngaydenchibo)) + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">PHÂN QUYỀN: </span>' + (user.roleid == 1 ? 'Đảng viên' : 'Admin') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<span class="note-des">TRẠNG THÁI: </span>' + (user.active === true ? 'Hoạt động' : 'Khóa') + '' +
                '</span>' +
                '</div>' +
                '<div class="k f-name fname-small">' +
                '<div class="k bd-bnt">' +
                '<a href="/admin/file?id=' + user.usid + '" target="_blank"><span class="k t bnt-ed-dv">Chi tiết Hồ sơ</span></a>' +
                '</div>' +
                viewkey +
                '<div class="k bd-bnt">' +
                '<span class="k t bnt-ed-dv" onclick="acceptUser(' + user.usid + ')">' + (!user.accept ? 'Duyệt tài khoản' : 'Cho phép chỉnh sửa tài khoản') + '</span>' +
                '</div>' +
                '<div class="k bd-bnt">' +
                '<span class="k t bnt-ed-dv" data-toggle="modal" onclick="getUserById(bindingUserBuId,' + user.usid + ')" data-target="#modalupdateuser">Cập nhật tài khoản</span>' +
                '</div>' +
                '</div>' +
                '</div>';
            $("#list-item-us").append(view);
        }
    }
}

function bindingUserLazyLoad(data) {
    if (data.success && data.data.length > 0) {
        for (var i in data.data) {
            var user = data.data[i].user;
            var file = data.data[i].file;
            var view = '<div class="k item-dv">' +
                '<div class="k img-avt-dv" ></div >' +
                '<div class="k f-name">' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-user-circle-o font-ic" aria-hidden="true"></i> ' + (file && file.hotendangdung != null ? file.hotendangdung : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-birthday-cake font-ic" aria-hidden="true"></i> ' + (file && file.ngaythangnamsinh != null ? formatDate(new Date(file.ngaythangnamsinh)) : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-phone-square font-ic" aria-hidden="true"></i> ' + (file && file.sdt != null ? file.sdt : '') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-envelope-o font-ic" aria-hidden="true"></i> ' + (file && file.email != null ? file.email : '') + '' +
                '</span>' +
                '</div>' +
                '<div class="k f-name">' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-id-card-o font-ic" aria-hidden="true"></i>' + user.madv + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-calendar-plus-o font-ic" aria - hidden="true" ></i > ' + formatDate(new Date(user.ngaydenchibo)) + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-users font-ic" aria-hidden="true"></i>' + (user.roleid == 1 ? 'Đảng viên' : 'Admin') + '' +
                '</span>' +
                '<span class="k t t-if-dv">' +
                '<i class="fa fa-toggle-on font-ic" aria-hidden="true"></i>' + (user.active === true ? 'Hoạt động' : 'Khóa') + '' +
                '</span>' +
                '</div>' +
                '<div class="k f-name">' +
                '<div class="k bd-bnt">' +
                '<a href="/admin/file?id=' + user.usid + '" target="_blank"><span class="k t bnt-ed-dv">Chi tiết Hồ sơ</span></a>' +
                '</div>' +
                '<div class="k bd-bnt">' +
                '<a href="#" target="_blank"><span class="k t bnt-ed-dv">Duyệt hồ sơ</span></a>' +
                '</div>' +
                '<div class="k bd-bnt">' +
                '<span class="k t bnt-ed-dv" onclick="blockUser(' + user.usid + ')">Khóa</span>' +
                '</div>' +
                '<div class="k bd-bnt">' +
                '<span class="k t bnt-ed-dv" data-toggle="modal" onclick="getUserById(bindingUserBuId,' + user.usid + ')" data-target="#modalupdateuser">Cập nhật tài khoản</span>' +
                '</div>' +
                '</div>' +
                '</div>';
            $("#list-item-us").append(view);
        }
    }
}
//get all chibo
function getAllChiBo(callback) {

    $.ajax({
        type: "get",
        url: linkserver + "adchibo/getAllChiBo",
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
    if (data.success && data.data.length > 0) {
        $("#sl-chb-addnew option").remove();
        cbid = data.data[0].cbid;
        for (var i in data.data) {
            $("#sl-chb-addnew").append('<option value="' + data.data[i].cbid + '">' + data.data[i].tencb + '</option>');
        }
    }
    else {
        bootbox.alert("Vui lòng thêm ít nhất một Chi bộ trước khi thêm mới Đảng viên");
    }
}
function bindingChiBoToUd(data) {
    if (data.success && data.data.length > 0) {
        $("#sl-cb-ud option").remove();
        cbid = data.data[0].cbid;
        for (var i in data.data) {
            $("#sl-cb-ud").append('<option value="' + data.data[i].cbid + '">' + data.data[i].tencb + '</option>');
        }
    }
}

//positiin working
function getOrganization(callback) {
    $.ajax({
        type: "get",
        url: linkserver + "AdOrganization/getAllOrganization",
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
function bindingOrg(data) {
    if (data.success && data.data.length > 0) {
        $("#sl-og-addnew option").remove();
        for (var i in data.data) {
            $("#sl-og-addnew").append('<option value="' + data.data[i].ogid + '">' + data.data[i].nameog + '</option>');
        }
    }
    else {
        bootbox.alert("Vui lòng thêm ít nhất một đơn vị");
    }
}
//get title in Dang
function getTitle(callback) {
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
            callback(data);
        }
    });
}
function bindingTitle(data) {
    if (data.success && data.data.length > 0) {
        $("#sl-title-addnew option").remove();
        titleid = data.data[0].titleid;
        for (var i in data.data) {
            var item = data.data[i];
            $("#sl-title-addnew").append('<option value="' + item.titleid + '">' + item.nametitle + '</option>');
        }
    }
    else {
        bootbox.alert("Vui lòng thêm các chức vụ Đảng trước khi thêm Đảng viên!");
    }
}
function bindingTitleToUd(data) {
    if (data.success && data.data.length > 0) {
        $("#sl-og-ud option").remove();
        titleid = data.data[0].titleid;
        for (var i in data.data) {
            var item = data.data[i];
            $("#sl-og-ud").append('<option value="' + item.titleid + '">' + item.nametitle + '</option>');
        }
    }
}

function showTabInsertUser() {
    getAllChiBo(bindingChiBo);
    //getOrganization(bindingOrg);
    getTitle(bindingTitle);
}
function insertUser() {
    var bol = true;
    var madv = $("#ip-madv-addnew").val();
    var newpass = $("#ip-pass").val();
    var cfpass = $("#ip-cf-pass").val();
    var bussiness = $("#adress-on-bussiness").val();
    if (parseInt($("#reason-create").children("option:selected").val()) == 1) {
        if (bussiness.trim() == '') {
            $("#adress-on-bussiness").addClass("err-ip");
            $(".err-validate").show();
            return;
        }
        else {
            $("#adress-on-bussiness").removeClass("err-ip");
            $(".err-validate").hide();
        }
    }
    if (!checkData(madv, newpass, cfpass)) {
        return;
    }
    var data = {
        'madv': madv.trim(),
        //'cbid': cbid,
        'ngaydenchibo': $("#day-create-cb").val(),
        'roleid': role,
        //'titleid': titleid,
        'active': 0,
        'password': cfpass.trim(),
        'lydoden': parseInt($("#reason-create").children("option:selected").val()),
        'noisinhhoatcu': bussiness.trim()
    };
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "aduser/insertUser",
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
                    $('#modalinsertdangvien').modal('toggle');
                    bootbox.alert({
                        message: "Thêm tài khoản thành công!",
                        callback: function () {
                            emptyForm();
                            page = 0;
                            getUser(bindingUser, page, pagesize);
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
function checkData(madv, newpass, cfpass) {
    if (madv.trim().length < 8) {
        $("#ip-madv-addnew").addClass("err-ip");
        $(".err-validate").show();
        return false;
    }
    else {
        $("#ip-madv-addnew").removeClass("err-ip");
    }
    if (newpass !== cfpass || cfpass.length < 6) {
        $("#ip-pass").addClass("err-ip");
        $("#ip-cf-pass").addClass("err-ip");
        $(".err-validate").show();
        return false;
    }
    else {
        $("#ip-pass").removeClass("err-ip");
        $("#ip-cf-pass").removeClass("err-ip");
    }
    return true;
}
function emptyForm() {
    $("#ip-madv-addnew").val("");
    $("#ip-pass").val("");
    $("#ip-cf-pass").val("");
    // $("#sl-db-att").append('<option value="' + item.dbid + '">' + item.tendb + '</option>');
}
//get detail user by id
function getUserById(callback, id) {
    usidud = id;
    getAllChiBo(bindingChiBoToUd);
    getTitle(bindingTitleToUd);
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getDetalUser?id=" + id,
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
function bindingUserBuId(data) {
    if (data.success && data.data) {
        var item = data.data;
        $("#madv-ud").val(item.madv);
        $("#day-update-us").val(formatDate(new Date(item.ngaydenchibo)));
        $("#sl-cb-ud option[value='" + item.cbid + "']").prop("selected", true);
        $("#sl-og-ud option[value='" + item.titleid + "']").prop("selected", true);
        $("#sl-role-ud option[value='" + item.roleid + "']").prop("selected", true);
    }
}

//update user
var bolud = true;
function updateUser() {
    var madvud = $("#madv-ud").val();
    //var titleud = $("#sl-og-ud").children("option:selected").val();
    var roleud = $("#sl-role-ud").children("option:selected").val();
    //var cbud = $("#sl-cb-ud").children("option:selected").val();
    var pass = $("#pass-ud").val();
    var cfpass = $("#cf-pass-ud").val();

    if (checkDataUd(madvud.trim(), pass.trim(), cfpass.trim()) == true) {
        var data = {

            'usid': usidud,
            'madv': madvud.trim(),
            //'cbid': parseInt(cbud),
            'ngaydenchibo': $("#day-update-us").val(),
            'roleid': parseInt(roleud),
            //'titleid': parseInt(titleud),
            'active': 0,
            'password': cfpass.trim(),
        };
        if (bolud) {
            bol = false;
            $.ajax({
                url: linkserver + "aduser/updateUser",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                headers: { 'authorization': `Bearer ${token}` },
                async: false,
                processData: false,
                contentType: "application/json",
                error: function (err) {
                    bolud = true;
                    bootbox.alert({
                        message: "Error :" + err.message
                    });
                },
                success: function (data) {
                    bolud = true;
                    if (data.success) {
                        $('#modalupdateuser').modal('toggle');
                        bootbox.alert({
                            message: "Cập nhật khoản thành công!",
                            callback: function () {
                                page = 0;
                                pagesize = 10;
                                getUser(bindingUser, page, pagesize)
                            }
                        })
                    }
                    else {
                        emptyForm();
                        $('#modalupdateuser').modal('toggle');
                        bootbox.alert(data.message);
                    }
                }
            });
        }
    }
}
function checkDataUd(madv, pass, cfpass) {
    if (madv.length != 8) {
        $("#err-validate-ud").show();
        $("#madv-ud").addClass("err-ip");
        return false;
    }
    else {
        $("#ip-madv-addnew").removeClass("err-ip");
    }
    if (pass != "" || cfpass != "") {
        if (pass != cfpass || pass.length < 6) {
            $("#pass-ud").addClass("err-ip");
            $("#cf-pass-ud").addClass("err-ip");
            $("#err-validate-ud").show();
            return false;
        }
    }
    else {
        $("#pass-ud").removeClass("err-ip");
        $("#cf-pass-ud").removeClass("err-ip");
        $("#err-validate-ud").hide();
        return true;
    }
    $("#err-validate-ud").hide();
    $("#pass-ud").removeClass("err-ip");
    $("#cf-pass-ud").removeClass("err-ip");
    $("#ip-madv-addnew").removeClass("err-ip");
    return true;
}

function openTabBlockUser(id, checkactive) {
    usidud = id;
    if (!checkactive) {
        $.ajax({
            type: "get",
            url: linkserver + "aduser/unlockUser?id=" + id,
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
                bootbox.alert({
                    message: "Mở khóa tài khoản thành công!",
                    callback: function () {
                        window.location.href = "/admin/dangvien";
                    }
                })
            }
        });
    }
}
//block usser
function blockUser() {
    var data = {
        'usid': usidud,
        'lydodi': parseInt($("#sl-reason").children("option:selected").val()),
    };
    $.ajax({
        url: linkserver + "aduser/blockUser",
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
                $('#modalchuyendang').modal('toggle');
                bootbox.alert({
                    message: "Khóa tài khoản thành công!",
                    callback: function () {
                        window.location.href = "/admin/dangvien";
                    }
                });
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}
function callBlockUser(id) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/blockUser?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            bootbox.alert("Tài khoản đã được khóa");
            page = 0;
            getUser(bindingUser, page, pagesize);
        }
    });
}

//filter 
$('#sl-ft-role').on('change', function () {
    var role = parseInt(this.value);
    filterUserByRole(role, bindingUser);
});
$('#sl-ft-active').on('change', function () {
    var active = parseInt(this.value);
    filterUserByActive(active, bindingUser);
});
$('#select-chibo-filter').on('change', function () {
    filterUserByChiBo(parseInt(this.value), bindingUser);
});

function filterUserByRole(role, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getUserByRole?role=" + role,
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

function filterUserByActive(active, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getUserByActive?active=" + active,
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

function filterUserByBox(callback) {
    var data = { 'filter': $("#search-box").val() };
    $.ajax({
        url: linkserver + "aduser/filterUserByBox",
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
                callback(data);
            }
        }
    });
}

function filterUserByChiBo(cbid, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getUserByChiBoIdForFilter?id=" + cbid,
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

function acceptUser(id) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/acceptUser?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success) {
                
                if (data.data) {
                    bootbox.alert("Duyệt tài khoản thành công!");
                }
                else {
                    bootbox.alert("Đã mở khóa chỉnh sửa tài khoản!");
                }
                page = 0;
                getUser(bindingUser, page, pagesize);
            }
        }
    });
}