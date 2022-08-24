// ---- FUNCIONES------//

//Función para que evalúe lo ingresado en el campo de búsqueda

let input = document.getElementById("input"); 

function pedirCiudad(){ 
    return input.value !== "" ? input.value.toLowerCase() : mostrarToast(`INGRESE UNA CIUDAD VALIDA`); 
} 

//Función que me permite buscar la ciudad ingresada y que me devuelva los datos necesarios para luego mostrar en pantalla. 

function buscarCiudad(ciudad){
    return fetch(`http://api.weatherapi.com/v1/current.json?key=0b0585a3e5b643db821230808221508&q=${ciudad}`)
    .then(response => response.json())
    .then(result => {return {
        ciudad: `${result.location.name}, ${result.location.region}`,
        temp: `${result.current.temp_c}`,
        sensacionTer: `${result.current.feelslike_c}`,
        hum: `${result.current.humidity}`,
        icon: `${result.current.condition.icon}`
    }})
}  

//Función que permite postrar en pantallo lo arrojado por la request de la función buscarCiudad()

function mostrarHTML (ciudad){
    let ubicacion = document.getElementById("ubi");
    ubicacion.innerHTML= ciudad.ciudad;

    let tempMax = document.getElementById("temp");
    tempMax.innerHTML = ciudad.temp;
    
    let tempMin = document.getElementById("sensacionTer");
    tempMin.innerHTML = ciudad.sensacionTer;

    let humedad = document.getElementById("hum");
    humedad.innerHTML = ciudad.hum;

    let icono = document.getElementById("icono");
    icono.innerHTML = `<img src="${ciudad.icon}" alt="icono del clima">`;

}

//Función que permite el intercambio de pantallas cuando encuentra la ciudad y devuelve los datos para mostrarlos. 

function cambiarPantalla(){
    let wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("active");
} 

//Función para configurar el toasty

function mostrarToast(texto){ 
    Toastify({
        text: texto,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff4137, #ff4137)",
      }).showToast();
}

 
//-------EVENTOS--------//

//Evento que nos permite analizar la ciudad ingresada, y devolver los datos pedidos y mostrarlos en la pantalla. 

let button = document.getElementById("button");
button.addEventListener("click", (e)=>{
        let resultado = pedirCiudad();
        if (resultado == undefined){
            return
        } else {
            buscarCiudad(resultado)
            .then(ciudad => {
                mostrarHTML(ciudad);
                cambiarPantalla();
            })

            .catch( p => mostrarToast("NO SE ENCONTRÓ LA CIUDAD"));
        }
    })

//Evento para volver hacia la pantalla de búsqueda, una vez arrojado los datos.
    
let arrow = document.getElementById("arrow");
arrow.addEventListener("click", cambiarPantalla);

//Evento para autocompletar el campo de búsqueda una vez que supera la cantidad de 3 caracteres 

input.addEventListener("keyup", (e)=>{

    let target = e.target
    let cantidad = target.value.length;
    let sug = document.getElementById("sugerencias");
    if ( cantidad >= 3){
       fetch(`https://api.weatherapi.com/v1/search.json?key=0b0585a3e5b643db821230808221508&q=${e.target.value}`)
       .then(response => response.json())
       .then(result => {
        sug.innerHTML="";
        result.forEach(element => {
            sug.innerHTML += `
                <option value = "${element.name},${element.region},${element.country}"> 
            `
        });   
    });
    } else {
        sug.innerHTML = "";
    }
})
    