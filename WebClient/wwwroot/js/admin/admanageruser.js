var token = getTokenByLocal().token;
var usid = -1;
var formInsert = new FormData();

$("#sl-chibo").on('change', function () {
    getArmorial(bindingArmorial, parseInt(this.value));
});
$("#sl-dangbo").on('change', function () {
    getChiBoByDbId(parseInt(this.value), bindingChiBo);
});
function showTab(tab) {
    $(".body-item").hide();
    $("#" + tab).show();
}

//information of user
function getChiBoByDbId(id, callback) {
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
            callback(data);
        }
    });
}
getDangBo(bindingDangBo);
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
    if (data.success && data.data) {
        $("#sl-dangbo option").remove();
        for (var i in data.data) {
            var item = data.data[i].db;
            $("#sl-dangbo").append('<option value=' + item.dbid + '>' + item.tendb + '</option>');
        }
        if (data.data[0]) {
            getChiBoByDbId(data.data[0].db.dbid, bindingChiBo);
        }
    }
}
function bindingChiBo(data) {
    if (data.success && data.data) {
        $("#sl-chibo option").remove();
        for (var i in data.data) {
            var item = data.data[i];
            $("#sl-chibo").append('<option value=' + item.cbid + '>' + item.tencb + '</option>');
        }
        if (data.data[0]) {
            //getArmorial(bindingArmorial, parseInt(data.data[0].cbid));
            getUserByChiBo(bindingUser, parseInt(data.data[0].cbid));
            //getFormFileByChiBo(data.data[0].cbid, bindingFormFile);
        }
    }
}

//get title
function getTitle(callback) {
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
            callback(data);
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
//chuyển sinh hoạt đến
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
//chuyen di
function getFileMove() {
    $("#upload-file-move").click();
    $("#upload-file-move").change(function () {
        readFileMove(this);
    });
}
function readFileMove(input) {
    if (input.files && input.files[0]) {
        if (formInsert.get("filereview") !== null) {
            formInsert.delete("filereview");
        }
        formInsert.append("filereview", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".name-file-move").text(x.name);
        };
        $("#check-form-move").attr('checked', 'checked');
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-file-move").val("");
}
function getFileReview() {
    $("#upload-file-review").click();
    $("#upload-file-review").change(function () {
        readFileReview(this);
    });
}
function readFileReview(input) {
    if (input.files && input.files[0]) {
        if (formInsert.get("tranfer") !== null) {
            formInsert.delete("tranfer");
        }
        formInsert.append("tranfer", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".file-review").text(x.name);
        };
        $("#check-form-review").attr('checked', 'checked');
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-file-review").val("");
}
function getUserByChiBo(callback, id) {
    $.ajax({
        type: "get",
        url: linkserver + "usermove/getUserMoveByChiBo?id=" + id,
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
    if (data.success && data.data) {
        $(".item-user").remove();
        var chekvalue = true;
        for (var i in data.data) {
            if (data.data[i].file) {
                var j = parseInt(i) + 1;
                var item = data.data[i];
                $("#form-list-user").append(`<div onclick="getArmorial(`+item.user.usid+`)" class="k row-table item-user">
                            <span class="k t item-row first-row">`+ j + `</span>
                            <span class="k t item-row scd-row">`+ item.user.madv + `</span>
                            <span class="k t item-row thr-row">
                            `+ item.file.hotendangdung + `
                            <a href=/admin/file?id=`+ item.user.usid +`><i class="fa fa-pencil-square-o ic-plane" aria-hidden="true"></i></a>
                            <a href=/admin/abroad?id=`+ item.file.fileid +`><i class="fa fa-plane ic-plane" aria-hidden="true"></i></a>
                            </span>
                        </div>`);
                if (chekvalue){
                    $("#madv").text(item.user.madv);
                    $("#nameuser").text(item.file.hotendangdung);
                    if (item.file.avatar) {
                        $("#img-avt-chuyendang").css("background-image", "url(" + linkfileuser + item.file.avatar + ")");
                    }
                    usid = item.user.usid;
                    chekvalue = false;
                }
            }
            if (data.data[0]) {
                getArmorial(data.data[0].user.usid);
            }
        }
    }
}

function getUserById(callback, id,obj) {
    $.ajax({
        type: "get",
        url: linkserver + "adfile/getFileByUsId?id=" + id,
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
            callback(data,obj);
        }
    });
}
function bindingFile(data,obj) {
    if (data.success && data.data) {
        var item = data.data;
        usid = item.user.usid;
        $("#madv").text(item.user.madv);
        $("#nameuser").text(item.file.hotendangdung);
        $("#img-avt-chuyendang").css("background-image", "url(" + linkfileuser + item.file.avatar + ")");
        $(".row-table").css('background-color', 'white');
        $(obj).css('background-color', 'rgba(51,51,51,0.1');
        $(".name-file-move").text('');
        $(".file-review").text('');
    }
    else {
        //
    }
}

//chuyen dang
function moveDangVien() {
    var address = $("#address-togo").val();

    //if ($('#check-form-move').checked) {
    if (document.getElementById("check-form-move").checked === false || document.getElementById("check-form-review").checked === false) {
        bootbox.alert("Bạn phải đính kèm Đơn xin chuyển Đảng và Bản tự kiểm điểm trước khi chuyển đi");
    }

    if (address.trim() === '') {
        $("#address-togo").css('border', '1px solid red');
        return;
    }
    else {
        $("#address-togo").css('border', '1px solid rgba(51,51,51,0.1');

        formInsert.append('addresstogo', address);
        formInsert.append('usid', usid);
    }
    $.ajax({
        url: linkserver + "UserMove/insertUserMove",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formInsert,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        error: function (err) {
            bootbox.alert({
                message: "Error :" + err.message
            });
        },
        success: function (data) {
            if (data.success) {
                bootbox.alert({
                    message: "Đã chuyển Đảng viên!",
                    callback: function () {
                        window.location = "/admin/manageuser";
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}
function getUserBySearchBox(callback) {
    var filter = $("#search-box").val();
    if (isNaN($("#sl-chibo").children("option:selected").val())) {
        return;
    }
    var chibo = parseInt($("#sl-chibo").children("option:selected").val());

    $.ajax({
        type: "get",
        url: linkserver + "usermove/filterUserByBox?filter=" + filter + "&&cbid=" + chibo,
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

//chuyển đổi giữa các tab 
var checktab = "chuyendang";
function nextTabLayout(obj) {
    formInsert = new FormData();
    var key = obj.name;
    if (checktab == key) {
        return;
    }
    checktab = key;
    $(".tab-layout").css("background-color", "white");
    $(obj).css("background-color", "var(--bg-button)");
   
    $(".sign-adherer").hide(200);
    switch (key) {
        case 'chuyendang':
           if($('#tab-sinhhoat').css('display') === 'none')
            {
                $("#tab-sinhhoat").show(200);
            }
            break;
        case 'huyhieu':
            $("#form-armorial").show(200);
            break;
        case 'dvdubi':
            $("#tab-user-dubi").show(200);
            break;
    }
}

//xét năm tuổi đảng
function getArmorial(id) {
    $.ajax({
        type: "get",
        url: linkserver + "aduser/getArmorial?id=" + id,
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
            bindingArmorial(data);
        }
    });
}
function bindingArmorial(data) {
    if (data.success && data.data) {
        //$(".child-form-user").remove();
        //for (var i in data.data) {
        //    var item = data.data[i];
        //    var j = parseInt(i) + 1;
        //    $("#form-armorial").append(`<div class="k child-form-user">
        //                        <span class="k t stt">`+ j + `</span>
        //                        <div class="k t main-adherer">
        //                            <span class="k t name-user">`+ item.name + `</span>
        //                            <span class="k t note-day">Ngày vào Đảng:</span>
        //                            <span class="k t note-day">` + formatDate(new Date(item.ngayvaodang)) + `</span>
        //                            <progress class="k t progress-bar" id="file" data-label="` + item.year + ` năm tuổi Đảng" max="60" value="` + item.year + `"> 70% </progress>
        //                        </div>
        //                    </div>`);
        //}
        var item = data.data;
        $('#name-sign').text(item.hotendangdung);
        //$('#time-line data-label').text()item.;
        $('#time-come').text(formatDate(new Date(item.ngayvaodangct)));
    }
}