export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getMovieByTitle(page = 1) {
        const apiKey = '67ec97c0';
        try {
            let res = await fetch(`https://www.omdbapi.com/?s=${this.query}&type=movie&page=${page}&apikey=${apiKey}`);
            this.response = await res.json();
        } catch (error) {
            console.log(`Error when getting data from API: ${error}`);
        }
    }
}