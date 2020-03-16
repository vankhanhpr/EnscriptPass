function checkRequire(txt) {
    var flagValid = false;
    if (txt != null && typeof txt != 'undefined') {
        txt = txt.trim();
        if (txt.length >= 1) {
            flagValid = true; 
        }
    }

    return flagValid;
}

function checkFormatEmail(txt) {
    var flagValid = false;
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (txt != null && typeof txt != 'undefined') {
        flagValid = regexEmail.test(txt);
    }

    return flagValid;
}
