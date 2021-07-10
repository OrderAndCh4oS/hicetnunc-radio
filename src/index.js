import React from 'react';
import { hydrate, render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import RadioProvider from './context/radio-context';
import AudioProvider from './context/audio-context';
import PlaylistProvider from './context/playlist-context';
import WalletProvider from './context/wallet-context';
import UserPlaylistProvider from './context/user-playlists-context';
import { Helmet } from "react-helmet";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    hydrate(
        <React.StrictMode>
            <Router>
                <WalletProvider>
                    <AudioProvider>
                        <RadioProvider>
                            <UserPlaylistProvider>
                                <PlaylistProvider>
                                    <App>
                                        <Helmet/>
                                    </App>
                                </PlaylistProvider>
                            </UserPlaylistProvider>
                        </RadioProvider>
                    </AudioProvider>
                </WalletProvider>
            </Router>
        </React.StrictMode>,
        rootElement);
} else {
    render(
        <React.StrictMode>
            <Router>
                <WalletProvider>
                    <AudioProvider>
                        <RadioProvider>
                            <UserPlaylistProvider>
                                <PlaylistProvider>
                                    <App />
                                </PlaylistProvider>
                            </UserPlaylistProvider>
                        </RadioProvider>
                    </AudioProvider>
                </WalletProvider>
            </Router>
        </React.StrictMode>,
        rootElement
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
