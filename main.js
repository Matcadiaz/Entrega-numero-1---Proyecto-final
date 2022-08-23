// ---- FUNCIONES------//


//Se ah modificado la funcion buscarCiudad para que la misma anos devuelva un objeto como información pedida. La misma nos va a servir para mostrar con mayor facilidad los datos pedidos desde la API.

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

let input = document.getElementById("input"); 

function pedirCiudad(){ 
    return input.value !== "" ? input.value.toLowerCase() : mostrarToast(`INGRESE UNA CIUDAD VALIDA`); 
} 


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



function cambiarPantalla(){
    let wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("active");
} 

function mostrarToast(texto){ 
    Toastify({
        text: texto,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff4137, #ff4137)",
      }).showToast();
}

 
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

let arrow = document.getElementById("arrow");
arrow.addEventListener("click", cambiarPantalla);


//Se agregó el evento dentro del input, en el cual permitirá sugerir algunas ciudades relacionadas a la busqueda, con el fin de que la misma sea lo mas concreta posible.  

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
