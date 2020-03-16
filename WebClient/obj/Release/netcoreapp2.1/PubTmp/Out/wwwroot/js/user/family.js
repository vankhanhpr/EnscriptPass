var fmlid = -1;
var token = getTokenByLocal().token;
var usid = getTokenByLocal().usid;
getFamilies(fileid, bindigFamilies);
function getFamilies(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "family/getFamilies?fileid=" + id,
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
function bindigFamilies(data, mode = 0) {
    if (data.success && data.data) {
        if (mode == 0) {
            for (var i in data.data) {
                var fml = data.data[i];
                var j = parseInt(i) + 1;
                $("#user-family").append('<div id="fmlid_' + fml.fmlid + '" class="k row-table item-fml cnt-row">' +
                    '<span class= "k t tt-table-dt" >' + j + '</span >' +
                    '<span class="k t tt-table-dt">' + fml.name + '</span>' +
                    '<span class="k t tt-table-dt">' + fml.quanhe + '</span>' +
                    '<span class="k t tt-table-dt">' + fml.nghenghiep + '</span>' +
                    '<span class="k t tt-table-dt">' + fml.lichsuchinhtri + '</span>' +
                    '<span class="k t tt-table-dt">' + '<i class="ti-pencil" style="margin-right:35px; font-size:18px" onclick="getDetailFml(' + fml.fmlid + ',bindingFamilyById)"></i>' + '<i class="ti-trash" style="font-size:18px" onclick="deleteFml(' + fml.fmlid + ')"></i>' + '</span>'

                );
            }
        } else {
            var fml = data.data;
            var cnt = $('.cnt-row');
            var j = 0;
            if (cnt != null && typeof cnt != 'undefined') {
                j = cnt.length + 1;
            }
            
            $("#user-family").append('<div id="fmlid_' + fml.fmlid + '" class="k row-table item-fml cnt-row">' +
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + fml.name + '</span>' +
                '<span class="k t tt-table-dt">' + fml.quanhe + '</span>' +
                '<span class="k t tt-table-dt">' + fml.nghenghiep + '</span>' +
                '<span class="k t tt-table-dt">' + fml.lichsuchinhtri + '</span>' +
                '<span class="k t tt-table-dt">' + '<i class="ti-pencil" style="margin-right:35px; font-size:18px"  onclick="getDetailFml(' + fml.fmlid + ',bindingFamilyById)"></i>' + '<i class="ti-trash" style="font-size:18px" onclick="deleteFml(' + fml.fmlid + ')"></i>' + '</span>'

            );
        }
        
    }
}


function insertFml(data) {
    $.ajax({
        url: linkserver + "Family/insertFamily",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
        contentType: "application/json",
        error: function (err) {
            bootbox.alert("Thêm thất bại");
        },
        success: function (data) {
            if (data.success) {
                bootbox.alert("Thêm thông tin thành công");
                bindigFamilies(data, 1);
                $('form :input').val('');
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}

function onEditFml(id, callback) {

};

function CreateDataFamily() {
    var abc = $(".mode");
    if (abc.length > 0) {
        var data = $("#user-datanguoithan").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["fileid"] = fileid;
            dataArr["hoancanhkinhte"] = '';

        };
        insertFml(dataArr)
    }
    else {
        var data = $("#user-datanguoithan").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["fmlid"] = fmlid;
            dataArr["fileid"] = fileid;
            dataArr["hoancanhkinhte"] = '';
            updateFml(dataArr);
        };
    }
  
}
//Update Data

function updateFml(data) {
        $.ajax({
            url: linkserver + "family/updateFamily",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { 'authorization': `Bearer ${token}` },
            async: false,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bootbox.alert("lỗi");
            },
            success: function (data) {
                
                if (data.success) {
                    bootbox.alert("Cập nhật thành công");
                    var fmlid = data.data.fmlid;
                    var idRow = 'fmlid_' + fmlid;
                    var j = $("#" + idRow + ' >span')[0].innerText;;
                    var htmlNew =
                        '<span class= "k t tt-table-dt" >'
                        + j + '</span ><span class="k t tt-table-dt">'
                        + data.data.name + '</span><span class="k t tt-table-dt">'
                        + data.data.quanhe + '</span><span class="k t tt-table-dt">'
                        + data.data.nghenghiep + '</span><span class="k t tt-table-dt">'
                        + data.data.lichsuchinhtri +
                        '</span><span class="k t tt-table-dt"><i class="ti-pencil" style="margin-right:35px" onclick="getDetailFml('
                        + fmlid + ',bindingFamilyById)"></i><i class="ti-trash" onclick="deleteFml('
                        + fmlid + ')"></i></span>';
                    $("#" + idRow).html("");
                    $("#" + idRow).html(htmlNew);
                    $('form :input').val('');
                    
                }
                else {
                    bootbox.alert(data.message);
                }
            }
        });
}

function getDetailFml(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "family/getFmlById?id=" + id,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        error: function (err) {
            bootbox.alert(err.message);
        },
        success: function (data) {
            callback(data);
            
        }
    });
}
function bindingFamilyById(data) {
    if (data.success && data.data) {
        $("#user-datanguoithan").removeClass("mode");
        var fml = data.data;
        fmlid = fml.fmlid;
        $("#user-hotennguoithan").val(fml.name);
        $("#user-quanhenguoithan option[value='" + fml.quanhe + "']").prop("selected", true);
        $("#user-nghenghiepnguoithan").val(fml.nghenghiep);
        $("#user-lichsuchinhtri").val(fml.lichsuchinhtri);
        $("#user-ngaysinh").val(convertDay(new Date(fml.birthday)));
    }
}

//delete family

function deleteFml(id) {
    bootbox.confirm("Bạn có chắc muốn xóa thông tin này?",
        function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "family/deleteFml?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        if (data.success) {
                            bootbox.alert("Xóa thành công");
                            removRecord(id);

                        }
                        else {
                            bootbox.alert(data.message);
                        }
                    }
                });
            }
        });
                
}

function processUpdateUser() {
    //validate all
    validateAll();
    //check neu con class qldv-error-require thi ko cho luu
    //Neu da remove het roi thi tien hanh lay data va luu len server
    var elemErrors = $(".qldv-error-require");
    if (elemErrors.length > 0) {
        bootbox.alert("Vui lòng kiểm tra lại dữ liệu nhập");
    } else {
        CreateDataFamily();
    };
};

function validateAll() {
    OnchangeInput('user-hotennguoithan');
    OnchangeInput('user-quanhenguoithan');
    OnchangeInput('user-nghenghiepnguoithan');
    OnchangeInput('user-ngaysinh');
    OnchangeInput('user-lichsuchinhtri');
}


function removRecord(id) {
    var fmlid = id;
    var arrayEle = $('#user-family >.cnt-row');
    var indexfml = $('#fmlid_' + fmlid).index();
    for (var i = (indexfml); i < arrayEle.length; i++) {
        var indexOld = $('#' + arrayEle[i].getAttribute("id") + ' >span')[0].innerHTML;
        var indexNew = indexOld - 1;
        $('#' + arrayEle[i].getAttribute("id") + ' >span')[0].innerHTML = indexNew;
    }
    $('#fmlid_' + fmlid).remove();
}