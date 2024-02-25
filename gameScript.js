let startbutton = document.querySelector("#startButton");

//En esta funcion solo se verificara la recopilacion de datos recogidos del API
async function iniciarJuego(){
    try{
        let res = await fetch(`https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple`);
        console.log(res);

        //Si la respuest de res no llega bien
        if(!res.ok){throw new Error(`HTTP error: ${res.status}`);}
        
        const data=await res.json();
        console.log(data);
       // useApiData(data);
    
    //Si en general no se pueden consegir los datos del API
    }catch(error){console.error(`Could no get products: ${error}`);}
}

//Que hareos con la info?
/*function useApiData(data){
    document.querySelector('#category').innerHTML = 
}*/