import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import RadioProvider from './context/radio-context';
import AudioProvider from './context/audio-context';
import PlaylistProvider from './context/playlist-context';
import WalletProvider from './context/wallet-context';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <WalletProvider>
                <PlaylistProvider>
                    <AudioProvider>
                        <RadioProvider>
                            <App/>
                        </RadioProvider>
                    </AudioProvider>
                </PlaylistProvider>
            </WalletProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
