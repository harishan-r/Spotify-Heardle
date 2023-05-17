# How To Get Setup

This repository contains the source code for the [Web Playback SDK Guide](https://developer.spotify.com/documentation/web-playback-sdk/guide/).

## Using your own credentials

You will need to register your app and get your own credentials from the
[Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/)

To do so, go to your Spotify for Developers Dashboard, create your
application and register the following callback URI:

`http://localhost:3000/auth/callback`

Once you have created your app, create a file called `.env` in the root folder
of the repository with your Spotify credentials:

```bash
SPOTIFY_CLIENT_ID='my_client_id'
SPOTIFY_CLIENT_SECRET='my_client_secret'
```

## Installation

These examples run on Node.js. On its
[website](http://www.nodejs.org/download/) you can find instructions on how to
install it.

Once installed, clone the repository and install its dependencies running:

```bash
npm install
```

## Running the example

Start both client and server with the following command:

```bash
npm run dev
```

The React application will start on `http://localhost:3000`

# How To Play
## Steps and Rules
- Log in with your Spotify Premium Account
- Listen to the intro of the song and guess the title
- Each wrong attempt grants you more time to listen 
- Answer using the least amount of tries!

## Snapshots
<img width="1920" alt="Screenshot 2023-05-17 at 12 10 41 PM" src="https://github.com/harishan-r/Spotify-Heardle/assets/77423940/4c72760b-55d1-4f64-befd-96b9c752a704">

<img width="1919" alt="Screenshot 2023-05-17 at 12 18 41 PM" src="https://github.com/harishan-r/Spotify-Heardle/assets/77423940/3caa6e2f-9c60-4488-a419-7f985b564be6">

<img width="1920" alt="Screenshot 2023-05-17 at 12 29 24 PM" src="https://github.com/harishan-r/Spotify-Heardle/assets/77423940/afcb1cb4-7a8d-4f46-9480-00b0eb329146">

<img width="1920" alt="Screenshot 2023-05-17 at 12 31 19 PM" src="https://github.com/harishan-r/Spotify-Heardle/assets/77423940/66515125-9dc2-4038-8db1-a5eab7513465">



