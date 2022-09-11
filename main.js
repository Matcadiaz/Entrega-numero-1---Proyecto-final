// ---- FUNCIONES------//

//Función para que evalúe lo ingresado en el campo de búsqueda

let input = document.getElementById("input"); 

function pedirCiudad(){ 
    return input.value !== "" ? input.value.toLowerCase() : mostrarToast(`INGRESE UNA CIUDAD VALIDA`); 
} 

//Función que me permite buscar la ciudad ingresada y que me devuelva los datos necesarios para luego mostrar en pantalla. 

function buscarCiudad(ciudad){
    return fetch(`http://api.weatherapi.com/v1/current.json?key=1a6e64a6e40b4e20aea230913221009&q=${ciudad}`)
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
 
    let newCard = `<section class="parte-clima">
        <div class ="cancelParent">
        <div class="cancel">
            <i class='bx bxs-x-circle' onclick="eliminarCarta(event)"></i>
            <span class="tooltip">Eliminar carta</span>
        </div>
        </div>
        <div id="icono">
            <img src="${ciudad.icon}" alt="icono del clima">
        </div>

        <div class="temperatura">
            <span class="numero">${ciudad.temp}</span>
            <span class="grados">°</span>C
        </div> 
        <div class="clima">Temperatura.</div>
        <div class="ubicacion">
            <i class="bx bx-map"></i>
            <span>${ciudad.ciudad}</span>
        </div>
        
        <div class="fondo">
            <div class="columna sensacion">
                <i class="bx bxs-thermometer"></i>
                <div class="details">
                    <div class="temperatura">
                        <span class="numero">${ciudad.sensacionTer}</span>
                        <span class="grados">°</span>C
                    </div>
                    <p>Sensación Térmica</p> 
                </div>
            </div>
            <div class="columna humedad">
                <i class="bx bxs-droplet-half"></i>
                <div class="details">
                    <span class="numero">${ciudad.hum}</span>%
                    <p>Humedad</p> 
                </div>
            </div>
        </div>
        </section>`

    document.getElementById("cartas").innerHTML += newCard;
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

function mostrarCartas(){
    document.getElementById("section").style.display = "none";
    document.getElementById("cartas").classList.remove("off");
    document.getElementById("addButton").classList.remove("off");
    document.getElementById("arrow").classList.remove("off");
}

function mostrarDatos(){
    let resultado = pedirCiudad();
    if (resultado == undefined){
        return
    } else {
        buscarCiudad(resultado)
        .then(ciudad => {
            localStorage.setItem("favoritos", resultado);
            mostrarCartas();
            mostrarHTML(ciudad);
        })

        .catch( p => mostrarToast("NO SE ENCONTRÓ LA CIUDAD"));
    }
}

function eliminarCarta(e){
    e.target.parentNode.parentNode.parentNode.remove()
}
 
//-------EVENTOS--------//

//Evento que nos permite analizar la ciudad ingresada, y devolver los datos pedidos y mostrarlos en la pantalla. 

let button = document.getElementById("button");
button.addEventListener("click", (e)=>{
       mostrarDatos();
    })

//Evento para volver hacia la pantalla de búsqueda, una vez arrojado los datos.
    
let arrow = document.getElementById("arrow");
arrow.addEventListener("click", (e)=>{
    document.getElementById("cartas").classList.add("off");
    document.getElementById("cartas").innerHTML = "";
    document.getElementById("section").style.display = "";
    document.getElementById("addButton").classList.add("off");
    document.getElementById("arrow").classList.add("off");
});

//Evento para autocompletar el campo de búsqueda una vez que supera la cantidad de 3 caracteres 

input.addEventListener("keyup", (e)=>{

    if(e.key == "Enter" && input.value != ""){
        mostrarDatos();
    }else{
        let target = e.target
        let cantidad = target.value.length;
        let sug = document.getElementById("sugerencias");
        if( cantidad >= 3){
           fetch(`https://api.weatherapi.com/v1/search.json?key=1a6e64a6e40b4e20aea230913221009&q=${e.target.value}`)
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
    }
})

let buttonPlus= document.getElementById("buttonPlus");
buttonPlus.addEventListener("click", (e) => {
    document.getElementById("section").style.display = "";
    document.getElementById("addButton").classList.add("off");
})


//------- LOCALSTORAGE ---------

if (localStorage.getItem("favoritos") != null){
    buscarCiudad(localStorage.getItem("favoritos"))
    .then(ciudad => {
        mostrarHTML(ciudad);
        mostrarCartas();
    })
}

