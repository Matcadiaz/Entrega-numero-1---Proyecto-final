/*
Para nuestro desafio vamos a crear una array de objetos en donde contenga información de: 

    -Ciudades
    -Temperatura Maxima
    -Temperatura Minima
    -Humedad relativa

Luego, crearemos un constructor que nos permita ingresar los datos de cualquier ciudad y de manera mas sencilla, poder agregarlos al array.  
*/ 

//Primero vamos a crear nuestro array

let listaCiudades = [];

    
class informacion {
    
    constructor (ciudad, temMax, temMin, hum){
       
        this.ciudad = ciudad; 
        this.temMax = temMax;
        this.temMin = temMin;
        this.hum = hum;
    }
    
    restoInformacion(){
         return `${this.ciudad}: \nLa temperatura maxima es ${this.temMax}.\nLa tempertaura minima es ${this.temMin}.\nLa humadad ambiente es del ${this.hum}`;
    }

}


// Una vez realizado el constructor con su clase, procedemos a ingresar los datos para cargar nuestro array.


listaCiudades.push(new informacion("moreno","34°C", "-1°C","90%"));
listaCiudades.push(new informacion("paso del rey","34°C", "0°C","91%"));
listaCiudades.push(new informacion("merlo","35°C", "2°C","93%"));
listaCiudades.push(new informacion("ituzaingo","35°C", "3°C","91%"));
listaCiudades.push(new informacion("moron","38°C", "4°C","90%"));
listaCiudades.push(new informacion("ramos mejia","38°C", "3°C","93%"));
listaCiudades.push(new informacion("ciudadela","40°C", "4°C","95%"));
listaCiudades.push(new informacion("liniers","41°C", "4°C","96%"));
listaCiudades.push(new informacion("villa luro","39°C", "3°C","97%"));
listaCiudades.push(new informacion("caballito","40°C", "3°C","98%"));
listaCiudades.push(new informacion("caba","42°C", "5°C","99%"));

// A partir de acá, nuestro programa mostrará en una lista, las ciudades disponibles a ingresar en la búsqueda para que me devuelva la información sobre la misma. Los datos a devolver son las temperaturas máximas, minimas, la humedad y el nombre de la ciudad seleccionada. Mediante las funciones que definiremos a continuación, armaremos nuestro ciclo para que comience a iterar.

function listarCiudades(){ 

    return listaCiudades.map((c,i) => `${i}-${c.ciudad} \n`).reduce((acumulador,elemento) => acumulador.concat(elemento),"")
} //--------- con esta función generamos un listado de ciudades válidas para que el usuario pueda ingresar en la búsqueda.


function buscarCiudad(ciudad){

    return listaCiudades.find((info) => info.ciudad === ciudad);

}  //--------esta función nos búscara una de las ciudades ingresadas en el prompt y me devolverá si existe o no!


function pedirCiudad(){
    
    let ciudad = prompt(`Ingrese una de las ciudades válidas \n ${listarCiudades()}`).toLocaleLowerCase();
    
    while (ciudad == "") {
        alert(`Por favor ingrese una ciudad`);
        ciudad = prompt(`Ingrese una de las ciudades válidas \n ${listarCiudades()}`).toLocaleLowerCase();
    }

    return ciudad;
} // Mediante la función pedirCiudad, podremos evaluar que la ciudad ingresada sea distinta de un campo vacio. En el caso de estar vacío, se le informará que ingrese una de las ciudades válidas y le mostrará el listado una vez mas. 

let respuesta = "si";  
let resultadoBuscar;
let ciudad;

while (respuesta != "no"){
    
    ciudad = pedirCiudad();
    
    resultadoBuscar = buscarCiudad(ciudad);
    
    if (resultadoBuscar == undefined){

        alert(`Esta ciudad no existe, ingrese una ciudad de la lista`);
    
    } else {

        alert(`${resultadoBuscar.restoInformacion()}`);  
        respuesta = prompt(`Quiere realizar otra búsqueda?. Respuesta válida SI - NO`).toLocaleLowerCase();
        
        while ((respuesta != "si") && (respuesta != "no")) {
            alert(`Ingrese SI o NO`);
            respuesta = prompt(`Desea realizar otra búsqueda?, ingrese "SI" o "NO"`);
        }

    }


} alert(`¡Muchas gracias por usar la aplicación, que tenga un hermoso día!`);

// Como podemos ver, el ciclo se inicia mientras la variable respuesta sea distinto de no, y como se presetea con el valor "si", el mismo comienza. Llamamos a la función pedirCiudad(), la cual el resultado será almacenado en la variable ciudad. Esta misma la evaluaremos en la siguiente función buscarCiudad(ciudad) para almacenar el resultado en otra variable. 
// Creamos un if para evaluar si la ciudad que se ingreso sea alguna de las que se encuentra en la lista y no fuera de ella, ya que al ser una que no se encuentre se le avisará que esa ciudad no existe y por ende, se cierra el if y vuelve a entrar por el while y vuelve a comenzar el ciclo. 
// Por otro lado, en caso de ser una ciudad que existe, mostrará los datos pertinentes y preguntará si desea realizar otra búsqueda. Si responde SI, comienza el ciclo otra vez y se procesa todo lo anterior mencionado. En caso de seleccionar no, el ciclo se cierra y se le deseara que tenga un dia hermoso!. 

// Por último, evaluamos que la repuesta de ,"si desea realizar otra búsqueda" no alguna de las respuestas aceptables, le volverá a pedir que ingrese alguna respuesta válida. 


