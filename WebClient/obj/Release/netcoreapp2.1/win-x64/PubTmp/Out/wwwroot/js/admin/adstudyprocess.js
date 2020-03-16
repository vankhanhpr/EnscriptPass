function saveStudyProcess(obj,studyid) {
    var starttime= $(obj).parent().parent().find('.start-time-study').val();
    var endtime = $(obj).parent().parent().find('.end-time-study').val();
    var studyprocess = $(obj).parent().parent().find('.study-process').val();
    var studyaddress = $(obj).parent().parent().find('.study-address').val();
    var typedegree = $(obj).parent().parent().find('.select-type-degree').children("option:selected").text();
    var typegraduation = $(obj).parent().parent().find('.sl-type-graduation').children("option:selected").text();
    var typeofeducation = $(obj).parent().parent().find('.sl-type-education').children("option:selected").text();
    var model = {
        'starttime': starttime,
        'endtime': endtime,
        'process': studyprocess,
        'graduationtype': typegraduation,
        'degreetype': typedegree,
        'fileid': fileidmain,
        'typeofeducation': typeofeducation,
        'adress': studyaddress,
        'studyid': studyid
    };
    var checkstudy = true;
    if (starttime.trim() == '') {
        $(obj).parent().parent().find('.start-time-study').css('border', '1px solid #ff000066');
        checkstudy = false;
    }
    if (endtime.trim() == '') {
        $(obj).parent().parent().find('.end-time-study').css('border', '1px solid #ff000066');
        checkstudy = false;
    }
    if (studyprocess.trim() == '') {
        $(obj).parent().parent().find('.study-process').css('border', '1px solid #ff000066');
        checkstudy = false;
    }
    if (studyaddress.trim() == '') {
        $(obj).parent().parent().find('.study-address').css('border', '1px solid #ff000066');
        checkstudy = false;
    }
    if (!checkstudy) {
        $.notify('Vui lòng nhập đầy đủ thông tin trước khi lưu!!', 'Error');
    }
    else {
        insertStudyProcess(model,obj);
    }
}
function resetLayout(obj) {
    $(obj).parent().parent().find('.study-address').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.study-process').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.end-time-study').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.start-time-study').css('border', '1px solid rgba(51,51,51,0.1)');
}
function insertStudyProcess(data,obj) {
    $.ajax({
        url: linkserver + "AdStudyProcess/insertStudyProcess",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { 'authorization': `Bearer ${token}` },
        async: false,
        processData: false,
        contentType: "application/json",
        error: function (err) {
            bootbox.alert({
                message: "Error :" + err.message
            });
        },
        success: function (data) {
            if (data.success) {
                $.notify('Lưu thông tin thành công', 'success');
                //getStudyProcess(fileidmain);
                $(obj).css('color', 'green');
                resetLayout(obj);
            }
            else {
                //
            }
        }
    });
}
var position = 1;
function addView() {
    position += 1;
    $('#tab-study-process').append(`<div class="k row-table item-study-process">
                <span class="k t text process-stt stt-study">`+ position +`</span>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process">
                            <input type="text" class="form-control start-time-study">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process">
                            <input type="text" class="form-control end-time-study">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <span class="k t text process-soso">
                    <input class="k dl-input-dv study-process" type="text">
                </span>
                <div class="k t text tt-small-process">
                    <input class="k dl-input-dv study-address" type="text">
                </div>
                <div class="k t text tt-small-process">
                    <select class="k sl-ft-og select-type-degree">
                        <option value="0" selected="selected">Khác</option>
                        <option value="1">Chứng chỉ</option>
                        <option value="2">Giấy CN</option>
                        <option value="2">Bằng TN</option>
                    </select>
                </div>
                <div class="k t text tt-small-process">
                    <select class="k sl-ft-og sl-type-graduation">
                        <option value="0" selected="selected">Khác</option>
                        <option value="1">Xuất sắc</option>
                        <option value="2">Giỏi</option>
                        <option value="3">Khá</option>
                        <option value="4">TB</option>
                        <option value="5">Yếu</option>
                    </select>
                </div>
                <span class="k t text process-soso">
                    <select class="k sl-ft-og sl-type-education">
                        <option value="0" selected="selected">Khác</option>
                        <option value="1">Chính quy</option>
                        <option value="2">Tại chức</option>
                        <option value="3">Liên thông</option>
                        <option value="4">Văn bằng2</option>
                    </select>
                </span>
                <span class="k t text process-stt bold">
                    <i class="fa fa-floppy-o ic-save" onclick="saveStudyProcess(this,-1)" aria-hidden="true"></i>
                    <i class="fa fa-minus-square-o ic-remove" aria-hidden="true"onclick="removeView(this,-1)"></i>
                </span>
            </div>`);
    openDatePicker();
}
//datetime picker
function openDatePicker() {
    $('.datime-process').datetimepicker({
        format: 'DD/MM/YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: false,
        collapse: true,
        defaultDate: false,
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
        viewMode: 'years',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        }
    });
}
function removeView(obj, studyid) {
    if (studyid != -1) {
        bootbox.confirm({
            message: "Bạn có chắc muốn xóa trường này không?",
            buttons: {
                confirm: {
                    label: 'Xóa',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result == true) {
                    $(obj).parent().parent().remove();
                    updateSTT();
                    deleteStudyProcess(studyid);
                }
                else {
                    return;
                }
            }
        });
    }
    else {
        $(obj).parent().parent().remove();
        updateSTT();
    }
    
}
function deleteStudyProcess(studyid) {
    $.ajax({
        type: "get",
        url: linkserver + "AdStudyProcess/deleteStudyProcess?studyid=" + studyid,
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
            return;
        },
        success: function (data) {
            $.notify('Xóa thành công', 'success');
            
        }
    });
}

function updateSTT() {
    var classList = document.getElementsByClassName('stt-study');
    for (var i = 0; i < classList.length; i++) {
        var j = parseInt(i) + 1;
        $(classList[i]).text(j);
    }
    position = classList.length;
}
var toggerstudy = false;
function tonggeTabStudyProcess(obj) {
    $(obj).toggleClass("down");
    if (toggerstudy) {
        $("#tab-study-process").show(500);
        toggerstudy = false;
    }
    else {
        $("#tab-study-process").hide(500);
        toggerstudy = true;
    }
}
//get study process
function getStudyProcess(fileid) {
    $.ajax({
        type: "get",
        url: linkserver + "AdStudyProcess/getStudyProcessByFile?fileid=" + fileid,
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
            bindingStudyProcess(data);
        }
    });
}
function bindingStudyProcess(data) {
    if (data.success) {
        $('.item-study-process').remove();
        if (data.data.length > 0) {
            for (var i in data.data) {
                var item = data.data[i];
                position += 1;
                $('#tab-study-process').append(`<div class="k row-table item-study-process">
                <span class="k t text process-stt stt-study">`+ position + `</span>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process">
                            <input type="text" value= `+ formatDate(new Date(item.studyprocess.starttime)) +` class="form-control start-time-study"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process">
                            <input type="text"value= `+ formatDate(new Date(item.studyprocess.endtime)) +` class="form-control end-time-study">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <span class="k t text process-soso">
                    <input class="k dl-input-dv study-process" value="`+ item.studyprocess.process +`" type="text">
                </span>
                <div class="k t text tt-small-process">
                    <input class="k dl-input-dv study-address"value="`+ item.studyprocess.adress +`" type="text">
                </div>
                <div class="k t text tt-small-process">
                    <select class="k sl-ft-og select-type-degree">
                        <option value="0" `+ (item.studyprocess.degreetype == 'Khác' ? 'selected':'')+`>Khác</option>
                        <option value="1"`+ (item.studyprocess.degreetype == 'Chứng chỉ' ? 'selected' : '') +`>Chứng chỉ</option>
                        <option value="2"`+ (item.studyprocess.degreetype == 'Giấy CN' ? 'selected' : '') +`>Giấy CN</option>
                        <option value="2"`+ (item.studyprocess.degreetype == 'Bằng TN' ? 'selected' : '') +`>Bằng TN</option>
                    </select>
                </div>
                <div class="k t text tt-small-process">
                    <select class="k sl-ft-og sl-type-graduation">
                        <option value="0"`+ (item.studyprocess.graduationtype == 'Khác' ? 'selected' : '') +`">Khác</option>
                        <option value="1"`+ (item.studyprocess.graduationtype == 'Xuất sắc' ? 'selected' : '') +`>Xuất sắc</option>
                        <option value="2"`+ (item.studyprocess.graduationtype == 'Giỏi' ? 'selected' : '') +`>Giỏi</option>
                        <option value="3"`+ (item.studyprocess.graduationtype == 'Khá' ? 'selected' : '') +`>Khá</option>
                        <option value="4"`+ (item.studyprocess.graduationtype == 'TB' ? 'selected' : '') +`>TB</option>
                        <option value="5"`+ (item.studyprocess.graduationtype == 'Yếu' ? 'selected' : '') +`>Yếu</option>
                    </select>
                </div>
                <span class="k t text process-soso">
                    <select class="k sl-ft-og sl-type-education">
                        <option value="0"`+ (item.studyprocess.typeofeducation == 'Khác' ? 'selected' : '') +`>Khác</option>
                        <option value="1"`+ (item.studyprocess.typeofeducation == 'Chính quy' ? 'selected' : '') +`>Chính quy</option>
                        <option value="2"`+ (item.studyprocess.typeofeducation == 'Tại chức' ? 'selected' : '') +`>Tại chức</option>
                        <option value="3"`+ (item.studyprocess.typeofeducation == 'Liên thông' ? 'selected' : '') +`>Liên thông</option>
                        <option value="4"`+ (item.studyprocess.typeofeducation == 'Văn bằng2' ? 'selected' : '') +`>Văn bằng2</option>
                    </select>
                </span>
                <span class="k t text process-stt bold">
                    <i class="fa fa-floppy-o ic-save" style="color:green" onclick="saveStudyProcess(this,`+ item.studyprocess.studyid +`)" aria-hidden="true"></i>
                    <i class="fa fa-minus-square-o ic-remove" aria-hidden="true"onclick="removeView(this,`+ item.studyprocess.studyid +`)"></i>
                </span>
            </div>`);
            }
        }
        else {
            addView();
        }
        updateSTT();
        openDatePicker();
    }
}