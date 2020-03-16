var dsid = -1;
var token = getTokenByLocal().token;
getDiscipline(fileid, bindigDiscipline);
function getDiscipline(id, callback) {
    $.ajax({
        type: "get",
        url: linkserver + "discipline/getDiscipline?id=" + id,
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
function bindigDiscipline(data, mode = 0) {
    if (data.success && data.data) {
        if (mode == 0) {
            for (var i in data.data) {
                var ds = data.data[i];
                var j = parseInt(i) + 1;
                $("#user-discipline").append('<div id="dssid_' + ds.dsid + '" class="k row-table item-fml cnt-row">' +
                    '<span class= "k t tt-table-dt" >' + j + '</span >' +
                    '<span class="k t tt-table-dt">' + ds.noidung + '</span>' +
                    '<span class="k t tt-table-dt">' + convertDay(new Date(ds.daycreate)) + '</span>' +
                    '<span class="k t tt-table-dt">' + ds.donvi + '</span>' +
                    '<span class="k t tt-table-dt">' + ds.ghichu + '</span>' 
                );
            }
        } else {
            var ds = data.data;
            var cnt = $('.cnt-row');
            var j = 0;
            if (cnt != null && typeof cnt != 'undefined') {
                j = cnt.length + 1;
            }

            $("#user-discipline").append('<div id="dsid_' + ds.dsid + '" class="k row-table item-fml cnt-row">' +
                '<span class= "k t tt-table-dt" >' + j + '</span >' +
                '<span class="k t tt-table-dt">' + ds.noidung + '</span>' +
                '<span class="k t tt-table-dt">' + convertDay(new Date(ds.daycreate)) + '</span>' +
                '<span class="k t tt-table-dt">' + ds.donvi + '</span>' +
                '<span class="k t tt-table-dt">' + ds.ghichu + '</span>' 

            );
        }

    }
}


function insertDiscipline(data) {
    $.ajax({
        url: linkserver + "discipline/insertDiscipline",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
        contentType: "application/json",
        error: function (err) {
            alert("lỗi");
        },
        success: function (data) {
            if (data.success) {
                bindigDiscipline(data, 1);
                $('form :input').val('');
            }
            else {
                alert(data.message);
            }
        }
    });
}

function getDetailDescipline() {
    bootbox.alert("Bạn không có quyền này");
    return;
};

//function CreateDataDiscipline() {
//    var abc = $(".mode");
//    if (abc.length > 0) {
//        var data = $("#user-thongtinkiluat").serializeArray();


//        if (data.length > 0) {
//            var dataArr = {};
//            for (var i = 0; i < data.length; i++) {
//                dataArr[data[i]['name']] = data[i]['value'];
//            }
//            dataArr["fileid"] = fileid;

//        };
//        insertDiscipline(dataArr)
//    }
//    else {
//        var data = $("#user-thongtinkiluat").serializeArray();


//        if (data.length > 0) {
//            var dataArr = {};
//            for (var i = 0; i < data.length; i++) {
//                dataArr[data[i]['name']] = data[i]['value'];
//            }
//            dataArr["dsid"] = dsid;
//            dataArr["fileid"] = fileid;
//            updateDiscipline(dataArr);
//        };
//    }

//}
//Update Data

//function updateDiscipline(data) {
//    $.ajax({
//        url: linkserver + "discipline/updateDiscipline",
//        type: 'POST',
//        dataType: 'json',
//        data: JSON.stringify(data),
//        headers: { 'authorization': `Bearer ${token}` },
//        async: false,
//        processData: false,
//        contentType: "application/json",
//        error: function (err) {
//            alert("lỗi");
//        },
//        success: function (data) {

//            if (data.success) {
//                console.info(data.data);
//                var dsid = data.data.dsid;
//                var idRow = 'dsid_' + dsid;
//                var j = $("#" + idRow + ' >span')[0].innerText;;
//                var htmlNew =
//                    '<span class= "k t tt-table-dt" >'
//                    + j + '</span ><span class="k t tt-table-dt">'
//                    + data.data.noidung + '</span><span class="k t tt-table-dt">'
//                    + convertDay(new Date(data.data.daycreate)) + '</span><span class="k t tt-table-dt">'
//                    + data.data.donvi + '</span><span class="k t tt-table-dt">'
//                    + data.data.ghichu +
//                    '</span><span class="k t tt-table-dt"><i class="ti-pencil" onclick="getDetailDiscipline('
//                    + dsid + ',bindingDisciplineById)"></i></span>';
//                $("#" + idRow).html("");
//                $("#" + idRow).html(htmlNew);
//                $('form :input').val('');

//            }
//            else {
//                alert(data.message);
//            }
//        }
//    });
//}

//function getDetailDiscipline(id, callback) {
//    $.ajax({
//        type: "get",
//        url: linkserver + "discipline/getDisciplineById?id=" + id,
//        data: null,
//        headers: { 'authorization': `Bearer ${token}` },
//        dataType: 'json',
//        contentType: "application/json",
//        error: function (err) {
//            alert(err.message);
//        },
//        success: function (data) {
//            callback(data);

//        }
//    });
//}
//function bindingDisciplineById(data) {
//    if (data.success && data.data) {
//        $("#user-thongtinkiluat").removeClass("mode");
//        var ds = data.data;
//        dsid = ds.dsid;
//        $("#user-noidungkiluat").val(ds.noidung);
//        $("#user-daycreatekiluat").val(convertDay(new Date(ds.daycreate)));
//        $("#user-donvikiluat").val(ds.donvi);
//        $("#user-ghichukiluat").val(ds.ghichu);
//    }
//}

//delete family



