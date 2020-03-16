//var linkserver = "https://10.70.105.15:8002/api/";
//var linkfileuser = "https://10.70.105.15:8002/images/user/";
//var linkfiledownload = "https://10.70.105.15:8002/files/";
var linkserver = "https://localhost:44343/api/";
var linkfileuser = "https://localhost:44343/images/user/";
var linkfiledownload = "https://localhost:44343/api/files/";


var fileid = -1;
function getTokenByLocal() {
    //var token = strToObj(window.localStorage.getItem('token_session'));
    var token = strToObj(getCookie('token_session'));
    return token;
}
//getCookie('token_session');
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
function strToObj(str) {//convert string to object
    var obj = {};
    if (str && typeof str === 'string') {
        var objStr = str.match(/\{(.)+\}/g);
        eval("obj =" + objStr);
    }
    return obj;
}
function gottoFamily() {
    if (window.location.href == "/home/family") {
        return;
    }
    window.location.href = "/home/family?id=" + fileid;
}

function gottoReward() {
    if (window.location.href == "/home/reward") {
        return;
    }
    window.location.href = "/home/reward?id=" + fileid;
}

function gottoAbroad() {
    if (window.location.href == "/home/abroad") {
        return;
    }
    window.location.href = "/home/abroad?id=" + fileid;
}

function gottoDiscipline() {
    if (window.location.href == "/home/discipline") {
        return;
    }
    window.location.href = "/home/discipline?id=" + fileid;
}

function gottoForm() {
    window.location.href = '/home/form?id=' + fileid;
        return;
}

function gottoChangePassword() {
    if (window.location.href == "/home/changepassword") {
        return;
    }
    window.location.href = "/home/changepassword?id=" + fileid;
}

function changeKeyPress(obj) {
    var text = $(obj).val().toString();
    var str = formatNumber(covertToString(text));
    $(obj).val(str);
}
function covertToString(str) {
    var strint = str.replace(/,/g, '');
    return strint;
}