export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovieByID() {
        const apiKey = '67ec97c0';
        try {
            let res = await fetch(`https://www.omdbapi.com/?i=${this.id}&type=movie&plot=full&apikey=${apiKey}`);
            this.response = await res.json();
        } catch (error) {
            console.log(`Error when getting data from API: ${error}`);
        }
    }
}