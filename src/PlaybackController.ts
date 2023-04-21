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

    putCall(path: string[], body: any) {
        var url = api;
        for (let i = 0; i < path.length; i++) {
            url += "/" + path[i];
        }
        return fetch(url, {
            method: "PUT", headers: { Authorization: `Bearer ${this.token}` }, body: JSON.stringify(body)
        })
    }

    fetchProfile() {    
        const result = this.getCall(["me"])
            .then((response: any) => response.json())
            .then((response: any) => console.log(JSON.stringify(response)));
    }
    
    fetchPlaylist() {
        const result = this.getCall(["playlists", playlist_id])
            .then(response => response.json())
            .then(response => {
                const item_list = response.tracks.items;
                const track_list = item_list.map((item: any) => item.track.name);
                console.log(track_list);
            })
    }

    transferPlayback(device_id: string) {
        const result = this.putCall(["me", "player"], 
            {
                "device_ids": [
                    device_id
                ]
            }
        )
    }
}

