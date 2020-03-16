
var formData = new FormData();
var token = getTokenByLocal().token;
var cbid = -1;
function getForm(callback, type, cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "adform/getAllForms?type=" + type + "&&cbid=" + cbid,
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
function bindigForm(data) {
    if (data.success && data.data) {
        $(".item-form-detail").remove();
        for (var i in data.data) {
            var item = data.data[i];
            var j = parseInt(i) + 1;
            $("#main-form-item").append('<div class="k row-table item-form-detail">' +
                '<span class= "k t tt-table-dt small-row" >' + j + '</span >' +
                '<span class= "k t tt-table-dt small-row" >' + item.formid + '</span >' +
                '<span class="k t tt-table-dt big-row">' + item.nameform +'</span>' +
                '<a href=' + linkfiledownload + item.namefile +'><span class="k t tt-table-dt">' + item.namefile +'</span></a>' +
                '<div class="k t tt-table-dt">' +
                '<i class="fa fa-cogs" data-toggle="modal" data-target="#modalupdateform"onclick="getFormById(' + item.formid + ')"></i>' +
                '<i class="fa fa-trash-o" aria-hidden="true"onclick="deleteForm(' + item.formid + ')"></i>' +
                '</div>' +
                '</div>');
        }
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
        if (formData.get("file") != null) {
            formData.delete("file");
        }
        formData.append("file", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-file").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#multi-file").val("");
}

function validateForm() {
    var nameform = $("#nameform").val();
    var noteform = $("#noteform").val();
    var checkform = true;
    if (!checkStr(nameform.trim())) {
        checkform = false;
        addClass('nameform');
    }
    else {
        removeClass('nameform');
    }
    if (!checkStr(noteform.trim())) {
        checkform = false;
        addClass('noteform');
    }
    else {
        removeClass('noteform');
    }

    if ($("#name-file").text() == "Nothing") {
        checkform = false;
        $("#name-file").css("color", "red");
    }
    else {
        $("#name-file").css("color", "#333333");
        checkform = true;
    }

    if (!checkform) {
        $("#err-insert-form").show();
        return;
    }
    else {
        $("#err-insert-form").hide();
        formData.append('nameform', nameform);
        formData.append('note', noteform);
        formData.append('cbid', cbid);
        formData.append('type', parseInt($("#filter-by").children("option:selected").val()));
        insertForm();
    }
}

function insertForm() {
    showLoading();
    $.ajax({
        url: linkserver + "adform/insertForms",
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
            bootbox.alert({
                message: "Error :" + err.message
            });
        },
        success: function (data) {
            destroyLoading();
            if (data.success) {
                bootbox.alert({
                    message: "Thêm biểu mẫu thành công!",
                    callback: function () {
                        $("#nameform").val("");
                        $("#name-file").text("");
                        $("#noteform").val("");
                        getForm(bindigForm, parseInt($("#filter-by").children("option:selected").val()), cbid);
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
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


var formDataUpdate = new FormData();
function getFormById(id) {
    $.ajax({
        type: "get",
        url: linkserver + "adform/getFormById?id="+id,
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
                formDataUpdate = new FormData();
                formDataUpdate.append('formid',item.formid);
                $("#name-form-update").val(item.nameform);
                $("#name-file-update").text(item.namefile);
                $("#name-note-update").val(item.note);
            }
        }
    });
}
// brower picture
function getImageUpdate() {
    $("#multi-file-update").click();
    $("#multi-file-update").change(function () {
        readImageUploadUpdate(this);
    });
}
//add picture to view
function readImageUploadUpdate(input) {
    if (input.files && input.files[0]) {
        if (formDataUpdate.get("file") != null) {
            formDataUpdate.delete("file");
        }
        formDataUpdate.append("file", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-file-update").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#multi-file-update").val("");
}
function validateUpdateForm() {
    var nameformupdate = $("#name-form-update").val();
    var noteform = $("#name-note-update").val();

    var checkformupdate = true;
    if (!checkStr(nameformupdate.trim())) {
        addClass('name-form-update');
        checkformupdate = false;
    }
    else {
        removeClass('name-form-update');
    }
    if (!checkStr(noteform.trim())) {
        addClass('name-note-update');
        checkformupdate = false;
    }
    else {
        removeClass('name-note-update');
    }

    if (!checkformupdate) {
        $("#err-update-form").show();
        return;
    }
    else {
        $("#err-update-form").hide();
        formDataUpdate.append('nameform', nameformupdate.trim());
        formDataUpdate.append('note', noteform.trim());
        formDataUpdate.append('cbid', cbid);
        updateForm();
    }
}
function updateForm() {
    showLoading();
    $.ajax({
        url: linkserver + "adform/updateForm",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formDataUpdate,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        error: function (err) {
            destroyLoading();
            bootbox.alert({
                message: "Error :" + err.message
            });
        },
        success: function (data) {
            bolud = true;
            destroyLoading();
            if (data.success) {
                $('#modalupdateform').modal('toggle');
                bootbox.alert({
                    message: "Cập nhật biểu mẫu thành công!",
                    callback: function () {
                        //window.location.href = "/admin/form";
                        getForm(bindigForm, parseInt($("#filter-by").children("option:selected").val()), cbid);
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}
function deleteForm(id) {
    bootbox.
        confirm("Bạn có chắc muốn xóa biểu mẫu này?",
        function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "adform/deleteForm?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        bootbox.alert({
                            message: "Xóa biểu mẫu thành công!",
                            callback: function () {
                                getForm(bindigForm, parseInt($("#filter-by").children("option:selected").val()));
                            }
                        });
                    }
                });
            }
        });
}

//filter \
$('#filter-by').on('change', function () {
    getForm(bindigForm, parseInt($("#filter-by").children("option:selected").val()),cbid);
});

//get dang bo
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
                    $("#sl-dangbo").append('<option value='+item.dbid+'>'+item.tendb+'</option>');
                }
                if (data.data[0].db) {
                    getChiBoByDbId(data.data[0].db.dbid);
                }
            }
        }
    });
}

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
            if (data.success && data.data) {
                $("#sl-chibo option").remove();
                for (var i in data.data) {
                    var item = data.data[i];
                    $("#sl-chibo").append('<option value=' + item.cbid + '>' + item.tencb + '</option>');
                }
                if (data.data[0]) {
                    cbid = data.data[0].cbid;
                    getForm(bindigForm, 0, data.data[0].cbid);
                }
            }
        }
    });
}
$('#sl-dangbo').on('change', function () {
    getChiBoByDbId(parseInt(this.value));
});
$('#sl-chibo').on('change', function () {
    getForm(bindigForm, 0, parseInt(this.value));
});

function searchForms(callback) {
    var filter = $("#search-box").val();
    $.ajax({
        type: "get",
        url: linkserver + "adform/searchForm?type=" + parseInt($("#filter-by").children("option:selected").val()) + "&&cbid=" + cbid + "&&filter=" + filter,
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