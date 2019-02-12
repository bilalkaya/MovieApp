import domElements from "./domElements.js";

export default class searchView {
    constructor() { }

    getInputValue() {
        this.query = domElements.searchInput.value;
        return this.query;
    }

    clearResultContainer() {
        domElements.resultContainer.textContent = '';
    }

    clearSearch() {
        domElements.searchInput.value = '';
    }

    showLoader(parentNode) {
        this.clearResultContainer();
        const html = `
        <div class="row justify-content-center">
                <button class="btn btn-info" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
        </div>
        `;
        parentNode.insertAdjacentHTML('afterbegin', html);
    }

    renderMovie(movie) {
        let html = `
        <div class="row text-center text-md-left">
            <div class="col-md-auto">
                     <img class="img-thumbnail  shadow-sm"
                            src="${movie.Poster}" width="100" height="100" /> 
            </div>
            
            <div class="col-md-8 mt-3 mt-md-0 text-muted">
                    <h6 class="text-info"> ${movie.Title}</h6>
                    <p class="small">Year: ${movie.Year}</p>
                    <button type="button" id='movieID' class="btn btn-outline-info btn-sm" data-imdbid='${movie.imdbID}'>More about movie</button>
            </div>
        </div>
        <hr />
        `;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    renderTotalResult(totalResults) {
        let html = `
        <div class="row text-center text-md-left">
            <div class="col-md-4 mt-3 mt-md-0 text-muted">
                    <div class="alert alert-secondary">Found ${totalResults} movies</div>
            </div>
        </div>
        <hr />
        `;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);

    }

    renderNoResult() {
        this.clearResultContainer();
        let html = `
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="alert alert-danger" role="alert">
                 No result found!
                </div>
            </div>
        </div>`;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    renderPagination(page, totalResults) {
        let html = '';
        page = parseInt(page);
        let last = (page * 10) > totalResults ? true : false;

        if (page === 1) {

            if (last) {
                html = `
                <nav aria-label="">
                    <ul class="pagination justify-content-center justify-content-md-start">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true" data-page='${page}'>Previous</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#" data-page='${page}'>${page}</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#" data-page='${page + 1}'>${page + 1}</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#" data-page='${page + 2}'>${page + 2}</a></li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#" data-page='${page + 2}'>Next</a>
                        </li>
                    </ul>
                </nav>`;
            } else {
                html = `
                <nav aria-label="">
                    <ul class="pagination justify-content-center justify-content-md-start">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true" data-page='${page}'>Previous</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#" data-page='${page}'>${page}</a></li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page + 1}'>${page + 1}</a></li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page + 2}'>${page + 2}</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" data-page='${page + 2}'>Next</a>
                        </li>
                    </ul>
                </nav>`;
            }


        } else if (!last) {
            html = `
                <nav aria-label="">
                    <ul class="pagination justify-content-center justify-content-md-start">
                        <li class="page-item">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true" data-page='${page - 1}'>Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page - 1}'>${page - 1}</a></li>
                        <li class="page-item  active"><a class="page-link" href="#" data-page='${page}'>${page}</a></li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page + 1}'>${page + 1}</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" data-page='${page + 1}'>Next</a>
                        </li>
                    </ul>
                </nav>`;

        } else if (last) {
            html = `
                <nav aria-label="">
                    <ul class="pagination justify-content-center justify-content-md-start">
                        <li class="page-item">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true" data-page='${page - 1}'>Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page - 2}'>${page - 2}</a></li>
                        <li class="page-item"><a class="page-link" href="#" data-page='${page - 1}'>${page - 1}</a></li>
                        <li class="page-item active"><a class="page-link" href="#" data-page='${page}'>${page}</a></li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#" data-page='${page + 2}'>Next</a>
                        </li>
                    </ul>
                </nav>`;

        }

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    printMovies(movies, page = 1, totalResults) {
        this.clearResultContainer();
        this.renderTotalResult(totalResults);
        movies.forEach(item => {
            if (item.Poster === 'N/A') item.Poster = 'resources/img/no-image.jpg';
            this.renderMovie(item);
        });

        this.renderPagination(page, totalResults);
    }
}