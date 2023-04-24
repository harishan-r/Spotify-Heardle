const engPlaylist_id = "03jCaLIll2p3pXqB2j5cM1";
const tamPlaylist_id = "1dx5RbbXoScgy4x10p3vKJ"
const playlist_id = tamPlaylist_id;
const api = "https://api.spotify.com/v1";

export default class PlaybackController {
    token: any;

    constructor(token: any) {
        this.token = token;
    }
    
    generatePath(path: string[]) {
        var url = api;
        for (let i = 0; i < path.length; i++) {
            url += "/" + path[i];
        }
        return url;
    }

    getCall(path: string[]) {
        const url = this.generatePath(path);
        return fetch(url, {
            method: "GET", headers: { Authorization: `Bearer ${this.token}` }
        })
    }

    putCall(path: string[], body: any) {
        const url = this.generatePath(path);
        if (body) {
            return fetch(url, {
                method: "PUT", headers: { Authorization: `Bearer ${this.token}` }, body: JSON.stringify(body)
            })
        } else {
            return fetch(url, {
                method: "PUT", headers: { Authorization: `Bearer ${this.token}` }
            })
        }
        
    }

    fetchProfile() {    
        const result = this.getCall(["me"])
            .then((response: any) => response.json())
            .then((response: any) => console.log(JSON.stringify(response)));
    }
    
    async fetchPlaylist() {
        const result = this.getCall(["playlists", playlist_id])
            .then(response => response.json())
            .then(response => {
                const item_list = response.tracks.items;
                const tracklist: string[] = item_list.map((item: any) => item.track.name);
                return(tracklist);
            })
       
        return(result);
    }

    async transferPlayback(device_id: string) {
        const result = this.putCall(["me", "player"], 
            {
                "device_ids": [
                    device_id
                ]
            }
        )
    }

    async startPlayback(device_id: string) {
        const uri = "spotify:playlist:" + playlist_id;
        const result = this.putCall(["me", "player", "play", "?device_id=" + device_id],
            {
                "context_uri": uri
                
            }
        )
    }

    async toggleShuffle(state: boolean) {
        const result = this.putCall(["me", "player", "shuffle", "?state=" + state], null)
    }

    nextRandom(){ 
        const url = this.generatePath(["me", "player", "queue", "?uri=spotify:track:3QLjDkgLh9AOEHlhQtDuhs"]);
        const result = fetch(url, { method: "POST", headers: { Authorization: `Bearer ${this.token}` } 
        })
    }
}

