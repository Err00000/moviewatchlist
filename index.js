const searchBtn = document.querySelector('#search-btn')
const movieList = document.querySelector('#movie-list')


searchBtn.addEventListener('click', () => {
    const searchedMovie = document.querySelector('#searchbar').value
    mainMovieArray = []
    fetchMovies(searchedMovie)
} )

async function fetchMovies(searchedMovie){
    const response = await fetch(`http://www.omdbapi.com/?s=${searchedMovie}&apikey=bd424c7d`)
    const data = await response.json()
    const movieIdArray = data.Search.map((movie) =>{
        return movie.imdbID
    })
    getMovieData(movieIdArray)

}


async function getMovieData(movieIdArray) {
     let movieArray = await Promise.all(
        movieIdArray.map(async (movie) => {
            const response = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=bd424c7d&plot=full`)
            const data = await response.json()
            return data
        })
    )
    renderMovies(movieArray)
}

let mainMovieArray = []
function renderMovies(movieArray){
    movieList.innerHTML = movieArray.map((movie) => {
          mainMovieArray.push(movie)
          return returnMovieHTML(movie)
    })
}


document.addEventListener('click', (e) => {
    if(e.target.dataset.id){
        const movieId = e.target.dataset.id
        const movie = mainMovieArray.find((movie) => movie.imdbID === movieId)
        
        addToWatchList(movie)
        document.querySelector(`#add-button-${movieId}`).innerHTML = `<span class="added-icon" data-id="${movie.imdbID}">✓</span>Added to watchlist`
    }
})

function addToWatchList(movie) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    if(watchlist.find((item) => item.imdbID === movie.imdbID)) {
        return alert('Movie already added to watchlist')
    }
    watchlist.unshift(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
}

function returnMovieHTML(movie) {
  return `  <div>
    <div>
      <img src="${movie.Poster}" height="200px" width="125px"/>
      <div>
        <h2>
          ${movie.Title}
          <img src="images/star.png" height="20px"/>
          <span>${movie.imdbRating}</span>
        </h2>
        <div>
          <span>${movie.Runtime}</span>
          <span>${movie.Genre}</span>
          <div class="add-button" id="add-button-${movie.imdbID}">
          <button class="add-button" data-id="${movie.imdbID}">
  <span class="add-icon" data-id="${movie.imdbID}">+</span>
  Add to watchlist
</button></div>
        </div>
        <h4>
        ${movie.Plot}
        </h4>
      </div>
    </div>
    <hr />

    </div>`}

// return `<div id="poster">
        //     <img src="${movie.Poster}">
        // </div>
        // <div id="info">
        //     <h3>${movie.Title}</h3>
        //     <p>${movie.Genre}</p>
        //     <p>${movie.Year}</p>
        // </div>`
