import axios from 'axios';

class iTunesApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async search(term, entity = 'musicTrack') {
        try {
            const response = await this.client.get('/search', { params: { term, entity }});
            return response.data;
        } catch (error) {
            console.error('Error searching iTunes API:', error);
            throw error;
        }
    }

    // Add more methods as needed for other iTunes API endpoints.
}

export default new iTunesApiClient('https://itunes.apple.com');