const SHEET_ID = "1rQsJx7Vmeu8djzT-0e6VhYS-ODprt0MF5vTOXY96gjA";

const SHEET_NAME = "PARTITA";

const URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtf6D7FD1zfR30jEO-ATTTQzeyd-mwhHNbP5RgTzXg6OaX5OmYcjOMUHxh43E1RrEc/exec";


let datiPartita;


async function caricaMVP(){

    const risposta = await fetch(URL);

    const dati = await risposta.json();

    datiPartita = dati[0];


    document.getElementById("giornata").innerHTML =
    datiPartita.Giornata;


    document.getElementById("partita").innerHTML =
    datiPartita.Partita;


    document.getElementById("giocatore1").innerHTML =
    datiPartita.Giocatore1;


    document.getElementById("giocatore2").innerHTML =
    datiPartita.Giocatore2;


    document.getElementById("giocatore3").innerHTML =
    datiPartita.Giocatore3;


    document.getElementById("giocatore4").innerHTML =
    datiPartita.Giocatore4;



    document.getElementById("btn1").onclick = () => vota(datiPartita.Giocatore1);

    document.getElementById("btn2").onclick = () => vota(datiPartita.Giocatore2);

    document.getElementById("btn3").onclick = () => vota(datiPartita.Giocatore3);

    document.getElementById("btn4").onclick = () => vota(datiPartita.Giocatore4);

}



async function vota(nomeGiocatore){


    await fetch(SCRIPT_URL,{

        method:"POST",

        body:JSON.stringify({

            giornata:datiPartita.Giornata,

            partita:datiPartita.Partita,

            giocatore:nomeGiocatore

        })

    });


    window.location.href="grazie.html";


}



caricaMVP();
