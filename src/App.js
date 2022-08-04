import "./styles.css";
import React, { Component } from "react";

const api_key = "?api_key=d59cb43fbc0ea30bbf9da6d6ab43b3c7";
const APIURL =
  "https://api.themoviedb.org/3/movie/550?api_key=d59cb43fbc0ea30bbf9da6d6ab43b3c7";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//  url + chave + pesquisa com região em EN
var SEARCHPI =
  "https://api.themoviedb.org/3/search/movie" + api_key + "&region=EN&query=";

class Content extends Component {
  render() {
    return (
      <div>
        <div id="content"></div>
      </div>
    );
  }

  componentDidMount() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    console.log("montou");
  }
}

async function getMovies(url) {
  const resp = await fetch(url);

  const respData = await resp.json();

  showMovies(respData.results);
  console.log(respData);
}

function escolheFilme() {
  const rndInt = Math.floor(Math.random() * 5) + 1;
  var filme = "";

  switch (rndInt) {
    case 1:
      filme = "Homem-Aranha: Sem Volta para Casa";
      break;
    case 2:
      filme = "Encanto";
      break;
    case 3:
      filme = "Vingadores: Ultimato";
      break;
    case 4:
      filme = "Jurassic World: O Mundo dos Dinossauros";
      break;
    case 5:
      filme = "Piratas do Caribe: A Maldição do Pérola Negra";
      break;
    default:
      filme = "";
      break;
  }

  getMovies(SEARCHPI + filme);
  console.log(filme);
}

function showMovies(movies) {
  let content = document.getElementById("content");

  content.innerHTML = "";

  var i = 0;
  while (i < 1) {
    var movie = movies[0];
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title}"/>
      <div class="movie-info">
      <h3>${title}</h3>
      </div>
      <div class="overview">
      <h3>${overview}</h3>
      </div>
      <div class="vote_aberage">
      <h3>${vote_average}</h3>
      </div>
    `;

    content.appendChild(movieEl);
    i++;
  }
}

function BotaoEscolheFilme() {
  return (
    <div>
      <button onClick={escolheFilme}>Clique aqui</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Recomenda Filmes</h1>
      <h3>Clique no botão para escolher um filme</h3>
      <BotaoEscolheFilme />
      <Content />
    </div>
  );
}
