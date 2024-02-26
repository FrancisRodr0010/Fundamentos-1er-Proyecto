



document.addEventListener('DOMContentLoaded', () => {
    const puntaje = document.getElementById('current-score');
    const wholeScore = document.getElementById('total-score');

    let correcta = "", correctScore = askedCount = 0, total = 10;
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
        let res = await fetch(`https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple`);
        console.log(res);

        //Si la respuest de res no llega bien
        if(!res.ok){throw new Error(`HTTP error: ${res.status}`);}
        
        let data=await res.json();
        console.log(data);
        useApiData(data.results[0]);
    
    //Si en general no se pueden consegir los datos del API
    }catch(error){console.error(`Could no get products: ${error}`);}
}



//Que hareos con la info?
function useApiData(data){
    const currentCuestion = document.querySelector('#Question');
    const currentOptions = document.querySelector('.list-group');
    correcta = data.correct_answer;
    let incorrectas = data.incorrect_answers;
    let opciones = incorrectas;

    
    opciones.splice(Math.floor(Math.random() * (incorrectas.length + 1)), 0, correcta);
    currentCuestion.innerHTML = `Question: ${data.question}`
    currentOptions.innerHTML  = `${opciones.map((option, index) => `<button type="button" class="list-group-item list-group-item-action btn btn-outline-danger "> ${index + 1}. <span> ${option} </span> </button>`)}`;

    optionSelection();
    //document.querySelector('#Question').innerHTML = `Pregunta: ${data.results[0].question}`;
}

function optionSelection(){
    const currentCuestion = document.querySelector('#Question');
    const currentOptions = document.querySelector('.list-group');
    currentOptions.querySelectorAll('button').forEach((option) => {
        option.addEventListener('click', () => {
            option.classList.add('selected');
            let selected = currentOptions.querySelector('.selected span').textContent;
            console.log(selected);
            
            iniciarJuego();
        })
    });
}