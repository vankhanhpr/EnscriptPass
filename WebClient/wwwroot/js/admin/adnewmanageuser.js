var token = getTokenByLocal().token;
var formInsert = new FormData();

$("#sl-chibo").on('change', function () {
    getArmorial(bindingArmorial, parseInt(this.value));
});
$("#sl-dangbo").on('change', function () {
    getChiBoByDbId(parseInt(this.value), bindingChiBo);
});


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
            getUserByChiBo(parseInt(data.data[0].cbid));
            //getFormFileByChiBo(data.data[0].cbid, bindingFormFile);
        }
    }
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
    var cbid = parseInt($("#sl-chibo").children("option:selected").val());
    switch (key) {
        case 'huyhieu':
            $("#form-armorial").show(200);
            getUserByChiBo(cbid);
            $('.label-list-user').text('Danh sách Đảng viên');

            break;
        case 'dvdubi':
            $("#tab-user-dubi").show(200);
            getFormFileByChiBoId(cbid);
            $('.label-list-user').text('Danh sách Đảng viên dự bị');
            break;
    }
}

//xét năm tuổi đảng
function getArmorial(id,obj) {
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
            bindingArmorial(data, obj);
        }
    });
}
function bindingArmorial(data,obj) {
    if (data.success && data.data) {
        $(".item-user").css("background-color", "white");
        $(obj).css("background-color", "rgba(51,51,51,0.1");
        $('.progress-bar').remove();
        var item = data.data;
        $('#name-sign').text(item.name);
        $('#form-old-user').append('<progress class="k t progress-bar" id="time-line" data-label="' + item.year + 'năm" max="60" value=' + item.year+'> 70% </progress>');
        $('#time-come').text(formatDate(new Date(item.ngayvaodang)));
    }
}
//get danh sach ve tuoi dang 
function getUserByChiBo(id) {
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
            bindingUser(data);
        }
    });
}
function bindingUser(data) {
    if (data.success && data.data) {
        $(".item-user").remove();
        for (var i in data.data) {
            if (data.data[i].file) {
                var j = parseInt(i) + 1;
                var item = data.data[i];
               
                $("#form-list-user").append(`<div onclick="getArmorial(` + item.user.usid + `,this)" class="k row-table item-user">
                            <span class="k t item-row first-row">`+ j + `</span>
                            <span class="k t item-row scd-row">`+ item.user.madv + `</span>
                            <span class="k t item-row thr-row">
                            `+ item.file.hotendangdung + `
                            </span>
                        </div>`);
            }
        }
        if (data.data[0]) {
            getArmorial(data.data[0].user.usid);
        }
    }
}

//phần cho đảng viên dự bị
function getFormFileByChiBoId(id) {
    $.ajax({
        type: "get",
        url: linkserver + "formfile/getFormFileWidthChiBo?id=" + id,
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
            bindingFormFile1(data);
        }
    });
}
function bindingFormFile1(data) {
    if (data.success) {
        $('.item-user').remove();
        if (data.data && data.data.length>0) {
            for (var i in data.data) {
                var j = parseInt(i) + 1;
                var item = data.data[i];
                var warnig = '';
                var offset = new Date(item.ngayvaodangct) - new Date().getTime();
                if (Math.round(offset / 1000 / 60 / 60 / 24) <= 30) {
                    warnig += ' <i class="fa fa-exclamation-circle ic-plane" aria-hidden="true"></i>';
                }
                $(".no-people").hide();
                $("#form-list-user").append(`<div onclick="getOnlyFormFile(` + item.formfile.formfileid + `,this)" class="k row-table item-user">
                            <span class="k t item-row first-row">`+ j + `</span>
                            <span class="k t item-row scd-row">`+ item.madv + `</span>
                            <span class="k t item-row thr-row">
                            `+ item.hotendangdung + warnig+ `
                            </span>
                        </div>`);
               
                //$('#img-avatar').css('background-image', 'url(' + linkfileuser + item. + ')');
            }
            if (data.data[0]) {
                binddingOnlyFormFile(data.data[0]);
            }
        }
        else {
            $('#form-user-dubi').hide();
        }
    }
}
function getOnlyFormFile(id, obj) {
    $('.item-user').css('background-color', 'white');
    $(obj).css('background-color', 'rgba(51,51,51,0.1');
    $.ajax({
        type: "get",
        url: linkserver + "formfile/getOnlyFormFile?id=" + id,
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
            if (data.success) {
                binddingOnlyFormFile(data.data);
            }
        }
    });
}
function binddingOnlyFormFile(data) {
    if (data) {
        $('.time-line').remove();
        var item = data;
        $('#img-avatar').css('background-image', 'url(' + linkfileuser + item.avatar + ')');
        $('#ff-madv').text(item.madv);
        $('#ff-nameuser').text(item.hotendangdung);
        $('#ff-day-togo').text(formatDate(new Date(item.ngayvaodangdb)));
        var s = getData(item.ngayvaodangct,item.ngayvaodangdb);
        s = s < 0 ? 0 : s > 12 ? 12 : s;
        $('.progress-bar').remove();
        $('#progess-year').append(`<progress class="k t progress-bar" id="file" data-label="` + s + `tháng/12tháng" max="12" value="` + s + `"> </progress>`);
        $('#timeline-wrap').append(`<div class="time-line" id="timeline-wrap">
                                       <div id="timeline"></div>
                                        <div class="marker mfirst timeline-icon one" style= "background-color:`+ (item.formfile.giaychungnhanboiduong ? `#8cfa95` : `#536295`) + `"onclick="changeView(` + item.formfile.formfileid + `,` + item.fileid + `,'giaychungnhanboiduong',this)">
                                            `+ (item.formfile.giaychungnhanboiduong ? `<i class="fa fa-check"></i>` : `<i class="fa fa-pencil"></i>`) + `
                                        </div>
                                        <div class="marker m2 timeline-icon two" style= "background-color:`+ (item.formfile.bantukiemdiem ? `#8cfa95` : `#536295`) + `" onclick="changeView(` + item.formfile.formfileid + `,` + item.fileid + `,'bantukiemdiem',this)">
                                           `+ (item.formfile.bantukiemdiem ? `<i class="fa fa-check"></i>` : `<i class="fa fa-pencil"></i>`) + `
                                        </div>
                                        <div class="marker m3 timeline-icon three" style= "background-color:`+ (item.formfile.nhanxetnguoihd ? `#8cfa95` : `#536295`) + `"onclick="changeView(` + item.formfile.formfileid + `,` + item.fileid + `,'nhanxetnguoihd',this)">
                                           `+ (item.formfile.nhanxetnguoihd ? `<i class="fa fa-check"></i>` : `<i class="fa fa-pencil"></i>`) + `
                                        </div>
                                        <div class="marker m4 timeline-icon four" style= "background-color:`+ (item.formfile.nhanxetchibo ? `#8cfa95` : `#536295`) + `"onclick="changeView(` + item.formfile.formfileid + `,` + item.fileid + `,'nhanxetchibo',this)">
                                           `+ (item.formfile.nhanxetchibo ? `<i class="fa fa-check"></i>` : `<i class="fa fa-pencil"></i>`) + `
                                        </div>
                                        <div class="marker mlast timeline-icon five" style= "background-color:`+ (item.formfile.quydinhketnap ? `#8cfa95` : `#536295`) + `"onclick="changeView(` + item.formfile.formfileid + `,` + item.fileid + `,'quydinhketnap',this)">
                                           `+ (item.formfile.quydinhketnap ? `<i class="fa fa-check"></i>` : `<i class="fa fa-pencil"></i>`) + `
                                        </div>
                                        <input id="upload-doc" class="hidden" style="display:none" type="file" accept="image/*" multiple="">
                                    </div>`);
    }
    else {
        $('#timeline-wrap').append(`<div id="timeline-wrap">
                                                <div id="timeline"></div>
                                                <div class="marker mfirst timeline-icon one">
                                                    <i class="fa fa-check"></i>
                                                </div>
                                                <div class="marker m2 timeline-icon two" >
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                                <div class="marker m3 timeline-icon three">
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                                <div class="marker m4 timeline-icon four">
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                                <div class="marker mlast timeline-icon five">
                                                    <i class="fa fa-pencil"></i>
                                                </div>
                                                <input id="upload-doc" class="hidden" style="display:none" type="file" accept="image/*" multiple="">

                                            </div>`);
    }
}


var formData = new FormData();
var checkupdate = true;
var opt = '';
var object = new Object();
function changeView(id, fileid, option, obj) {
    if (checkupdate) {
        opt = option;
        object = obj;
        formData = new FormData();
        checkupdate = true;
        $("#upload-doc").click();
        $("#upload-doc").change(function () {
            readFileUploadDvdb(this, id, fileid, obj);
        });
    }
}
function readFileUploadDvdb(input, id, fileid, obj) {
    if (input.files && input.files[0]) {
        if (formData.get(opt) !== null) {
            formData.delete(opt);
        }
        formData.append(opt, input.files[0]);
        formData.append('formfileid', id);
        formData.append('fileid', fileid);
        var x = input.files[0];
        var reader = new FileReader();
        showLoadButton(object);
        updateFormFile(object);
    }
    $("#upload-doc").val("");
}
function updateFormFile(obj) {
    $.ajax({
        url: linkserver + "formfile/updateFormFile",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formData,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        error: function (err) {
            bootbox.alert({
                message: "Có lỗi xảy ra vui lòng thử lại sau"
            });
            destroyLoadButton();
            checkupdate = true;
        },
        success: function (data) {
            destroyLoadButton();
            checkupdate = true;
            if (data.success) {
                formData = new FormData();
                $(obj).css('background-color', '#8cfa95');
                $(obj).find('i').removeClass('fa-pencil');
                $(obj).find('i').addClass('fa-check');
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}
function showLoadButton(obj) {
    $(obj).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
}
function destroyLoadButton() {
    $('.lds-ellipsis').remove();
}
//tien trinh dang vien du bi
function getData(day,daydb) {
    var x = new Date();
    var y = new Date(day);
    var z = new Date(daydb);
    if (y.getFullYear() < x.getFullYear() || (y.getFullYear() === x.getFullYear()) && y.getMonth() < x.getMonth()){
        return 12;
    }
    if (x.getFullYear() === y.getFullYear()) {
        return 12-(y.getMonth() - x.getMonth());
    }
    else
        if (y.getFullYear() - x.getFullYear() === 1) {
            return x.getMonth() - z.getMonth();
        }
        else {
            //var total = x.getMonth() + y.getMonth();
            //for (var i = y.getFullYear() + 1; i < x.getFullYear(); i++) {
            //    total += 12;
            //}
            return 0;
        }
}