
var toggerworking = false;
function tonggeTabWorkingProcess(obj) {
    $(obj).toggleClass("down");
    if (toggerworking) {
        $("#tab-working-process").show(500);
        toggerworking = false;
    }
    else {
        $("#tab-working-process").hide(500);
        toggerworking = true;
    }
}
var pos = 1;
function addViewWorking() {
    pos+= 1;
    $('#tab-working-process').append(` <div class="k row-table item-working-process">
                <span class="k t text process-stt stt-working">`+ pos +`</span>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process-working">
                            <input type="text" class="form-control start-time-working">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process-working">
                            <input type="text" class="form-control end-time-working">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <span class="k t text process-soso">
                    <input class="k dl-input-dv working-process" type="text">
                </span>
                <div class="k t text process-soso">
                    <input class="k dl-input-dv working-address" type="text">
                </div>
                <div class="k t text tt-small-process">
                    <input class="k dl-input-dv working-title" type="text">
                </div>
                <div class="k t text tt-big-process">
                    <input class="k dl-input-dv working-organization" type="text">
                </div>
                <span class="k t text process-stt bold">
                    <i class="fa fa-floppy-o ic-save" onclick="saveWorkingProcess(this,-1)" aria-hidden="true"></i>
                    <i class="fa fa-minus-square-o ic-remove" aria-hidden="true" onclick="removeViewWorking(this,-1)"></i>
                </span>
            </div>`);
    openDatePickerWorking();
}
//datetime picker
function removeViewWorking(obj, workingid) {
    if (workingid != -1) {
        bootbox.confirm({
            message: "Bạn có chắc muốn xóa?",
            buttons: {
                confirm: {
                    label: 'Xác nhận',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    deleteWorkingProcess(workingid);
                }
            }
        });
    }
    $(obj).parent().parent().remove();
    updateSTTWorking();
}
function deleteWorkingProcess(workingid) {
    $.ajax({
        type: "get",
        url: linkserver + "AdWorkingProcess/deleteWorkingProcess?workingid=" + workingid,
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
            if (data.success) {
                $.notify('Xóa thành công', 'success');
            }
            else {
                $.notify('Xóa không thành công', 'error');
                getWorkingProcess(fileidmain);
            }
        }
    });
}
function updateSTTWorking() {
    var classList = document.getElementsByClassName('stt-working');
    for (var i = 0; i < classList.length; i++) {
        var j = parseInt(i) + 1;
        $(classList[i]).text(j);
    }
    pos = classList.length;
}

//get data from view
function saveWorkingProcess(obj,wid) {
    var starttime = $(obj).parent().parent().find('.start-time-working').val();
    var endtime = $(obj).parent().parent().find('.end-time-working').val();
    var workingprocess = $(obj).parent().parent().find('.working-process').val();
    var workingaddress = $(obj).parent().parent().find('.working-address').val();
    var title = $(obj).parent().parent().find('.working-title').val();
    var organization = $(obj).parent().parent().find('.working-organization').val();
    
    var checkworking = true;
    if (workingprocess.trim() === '') {
        $(obj).parent().parent().find('.working-process').css('border', '1px solid #ff000066');
        checkworking = false;
    }
    if (workingaddress.trim() === '') {
        $(obj).parent().parent().find('.working-address').css('border', '1px solid #ff000066');
        checkworking = false;
    }
    if (starttime.trim() === '') {
        $(obj).parent().parent().find('.start-time-working').css('border', '1px solid #ff000066');
        checkworking = false;
    }
    if (endtime.trim() === '') {
        $(obj).parent().parent().find('.end-time-working').css('border', '1px solid #ff000066');
        checkworking = false;
    }
    if (!checkworking) {
        $.notify('Vui lòng nhập đầy đủ thông tin trước khi lưu!!', 'error');
    }
    else {
        var model = {
            'starttime': starttime,
            'endtime': endtime,
            'process': workingprocess,
            'fileid': fileidmain,
            'address': workingaddress,
            'title': title,
            'workingid': wid,
            'organization': organization
        };
        insertWorkingProcess(model, obj);
    }
}

function insertWorkingProcess(data,obj) {
    $.ajax({
        url: linkserver + "AdWorkingProcess/insertWorkingProcess",
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
                $(obj).css('color', 'green');
                //getWorkingProcess(fileidmain);
                resetLayout(obj);
            }
            else {
                $.notify('Lưu thông tin không thành công', 'error');
            }
        }
    });
}
function resetLayout(obj) {
    $(obj).parent().parent().find('.working-address').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.working-process').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.end-time-working').css('border', '1px solid rgba(51,51,51,0.1)');
    $(obj).parent().parent().find('.start-time-working').css('border', '1px solid rgba(51,51,51,0.1)');
}

function getWorkingProcess(fileid) {
    $.ajax({
        type: "get",
        url: linkserver + "AdWorkingProcess/getWorkingProcessByFile?fileid=" + fileid,
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
            bindingWorkingProcess(data);
        }
    });
}
var numberworking = 0;
function bindingWorkingProcess(data) {
    if (data.success) {
        if (data.data.length > 0) {
            $('.item-working-process').remove();
            for (var i in data.data) {
                var item = data.data[i];
                numberworking += 1;
                $('#tab-working-process').append(`<div class="k row-table item-working-process">
                <span class="k t text process-stt stt-working">`+ numberworking +`</span>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process-working">
                            <input type="text" class="form-control start-time-working" value="`+ formatDate(new Date(item.process.starttime)) +`">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="k t text process-soso ">
                    <div class="form-group">
                        <div class="input-group date datime-process-working">
                            <input type="text" class="form-control end-time-working"value="`+ formatDate(new Date(item.process.endtime)) +`">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <span class="k t text process-soso">
                    <input class="k dl-input-dv working-process" type="text" value="`+ item.process.process +`">
                </span>
                <div class="k t text process-soso">
                    <input class="k dl-input-dv working-address" type="text"value="`+ item.process.address +`">
                </div>
                <div class="k t text tt-small-process">
                    <input class="k dl-input-dv working-title" type="text"value="`+ item.process.title +`">
                </div>
                <div class="k t text tt-big-process">
                    <input class="k dl-input-dv working-organization" type="text"value="`+ item.process.organization +`">
                </div>
                <span class="k t text process-stt bold">
                    <i class="fa fa-floppy-o ic-save"style="color:green" onclick="saveWorkingProcess(this,`+ item.process.workingid +`)" aria-hidden="true"></i>
                    <i class="fa fa-minus-square-o ic-remove" aria-hidden="true" onclick="removeViewWorking(this,`+ item.process.workingid +`)"></i>
                </span>
            </div>`);
            }
        }
        else {
            addViewWorking();
        }
        updateSTTWorking();
        openDatePickerWorking();
    }
}
function openDatePickerWorking() {
    $('.datime-process-working').datetimepicker({
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