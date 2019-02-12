import domElements from "./domElements.js";

export default class watchView {
    constructor() {

    }

    updateCount(num) {
        domElements.listCount.textContent = num;
    }

    updateButton(btn, id) {
        let addWatchBtn = document.getElementById('addWatchBtn');
        if (btn === 'add') {
            addWatchBtn.classList.add('disabled');
            addWatchBtn.setAttribute('disabled', 'disabled');

        } else if (btn === 'remove') {
            let removeWatchBtn = document.querySelectorAll(`[data-imdbid~="${id}"]`);
            removeWatchBtn[0].classList.add('disabled');
            removeWatchBtn[0].setAttribute('disabled', 'disabled');
        }
    }

    clearResultContainer() {
        domElements.resultContainer.textContent = '';
    }

    renderListItem(item) {
        let html = `
        
        <div class="row text-center text-md-left">
            <div class="col-md-auto">
                     <img class="img-thumbnail  shadow-sm"
                            src="${item.Poster}" width="100" height="100" /> 
            </div>
            
            <div class="col-md-8 mt-3 mt-md-0 text-muted">
                    <h6 class="text-info"> ${item.Title}</h6>
                    <p class="small">Plot: ${item.Plot}</p>
                    <p class="small">Year: ${item.Year}</p>
                    <button type="button" id='removeWatchBtn' class="btn btn-danger btn-sm" data-imdbid='${item.imdbID}'>Remove From List</button>
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
                 Your Watch List is Empty!
                </div>
            </div>
        </div>`;

        domElements.resultContainer.insertAdjacentHTML('beforeend', html);
    }

    printWatchList(list) {
        this.clearResultContainer();
        list.forEach(item => {
            if (item.Poster === 'N/A') item.Poster = 'resources/img/no-image.jpg';
            this.renderListItem(item);
        });
    }

}