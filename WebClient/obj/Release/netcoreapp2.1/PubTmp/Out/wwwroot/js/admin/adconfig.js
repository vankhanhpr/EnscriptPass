//var linkserver = "https://10.70.105.15:8002/api/";
//var linkfileuser = "https://10.70.105.15:8002/images/user/";
//var linkfiledownload = "https://10.70.105.15:8002/files/";
//var linkdocument = "https://10.70.105.15:8002/document/";

//var linkserver = "https://localhost:44343/api/";
//var linkfileuser = "https://localhost:44343/images/user/";
//var linkfiledownload = "https://localhost:44343/api/files/";
//var linkdocument = "https://localhost:44343/api/document/";
//var linklocal = "https://localhost:44341/";

var linkserver = "https://10.70.38.62:2001/api/";
var linkfileuser = "https://10.70.38.62:2001/images/user/";
var linkfiledownload = "https://10.70.38.62:2001/api/files/";
var linkdocument = "https://10.70.38.62:2001/api/document/";
var linklocal = "https://10.70.38.62:2001/";

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return day + "/" + month + "/" + date.getFullYear();
}
function showLoading() {
    $("body").append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
}
function destroyLoading() {
    $(".lds-ring").hide();
}
function strToObj(str) {//convert string to object
    var obj = {};
    if (str && typeof str === 'string') {
        var objStr = str.match(/\{(.)+\}/g);
        eval("obj =" + objStr);
    }
    return obj;
}
function getTokenByLocal() {
    //var token = strToObj(window.localStorage.getItem('token_session'));
    var token = strToObj(getCookie('token_session'));
    return token;
}
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
function formatNumber(yourNumber) {
    if (yourNumber) {
        var components = yourNumber.toString().split(".");
        components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return components.join(".");
    } else {
        return "";
    }
}
//change key
function changeKeyPress(obj) {
    var text = $(obj).val().toString();
    var str = formatNumber(covertToString(text));
    $(obj).val(str);
}
function covertToString(str) {
    var strint = str.replace(/,/g, '');
    return strint;
}
//logout
function signout() {
    document.cookie = "token_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/login";
}

hoverTabMenu();
function hoverTabMenu() {
    var link = window.location.href;
    var x = document.getElementsByClassName("hd-text-menu");
    switch (link) {
        case linklocal + "admin/dangbo":
            chageHoverObj(x[0]);
            break;
        case linklocal + "admin/chibo":
            chageHoverObj(x[1]);
            break;
        case linklocal + "admin/donvi":
            chageHoverObj(x[2]);
            break;
        case linklocal + "admin/dangvien":
            chageHoverObj(x[3]);
            break;
        case linklocal + "admin/form":
            chageHoverObj(x[4]);
            break;
        
        case linklocal + "admin/bonus":
            chageHoverObj(x[5]);
            break;
        case linklocal + "admin/discripline":
            chageHoverObj(x[6]);
            break;
        case linklocal + "admin/NewAbroad":
            chageHoverObj(x[7]);
            break;
        case linklocal + "admin/LivingAdherer":
            chageHoverObj(x[8]);
            break;
        case linklocal + "admin/manageuser":
            chageHoverObj(x[9]);
            break;
        case linklocal + "admin/dangvienmove":
            chageHoverObj(x[10]);
            break;
        case linklocal + "admin/finance":
            chageHoverObj(x[11]);
            break;
        case linklocal + "admin/report":
            chageHoverObj(x[12]);
            break;
    }
}
function chageHoverObj(obj) {
    $(".hd-text-menu").css("background-color", "var(--h-color-menu)");
    $(obj).css("background-color", "var(--cl-hover)");
    $(obj).css("color", "red");
    $(obj).parent().find("i").css("color", "red");
    $(obj).css("font-size", "var(--fs-hover)");
}