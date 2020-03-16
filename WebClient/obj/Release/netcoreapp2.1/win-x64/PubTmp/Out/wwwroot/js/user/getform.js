var formData = new FormData();
var token = getTokenByLocal().token;
var cbid = -1;
var id = getTokenByLocal().usid;

getInfoUser(id, bindingUserFile);
function getInfoUser(id, callback) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "file/getFileByUserId?id=" + id,
        data: null,
        dataType: 'json',
        contentType: "application/json",
        headers: { 'authorization': `Bearer ${token}` },
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
function bindingUserFile(data) {
    cbid = data.data.user.cbid;
    getForm(bindigForm, 0, cbid);
}



function getForm(callback, type, cbid) {
    $.ajax({
        type: "get",
        url: linkserver + "form/getAllForm?type=" + type + "&&cbid=" + cbid,
        data: null,
        headers: { 'authorization': `Bearer ${token}` },
        dataType: 'json',
        contentType: "application/json",
        statusCode: {
            401: function () {
                //window.location.href = "/login";
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
function bindigForm(data) {
    if (data.success && data.data) {
        for (var i in data.data) {
            var item = data.data[i];
            var j = parseInt(i) + 1;
            $("#user-form").append('<div class="k row-table item-form-detail">' +
                '<span class= "k t tt-table-dt small-row" >' + j + '</span >' +
                '<span class= "k t tt-table-dt small-row" >' + item.nameform + '</span >' +
                '<span class="k t tt-table-dt big-row">' + item.note + '</span>' +
                '<span class="k t tt-table-dt big-row">' + convertDay(new Date(item.updateday)) + '</span>' +
                '<span class="k t tt-table-dt"><a href=' + linkfiledownload + item.namefile + '>' + item.namefile + '</a></span>'  +
                '</div>' +
                '</div>');
        }
    }
}