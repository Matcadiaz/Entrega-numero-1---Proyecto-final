//Tomamos el codigo anterior y le realizamos las modificaciones pertinentes relacionadas a los distintos eventos!

let listaCiudades = [];

    
class informacion {
    
    constructor (ciudad, temMax, temMin, hum){
        this.ciudad = ciudad; 
        this.temMax = temMax;
        this.temMin = temMin;
        this.hum = hum;
    }

    restoInformacionHtml(){
        let ubicacion = document.getElementById("ubi");
        ubicacion.innerHTML= this.ciudad;

        let tempMax = document.getElementById("temMax");
        tempMax.innerHTML = this.temMax;
        
        let tempMin = document.getElementById("temMin");
        tempMin.innerHTML = this.temMin;

        let humedad = document.getElementById("hum");
        humedad.innerHTML = this.hum;
    }

}





listaCiudades.push(new informacion("moreno","34", "15","90"));
listaCiudades.push(new informacion("paso del rey","34", "17","91"));
listaCiudades.push(new informacion("merlo","35", "18","93"));
listaCiudades.push(new informacion("ituzaingo","35", "18","91"));
listaCiudades.push(new informacion("moron","38", "20","90"));
listaCiudades.push(new informacion("ramos mejia","38", "23","93"));
listaCiudades.push(new informacion("ciudadela","40", "24","95"));
listaCiudades.push(new informacion("liniers","41", "24","96"));
listaCiudades.push(new informacion("villa luro","39", "23","97"));
listaCiudades.push(new informacion("caballito","40", "23","98"));
listaCiudades.push(new informacion("caba","42", "25","99"));



// ---- FUNCIONES------//

function listarCiudades(){ 
    return listaCiudades.map((c,i) => `${i}-${c.ciudad} \n`).reduce((acumulador,elemento) => acumulador.concat(elemento),"")
} //--------- con esta función generamos un listado de ciudades válidas para que el usuario pueda ingresar en la búsqueda.


function buscarCiudad(ciudad){
    return listaCiudades.find((info) => info.ciudad === ciudad);
}  //--------esta función nos búscara una de las ciudades ingresadas en el prompt y me devolverá si existe o no!


function pedirCiudad(){ //se ha modificado la función mediante evento para que al ingresar por el campo input, la misma evalue que no sea un campo vacío o que se ingrese mediante mayusculas. 
    let input = document.getElementById("input");
    if (input.value !== ""){
        return input.value.toLowerCase();
    } else {
        alert(`Ingrese una ciudad valida`);
    }
} 

function mostrarCiudad(ciudad){
    let mostrarInfo = `${resultadoBuscar.restoInformacionHtml()}`;
}

function cambiarPantalla(){
    let wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("active");
} //Generamos esta función para que nos realice el cambio de pantalla en cuanto sea llamada. La misma se ejecutará cuando se ingrese la ciudad mediante input y el boton de enviar realice el cambio de pantalla mostrando la información pedida. 

//---EVENTOS----//

//mediante las funciones anteriormente definidas, armamos los eventos que se ejecutarán en cuanto se ingrese una ciudad válida.

/*---- 1 ----*/  

//el primer código realizará toda la búsqueda relacionada a la ciudad ingresada y arrojará los datos en la pantalla.
 
let submit = document.getElementById("submit");
submit.addEventListener("click", (e)=>{
        e.preventDefault();
        let resultado = pedirCiudad();
        if (resultado == undefined){
            return
        } else {
            let ciudad = buscarCiudad(resultado);
            if (ciudad == undefined){
                return alert(`No se encontró esa ciudad`);
            } else{
                ciudad.restoInformacionHtml();
                cambiarPantalla();
            }
        }
    })

/*---- 2 ----*/
// El segundo código permitirá que la flecha que se encuentra al costado del título permita volver hacia atrás y realizar una nueva búsqueda.

let arrow = document.getElementById("arrow");
arrow.addEventListener("click", cambiarPantalla);






   

