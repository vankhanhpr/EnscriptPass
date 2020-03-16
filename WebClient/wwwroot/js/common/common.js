function showLoading() {
    
}
function destroyLoading() {
    
}

function convertDay(date) {
    var dayFormat = "";

    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    dayFormat= day + "/" + month + "/" + date.getFullYear();
    return dayFormat;
}


function initChangeDiaChi(idSelectTp, idSelectQh) {
    $("#" + idSelectTp).on('change', function () {
        getDistricts(this.value, bindingDistrict, '');
    });
    $("#" + idSelectQh).on('change', function () {
        getWard(this.value, bindingWard, '');
    });
}

//get province,district,warnd
function getProvinces(param,callback) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "unit/getProvince",
        data: null,
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            param['data'] = data;
            callback(param);
        }
    });
}
function bindingProvinces(param) {
    var idSelectTp = param['idSelectTp'];
    var data = param['data'];
    if (data.success && data.data) {
        $("#" + idSelectTp +" option").remove();
        for (var i in data.data) {
            var pr = data.data[i];
            $("#" + idSelectTp).append('<option value="' + pr.matp + '">' + pr.name + '</option>');
        }
    }
}
//get district

function getDistricts(idSelectQh, id, callback, district) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "unit/getDistrictByPrId?id=" + id,
        data: null,
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(idSelectQh, data, district);
        }
    });
}
function bindingDistrict(idSelectQh, data, district) {
    if (data.success && data.data) {
        $("#" + idSelectQh + " option").remove();
        for (var i in data.data) {
            var dst = data.data[i];
            $("#" + idSelectQh).append('<option value="' + dst.maqh + '">' + dst.name + '</option>');
        }
        if (district != '') {
            $("#" + idSelectQh + " option[value='" + district + "']").prop("selected", true);
        }
        else {
            var districtTmp = data.data[0].maqh;
            $("#" + idSelectQh + " option[value='" + districtTmp + "']").prop("selected", true);
            getWard(districtTmp, bindingWard, '',"user-xaid");
        }
    }
}

//get wards
function getWard(id, callback, ward, idSelectXa) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "unit/getWardByDsId?id=" + id,
        data: null,
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            // bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(idSelectXa, data, ward);
        }
    });
}
function bindingWard(idSelectXa,data, ward) {
    if (data.success && data.data) {
        $("#" + idSelectXa + " option").remove();
        for (var i in data.data) {
            var wa = data.data[i];
            $("#" + idSelectXa).append('<option value="' + wa.xaid + '">' + wa.name + '</option>');
        }
        if (ward != '') {
            $("#" + idSelectXa + " option[value='" + ward + "']").prop("selected", true);
        }
    }
}

function getNations(param,callback) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "nation/getNations",
        data: null,
        dataType: 'json',
        contentType: "application/json",
        headers: { 'authorization': `Bearer ${token}` },
        error: function (err) {
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            param['data'] = data;
            callback(param);
        }
    });
}


function bindingNations(param) {
    var idSelectNation = param['idSelectNation'];
    var data = param['data'];
    if (data.success && data.data) {
        $("#" + idSelectNation + " option").remove();
        for (var i in data.data) {
            var nation = data.data[i];
            $("#" + idSelectNation).append('<option value="' + nation.nationid + '">' + nation.name + '</option>');
        }
    }
}

function getOrganizations1(param, callback) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "Organization/getAllOrg",
        data: null,
        dataType: 'json',
        contentType: "application/json",
        headers: { 'authorization': `Bearer ${token}` },
        error: function (err) {
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            param['data'] = data;
            callback(param);
        }
    });
}


function bindingOrganizations1(param) {
    var idSelectOrganizations = param['idSelectOrganizations'];
    var data = param['data'];
    if (data.success && data.data) {
        $("#" + idSelectOrganizations + " option").remove();
        for (var i in data.data) {
            var Organizations1 = data.data[i];
            $("#" + idSelectOrganizations).append('<option value="' + Organizations1.ogid + '">' + Organizations1.nameog + '</option>');
        }
    }
}


function logOut() {
    document.cookie = "token_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/login";
}

function OnchangeInput(idElement) {
    var txt = $("#" + idElement).val();
    if (checkRequire(txt)) {
        if ($("#" + idElement).hasClass("email-field")) {
            //==START:check email==
            if (checkFormatEmail(txt)) {
                //remove class error
                if ($("#" + idElement).hasClass("qldv-error-require")) {
                    $("#" + idElement).removeClass("qldv-error-require")
                }
                if ($("#" + idElement).hasClass("alert-danger")) {
                    $("#" + idElement).removeClass("alert-danger")
                }
            } else {
                //add class error
                if (!$("#" + idElement).hasClass("qldv-error-require")) {
                    $("#" + idElement).addClass("qldv-error-require")
                    $("#" + idElement).addClass("alert-danger")
                }
            }
            //==END:check email==
        } else {
            //remove class error
            if ($("#" + idElement).hasClass("qldv-error-require")) {
                $("#" + idElement).removeClass("qldv-error-require")
            }
            if ($("#" + idElement).hasClass("alert-danger")) {
                $("#" + idElement).removeClass("alert-danger")
            }
        }
    } else {
        //add class error
        if (!$("#" + idElement).hasClass("qldv-error-require")) {
            $("#" + idElement).addClass("qldv-error-require")
            $("#" + idElement).addClass("alert-danger")
        }
    }
}

