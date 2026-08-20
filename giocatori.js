<!DOCTYPE html>
<html lang="it">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Giocatore | Palermo Mundial Cup</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<header>

<img src="1000391582.jpg" class="logo" alt="Palermo Mundial Cup">

<h1 id="nome">Caricamento...</h1>

<p id="squadra"></p>

</header>


<section class="menu-card" id="card-giocatore">


<h2 id="bandiera"></h2>

<h1 id="numero"></h1>

<h2 id="ruolo"></h2>

<hr>

<h2>📊 Statistiche Live</h2>

<p>⚽ Gol: <span id="gol">0</span></p>

<p>🎯 Assist: <span id="assist">0</span></p>

<p>⭐ MVP: <span id="mvp">0</span></p>

<p>🟨 Cartellini gialli: <span id="gialli">0</span></p>

<p>🟥 Cartellini rossi: <span id="rossi">0</span></p>


</section>


<div style="text-align:center;margin:30px;">

<a href="ricercagiocatori.html" class="menu-btn">

⬅ Torna alla ricerca

</a>

</div>


<footer>

Palermo Mundial Cup © 2026

</footer>


<script src="giocatori.js"></script>


<script>

const parametri = new URLSearchParams(window.location.search);

const idGiocatore = Number(parametri.get("id"));


document.addEventListener("giocatoriCaricati", function() {

    const giocatore = giocatori.find(
        g => g.id === idGiocatore
    );


    if (giocatore) {

        document.getElementById("nome").innerHTML =
        giocatore.nome;

        document.getElementById("squadra").innerHTML =
        giocatore.squadra;

        document.getElementById("bandiera").innerHTML =
        giocatore.bandiera;

        document.getElementById("numero").innerHTML =
        "#" + giocatore.numero;

        document.getElementById("ruolo").innerHTML =
        giocatore.ruolo;

        document.getElementById("gol").innerHTML =
        giocatore.gol;

        document.getElementById("assist").innerHTML =
        giocatore.assist;

        document.getElementById("mvp").innerHTML =
        giocatore.mvp;

        document.getElementById("gialli").innerHTML =
        giocatore.gialli;

        document.getElementById("rossi").innerHTML =
        giocatore.rossi;

    }

    else {

        document.getElementById("nome").innerHTML =
        "Giocatore non trovato";

    }

});

</script>


</body>

</html>
