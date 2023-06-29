let mainUrlApi = "http://localhost:3002/";

const click_login = () => {
    let url = 'v1/auth/login';
    console.log('call loadParams:', mainUrlApi, url);
        
    let email = document.getElementById('inp_em').value;
    let password = document.getElementById('inp_pw').value;
        
    if (email.trim() === '' || password.trim() === '') {
        showAlert("ATENCION!", "Se deben completar todos los datos...");
        return;
    };
        
    let params = { em: email, pw: password };
    let headers = {
        'Content-Type': 'application/json',
        //'x-access-token': localStorage.getItem('token')
    };
        
    document.getElementById('loader').style.display = 'block';

    fetch(mainUrlApi + url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(res => {
            document.getElementById('loader').style.display = 'none';

            console.log(res.token);
            if (res.login === 'nouser') {
                showAlert("ATENCION!", "El usuario o la contraseña son incorrectos");
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('config_step', res.config_state);
                if (res.config_state >= 0 && res.config_state <= 5) {
                    localStorage.setItem('config_step', res.config_state);
                    window.location.href = 'config.html';
                } else if (res.config_state === 99) {
                    window.location.href = 'home.html';
                }
            }

            console.log('res:', res);
            console.log('tk local storage:', localStorage.getItem('token'));
        })
        .catch(err => console.log(err));
};