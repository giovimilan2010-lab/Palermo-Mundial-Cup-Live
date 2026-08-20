const SHEET_ID = "1CbRLh17574gyg7MmL8UvhR-FgmObRLBabkuUrTlgMek";

const SHEET_NAME = "Statistiche Giocatori";

const URL =
  "https://opensheet.elk.sh/" +
  SHEET_ID +
  "/" +
  encodeURIComponent(SHEET_NAME);


let giocatori = [];


function numeroValore(valore) {

  const numero = Number(valore);

  return isNaN(numero) ? 0 : numero;

}


function bandieraSquadra(squadra) {

  const nome = String(squadra || "").trim().toLowerCase();

  const bandiere = {

    "argentina": "🇦🇷",
    "messico": "🇲🇽",
    "brasile": "🇧🇷",
    "francia": "🇫🇷",
    "spagna": "🇪🇸",
    "olanda": "🇳🇱",
    "stati uniti": "🇺🇸",
    "inghilterra": "🏴"

  };

  return bandiere[nome] || "🏳️";

}


async function caricaGiocatori() {

  try {

    const risposta = await fetch(URL);

    if (!risposta.ok) {

      throw new Error(
        "Errore nel caricamento: " +
        risposta.status
      );

    }


    const dati = await risposta.json();


    giocatori = dati.map((g, index) => ({

      id: index + 1,

      nome:
        g.Giocatore ||
        g.giocatore ||
        "",


      squadra:
        g.Squadra ||
        g.squadra ||
        "",


      bandiera:
        g.Bandiera ||
        g.bandiera ||
        bandieraSquadra(
          g.Squadra ||
          g.squadra
        ),


      numero:
        numeroValore(
          g.Numero ||
          g.numero
        ),


      ruolo:
        g.Ruolo ||
        g.ruolo ||
        "Giocatore",


      gol:
        numeroValore(
          g.Gol ||
          g.gol
        ),


      assist:
        numeroValore(
          g.Assist ||
          g.assist
        ),


      mvp:
        numeroValore(
          g.MVP ||
          g.Mvp ||
          g.mvp
        ),


      gialli:
        numeroValore(
          g.Gialli ||
          g.gialli ||
          g["Cartellini Gialli"] ||
          g["cartellini gialli"]
        ),


      rossi:
        numeroValore(
          g.Rossi ||
          g.rossi ||
          g["Cartellini Rossi"] ||
          g["cartellini rossi"]
        )

    })).filter(g => g.nome !== "");


    console.log(
      "Giocatori caricati:",
      giocatori
    );


    document.dispatchEvent(
      new Event("giocatoriCaricati")
    );


  }

  catch (errore) {

    console.error(
      "Errore nel caricamento dei giocatori:",
     
