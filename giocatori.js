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

  const risposta = await fetch(URL);

  const testo = await risposta.text();


  const inizio = testo.indexOf("{");

  const fine = testo.lastIndexOf("}") + 1;


  const json = JSON.parse(
    testo.substring(inizio, fine)
  );


  const colonne = json.table.cols.map(colonna =>
    String(colonna.label || "")
      .trim()
      .toLowerCase()
  );


  giocatori = json.table.rows
    .map((riga, index) => {

      const dati = {};


      riga.c.forEach((cella, posizione) => {

        const nomeColonna =
          colonne[posizione];

        if (nomeColonna) {

          dati[nomeColonna] =
            cella && cella.v !== null
              ? cella.v
              : "";

        }

      });


      const squadra =
        dati["squadra"] || "";


      return {

        id: index + 1,

        nome:
          String(
            dati["giocatore"] || ""
          ).trim(),

        squadra: squadra,

        bandiera:
          bandieraSquadra(squadra),

        numero:
          numeroValore(
            dati["numero"]
          ),

        ruolo:
          String(
            dati["ruolo"] || "Giocatore"
          ),

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

    })

    .filter(g => g.nome !== "");


  console.log(
    "GIOCATORI CARICATI CORRETTAMENTE:",
    giocatori
  );


  return giocatori;

}


window.giocatoriPronti =
  caricaGiocatori()
    .then(() => {

      document.dispatchEvent(
        new Event("giocatoriCaricati")
      );

      return giocatori;

    })
    .catch(errore => {

      console.error(
        "ERRORE:",
        errore
      );

      throw errore;

    });
