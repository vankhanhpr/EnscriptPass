var brid = -1;
var token = getTokenByLocal().token;
getAbroad(fileid, bindinAbroad);
function getAbroad(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "toabroad/getToabroadByFileId?id=" + id,
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
            //bootbox.alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối");
        },
        success: function (data) {
            callback(data);
        }
    });
}

function bindinAbroad(data, mode = 0) {
    if (data.success && data.data) {
        if (mode == 0) {
            for (var i in data.data) {
                var br = data.data[i];
                var j = parseInt(i) + 1;
                var htmlEditBtn = (br.accept != null && typeof br.accept != 'undefined' && br.accept == false) ? '<i class="ti-pencil" style="font-size:18px" onclick="getDetailabroad(' + br.brid + ',bindingAbroadById)"></i>' : "";
                $("#user-abroad").append('<div id="brid_' + br.brid + '" class="k row-table item-fml cnt-row">' +
                    '<span class= "k t tt-table-dt" >' + j + '</span >' +
                    '<span class="k t tt-table-dt">' + convertDay(new Date(br.thoigiandi)) + '</span>' +
                    '<span class="k t tt-table-dt">' + convertDay(new Date(br.thoigiantrove)) + '</span>' +
                    '<span class="k t tt-table-dt">' + br.noiden + '</span>' +
                    '<span class="k t tt-table-dt">' + br.lydo + '</span>' +
                    '<span class="k t tt-table-dt">' + htmlEditBtn  + '</span>'

                );
                $('form :input').val('');
            }
        } else {
            var br = data.data;
            var cnt = $('.cnt-row');
            var j = 0;
            if (cnt != null && typeof cnt != 'undefined') {
                j = cnt.length + 1;
            }

            $("#user-abroad").append('<div id="brid_' + br.brid + '" class="k row-table item-fml cnt-row">' +
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + convertDay(new Date(br.thoigiandi)) + '</span>' +
                '<span class="k t tt-table-dt">' + convertDay(new Date(br.thoigiantrove)) + '</span>' +
                '<span class="k t tt-table-dt">' + br.noiden + '</span>' +
                '<span class="k t tt-table-dt">' + br.lydo + '</span>' +
                '<span class="k t tt-table-dt">' + '<i class="ti-pencil" style="font-size:18px" onclick="getDetailabroad(' + br.brid + ',bindingAbroadById)"></i>'  + '</span>'

            );
            $('form :input').val('');
        }

    }
}




function insertabroad(data) {
    $.ajax({
        url: linkserver + "toabroad/insertToaBroad",
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
                bindinAbroad(data, 1);
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}

function CreateDataAbroad() {
    var abc = $(".mode");
    if (abc.length > 0) {
        var data = $("#user-dataxuatcanh").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["fileid"] = fileid;

        };
        insertabroad(dataArr)
    }
    else {
        var data = $("#user-dataxuatcanh").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["brid"] = brid;
            dataArr["fileid"] = fileid;
            updateabroad(dataArr);
        };
    }

}
//Update Data

function updateabroad(data) {
    $.ajax({
        url: linkserver + "toabroad/updateToaBbroad",
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
                bootbox.alert("Lưu thông tin thành công");
                var brid = data.data.brid;
                var idRow = 'brid_' + brid;
                var j = $("#" + idRow + ' >span')[0].innerText;;
                var htmlNew =
                    '<span class= "k t tt-table-dt" >'
                    + j + '</span ><span class="k t tt-table-dt">'
                    + convertDay(new Date(data.data.thoigiandi)) + '</span><span class="k t tt-table-dt">'
                    + convertDay(new Date(data.data.thoigiantrove)) + '</span><span class="k t tt-table-dt">'
                    + data.data.noiden + '</span><span class="k t tt-table-dt">'
                    + data.data.lydo +
                    '</span><span class="k t tt-table-dt"><i class="ti-pencil" style="font-size:18px" onclick="getDetailabroad('
                    + brid + ',bindingFamilyById)"></i></span>';
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

function getDetailabroad(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "toabroad/getToaBroadById?id=" + id,
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
function bindingAbroadById(data) {
    if (data.success && data.data) {
        $("#user-dataxuatcanh").removeClass("mode");
        var br = data.data;
        brid = br.brid;
        $("#user-noiden").val(br.noiden);
        $("#user-thoigiandi").val(convertDay(new Date(br.thoigiandi)));
        $("#user-thoigiantrove").val(convertDay(new Date(br.thoigiantrove)));
        $("#user-lydo").val(br.lydo);
    }
}

//Sửa ngày đi và ngày về

$(document).ready(function () {
    $('#user-thoigiandi').datetimepicker({
        minDate: getCurrentDay(),
        uiLibrary: 'bootstrap4' 
    });
});

function getCurrentDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function processUpdateUser() {
    //validate all
    //check neu con class qldv-error-require thi ko cho luu
    //Neu da remove het roi thi tien hanh lay data va luu len server
    var elemErrors = $(".qldv-error-require");
    if (elemErrors.length > 0) {
        bootbox.alert("Vui lòng kiểm tra dữ liệu nhập");
    } else {
        CreateDataAbroad();
    };
};

function validateAll() {
    var startTmp = $("#user-thoigiandi").val();
    var endTmp = $("#user-thoigiantrove").val();
    var startDt = new Date(startTmp.substring(6, 10), startTmp.substring(3, 5), startTmp.substring(0, 2));
    var endDt = new Date(endTmp.substring(6, 10), endTmp.substring(3, 5), endTmp.substring(0, 2));
    if (startDt > endDt) {
        bootbox.alert("Vui lòng kiểm tra dữ liệu nhập");
        $("#user-thoigiandi").addClass("alert-danger");
        $("#user-thoigiantrove").addClass("alert-danger");
        return;
    }
    else {
        OnchangeInput('user-noiden');
        OnchangeInput('user-thoigiandi');
        OnchangeInput('user-thoigiantrove');
        OnchangeInput('user-lydo');
        processUpdateUser();
    } 
}
