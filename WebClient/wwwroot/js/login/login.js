function login() {
    showLoading();
    if (validateData()) {
        var madv = $("#t-madv").val();
        var password = $("#t-password").val();
        var data = { 'madv': madv.trim(), 'password': password.trim() };

        $.ajax({
            url: linkserver + "auth/login",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            async: true,
            processData: false,
            contentType: "application/json",
            error: function (err) {
                bol = true;
                destroyLoading();
                bootbox.alert({
                    message: "Error :" + err.message
                });
            },
            success: function (data) {
                bol = true;
                if (data.success) {
                    if (typeof (Storage) !== 'undefined') {
                        var value = { "usid": data.data.user.usid, "token": data.data.token, "roleid": data.data.user.roleid };
                        //window.localStorage.setItem("token_session", JSON.stringify(value));
                        var today = new Date();
                        var nexthour = new Date();
                        nexthour.setDate(today.getDate() + 1);

                        document.cookie = 'token_session=' + JSON.stringify(value) + ';expires =' + nexthour + '';
                        if (data.data.user.roleid === 2) {
                            window.location.href = "/admin";
                        }
                        else if (data.data.user.roleid === 1) {
                            window.location.href = "/home";
                        }
                    } else {
                        alert('Trình duyệt của bạn không được hỗ trợ!');
                    }
                }
                else {
                    bootbox.alert(data.message);
                }
                destroyLoading();
            }
        });
    }
    else {
        destroyLoading();
    }
}

function validateData() {
    var bool = true;
    var madv = $("#t-madv").val();
    var password = $("#t-password").val();

    if (madv.trim().length < 8) {
        $(".validate-err").show();
        $("#t-madv").addClass("bd-red");
        bool = false;
    }
    else {
        $("#t-madv").removeClass("bd-red");
    }
    if (password.trim().length < 6) {
        $(".validate-err").show();
        $("#t-password").addClass("bd-red");
        bool = false;
    }
    return bool;
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        login();
        return false;
    }
}