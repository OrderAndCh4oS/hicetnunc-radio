import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RadioProvider from './context/radio-context';
import { HashRouter } from 'react-router-dom';
import AudioProvider from './context/audio-context';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <AudioProvider>
                <RadioProvider>
                    <App/>
                </RadioProvider>
            </AudioProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
