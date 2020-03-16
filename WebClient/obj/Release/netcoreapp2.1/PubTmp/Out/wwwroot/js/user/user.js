
//get dangvien by id
var formData1 = new FormData();
//var tokenmodel = strToObj(getTokenByLocal());
var token = getTokenByLocal().token;
var id = getTokenByLocal().usid;
if (id != null && typeof id != 'undefined') {
    getInfoUser(id, bindingUserFile);
} else {
    window.location.href = "/login";
}

var parames = [];
parames['idSelectTp'] = "user-matp"; 
getProvinces(parames, bindingProvinces);

var parames1 = [];
parames1['idSelectNation'] = "user-dantoc";
getNations(parames1, bindingNations);

var parames2 = [];
parames2['idSelectOrganizations'] = "user-donvi";
getOrganizations1(parames2, bindingOrganizations1);

var parames3 = [];
parames3['idSelectTp'] = "user-noicap";
getProvinces(parames3, bindingProvinces);

function disableddatePicker(id) {
    //$('#' + id).datePicker('disable');
};

//get user
function getInfoUser(id, callback) {
    $.ajax({
        type: "get",
        url: QLDV_LINK_API + "file/getFileByUserId?id=" + id,
        data: null,
        dataType: 'json',
        contentType: "application/json",
        headers: { 'authorization': `Bearer ${token}` },
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
    if (data.success && data.data) {
        
        var user = data.data.user;
        $("#user-usid").val(user.usid);
        var file = data.data.file;
        if (data.data.user != null && typeof data.data.user != 'undefined') {
            if (data.data.user.accept != null && typeof data.data.user.accept != 'undefined' && data.data.user.accept == true) {
                $('#btn-save ,#browercard,#browerdecision').show();
                $(".edit-field").removeAttr("disabled");
            }
        }
        if (data.data.user) {
            var item = data.data.user;
            $("#user-madv").val(item.madv);

        }
        if (file) { 
            formData.append("fileid", file.fileid);
            fileid = file.fileid;
            getStudyProcess(fileid);
            getWorkingProcess(fileid);
            $("#user-fileid").val(file.fileid);
            $("#user-usid").val(file.usid);
            $("#user-madv").val(file.madv);
            $("#user-hotenkhaisinh").val(file.hotenkhaisinh);
            $("#user-hotendangdung").val(file.hotendangdung);
            $("#user-cmnd").val(file.cmnd);
            $("#user-hokhauthuongtru").val(file.hokhauthuongtru);
            $("#user-noicutru").val(file.noicutru);
            $("#user-nghenghiep").val(file.nghenghiep);
            $("#user-chuyenmon").val(file.chuyenmon);
            $("#user-donvi option[value='" + file.donvi + "']").prop("selected", true);
            $("#user-solylich").val(file.solylich);
            $("#user-email").val(file.email);
            $("#user-sdt").val(file.sdt);
            $("#user-suckhoe").val(file.suckhoe);
            $("#user-quequan").val(file.quequan);
            $("#user-daycmnd").val(convertDay(new Date(file.daycmnd)));
            $("#user-ngaythangnamsinh").val(convertDay(new Date(file.ngaythangnamsinh)));
            $("#user-ngayvaodangct").val(convertDay(new Date(file.ngayvaodangct)));
            $("#user-ngayvaodangdb").val(convertDay(new Date(file.ngayvaodangdb)));
            $("#user-ngayvaodoan").val(convertDay(new Date(file.ngayvaodoan)));
            $("#user-gioitinh option[value='" + (file.gioitinh ? 0 : 1) + "']").prop("selected", true);
            $("#user-honnhan option[value='" + (file.honnhan ? 0 : 1) + "']").prop("selected", true);
            $("#user-noicap option[value='" + file.matp + "']").prop("selected", true);
            $("#user-tongiao option[value='" + (file.tongiao ? file.tongiao : 0) + "']").prop("selected", true);
            $("#user-trinhdovanhoa").val(file.trinhdovanhoa);
            $("#user-bangcap option[value='" + (file.bangcap ? file.bangcap : 0) + "']").prop("selected", true);
            $("#user-lyluanct option[value='" + (file.lyluanct ? file.lyluanct : 0) + "']").prop("selected", true);
            $("#user-card").text(file.card);
            $("#user-decision").text(file.decision);
            if (file.avatar) {
                //document.getElementById('user-avatar').src = QLDV_PATH_IMAGE + file.avatar;
                $("#user-avatar").css("background-image", "url(" + QLDV_PATH_IMAGE + file.avatar + ")");
            }
            $("#user-dantoc option[value='" + file.dantoc + "']").prop("selected", true);

            //show data list TP
            //- get list TP from API
            //- append data
            getDistricts("user-maqh", file.matp, bindingDistrict, file.maqh);
            getWard(file.maqh, bindingWard, file.xaid, "user-xaid");
            $("#user-matp option[value='" + file.matp + "']").prop("selected", true);



        }
        else {
            formData1.append("fileid", -1);
        }
    };
}

//change district ,province,ward
$("#user-matp").on('change', function () {
    getDistricts("user-maqh", this.value, bindingDistrict, '');
});
$("#user-maqh").on('change', function () {
    getWard(this.value, bindingWard, '', "user-xaid");
});

//function edit() {
//    $(".edit-field").removeAttr("disabled");
//}

//UpdateUser

function updateUserInfo(formData1) {
    console.info(formData1);
    $.ajax({
        url: QLDV_LINK_API + "file/updateFile",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: formData1,
        headers: { 'authorization': `Bearer ${token}` },
        processData: false,
        contentType: false,
        cache: false,
        statusCode: {
            401: function () {
                bootbox.alert("erro 401");
            }
        },
        error: function (err) {
            bootbox.alert(err.message);
        },
        success: function (data) {
            if (data.success === true) {
                bootbox.alert("Cập nhật thông tin thành công");
            }
            else {
                bootbox.alert(data.message);
            }
        }
    });
}

//update user
//FormData


function processUpdateUser() {
    //check neu con class qldv-error-require thi ko cho luu
    //Neu da remove het roi thi tien hanh lay data va luu len server
    //$(".edit-field").prop("");
    var elemErrors = $(".qldv-error-require");
    if (elemErrors.length > 0) {
        bootbox.alert("Vui lòng kiểm tra lại dữ liệu nhập");
    } else {
        var data = $("#user-data").serializeArray();
       
        
        if (data.length > 0) {
            //var dataArr = [];
            for (var i = 0; i < data.length; i++) {
                var key = data[i]['name'];
                var val = data[i]['value'];
                formData1.append(key, val);
            }
            
            //dataArr[key] = val;

            //var dataObj = Object.assign({}, dataArr);
            //$.each(data, function (i, val) {
            //    formData.append(val.name, val.value);
            //});
            //console.info(data);
            //console.info(formData);
            updateUserInfo(formData1);
            //} else {
            //    alert("data input ko hop le");
            //}

        }

    };
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
        if (formData1.get("avatar") != null) {
            formData1.delete("avatar");
        }
        formData1.append("avatar", input.files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#user-avatar").css("background-image", "url(" + e.target.result + ")");
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#multi-file").val("");
}

function getCard() {
    $("#user-uploadcard").click();
    $("#user-uploadcard").change(function () {
        readCardUpload(this);
    });
}
//add picture to view
function readCardUpload(input) {
    if (input.files && input.files[0]) {
        if (formData1.get("card") != null) {
            formData1.delete("card");
        }
        formData1.append("card", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#user-card").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#user-uploadcard").val("");
}

 //brower dicision
function getDicision() {
    $("#user-uploaddecision").click();
    $("#user-uploaddecision").change(function () {
        readDicisionUpload(this);
    });
}
//add picture to view
function readDicisionUpload(input) {
    if (input.files && input.files[0]) {
        if (formData1.get("decision") != null) {
            formData1.delete("decision");
        }
        formData1.append("decision", input.files[0]);
        var x = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#user-decision").text(x.name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    $("#user-uploaddecision").val("");
}

function validateAll() {
    var ngaysinh = $("#user-ngaythangnamsinh").val();
    var daycmnd = $("#user-daycmnd").val();
    var startTmp = $("#user-ngayvaodangdb").val();
    var endTmp = $("#user-ngayvaodangct").val();
    var startTmp1 = $("#user-ngayvaodoan").val();
    var ngaysinhDt = new Date(ngaysinh.substring(6, 10), ngaysinh.substring(3, 5), ngaysinh.substring(0, 2));
    var ngaycapDt = new Date(daycmnd.substring(6, 10), daycmnd.substring(3, 5), daycmnd.substring(0, 2));
    var startDt = new Date(startTmp.substring(6, 10), startTmp.substring(3, 5), startTmp.substring(0, 2));
    var endDt = new Date(endTmp.substring(6, 10), endTmp.substring(3, 5), endTmp.substring(0, 2));
    var startDt1 = new Date(startTmp1.substring(6, 10), startTmp1.substring(3, 5), startTmp1.substring(0, 2));
    if (startDt > endDt && startDt1 > startDt ) {
        bootbox.alert("Vui lòng kiểm tra dữ liệu nhập");
        $("#user-ngayvaodangdb").addClass("alert-danger");
        $("#user-ngayvaodangct").addClass("alert-danger");
        $("#user-ngayvaodoan").addClass("alert-danger");
        return;
    }
    if (startDt1 > startDt) {
        bootbox.alert("Vui lòng kiểm tra dữ liệu nhập");
        $("#user-ngayvaodangdb").addClass("alert-danger");
        $("#user-ngayvaodoan").addClass("alert-danger");
        return;
    }
    if (ngaysinhDt > ngaycapDt) {
        bootbox.alert("Vui lòng kiểm tra dữ liệu nhập");
        $("#user-ngaythangnamsinh").addClass("alert-danger");
        $("#user-daycmnd").addClass("alert-danger");
        return;
    }
        else {
            OnchangeInput('user-madv');
            OnchangeInput('user-hotenkhaisinh');
            OnchangeInput('user-hotendangdung');
            OnchangeInput('user-cmnd');
            OnchangeInput('user-hokhauthuongtru');
            OnchangeInput('user-noicutru');
            OnchangeInput('user-nghenghiep');
            OnchangeInput('user-chuyenmon');
            OnchangeInput('user-donvi');
            OnchangeInput('user-email');
            OnchangeInput('user-sdt');
            OnchangeInput('user-suckhoe');
            OnchangeInput('user-quequan');
            OnchangeInput('user-nghenghiep');
            OnchangeInput('user-ngaythangnamsinh');
            OnchangeInput('user-ngayvaodangct');
            OnchangeInput('user-ngayvaodangdb');
            OnchangeInput('user-ngayvaodoan');
            OnchangeInput('user-gioitinh');
            OnchangeInput('user-honnhan');
            OnchangeInput('user-noicapcmnd');
            OnchangeInput('user-tongiao');
            OnchangeInput('user-trinhdovanhoa');
            OnchangeInput('user-ngayvaodangct');
            OnchangeInput('user-ngayvaodangdb');
            OnchangeInput('user-dantoc');
            OnchangeInput('user-maqh');
            OnchangeInput('user-xaid');
            OnchangeInput('user-matp');
            OnchangeInput('user-bangcap');
            OnchangeInput('user-lyluanct');
        processUpdateUser();
        }
    
} 

//check values
$("#user-sdt,#user-solylich,#user-cmnd").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

function validateemail() {

}