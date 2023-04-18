const playlist_id = "03jCaLIll2p3pXqB2j5cM1";
const api = "https://api.spotify.com/v1";

export default class PlaybackController {
    token: any;

    constructor(token: any) {
        this.token = token;
    }

    getCall(path: string[]) {
        var url = api;
        for (let i = 0; i < path.length; i++) {
            url += "/" + path[i];
        }
        return fetch(url, {
            method: "GET", headers: { Authorization: `Bearer ${this.token}` }
        })
    }

    fetchProfile(token: any) {    
        const result = this.getCall(["me"])
            .then((response: any) => response.json())
            .then((response: any) => console.log(JSON.stringify(response)));
    }
    
    fetchPlaylist(token: any) {
        const result = this.getCall(["playlists", playlist_id])
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }
}

