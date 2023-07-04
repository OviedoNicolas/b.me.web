let _ttt;

function _custom_fn_alertok(e) {
    eval(e.target._fn);
    document.getElementById("alert_btn_ok").removeEventListener("click", _custom_fn_alertok);
    hideAlert();

    document.getElementById("alert_btn_cancel").removeEventListener("click", _custom_fn_alertcancel);
}
function _custom_fn_alertcancel(e) {
    eval(e.target._fn);
    document.getElementById("alert_btn_cancel").removeEventListener("click", _custom_fn_alertcancel);
    hideAlert();

    document.getElementById("alert_btn_ok").removeEventListener("click", _custom_fn_alertok);
}

function hideAlert() {
    clearTimeout(_ttt); 

    document.getElementById("Alert").style.display = "none";

    document.getElementById("alert_btn_cancel").innerHTML = "CERRAR";
    document.getElementById("alert_btn_ok").style.display = "none";
    document.getElementById("alert_btn_cancel").style.display = "inline-block";
}
function showAlert(_title, _text, _time = 0, _type = "", _but_ok = null, _but_cancel = null) {
    if (_but_ok != null) {
        document.getElementById("alert_btn_ok").innerHTML = _but_ok._label;
        document.getElementById("alert_btn_ok").style.display = "inline-block";

        document.getElementById("alert_btn_ok")._fn = _but_ok._fn;
        document.getElementById("alert_btn_ok").addEventListener("click", _custom_fn_alertok, _custom_fn_alertok );
    }
    else {
        document.getElementById("alert_btn_ok").style.display = "none";
    }
    if (_but_cancel != null) {
        if (_but_cancel._label === "") {
            document.getElementById("alert_btn_cancel").style.display = "none";
        }
        else {
            document.getElementById("alert_btn_cancel").innerHTML = _but_cancel._label;
            if (_but_cancel._fn != null) {
                document.getElementById("alert_btn_cancel")._fn = _but_cancel._fn;
                document.getElementById("alert_btn_cancel").addEventListener("click", _custom_fn_alertcancel);

                document.getElementById("alert_btn_cancel").style.display = "inline-block";
            }
        }
    }
    if (_type != "") {

    }
    document.getElementById("Alert-title").innerHTML = _title;
    document.getElementById("Alert-content").innerHTML = _text;
    document.getElementById("Alert").style.display = "block";

    if (_time > 0) {
        _ttt = setTimeout(hideAlert, _time * 1000);
    }
}

const togglePwV = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};
