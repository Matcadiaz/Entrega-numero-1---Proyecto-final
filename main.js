
let listaJSON = '[{"ciudad":"moreno","temMax":"34","temMin":"15","hum":"90"},{"ciudad":"paso del rey","temMax":"34","temMin":"17","hum":"91"},{"ciudad":"merlo","temMax":"35","temMin":"18","hum":"93"},{"ciudad":"ituzaingo","temMax":"35","temMin":"18","hum":"91"},{"ciudad":"moron","temMax":"38","temMin":"20","hum":"90"},{"ciudad":"ramos mejia","temMax":"38","temMin":"23","hum":"93"},{"ciudad":"ciudadela","temMax":"40","temMin":"24","hum":"95"},{"ciudad":"liniers","temMax":"41","temMin":"24","hum":"96"},{"ciudad":"villa luro","temMax":"39","temMin":"23","hum":"97"},{"ciudad":"caballito","temMax":"40","temMin":"23","hum":"98"},{"ciudad":"caba","temMax":"42","temMin":"25","hum":"99"}]';


let listaCiudades = JSON.parse(listaJSON);


// ---- FUNCIONES------//

function listarCiudades(){ 
    return listaCiudades.map((c,i) => `${i}-${c.ciudad} \n`).reduce((acumulador,elemento) => acumulador.concat(elemento),"")
} 


function buscarCiudad(ciudad){
    return listaCiudades.find((info) => info.ciudad === ciudad);
}  


function pedirCiudad(){ 
    let input = document.getElementById("input");
    return input.value !== "" ? input.value.toLowerCase() : mostrarToast(`INGRESE UNA CIUDAD VALIDA`); //modificamos la estrucutra convencional del "if" a una sintaxis mas reducida, reduciendo líneas de código y mejorando la legibilidad. 
} 


function mostrarHTML (ciudad){
    let ubicacion = document.getElementById("ubi");
    ubicacion.innerHTML= ciudad.ciudad;

    let tempMax = document.getElementById("temMax");
    tempMax.innerHTML = ciudad.temMax;
    
    let tempMin = document.getElementById("temMin");
    tempMin.innerHTML = ciudad.temMin;

    let humedad = document.getElementById("hum");
    humedad.innerHTML = ciudad.hum;
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
            let ciudad = buscarCiudad(resultado);
            if (ciudad == undefined){
                mostrarToast("NO SE ENCONTRÓ LA CIUDAD");
            } else{
                mostrarHTML(ciudad);
                cambiarPantalla();
            }
        }
    })

let arrow = document.getElementById("arrow");
arrow.addEventListener("click", cambiarPantalla);



