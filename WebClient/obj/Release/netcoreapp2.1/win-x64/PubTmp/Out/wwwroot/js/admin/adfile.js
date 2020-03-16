//checkToken();
showLoading();
var fileidmain = -1;
var token = getTokenByLocal().token;
var formData = new FormData();
function toAbroad() {
    window.location.href = "/admin/abroad?id=" + fileidmain;
}
getProvinces(bindingProvinces);
//date picker
$(document).ready(function () {
    $('#datepicker-birthday, #datepicker-vaodct,#datepicker-ngayvaodoan ,#datepicker-daycmnd')
        .datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: false,
        viewMode: 'years',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
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
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
      
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    });
});

//show or hide tab family
var bolfml = false;
function changeTabFamily(obj) {
    $(obj).toggleClass("down");
    if (bolfml) {
        $("#tab-family").show(500);
        bolfml = false;
    }
    else {
        $("#tab-family").hide(500);
        bolfml = true;
    }
}
//show or hide tab bonus
var bolbonus = false;
function changeTabBonus(obj) {
    $(obj).toggleClass("down");
    if (bolbonus) {
        $("#tab-bonus").show(500);
        bolbonus = false;
    }
    else {
        $("#tab-bonus").hide(500);
        bolbonus = true;
    }
}
//show or hide tab discipline
var boldiscipline = false;
function changeTabDiscipline(obj) {
    $(obj).toggleClass("down");
    if (boldiscipline) {
        $("#tab-boldiscipline").show(500);
        boldiscipline = false;
    }
    else {
        $("#tab-boldiscipline").hide(500);
        boldiscipline = true;
    }
}
// brower picture
function getImage() {
    $("#multi-file").click();
    $("#multi-file").change(function () {
        readImageUpload(this);
    });
}
//add picture to view
function readImageUpload(input) {
    if (input.files && input.files[0]) {
        if (formData.get("avatar") != null) {
            formData.delete("avatar");
        }
        formData.append("avatar", input.files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#img-avt").css("background-image", "url(" + e.target.result + ")");
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#multi-file").val("");
}

//get dangvien by id
function getDangVien(id, callback) {
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
            callback(data);
        }
    });
}
function bindingFile(data) {
    if (data.success && data.data) {
        formData = new FormData();
        var user = data.data.user;
        $("#madv").val(user.madv);
        formData.append("usid", user.usid);
        var file = data.data.file;
        if (file) {
            fileidmain = file.fileid;
            getStudyProcess(fileidmain);
            getWorkingProcess(fileidmain);
            getFamilies(file.fileid, bindigFamilies);//get family
            getBonus(fileidmain, bindingBonus);//get bonus
            getDiscipline(fileidmain, bindingDiscipline);//discipline
            formData.append("fileid", file.fileid);
            $("#namedv").val(file.hotendangdung);

            $("#sl-giotinh option[value='" + (file.gioitinh ? 0 : 1) + "']").prop("selected", true);
            $("#sl-chb-addnew option[value='" + file.cbid + "']").prop("selected", true);
            $("#sl-title-addnew option[value='" + file.titleid + "']").prop("selected", true);

            $("#namekhaisinh").val(file.hotenkhaisinh);
            $("#namedangdung").val(file.hotendangdung);
            $("#birthday").val(formatDate(new Date(file.ngaythangnamsinh)));
            $("#sl-nation option[value='" + file.dantoc + "']").prop("selected", true);
            $("#tongiao").val(file.tongiao);
            $("#cmnd").val(file.cmnd);
            $("#noicapcmnd").val(file.noicapcmnd);
            $("#quequan").val(file.quequan);
            $("#hokhauthuongtru").val(file.hokhauthuongtru);
            $("#sl-honnhan option[value='" + (file.honnhan ? 0 : 1) + "']").prop("selected", true);
            $("#suckhoe").val(file.suckhoe);
            $("#nghenghiep").val(file.nghenghiep);
            $("#sl-org option[value='" + file.donvi + "']").prop("selected", true);
            $("#solylich").val(file.solylich);
            $("#sdt").val(file.sdt);
            $("#email").val(file.email);
            $("#ngayvaodangct").val(formatDate(new Date(file.ngayvaodangct)));
            $("#ngayvaodangdb").val(formatDate(new Date(file.ngayvaodangdb)));
            $("#ngayvaodoan").val(formatDate(new Date(file.ngayvaodoan)));
            $("#sl-trinhdovanhoa option[value='" + file.trinhdovanhoa + "']").prop("selected", true);
            $("#chuyenmon").val(file.chuyenmon);
            $("#noicutru").val(file.noicutru);
            if (file.avatar) {
                $("#img-avt").css("background-image", "url(" + linkfileuser + file.avatar + ")");
            }
            $("#name-card").text(file.card);
            $("#name-decision").text(file.decision);

            $("#sl-bangcap option[value='" + (file.bangcap ? file.bangcap : 0) + "']").prop("selected", true);
            $("#sl-liluanchinhtri option[value='" + (file.lyluanct ? file.lyluanct : 0) + "']").prop("selected", true);

            //distric/province/ward
            getDistricts(file.matp, bindingDistrict, file.maqh);
            getWard(file.maqh, bindingWard, file.xaid);
            $("#sl-province option[value='" + file.matp + "']").prop("selected", true);

        }
        else {
            $(".bnt-add-fml").hide();
            formData.append("fileid", -1);
            getDistricts('01', bindingDistrict, '');
            getWard('001', bindingWard, '');
        }
    }
    destroyLoading();
}

//get nations
getNations(bindingNations);
function getNations(callback) {
    $.ajax({
        type: "get",
        url: linkserver + "adnation/getNations",
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
function bindingNations(data) {
    if (data.success && data.data) {
        for (var i in data.data) {
            var nation = data.data[i];
            $("#sl-nation").append('<option value="' + nation.nationid + '">' + nation.name + '</option>');
        }
    }
}

//get organization
getOrganizations(bindingOrganization);
function getOrganizations(callback) {
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
function bindingOrganization(data) {
    if (data.success && data.data) {
        for (var i in data.data) {
            var og = data.data[i];
            $("#sl-org").append('<option value="' + og.ogid + '">' + og.nameog + '</option>');
        }
    }
}

//get province,district,warnd
$('#sl-province').on('change', function () {
    getDistricts(this.value, bindingDistrict, '');
});
function getProvinces(callback) {
    $.ajax({
        type: "get",
        url: linkserver + "unit/getProvince",
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
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}
function bindingProvinces(data) {
    if (data.success && data.data) {
        $("#sl-province option").remove();
        for (var i in data.data) {
            var pr = data.data[i];
            $("#sl-province").append('<option value="' + pr.matp + '">' + pr.name + '</option>');
        }
    }
}

//get district
$('#sl-district').on('change', function () {
    getWard(this.value, bindingWard, '');
});
function getDistricts(id, callback, district) {
    $.ajax({
        type: "get",
        url: linkserver + "unit/getDistrictByPrId?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data, district);
        }
    });
}
function bindingDistrict(data, district) {
    if (data.success && data.data) {
        $('#sl-district option').remove();
        for (var i in data.data) {
            var dst = data.data[i];
            $('#sl-district').append('<option value="' + dst.maqh + '">' + dst.name + '</option>');
        }
        if (district != '') {
            $("#sl-district option[value='" + district + "']").prop("selected", true);
        }
        else {
            getWard(data.data[0].maqh, bindingWard, '');
        }
    }
}

//get wards
function getWard(id, callback, ward) {
    $.ajax({
        type: "get",
        url: linkserver + "unit/getWardByDsId?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data, ward);
        }
    });
}
function bindingWard(data, ward) {
    if (data.success && data.data) {
        $('#sl-ward option').remove();
        for (var i in data.data) {
            var wa = data.data[i];
            $('#sl-ward').append('<option value="' + wa.xaid + '">' + wa.name + '</option>');
        }
        if (ward != '') {
            $("#sl-ward option[value='" + ward + "']").prop("selected", true);
        }
    }
}

//check values
$("#cmnd,#sdt").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});
function validateFile() {
    var namekhaisinh = $("#namekhaisinh").val();
    var namedangdung = $("#namedangdung").val();
    var tongiao = $("#sl-tongiao").children("option:selected").text();
    var chibo = $("#sl-chb-addnew").children("option:selected").val();
    var chucvu = $("#sl-title-addnew").children("option:selected").val();
    var cmnd = $("#cmnd").val();
    var noicapcmnd = $("#noicapcmnd").val();
    var quequan = $("#quequan").val();
    var hokhauthuongtru = $("#hokhauthuongtru").val();
    var nghenghiep = $("#nghenghiep").val();
    var sdt = $("#sdt").val();
    var email = $("#email").val();
    var chuyenmon = $("#chuyenmon").val();
    var noicutru = $("#noicutru").val();

    var checkdata = true;
    if (!checkStr(namekhaisinh)) {
        addClass('namekhaisinh');
        checkdata = false;
    }
    else {
        removeClass('namekhaisinh');
    }
    //if (!checkStr(tongiao)) {
    //    addClass('tongiao');
    //    checkdata = false;
    //}
    //else {
    //    removeClass('tongiao');
    //}
    if (cmnd.length == 9 || cmnd.length == 12) {
        removeClass('cmnd');
    }
    else {
        addClass('cmnd');
        checkdata = false;
    }
    if (!checkStr(noicapcmnd)) {
        addClass('noicapcmnd');
        checkdata = false;
    }
    else {
        removeClass('noicapcmnd');
    }
    if (!checkStr(quequan)) {
        addClass('quequan');
        checkdata = false;
    }
    else {
        removeClass('quequan');
    }
    if (!checkStr(hokhauthuongtru)) {
        addClass('hokhauthuongtru');
        checkdata = false;
    }
    else {
        removeClass('hokhauthuongtru');
    }
    if (!checkStr(noicapcmnd)) {
        addClass('noicapcmnd');
        checkdata = false;
    }
    else {
        removeClass('noicapcmnd');
    }
    if (!checkStr(namedangdung)) {
        addClass('namedangdung');
        checkdata = false;
    }
    else {
        removeClass('namedangdung');
    }
    if (!checkStr(nghenghiep)) {
        addClass('nghenghiep');
        checkdata = false;
    }
    else {
        removeClass('nghenghiep');
    }
    if (!checkStr(email)) {
        addClass('email');
        checkdata = false;
    }
    else {
        removeClass('email');
    }
    if (!checkStr(chuyenmon)) {
        addClass('chuyenmon');
        checkdata = false;
    }
    else {
        removeClass('chuyenmon');
    }
    if (!checkStr(noicutru)) {
        addClass('noicutru');
        checkdata = false;
    }
    else {
        removeClass('noicutru');
    }
    if (!checkStr(sdt) || sdt.length != 9) {
        addClass('sdt');
        checkdata = false;
    }
    else {
        removeClass('sdt');
    }
    if (checkdata == false) {
        $('#err-validate').show();
        return;
    }
    else {
        $('#err-validate').hide();
    }

    formData.append("hotenkhaisinh", namekhaisinh);
    formData.append("hotendangdung", namedangdung);
    formData.append("ngaythangnamsinh", $("#birthday").val());
    formData.append("gioitinh", parseInt($("#sl-giotinh").children("option:selected").val()));
    formData.append("dantoc", parseInt($("#sl-nation").children("option:selected").val()));
    formData.append("tongiao", tongiao);
    formData.append("cmnd", cmnd);
    formData.append("noicapcmnd", noicapcmnd);
    formData.append("daycmnd", $('#daycmnd').val());
    formData.append("quequan", quequan);
    formData.append("hokhauthuongtru", hokhauthuongtru);
    formData.append("honnhan", parseInt($("#sl-honnhan").children("option:selected").val()));
    formData.append("suckhoe", $("#suckhoe").val());
    formData.append("nghenghiep", $("#nghenghiep").val());
    formData.append("donvi", parseInt($("#sl-org").children("option:selected").val()));
    formData.append("solylich", $("#solylich").val());
    formData.append("sdt", sdt);
    formData.append("email", email);
    formData.append("ngayvaodangct", $("#ngayvaodangct").val());
    formData.append("ngayvaodangdb", $("#ngayvaodangdb").val());
    formData.append("ngayvaodoan", $("#ngayvaodoan").val());
    formData.append("trinhdovanhoa", $("#sl-trinhdovanhoa").children("option:selected").val());
    formData.append("chuyenmon", chuyenmon);
    formData.append("matp", $("#sl-province").children("option:selected").val());
    formData.append("maqh", $("#sl-district").children("option:selected").val());
    formData.append("xaid", $("#sl-ward").children("option:selected").val());
    formData.append("noicutru", noicutru);
    formData.append("bangcap", parseInt($("#sl-bangcap").children("option:selected").val()));
    formData.append("lyluanct", parseInt($("#sl-liluanchinhtri").children("option:selected").val()));
    formData.append("cbid",parseInt(chibo));
    formData.append("titleid", parseInt(chucvu));
    debugger
    updateUser();
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
//update user
var bolud = true;
function updateUser() {
    bootbox.confirm("Bạn có chắc muốn cập nhật thông tin ?",
        function (result) {
            if (result) {
                if (bolud) {
                    showLoading();
                    bolud = false;
                    $.ajax({
                        url: linkserver + "adfile/updateFile",
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        data: formData,
                        headers: { 'authorization': `Bearer ${token}` },
                        processData: false,
                        contentType: false,
                        cache: false,
                        error: function (err) {
                            destroyLoading();
                            bolud = true;
                            bootbox.alert({
                                message: "Error :" + err.message
                            });
                        },
                        success: function (data) {
                            bolud = true;
                            destroyLoading();
                            if (data.success) {
                                bootbox.alert({
                                    message: "Cập nhật thông tin thành công!",
                                    callback: function () {
                                        $(".bnt-add-fml").show();
                                        getDangVien(formData.get('usid'),bindingFile);
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
        });
}

//call item family,bonus,..

// brower the dang
function getCard() {
    $("#upload-card").click();
    $("#upload-card").change(function () {
        readCardUpload(this);
    });
}
//add picture to view
function readCardUpload(input) {
    if (input.files && input.files[0]) {
        if (formData.get("card") != null) {
            formData.delete("card");
        }
        formData.append("card", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-card").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-card").val("");
}

// brower dicision
function getDicision() {
    $("#upload-decision").click();
    $("#upload-decision").change(function () {
        readDicisionUpload(this);
    });
}
//add picture to view
function readDicisionUpload(input) {
    if (input.files && input.files[0]) {
        if (formData.get("decision") != null) {
            formData.delete("decision");
        }
        formData.append("decision", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-decision").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#upload-decision").val("");
}

//ngay vao Dang chinh thuc
function changeDay(ev) {
    alert("fasdf");
}
$(document).ready(function () {
    $('#datepicker-vaoddb').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: false,
            viewMode: 'years',
            extraFormats: false,
            stepping: 1,
            minDate: false,
            maxDate: false,
            useCurrent: true,
            collapse: true,
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
            toolbarPlacement: 'default',
            showTodayButton: false,
            showClear: false,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'auto'
            }
    }).on('dp.change', function (e) {
        var x = new Date(e.date);
        $("#ngayvaodangct").val(formatDate(new Date(x.setFullYear(x.getFullYear() + 1))));
        });
});

//get title
getTitle(bindingTitle);
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

//get all chibo
getAllChiBo(bindingChiBo);
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