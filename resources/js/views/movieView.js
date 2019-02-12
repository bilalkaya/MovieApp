import domElements from "./domElements.js";

export default class movieView {
    constructor(id) {
        this.id = id;
    }

    clearResultContainer() {
        domElements.resultContainer.textContent = '';
    }

    renderNoResult() {
        this.clearResultContainer();
        let html = `
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="alert alert-danger" role="alert">
                 No Movie found!
                </div>
            </div>
        </div>`;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    renderMovieDetail(movie, isadded) {
        let html, btn;
        this.clearResultContainer();
        if (!isadded) {
            btn = `
                <button type="button" class="btn btn-success btn-block" id='addWatchBtn' data-imdbid='${movie.imdbID}' data-title='${movie.Title}' data-poster='${movie.Poster}' data-plot='${movie.Plot}' data-year='${movie.Year}'>Add to Watch List</button>
            `;
        } else {
            btn = `
                <button type="button" class="btn btn-danger btn-block" id='removeWatchBtn' data-imdbid='${movie.imdbID}' data-title='${movie.Title}' data-poster='${movie.Poster}' data-plot='${movie.Plot}' data-year='${movie.Year}'>Remove from Watch List</button>
            `;
        }

        html = `
        <div class="row justify-content-sm-center">
                <div class="col-sm-8 col-md-8 col-lg-6">
                    <div class="card shadow">
                        <img src="${movie.Poster}"
                            class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title text-info">${movie.Title}</h5>
                            <p class="card-text small">${movie.Plot}</p>
                        </div>
                        <div class="card-header text-info">Movie Details</div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><span class='text-primary'>Actors:</span> ${movie.Actors}</li>
                            <li class="list-group-item"><span class='text-primary'>Director:</span> ${movie.Director}</li>
                            <li class="list-group-item"><span class='text-primary'>Year:</span> ${movie.Year}</li>
                            <li class="list-group-item"><span class='text-primary'>IMDB Rating:</span> ${movie.imdbRating}</li>
                            <li class="list-group-item"><span class='text-primary'>Awards:</span> ${movie.Awards}</li>
                        </ul>
                         <div class="card-footer">${btn}</div>
                    </div>
                </div>
            </div>
        `;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    printMovieDetail(movie, isadded = false) {
        this.renderMovieDetail(movie, isadded);
    }
}