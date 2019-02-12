import Search from "./models/Search.js";
import Movie from "./models/Movie.js";
import Watch from "./models/Watch.js";
import searchView from "./views/searchView.js";
import movieView from "./views/movieView.js";
import watchView from "./views/watchView.js";
import domElements from "./views/domElements.js";

// Keep Object References
const store = {};

// Keep Watch List Until Window Close
const Init = () => {
    store.watch = new Watch();
    store.watch.getListFromLocal();
    store.watchView = new watchView();
    store.watchView.updateCount(store.watch.list.length);
}
// Init Function
Init();







/**********************************************

                CONTROLLERS

***********************************************/
// Controller for Search Movies by Title
const searchMoviesController = async page => {
    store.search = new Search(store.viewSearch.query);
    await store.search.getMovieByTitle(page);

    if (store.search.response.Response === "True") {
        store.viewSearch.printMovies(store.search.response.Search, page, store.search.response.totalResults);
    } else {
        store.viewSearch.renderNoResult();
    }
};

// Controller for Getting Movie Details
const getMovieDetailController = async () => {
    store.movie = new Movie(store.viewMovie.id);
    await store.movie.getMovieByID();
    if (store.movie.response.Response === "True") {
        if (store.watch.isAdded(store.movie.id) !== -1) {
            store.viewMovie.printMovieDetail(store.movie.response, true);
        } else {
            store.viewMovie.printMovieDetail(store.movie.response);
        }

    } else {
        store.viewMovie.renderNoResult();
    }
};

// Add Watch List Controller
const addToWatchController = obj => {
    store.watch.addToList(obj);
    store.watchView.updateCount(store.watch.list.length);
    store.watchView.updateButton('add');
};

// Remove From Watch List Controller
const removeFromWatchController = id => {
    store.watch.removeFromList(id);
    store.watchView.updateCount(store.watch.list.length);
    store.watchView.updateButton('remove', id);
};

// Watch List Controller
const listWatchController = () => {
    if (store.watch.list.length > 0) {
        store.watchView.printWatchList(store.watch.list);
    } else {
        store.watchView.renderNoResult();
    }
};


/**********************************************

                EVENT LISTENERS

***********************************************/
// Combine Click Event and Keypress Event Listener Functions
const searchBtnFnc = (e) => {
    e.preventDefault();
    store.viewSearch = new searchView();
    const query = store.viewSearch.getInputValue();
    if (query) {
        store.viewSearch.clearSearch();
        store.viewSearch.showLoader(domElements.resultContainer);
        searchMoviesController();
    }
}

// Search Button Click Event Listener
domElements.searchBtn.addEventListener('click', e => {
    searchBtnFnc(e);
});

// Enter Key Keypress Event Listener
document.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
        searchBtnFnc(e);
    }
});

// Pagination Click Event Listener
domElements.resultContainer.addEventListener('click', e => {
    e.preventDefault();
    const link = e.target.closest('.page-link');
    if (link) {
        const page = link.dataset.page;
        searchMoviesController(page);
    }
});

// More About Movie Event Listener
domElements.resultContainer.addEventListener('click', e => {
    e.preventDefault();
    const link = e.target.closest('#movieID');
    if (link) {
        const imdbID = link.dataset.imdbid;
        store.viewMovie = new movieView(imdbID);
        getMovieDetailController();
    }
});

// Add to Watch List Button Click Event Listener
domElements.resultContainer.addEventListener('click', e => {
    e.preventDefault();
    const link = e.target.closest('#addWatchBtn');
    if (link) {
        const obj = {
            Title: link.dataset.title,
            Plot: link.dataset.plot,
            Year: link.dataset.year,
            Poster: link.dataset.poster,
            imdbID: link.dataset.imdbid
        };
        addToWatchController(obj);
    }
});

// Remove From Watch List Button Click Event Listener
domElements.resultContainer.addEventListener('click', e => {
    e.preventDefault();
    const link = e.target.closest('#removeWatchBtn');
    if (link) {
        const imdbID = link.dataset.imdbid;
        removeFromWatchController(imdbID);
    }
});


// Watch List Button Click Event Listener
domElements.watchListBtn.addEventListener('click', e => {
    e.preventDefault();
    listWatchController();
});

