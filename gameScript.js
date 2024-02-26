

let puntaje = document.getElementById('current-score');
let wholeScore = document.getElementById('total-score');
console.log(puntaje);
console.log(wholeScore);

let correcta = "", correctScore = askedCount = 0, total = 3;



document.addEventListener('DOMContentLoaded', () => {
    wholeScore.textContent = total;
    puntaje.textContent = correctScore;

})






//En esta funcion solo se verificara la recopilacion de datos recogidos del API
async function iniciarJuego(){
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('instructions-id').style.display = 'none';
    document.getElementById('lista-preguntas').style.display = 'block';
    document.getElementById('Question').style.display = 'block';
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
            console.log(selectedCorrejido);

            //comparar respuesta correcta con la opcion seleccionada
            if(selectedCorrejido == correcta){
                console.log("CORRECTAAAAAAAAA");
                correctScore++;
                console.log(correctScore);
                contador();
                
            }
            //askedcount es la variable de cuenta las veces que ya se respondio
            askedCount++;

            // ¿qué hacer cuando ya llegamos al límite? 3 preguntas
            if(askedCount == total){
                document.getElementById('lista-preguntas').style.display = 'none';
                document.getElementById('Question').style.display = 'none';
                
            } else {
                setTimeout(() => {
                    iniciarJuego();
        
                }, 300);
            }
            
            
        })
    });
}


function contador(){
    setCount();  
}

function setCount(){
    wholeScore.textContent = total;
    puntaje.textContent = correctScore;
}

