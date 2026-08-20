const SHEET_ID = "1CbRLh17574gyg7MmL8UvhR-FgmObRLBabkuUrTlgMek";

const SHEET_NAME = "Statistiche Giocatori";

const URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?tqx=out:json&sheet=" +
  encodeURIComponent(SHEET_NAME);


let giocatori = [];


function numeroValore(valore) {

  if (
    valore === undefined ||
    valore === null ||
    valore === ""
  ) {
    return 0;
  }

  const numero = Number(valore);

  return isNaN(numero) ? 0 : numero;

}


function bandieraSquadra(squadra) {

  const nome = String(squadra || "")
    .trim()
    .toLowerCase();

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
        "Errore Google Fogli: " +
        risposta.status
      );

    }


    const testo = await risposta.text();


    const json = JSON.parse(
      testo
        .substring(
          testo.indexOf("{"),
          testo.lastIndexOf("}") + 1
        )
    );


    const colonne = json.table.cols.map(
      colonna =>
        colonna.label
          .trim()
          .toLowerCase()
    );


    const righe = json.table.rows;


    giocatori = righe.map((riga, index) => {

      const dati = {};


      riga.c.forEach((cella, posizione) => {

        if (
          colonne[posizione]
        ) {

          dati[colonne[posizione]] =
            cella ? cella.v : "";

        }

      });


      const squadra =
        dati["squadra"] || "";


      return {

        id: index + 1,

        nome:
          dati["giocatore"] ||
          "",


        squadra:
          squadra,


        bandiera:
          bandieraSquadra(squadra),


        numero:
          numeroValore(
            dati["numero"]
          ),


        ruolo:
          dati["ruolo"] ||
          "Giocatore",


        gol:
          numeroValore(
            dati["gol"]
          ),


        assist:
          numeroValore(
            dati["assist"]
          ),


        mvp:
          numeroValore(
            dati["mvp"]
          ),


        gialli:
          numeroValore(
            dati["gialli"] ||
            dati["cartellini gialli"]
          ),


        rossi:
          numeroValore(
            dati["rossi"] ||
            dati["cartellini rossi"]
          )

      };

    }).filter(
      giocatore =>
        giocatore.nome !== ""
    );


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
      "Errore caricamento giocatori:",
      errore
    );


    document.dispatchEvent(
      new Event("giocatoriCaricati")
    );

  }

}


caricaGiocatori();
