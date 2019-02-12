export default class Watch {
    constructor() {
        this.list = [];
    }

    addToList(obj) {
        this.list.push({ Title: obj.Title, Plot: obj.Plot, Poster: obj.Poster, Year: obj.Year, imdbID: obj.imdbID });
        this.saveListToLocal();
    }

    // find imdbid in array and delete it from array
    removeFromList(id) {
        this.list.splice(this.list.findIndex(item => item.imdbID === id), 1);
        this.saveListToLocal();
    }

    isAdded(imdbid) {
        return this.list.findIndex(item => item.imdbID === imdbid);
    }

    // Save List to Local Storage against Window Refresh 
    saveListToLocal() {
        localStorage.setItem('list', JSON.stringify(this.list));
    }

    // Get User Watch List if Window is not closed
    getListFromLocal() {
        const local = JSON.parse(localStorage.getItem('list'));
        if (local) this.list = local;
    }
}