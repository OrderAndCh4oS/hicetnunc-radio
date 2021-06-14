const templateStyle = `html,
body {
    color: #1d1d1b;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.cover-holder {
    display: flex;
    align-items: center;
    align-content: center;
    overflow: hidden;
}

.cover {
    width: 100%;
    height: auto;
}

.button {
    border: none;
    background: none;
}

.controls-holder {
    display: flex;
    z-index: 1;
    position: absolute;
    bottom: 0;
}

.button--player-control {
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0 6px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: flex-end;
}


.button--play svg {
    width: 16px;
    height: auto;
    margin-top: 10px;
}

.button--mute svg {
    width: 24px;
    height: auto;
    margin-top: 8px
}

.button--unmute svg {
    width: 24px;
    height: auto;
    margin-top: 7px;
}

.button--pause svg {
    width: 17px;
    height: auto;
    margin-top: 10px;
}

.player-bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    padding: 8px 12px;
    width: 100%;
    background-color: #fff;
    height: 30px;
}

input[type="range"] {
    -webkit-appearance: none;
    background-color: transparent;
    width: 100%;
    position: relative;
    top: -2px;
    margin: 11.5px 0;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(7, 7, 7, 0.15), 0 0 1px rgba(77, 77, 77, 0.2);
    background: #fff;
    border-radius: 8px;
    border: 0 solid rgba(77, 77, 77, 0.2);
}

input[type="range"]::-webkit-slider-thumb {
    box-shadow: 2px 2px 4px rgba(7, 7, 7, 0.15), 0 0 2px rgba(14, 14, 14, 0.15);
    height: 20px;
    width: 6px;
    border-radius: 4.5px;
    background: #1d1d1b;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #fff;
}

input[type="range"]::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(7, 7, 7, 0.15), 0 0 1px rgba(77, 77, 77, 0.2);
    background: #fff;
    border-radius: 8px;
    border: 0 solid rgba(77, 77, 77, 0.2);
}

input[type="range"]::-moz-range-thumb {
    box-shadow: 2px 2px 4px rgba(7, 7, 7, 0.15), 0 0 2px rgba(14, 14, 14, 0.15);
    height: 20px;
    width: 6px;
    border-radius: 4.5px;
    background: #1d1d1b;
    cursor: pointer;
}

input[type="range"]::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type="range"]::-ms-fill-lower {
    background: #fff;
    border: 0 solid rgba(77, 77, 77, 0.2);
    border-radius: 4.5px;
    box-shadow: 1px 1px 1px rgba(7, 7, 7, 0.15), 0 0 1px rgba(77, 77, 77, 0.2);
}

input[type="range"]::-ms-fill-upper {
    background: #fff;
    border: 0 solid rgba(77, 77, 77, 0.2);
    border-radius: 4.5px;
    box-shadow: 1px 1px 1px rgba(77, 77, 77, 0.4), 0 0 1px rgba(77, 77, 77, 0.2);
}

input[type="range"]::-ms-thumb {
    box-shadow: 2px 2px 4px rgba(7, 7, 7, 0.15), 0 0 2px rgba(14, 14, 14, 0.15);
    width: 6px;
    border-radius: 4.5px;
    background: #1d1d1b;
    cursor: pointer;
    height: 4px;
}

input[type="range"]:focus::-ms-fill-lower {
    background: #fff;
}

input[type="range"]:focus::-ms-fill-upper {
    background: #fff;
}`
export default templateStyle;
