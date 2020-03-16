var token = getTokenByLocal().token;
getAllOganizatio(bindingOrganization);
var active = 0;
var ogid = 0;
$('#dv-sl-act-ud').on('change', function () {
    active = parseInt(this.value);
});
function getAllOganizatio(callback) {
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
            callback(data);
        }
    });
}
function bindingOrganization(data) {
    $(".row-table-it").remove();
    if (data.success && data.data.length > 0) {
        for (var i in data.data) {
            var item = data.data[i];
            $("#f-add-it-dv").append('<div class="k row-table-it">' +
                '<span class= "k t tt-table-it" >' + item.nameog + '</span>' +
                '<span class="k t tt-table-it">' + (item.active === true ? '<i class="fa fa-toggle-on" aria-hidden="true"></i> Hoạt động' :'<i class="fa fa-toggle-off" aria-hidden="true"></i> Khóa') + '</span>' +
                '<div class="k t tt-table-it">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdatedonvi" onclick="getDetailOg(' + item.ogid + ')"></i>' +
                '</div>' +
                '</div>');
        }
    }
}

//insert organization
function insertOrganization() {
    var nameog = $("#t-name-og").val();
    if (nameog.trim() == '') {
        $("#t-name-og").css("border", "1px solid #ff00004a");
        return;
    }
    else {
        $("#t-name-og").css("border", "1px solid rgba(51,51,51,0.1)");
    }
    var data = { 'nameog': nameog, active: 0 };
    var bol = true;
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "adorganization/insertOrganization",
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
                    $('#modaladddonvi').modal('toggle');
                    bootbox.alert({
                        message: "Thêm Đơn vị thành công!",
                        callback: function () {
                            $("#t-name-og").val("");
                            getAllOganizatio(bindingOrganization);
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

function getDetailOg(id) {
    ogid = id;
    $.ajax({
        type: "get",
        url: linkserver + "AdOrganization/getOgById?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            if (data.success && data.data) {
                $("#dv-sl-act-ud option[value='" + (data.data.active === true ?0 :1) + "']").prop("selected", true);
                $("#t-name-og-ud").val(data.data.nameog);
            }
        }
    });
}

//update organization

function updateOrganization() {
    $("#bnt-ud-og").hide();
    //$("#bnt-ud").text("Loading");
    var name = $("#t-name-og-ud").val();
    if (name.trim() == '') {
        $("#t-name-og-ud").css("border", "1px solid #ff00004a");
        return;
    }
    else {
        $("#t-name-og-ud").css("border", "1px solid rgba(51,51,51,0.1)");
    }
    var data = { 'nameog': name, 'active': active, 'ogid': ogid };
    var bol = true;
    if (bol) {
        bol = false;
        $.ajax({
            url: linkserver + "adorganization/updateOrganization",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bol = true;
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bol = true;
                if (data.success) {
                    $('#modalupdatedonvi').modal('toggle');
                    bootbox.alert({
                        message: "Cập nhật Đơn vị thành công!",
                        callback: function () {
                            getAllOganizatio(bindingOrganization);
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

function searchOriganization(callback) {
    var filter = $("#search-box").val();
    $.ajax({
        type: "get",
        url: linkserver + "AdOrganization/searchOriganization?filter=" + filter,
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