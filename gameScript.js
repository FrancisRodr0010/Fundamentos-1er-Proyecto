

/*NOTA: EL API USADO ES UN API EXTERNO, QUE VIENE DE UN OPEN TRIVIA DATABASE
EL SERVICIO DE ESTE API A VECES NO ENVÍA CORRECTAMENTE LA INFORMACIÓN POR LO QUE A VECES AL HACER CLICK SOBRE UNA RESPUESTA
TIRA UN ERROR DE TOO MANY REQUEST, A VECES REACCIONA Y A VECES NO, DE AHÍ TODO NORMAL*/


let puntaje = document.getElementById('current-score');
let wholeScore = document.getElementById('total-score');
let finished = false;
//console.log(puntaje);
//console.log(wholeScore);

let correcta = "", correctScore = askedCount = 0, total = 3;




document.addEventListener('DOMContentLoaded', () => {
    wholeScore.textContent = total;
    puntaje.textContent = correctScore;

})






//En esta funcion solo se verificara la recopilacion de datos recogidos del API
async function iniciarJuego(){
    //Aqui solo se hara block y none de ciertas etiquetas de la pagina cuando se inicia el juego
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('final-score').style.display = 'none';
    document.getElementById('instructions-id').style.display = 'none';
    document.getElementById('lista-preguntas').style.display = 'block';
    document.getElementById('It-is').style.display = 'none';
    document.getElementById('category2').style.display = 'block';
    document.getElementById('Question').style.display = 'block';
    document.getElementById('category').style.display = 'block';
    document.getElementById('indicaCategoria').style.display = 'block';


    if(finished == true){
        correctScore = 0;
        askedCount = 0;
        finished = false;
        wholeScore.textContent = total;
        puntaje.textContent = correctScore;
    }


    

    try{
        let res = await fetch(`https://opentdb.com/api.php?amount=20&category=27&difficulty=medium&type=multiple`);
        console.log(res);

        //Si la respuest de res no llega bien
        if(!res.ok){throw new Error(`HTTP error: ${res.status}`);}
        res.innerHTML = "";
        let data=await res.json();
        console.log(data);
        useApiData(data.results[0]);
    
    //Si en general no se pueden consegir los datos del API
    }catch(error){console.error(`Could no get products: ${error}`);}
}



// Manipulacion de datos que vienen del API, tanto pregunta como opciones como respuesta correcta e incorrectas
function useApiData(data){
    
    const currentCuestion = document.querySelector('#Question');
    const currentOptions = document.querySelector('.list-group');
    
    correcta = data.correct_answer;
    let incorrectas = data.incorrect_answers;
    let opciones = incorrectas;

    //RANDOMIZAR OPCIONES
    opciones.splice(Math.floor(Math.random() * (incorrectas.length + 1)), 0, correcta);

    document.querySelector("#category2").innerHTML = `${data.category}`


    currentCuestion.innerHTML = `Question: ${data.question}`
    currentOptions.innerHTML  = `${opciones.map((option, index) => `<button type="button" class="list-group-item list-group-item-action btn btn-outline-danger "> ${index + 1}. <span> ${option} </span> </button>`)}`;

    //llamar a esta funcion cuando se seleccione una opcion
    optionSelection();
    //document.querySelector('#Question').innerHTML = `Pregunta: ${data.results[0].question}`;
}

function optionSelection(){
    

    const currentCuestion = document.querySelector('#Question');
    const currentOptions = document.querySelector('.list-group');
    //console.log(correcta);

    //querySelector para seleccionar 1 de las 4 opciones
    currentOptions.querySelectorAll('button').forEach((option) => {
        option.addEventListener('click', () =>{

            //If que evalua que la seleccion del texto de una pregunta y esta no se repita si se selecciona otra despues
            if(currentOptions.querySelector('.selected')){
                const activo = currentOptions.querySelector('.selected');
                activo.classList.remove('selected');
            }
            option.classList.add('selected');

            //un par de correcciones en el texto
            let selected = currentOptions.querySelector('.selected span').textContent;
            let selectedCorrejido = selected.slice(1, -1);
            askedCount++;
            console.log("preguntas contestadas: " + askedCount);
            console.log("terminado?: " + finished);
            console.log("No de correctas: " + correctScore);
            document.getElementById('It-is').style.display = 'block';

            //Incorrecta default - si es correcta se cambiara a correcta
            document.querySelector('#It-is').innerHTML = `Incorrecta!`;

            //comparar respuesta correcta con la opcion seleccionada
            if(selectedCorrejido == correcta){
                document.querySelector('#It-is').innerHTML = `Correcta!`;
                console.log("CORRECTAAAAAAAAA");
                correctScore++;
                console.log(correctScore);
                //contador();
                wholeScore.textContent = total;
                puntaje.textContent = correctScore;
                
            }
            //askedcount es la variable de cuenta las veces que ya se respondio

            // ¿qué hacer cuando ya llegamos al límite? 3 preguntas
            if(askedCount == total){
                
                document.getElementById('lista-preguntas').style.display = 'none';
                document.getElementById('Question').style.display = 'none';
                document.getElementById('category').style.display = 'none';
                document.getElementById('category2').style.display = 'none';
                document.getElementById('It-is').style.display = 'none';
                document.getElementById('indicaCategoria').style.display = 'none';
                document.getElementById('final-score').style.display = 'block';
                document.getElementById('startButton').style.display = 'block';
                //console.log(correctScore);
                finished = true;
                wholeScore.textContent = total;
                puntaje.textContent = correctScore;
          
                
            } else {
                setTimeout(() => {
                    iniciarJuego();
        
                }, 700);
            }
            
            
        })
    });
}


/*function contador(){
    setCount();  
}

function setCount(){
    
    
}*/

