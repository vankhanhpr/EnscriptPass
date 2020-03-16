var id = getTokenByLocal().usid;
function changePassword(data) {
        $.ajax({
            url: QLDV_LINK_API + "user/changePass",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            async: true,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bol = true;
                alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bol = true;
                if (data.success) {
                    bootbox.alert("Đổi mật khẩu thành công");
                    $('form :input').val('');
                    
                }
                else {
                    bootbox.alert("Đổi mật khẩu không thành công");
                }
            }
        });
    }

function validateData() {
    var bool = true;
    var currentpass = $("#user-currentpass").val();
    var newpass = $("#user-newpass").val();
    var confirmnewpass = $("#user-confirmnewpass").val();
    if (currentpass.trim().length < 6) {
        bootbox.alert("Vui lòng điền mật khẩu cũ")
        $("#user-currentpass").addClass("alert-danger");
        return;
        bool = false;
    }
    if (newpass.trim().length < 6) {
        bootbox.alert("Vui lòng điền mật khẩu mới")
        $("#user-newpass").addClass("alert-danger");
        return;
        bool = false;
    }
    if (confirmnewpass.trim().length < 6) {
        bootbox.alert("Vui lòng xác nhận mật khẩu mới")
        $("#user-newpass").addClass("alert-danger");
        return;
        $("#user-confirmnewpass").addClass("alert-danger");
        bool = false;

    }
    if (newpass != confirmnewpass) {
        bootbox.alert("Mật khẩu mới và xác nhận mật khẩu không trùng khớp");
        return;
    }
    else {
        var data = $("#user-changepassword").serializeArray();


        if (data.length > 0) {
            var dataArr = {};
            for (var i = 0; i < data.length; i++) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            dataArr["usid"] = id;
            }
            changePassword(dataArr);
            //} else {
            //    alert("data input ko hop le");
            //}

        }

    };