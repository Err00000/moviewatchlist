const watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
const movieList = document.querySelector('#movie-list');

renderWatchlist(watchList);

function renderWatchlist(watchlist) {
  const movieCardsHtml = watchlist.map(movie => {
    return `
      <div>
        <div>
          <img src="${movie.Poster}" alt="${movie.Title}" height="200px" width="125px"/>
          <div>
            <h2>
              ${movie.Title}
              <img src="images/star.png" alt="Rating" class="star" height="20px"/>
              <span>${movie.imdbRating}</span>
            </h2>
            <div>
              <span>${movie.Runtime}</span>
              <span>${movie.Genre}</span>
              <button class="remove-button" data-id="${movie.imdbID}">
  <span class="remove-icon" data-id="${movie.imdbID}">−</span>
  Remove
</button>
            </div>
            <h4>
              ${movie.Plot}
            </h4>
          </div>
        </div>
        <hr />
      </div>
    `;
  }).join('');

  movieList.innerHTML = movieCardsHtml;
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.id){
    const movieId = e.target.dataset.id;
    const movieIndex = watchList.findIndex(movie => movie.imdbID === movieId);
    if (movieIndex !== -1) {
      watchList.splice(movieIndex, 1);
      localStorage.setItem('watchlist', JSON.stringify(watchList));
      renderWatchlist(watchList);
    }
  }
})
