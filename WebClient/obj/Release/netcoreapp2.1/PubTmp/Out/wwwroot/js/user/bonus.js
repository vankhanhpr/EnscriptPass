var bnid = -1;
var token = getTokenByLocal().token;
getBonus(fileid, bindigBonus);
function getBonus(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "bonus/getbonus?id=" + id,
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
function bindigBonus(data, mode = 0) {
    if (data.success && data.data) {
        if (mode == 0) {
            for (var i in data.data) {
                var bn = data.data[i];
                var j = parseInt(i) + 1;
                var htmlEditBtn = (bn.accept != null && typeof bn.accept != 'undefined' && bn.accept == true) ? '<i class="ti-pencil" style="font-size:18px" onclick="getDetailBonus(' + bn.bnid + ',bindingBonusById)"></i>' + '<i class="ti-trash" style="font-size:18px" onclick="deleteBonus(' + bn.bnid + ')"></i>' : "";
                $("#user-bonus").append('<div id="bnid_' + bn.bnid + '" class="k row-table item-fml cnt-row">' +
                    '<span class= "k t tt-table-dt" >' + j + '</span >' +
                    '<span class="k t tt-table-dt">' + bn.noidung + '</span>' +
                    '<span class="k t tt-table-dt">' + convertDay(new Date(bn.daycreate)) + '</span>' +
                    '<span class="k t tt-table-dt">' + bn.donvi + '</span>' +
                    '<span class="k t tt-table-dt">' + bn.ghichu + '</span>' +
                    '<span class="k t tt-table-dt">' + htmlEditBtn + '</span>'

                );
            }
        } else {
            var bn = data.data;
            var cnt = $('.cnt-row');
            var j = 0;
            if (cnt != null && typeof cnt != 'undefined') {
                j = cnt.length + 1;
            }

            $("#user-bonus").append('<div id="bnid_' + bn.bnid + '" class="k row-table item-fml cnt-row">' +
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + bn.noidung + '</span>' +
                '<span class="k t tt-table-dt">' + convertDay(new Date(bn.daycreate)) + '</span>' +
                '<span class="k t tt-table-dt">' + bn.donvi + '</span>' +
                '<span class="k t tt-table-dt">' + bn.ghichu + '</span>' +
                '<span class="k t tt-table-dt">' + '<i class="ti-pencil" style="margin-right:35px; font-size:18px" onclick="getDetailBonus(' + bn.bnid + ',bindingBonusById)"></i>' + '<i class="ti-trash" style="font-size:18px" onclick="deleteBonus(' + bn.bnid + ')"></i>' + '</span>'

            );
        }

    }
}


function insertBonus(data) {
    $.ajax({
        url: linkserver + "bonus/insertBonus",
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
                bootbox.alert("Thêm thông tin thành công");
                bindigBonus(data, 1);
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

function CreateDataBonus() {
    var abc = $(".mode");
    if (abc.length > 0) {
        var data = $("#user-thongtinkhenthuong").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["fileid"] = fileid;

        };
        insertBonus(dataArr)
    }
    else {
        var data = $("#user-thongtinkhenthuong").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["bnid"] = bnid;
            dataArr["fileid"] = fileid;
            updateBonus(dataArr);
        };
    }

}
//Update Data

function updateBonus(data) {
    $.ajax({
        url: linkserver + "bonus/updateBonus",
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
                console.info(data.data);
                var bnid = data.data.bnid;
                var idRow = 'bnid_' + bnid;
                var j = $("#" + idRow + ' >span')[0].innerText;;
                var htmlNew =
                    '<span class= "k t tt-table-dt" >'
                    + j + '</span ><span class="k t tt-table-dt">'
                    + data.data.noidung + '</span><span class="k t tt-table-dt">'
                    + convertDay(new Date(data.data.daycreate)) + '</span><span class="k t tt-table-dt">'
                    + data.data.donvi + '</span><span class="k t tt-table-dt">'
                    + data.data.ghichu +
                    '</span><span class="k t tt-table-dt"><i class="ti-pencil" style="margin-right:35px; font-size:18px" onclick="getDetailBonus('
                    + bnid + ',bindingBonusById)"></i><i class="ti-trash" onclick="deleteBonus('
                    + bnid + ')"></i></span>';
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

function getDetailBonus(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "bonus/getBonusById?id=" + id,
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
function bindingBonusById(data) {
    if (data.success && data.data) {
        $("#user-thongtinkhenthuong").removeClass("mode");
        var bn = data.data;
        bnid = bn.bnid;
        $("#user-noidung").val(bn.noidung);
        $("#user-daycreate").val(convertDay(new Date(bn.daycreate)));
        $("#user-donvi").val(bn.donvi);
        $("#user-ghichu").val(bn.ghichu);
    }
}

//delete family

function deleteBonus(id) {
    bootbox.confirm("Bạn có chắc muốn xóa thông tin này?",
        function (result) {
            if (result) {
                $.ajax({
                    type: "get",
                    url: linkserver + "bonus/deleteBonus?id=" + id,
                    data: null,
                    headers: { 'authorization': `Bearer ${token}` },
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (err) {
                        bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
                    },
                    success: function (data) {
                        if (data.success) {
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
        bootbox.alert("Vui long kiem tra lai du lieu nhap");
    } else {
        CreateDataBonus();
    };
};

function validateAll() {
    OnchangeInput('user-noidung');
    OnchangeInput('user-daycreate');
    OnchangeInput('user-donvi');
    OnchangeInput('user-ghichu');
}

function removRecord(id) {
    var bnid = id;
    var arrayEle = $('#user-bonus >.cnt-row');
    var indexbn = $('#bnid_' + bnid).index();
    for (var i = (indexbn); i < arrayEle.length; i++) {
        var indexOld = $('#' + arrayEle[i].getAttribute("id") + ' >span')[0].innerHTML;
        var indexNew = indexOld - 1;
        $('#' + arrayEle[i].getAttribute("id") + ' >span')[0].innerHTML = indexNew;
    }
    $('#bnid_' + bnid).remove();
}
