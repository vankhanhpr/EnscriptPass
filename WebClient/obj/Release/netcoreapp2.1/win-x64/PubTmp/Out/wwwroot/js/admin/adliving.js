var token = getTokenByLocal().token;
var formData1 = new FormData();
var formDataUpdate = new FormData();
var livid = -1;
var cbid = -1;
function getImage() {
    $("#select-file-insert").click();
    $("#select-file-insert").change(function () {
        readImageUpload(this);
    });
}
//add picture to view
function readImageUpload(input) {
    if (input.files && input.files[0]) {
        if (formData1.get("file") != null) {
            formData1.delete("file");
        }
        formData1.append("file", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-file").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#multi-file").val("");
}

$(document).ready(function () {
    $('#datepicker-add-new, #datetime-update')
        .datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate: false,
            viewMode: 'months',
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

function validateAdhererLiving() {
    var title = $("#title").val();
    var time = $("#time-living").val();
    var note = $("#note").val();
    var checkinsert = true;
    if (checkStr(title.trim())) {
        removeClass('title');
    }
    else {
        checkinsert = false;
        addClass('title');
    }
    if (checkStr(note.trim())) {
        removeClass('note');
    }
    else {
        checkinsert = false;
        addClass('note');
    }
    if (checkinsert) {
        $('#err-validate').hide();
        formData1.append('title', title.trim());
        formData1.append('note', note.trim());
        formData1.append('dayevent', time);
        formData1.append('cbid', parseInt($("#sl-chibo").children("option:selected").val()));
        if (cbid === -1) {
            bootbox.alert("Vui lòng lựa chọn Chi bộ trước khi thêm mới");
            return;
        }
        insertAhdererLiving(formData1);

    }
    else {
        $('#err-validate').show();
        return;
    }
}
function insertAhdererLiving(data) {
    $.ajax({
        url: linkserver + "AdhererLiving/insertAdhererLiving",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: data,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        error: function (err) {
            bootbox.alert({
                message: "Error :" + err.message
            });
            console.log(err);
        },
        success: function (data) {
            if (data.success) {
                $('#modal-add-living').modal('toggle');
                bootbox.alert({
                    message: "Thêm thông tin thành công!",
                    callback: function () {
                        emptyForm();
                        getAllLivingAhderer(bindingAdherer,cbid);
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}

function emptyForm() {
    $("#title").val('');
    $("#time-living").val('');
    $("#note").val('');
    $("#name-file").text('');
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

function getAllLivingAhderer(callback,cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "AdhererLiving/getAllAdhererLiving?cbid=" + cbid,
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
function bindingAdherer(data) {
    if (data.success && data.data) {
        $(".item-form-detail").remove();
        for (var i in data.data) {
            var item = data.data[i];
            var j = parseInt(i) + 1;
            $('#body-item').append(`<div class="k row-table item-form-detail">
                <span class="k t tt-table-dt small-row">`+j+`</span>
                <span class="k t tt-table-dt small-row">`+ formatDate(new Date(item.dayevent))+`</span>
                <span class="k t tt-table-dt big-row">`+ item.title+`</span>
                <a href="`+ linkdocument + item.namefile +`">
                    <span class="k t tt-table-dt">`+ item.namefile +`</span>
                </a>
                <div class="k t tt-table-dt">
                    <i class="fa fa-cogs" data-toggle="modal" title="Cập nhật" data-target="#modal-update-living" onclick="getAdhererLivingById(` + item.livid + `)"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"title="Xóa" onclick="deletelivingAdherer(` + item.livid + `)"></i>
                </div>
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

function deletelivingAdherer(id) {
    bootbox.confirm({
        message: "Bạn có chắc muốn xóa?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "AdhererLiving/deleteAdhererLiving?id=" + id,
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
                            message: "Xóa thông tin thành công!",
                            callback: function () {
                                getAllLivingAhderer(bindingAdherer);
                            }
                        });
                    }
                });
            }
        }
    });  
}

function getAdhererLivingById(id) {
    formDataUpdate = new FormData();
    $.ajax({
        type: "get",
        url: linkserver + "AdhererLiving/getAllAdhererLivingById?id="+id,
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
                var item = data.data;
                livid = item.livid;
                $("#title-living").val(item.title);
                $("#time-update").val(formatDate(new Date(item.dayevent)));
                $("#note-update").val(item.note);
                $("#name-file-update").text(item.namefiel);
            }
        }
    });
}
function showFormAddNew() {
    formData = new FormData();
}
function validateFormUpdate() {
    var title = $("#title-living").val();
    var time = $("#time-update").val();
    var note = $("#note-update").val();

    var checkupdate = true;
    if (checkStr(title.trim())) {
        removeClass("title-living");
    }
    else {
        addClass("title-living");
        checkupdate = false;
    }
    if (checkStr(note.trim())) {
        removeClass("note-update");
    }
    else {
        addClass("note-update");
        checkupdate = false;
    }
    if (!checkupdate) {
        $("#err-update-discipline").show();
    }
    else {
        $("#err-update-discipline").hide();
        formDataUpdate.append('title', title);
        formDataUpdate.append('note', note);
        formDataUpdate.append('dayevent', time);
        formDataUpdate.append('livid', livid);
        updateAdhererLiving();
    }
}
function updateAdhererLiving() {
    $.ajax({
        url: linkserver + "AdhererLiving/updateAdhererLiving",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formDataUpdate,
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
                $('#modal-update-living').modal('toggle');
                bootbox.alert({
                    message: "Cập nhật thông tin thành công!",
                    callback: function () {
                        getAllLivingAhderer(bindingAdherer,cbid);
                    }
                });
            }
            else {
                bootbox.alert("Có lỗi xảy ra vui lòng kiểm tra lại thông tin!");
            }
        }
    });
}

//select new file
function getImageUpdate() {
    $("#select-file-update").click();
    $("#select-file-update").change(function () {
        readImageUploadUpdate(this);
    });
}
//add picture to view
function readImageUploadUpdate(input) {
    if (input.files && input.files[0]) {
        if (formDataUpdate.get("file") !== null) {
            formData.delete("file");
        }
        formDataUpdate.append("file", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#name-file-update").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#select-file-update").val("");
}

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
                if (data.data[0]) {
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
                    $("#sl-chibo").append('<option value='+item.cbid+'>'+item.tencb+'</option>');
                }
                if (data.data[0]) {
                    cbid = data.data[0].cbid;
                    getAllLivingAhderer(bindingAdherer, cbid);
                }
                else {
                    cbid = -1;
                }
            }
        }
    });
}

$('#sl-dangbo').on('change', function () {
    getChiBoByDbId(parseInt(this.value));
});
$('#sl-chibo').on('change', function () {
    cbid = parseInt(this.value)
    getAllLivingAhderer(bindingAdherer, parseInt(this.value));
});