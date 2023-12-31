let mainUrlApi = "http://localhost:3002/";
let mainData = []

// const guardarPaso = (paso) => {
//     localStorage.setItem('config_step', paso);
// };

// const obtenerPaso = () => {
//     return localStorage.getItem('config_step');
// };

// const mostrarPasoActual = () =>{
//     let config_step = obtenerPaso();
//     let pasos = document.getElementsByClassName('config__pasos');
    
//     for (let i = 0; i < pasos.length; i++) {
//         pasos[i].classList.add('hidden');
//     };
    
//     if (config_step) {
//         const pasoActual = document.getElementById(`paso${config_step}`);
//         if (pasoActual) {
//             pasoActual.classList.remove('hidden');
//         };
//     };
// };


// Obtiene los valores de los inputs Name y Url
const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');

let valorDefecto = '';
// Completa el input Ulr con beauting.me/ seguido del nombre del negocio
nameInput.addEventListener('input', () => {
    const nameValue = nameInput.value.trim();
    const nameTienda = nameValue.replace(/\s+/g, ''); 
    const urlTienda = 'beauting.me/' + nameTienda;
    urlInput.value = urlTienda;
    
    if (nameValue === '') {
        urlInput.value = '';
    }
});
// En caso que el nombre este vacio, devuelva al input Url el valor por defecto
nameInput.addEventListener('blur', () => {
    if (nameInput.value === '') {
        nameInput.value = valorDefecto;
    }
});
// Obtiene los datos de los inputs del paso 1 y los envia a la api para crear los datos de la tienda
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

    console.log(params)
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

// window.onload = mostrarPasoActual;window.onload = () => {
//     mostrarPasoActual();
// };


const horariosSemanales = [
    { id: 1, dia: 'lunes', nombre: 'Lunes', rangos: [] },
    { id: 2, dia: 'martes', nombre: 'Martes', rangos: [] },
    { id: 3, dia: 'miercoles', nombre: 'Miércoles', rangos: [] },
    { id: 4, dia: 'jueves', nombre: 'Jueves', rangos: [] },
    { id: 5, dia: 'viernes', nombre: 'Viernes', rangos: [] },
    { id: 6, dia: 'sabado', nombre: 'Sábado', rangos: [] },
    { id: 7, dia: 'domingo', nombre: 'Domingo', rangos: [] }
];

const diasContainer = document.querySelector('.dias');
const dias = diasContainer.querySelectorAll('div');
const agendaContainer = document.querySelector('.agenda');
const tituloDia = document.querySelector('.agenda h3');
const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const selectDesde = document.getElementById('select__hora--desde');
const selectMinutoDesde = document.getElementById('select__minuto--desde');
const selectHasta = document.getElementById('select__hora--hasta');
const selectMinutoHasta = document.getElementById('select__minuto--hasta');
const btnAgregar = document.getElementById('btnAgregar');
const resumenContainer = document.querySelector('.resumen');

let rangoEditado = null;

const resetSelectOptions = () => {
    selectDesde.selectedIndex = 0;
    selectMinutoDesde.selectedIndex = 0;
    selectHasta.selectedIndex = 0;
    selectMinutoHasta.selectedIndex = 0;
};

const cargarDatosRango = (rango) => {
    const [desdeHora, desdeMinuto] = rango.desde.split(':');
    const [hastaHora, hastaMinuto] = rango.hasta.split(':');

    selectDesde.value = desdeHora;
    selectMinutoDesde.value = desdeMinuto;
    selectHasta.value = hastaHora;
    selectMinutoHasta.value = hastaMinuto;

    const diaId = rango.diaId - 1;
    seleccionarDia(dias[diaId], diaId);
};

const agregarRango = () => {
    const diaSeleccionadoElement = document.querySelector('.dias .dias__select');
    const diaSeleccionadoIndex = Array.from(dias).indexOf(diaSeleccionadoElement);
    const diaSeleccionado = horariosSemanales.find((dia) => dia.id === diaSeleccionadoIndex + 1);

    const desde = selectDesde.value + ':' + selectMinutoDesde.value;
    const hasta = selectHasta.value + ':' + selectMinutoHasta.value;

    diaSeleccionado.rangos.push({ desde, hasta, diaId: diaSeleccionado.id });

    actualizarResumenHorarios();
    resetSelectOptions();
};

const editarRango = () => {
    if (rangoEditado) {
        rangoEditado.desde = selectDesde.value + ':' + selectMinutoDesde.value;
        rangoEditado.hasta = selectHasta.value + ':' + selectMinutoHasta.value;
        const diaSeleccionadoElement = document.querySelector('.dias .dias__select');
        const diaSeleccionadoIndex = Array.from(dias).indexOf(diaSeleccionadoElement);
        rangoEditado.diaId = diaSeleccionadoIndex + 1;
        rangoEditado = null;

        seleccionarDia(dias[diaSeleccionadoIndex], diaSeleccionadoIndex);

        actualizarResumenHorarios();
        resetSelectOptions();
        btnAgregar.textContent = 'Agregar';
        btnAgregar.removeEventListener('click', editarRango);
        btnAgregar.addEventListener('click', agregarRango);
    };
};

const eliminarRango = (diaId, rango) => {
    const diaSeleccionadoElement = document.querySelector('.dias .dias__select');
    const diaSeleccionadoIndex = Array.from(dias).indexOf(diaSeleccionadoElement);
    const diaSeleccionado = horariosSemanales.find((dia) => dia.id === diaId);

    if (diaSeleccionado) {
        const rangoIndex = diaSeleccionado.rangos.findIndex((r) => r === rango);
        if (rangoIndex !== -1) {
            diaSeleccionado.rangos.splice(rangoIndex, 1);
            actualizarResumenHorarios();
        }
    }
};

const actualizarResumenHorarios = () => {
    resumenContainer.innerHTML = '';
    const diasOrdenados = horariosSemanales.sort((a, b) => a.id - b.id);

    diasOrdenados.forEach((horario) => {
        //Recorre el arreglo del día de la semana correspondiente
        if (horario.rangos.length > 0) {
            const lista = document.createElement('div');
            lista.classList.add('resumen__lista');

            const h4 = document.createElement('h4');
            h4.textContent = nombresDias[horario.id - 1];

            const rangosContainer = document.createElement('div');
            rangosContainer.classList.add('resumen__rangos');

            horario.rangos.forEach((rango) => {
                const p = document.createElement('p');
                p.classList.add('resumen__texto')
                p.textContent = `Desde las ${rango.desde}, hasta las ${rango.hasta}.`;

                const iconoEditar = document.createElement('i');
                iconoEditar.classList.add('fa', 'fa-pencil', 'resumen__icono');
                iconoEditar.setAttribute('aria-hidden', 'true');
                iconoEditar.addEventListener('click', () => {
                    cargarDatosRango(rango);
                    btnAgregar.textContent = 'Actualizar';
                    btnAgregar.removeEventListener('click', agregarRango);
                    btnAgregar.addEventListener('click', editarRango);
                    rangoEditado = rango;
                    const diaIndex = rango.diaId - 1;
                    seleccionarDia(dias[diaIndex], diaIndex);
                });

                const iconoEliminar = document.createElement('i');
                iconoEliminar.classList.add('fa', 'fa-times', 'resumen__icono');
                iconoEliminar.setAttribute('aria-hidden', 'true');
                iconoEliminar.addEventListener('click', () => {
                    showAlert(
                        "Confirmación",
                        "¿Estás seguro de que deseas eliminar este rango?",
                        0,
                        "",
                        { _label: "Confirmar"},
                        { _label: "Cancelar" }
                    );
                    
                    document.getElementById("alert_btn_ok").onclick = () => {
                        eliminarRango(horario.id, rango);
                    };
                });

                p.appendChild(iconoEditar);
                p.appendChild(iconoEliminar);
                rangosContainer.appendChild(p);
            });

            lista.appendChild(h4);
            lista.appendChild(rangosContainer);
            resumenContainer.appendChild(lista);
        }
    });
};

const seleccionarDia = (diaElement, diaIndex) => {
    dias.forEach((div) => div.classList.remove('dias__select'));
    diaElement.classList.add('dias__select');
    const leftValue = diaElement.getAttribute('data-left');
    agendaContainer.style.setProperty('--left-value', leftValue + '%');

    const nombreDia = nombresDias[diaIndex];
    tituloDia.textContent = nombreDia;
};

dias.forEach((div, index) => {
    div.addEventListener('click', () => {
        seleccionarDia(div, index);

        resetSelectOptions();
        rangoEditado = null;
        btnAgregar.textContent = 'Agregar';
        btnAgregar.removeEventListener('click', editarRango);
        btnAgregar.addEventListener('click', agregarRango);
    });
});

btnAgregar.addEventListener('click', agregarRango);

actualizarResumenHorarios();


const arrCategorias = Array();
const arrServiciosCliente = Array()

arrCategorias.push({id: 1, descripcion: "Uñas"});
arrCategorias.push({id: 2, descripcion: "Pestañas"});
arrCategorias.push({id: 3, descripcion: "Peluqueria"});
arrCategorias.push({id: 4, descripcion: "Tatoo"});

// Obtiene el elemento select
const select = document.getElementById("categoría");

// Itera sobre el array de categorías y crea las opciones
arrCategorias.forEach((categoria) => {
    var option = document.createElement("option");
    option.value = categoria.descripcion.toLowerCase();
    option.text = categoria.descripcion;
    option.dataset.idCategoria = categoria.id;
    select.add(option);
});

// Obtiene las pestañas del resumen y forma un array con el contenido
const tabsCategoria = document.getElementById("tabsCategoria");
const resumenContent = Array.from(document.querySelectorAll(".resumen__content"));
// Obtiene el numero de pestaña seleccionada y ejecuta la funcion (pestañaSelec) pasandole ese numero como paramentro
tabsCategoria.addEventListener('click', (e) => {
    let numeroPestaña = e.target.dataset.numero;
    let pestaña = e.target.classList.contains('resumen__tabsBtn');

    if (pestaña) {
    pestañaSelec(numeroPestaña);
    return;
    }
});
// Iterra sobre el array del contenido y va mostrando solo lo que corresponde al numero de pestaña seleccionada
const pestañaSelec = (numPestaña) => {
    resumenContent.forEach(element => {
        element.classList.remove('block');
        if (element.dataset.pestaña === numPestaña) {
            element.classList.add('block');
            const button = document.querySelector(`button[data-numero="${numPestaña}"]`);
            button.classList.add('tabSelect');
        } else {
            const button = document.querySelector(`button[data-numero="${element.dataset.pestaña}"]`);
            button.classList.remove('tabSelect');
        }
    });
};

let btnCargar = document.getElementById("btnCargar");

// Agregar evento al botón "Cargar"
btnCargar.addEventListener("click", ()=> {
    //Guarda el valor anterior de categoría para validaciones posteriores
    let id_categoriaprevia = mainObjetoServicio.id_categoria;



    // Obtener los valores de los campos de entrada
    let id_categoria = document.getElementById("servicio").value;
    let servicioTitulo = document.getElementById("servicio").value;
    let descripcion = document.getElementById("servDesc").value;
    let tiempoHoras = document.getElementById("tiempoHoras").value;
    let tiempoMinutos = document.getElementById("tiempoMinutos").value;
    let servPrecio = document.getElementById("servPrecio").value;

//   Crear el objeto con los valores capturados


    mainObjetoServicio.id_categoria = id_categoria;
    mainObjetoServicio.titulo = _objReg.servicioTitulo;
    mainObjetoServicio.descripcion = _objReg.descripcion;
    mainObjetoServicio.tiempo = _objReg.tiempo;
    mainObjetoServicio.precio = _objReg.precio;


    //API FICTICIA
    //////////////////////////////////////////////////////////////
    if (mainObjetoServicio.id === 0) {
        servicio.id = Math.random();
    }
//////////////////////////////////////////////////////////////////





    //activar solapa de la categoría que está agregando, modificando o eliminando


    if (mainObjetoServicio.id === 0) {//ES UN REGISTRO NUEVO

    }
    else {//REGISTRO EXISTENTE

    }


    //COSAS COMUNES A AMBAS

    console.log(servicio);

    if (id_categoriaprevia != 0 && id_categoriaprevia !=  mainObjetoServicio.id_categoria) {

    }



    



});


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







var mainObjetoServicio;





function servicioNewOrUpdate(_id, _id_categoria) {

    mainObjetoServicio = {
        id: _id,
        id_categoria: _id_categoria,
        titulo: "",
        descripcion: "",
        tiempo: "",
        precio: 0,
        // datonuevo: 9
    }

    if (_id > 0) { //REGISTRO EXISTENTE
        for (i=0; i<arrServiciosCliente.length; i++) {
            if (arrServiciosCliente[i].id_categoria === _id_categoria) {

                for (zz=0; zz<arrServiciosCliente[i].arrServicios.length; zz++) {
                    if (arrServiciosCliente[i].arrServicios[zz].id === _id) {
                        let _objReg = arrServiciosCliente[i].arrServicios[zz];

                        mainObjetoServicio.titulo = _objReg.titulo;
                        mainObjetoServicio.descripcion = _objReg.descripcion;
                        mainObjetoServicio.tiempo = _objReg.tiempo;
                        mainObjetoServicio.precio = _objReg.precio;

                        break;
                    }
                }
            }
        }
        mainObjetoServicio.id_categoria = id_categoria;


    }
    //rellenás los objetos del formulario con el objeto el mainObjetoServicio
    document.getElementById("servicio").value = mainObjetoServicio.titulo;
    document.getElementById("servicio").value = mainObjetoServicio.titulo;

}










mainObjetoServicio = {
    id: _id,
    id_categoria: _id_categoria,
    titulo: "",
    descripcion: "",
    tiempo: "",
    precio: 0,
    // datonuevo : 9
}