let mainUrlApi = "http://localhost:3002/";

const click_registro = () =>{
    let url = 'v1/auth/register';

    let ape = document.getElementById('inp_ape').value;
    let nom = document.getElementById('inp_nom').value;
    let em = document.getElementById('inp_em').value;
    let pw = document.getElementById('inp_pw').value;
    let cpw = document.getElementById('inp_cpw').value;

    if (ape.trim() === '' || nom.trim() === ''|| em.trim() === ''|| pw.trim() === ''|| cpw.trim() === '') {
        showAlert("ATENCION!", "Se deben completar todos los datos...");
        return;
    }

    if (pw.trim() !== cpw.trim()) {
        showAlert("ATENCION!", "Constraseña incorrecta");
        return;
    }

    let params = { 
        ape : ape,
        nom : nom,        
        em: em,
        pw: pw
    };
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
            console.log(res)
        })
        .catch(err => console.log(err));
};