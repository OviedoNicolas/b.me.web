let mainUrlApi = "http://localhost:3002/";
let mainData = []

const guardarPaso = (paso) => {
    localStorage.setItem('config_step', paso);
};

const obtenerPaso = () => {
    return localStorage.getItem('config_step');
};

const mostrarPasoActual = () =>{
    let config_step = obtenerPaso();
    let pasos = document.getElementsByClassName('config__pasos');
    
    for (let i = 0; i < pasos.length; i++) {
        pasos[i].classList.add('hidden');
    };
    
    if (config_step) {
        const pasoActual = document.getElementById(`paso${config_step}`);
        if (pasoActual) {
            pasoActual.classList.remove('hidden');
        };
    };
};

const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');

let valorDefecto = '';

nameInput.addEventListener('input', () => {
    const nameValue = nameInput.value.trim();
    const nameTienda = nameValue.replace(/\s+/g, ''); 
    const urlTienda = 'beauting.me/' + nameTienda;
    urlInput.value = urlTienda;
    
    if (nameValue === '') {
        urlInput.value = '';
    }
});

nameInput.addEventListener('blur', () => {
    if (nameInput.value === '') {
        nameInput.value = valorDefecto;
    }
});


const crearTienda = () =>{
    let urlApi = 'v1/config/step1';

    let marca = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    let whatsapp = document.getElementById('what').value;
    let address = document.getElementById('address').value;
    let floor = document.getElementById('floor').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

    if (marca.trim() === '' || url.trim() === ''|| whatsapp.trim() === ''|| address.trim() === ''|| floor.trim() === ''|| city.trim() === ''|| state.trim() === '') {
        showAlert("ATENCION!", "Se deben completar todos los datos...");
        return;
    };

    let params = { 
        name: marca,
        url: url,
        what: whatsapp,
        address: address,
        floor: floor,
        city: city,
        state: state,
    };
    let headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    };

    fetch(mainUrlApi + urlApi, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const diasContainer = document.querySelector('.dias__container');
const divs = diasContainer.querySelectorAll('div');
const agendaContainer = document.querySelector('.agenda__container');

divs.forEach((div) => {
    div.addEventListener('click', () => {
        divs.forEach((div) => div.classList.remove('select'));
        div.classList.add('select');
        const leftValue = div.getAttribute('data-left');
        agendaContainer.style.setProperty('--left-value', leftValue + '%');
    });
});

const categoriaResumen = document.getElementById("categoriaResumen");
const resumenContent = Array.from(document.querySelectorAll(".categoria__resumen--content"));

categoriaResumen.addEventListener('click', (e) => {
    let numeroPestaña = e.target.dataset.numero;
    let pestaña = e.target.classList.contains('pestaña');

    if (pestaña) {
    pestañaSelec(numeroPestaña);
    return;
    }
});

const pestañaSelec = (numPestaña) => {
    resumenContent.forEach(element => {
        element.classList.remove('block');
        if (element.dataset.pestaña === numPestaña) {
            element.classList.add('block');
            const button = document.querySelector(`button[data-numero="${numPestaña}"]`);
            button.classList.add('selec');
        } else {
            const button = document.querySelector(`button[data-numero="${element.dataset.pestaña}"]`);
            button.classList.remove('selec');
        }
    });
};


const inputContainers = document.querySelectorAll('.input-container');

inputContainers.forEach((container) => {
    const input = container.querySelector('.config__form--input');
    const label = container.querySelector('.input-label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
        container.classList.remove('placeholder-visible');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            label.classList.remove('active');
            container.classList.add('placeholder-visible');
        }
    });
});

window.onload = mostrarPasoActual;window.onload = () => {
    mostrarPasoActual();
};








var arrCategorias = Array();
var arrServiciosCliente = Array();


arrCategorias.push({id: 1, descripcion: "Uñas"});
arrCategorias.push({id: 2, descripcion: "Pestañas"});
arrCategorias.push({id: 3, descripcion: "Peluqueria"});
arrCategorias.push({id: 4, descripcion: "Tatoo"});



/*


arrServiciosCliente.push(
    {
        id_categoria: 3,
        desc_categoria : "Pestañas",
        arrServicios : Array( { id : 0, 
                                titulo : "",
                                descripcion : "",
                                horario} 
            )
    }
)

*/

