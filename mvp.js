const SHEET_ID = "1rQsJx7Vmeu8djzT-0e6VhYS-ODprt0MF5vTOXY96gjA";

const SHEET_NAME = "PARTITA";

const URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const SCRIPT_URL = "INCOLLA_QUI_IL_TUO_LINK_EXEC";

async function caricaMVP(){

    const risposta = await fetch(URL);

    const dati = await risposta.json();

    const partita = dati[0];


    document.getElementById("giornata").innerHTML =
    partita.Giornata;


    document.getElementById("partita").innerHTML =
    partita.Partita;


    document.getElementById("giocatore1").innerHTML =
    partita.Giocatore1;


    document.getElementById("giocatore2").innerHTML =
    partita.Giocatore2;


    document.getElementById("giocatore3").innerHTML =
    partita.Giocatore3;


    document.getElementById("giocatore4").innerHTML =
    partita.Giocatore4;

}


caricaMVP();
