const template = 


`

    <!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="hen-audio-html-container">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta property="og:image" content="cover.jpg" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Plays on HEN.RADIO</title>
    <style>
        html,
        body {
            color: #1d1d1b;
            background: #191919;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0;
            padding: 0;
            font-size: 11px;
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
            display: flex;
            justify-content: center;
            padding: 8px 12px;
            margin-bottom: 6px;
        }

        .logo-holder {
            display: flex;
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
            /*  box-shadow: 1px 1px 1px rgba(7, 7, 17, 0.15), 0 0 1px rgba(79, 176, 81, 0.2);*/
            background: #fff;
            border-radius: 8px;
            /*border: 0 solid rgba(79, 176, 81, 0.2);*/
        }

        input[type="range"]::-webkit-slider-thumb {
            /*box-shadow: 2.1px 2.1px 3.8px rgba(7, 7, 17, 0.15), 0 0 2.1px rgba(14, 14, 35, 0.15);*/
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
            box-shadow: 1px 1px 1px rgba(7, 7, 17, 0.15), 0 0 1px rgba(79, 176, 81, 0.2);
            background: #fff;
            border-radius: 8px;
            border: 0 solid rgba(79, 176, 81, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
            box-shadow: 2.1px 2.1px 3.8px rgba(7, 7, 17, 0.15), 0 0 2.1px rgba(14, 14, 35, 0.15);
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
            border: 0 solid rgba(79, 176, 81, 0.2);
            border-radius: 4.5px;
            box-shadow: 1px 1px 1px rgba(7, 7, 17, 0.15), 0 0 1px rgba(79, 176, 81, 0.2);
        }

        input[type="range"]::-ms-fill-upper {
            background: #fff;
            border: 0 solid rgba(79, 176, 81, 0.2);
            border-radius: 4.5px;
            box-shadow: 1px 1px 1px rgba(79, 176, 81, 0.4), 0 0 1px rgba(79, 176, 81, 0.2);
        }

        input[type="range"]::-ms-thumb {
            box-shadow: 2.1px 2.1px 3.8px rgba(7, 7, 17, 0.15), 0 0 2.1px rgba(14, 14, 35, 0.15);
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
        }
    </style>
</head>

<body>
    <audio id="radio-stream" src="music.mp3"></audio>
    <div class="player-bar">
        <div class="logo-holder">
            <a href="https://hen.radio/" title="Visit Hen.Radio">
                <img class="logo" src="cover.jpg" alt="Hen.Radio">
            </a>
        </div>
        <div class="controls-holder">
            <button id="play" class="button button--play button--player-control">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <title>Play</title>
                    <path fill="currentColor"
                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">
                    </path>
                </svg>
            </button>
            <input title="volume" id="volume" type="range" value="0.5" min="0" max="1" step="0.01" />
            <button id="mute" class="button button--mute button--player-control">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <title>Mute</title>
                    <path fill="currentColor"
                        d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
    <script>
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API
        let currentVolume = 0.5;

        const playIcon = \`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <title>Play</title>
            <path fill="currentColor"
                  d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
        </svg>
    \`;

        const pauseIcon = \`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <title>Pause</title>
            <path fill="currentColor"
                  d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
        </svg>
    \`;

        const muteIcon = \`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <title>Mute</title>
            <path fill="currentColor"
                  d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path>
        </svg>
    \`;

        const unmuteIcon = \`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <title>Unmute</title>
            <path fill="currentColor"
                  d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path>
        </svg>
    \`;

        const makeToggle = state => ({
            state,
            get: () => state,
            toggle: () => state = !state,
        });

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = null;
        let source = null;
        let gain = null;
        let analyser = null;
        let bufferLength = null;
        let dataArray = null;
        const audioElement = document.querySelector('audio');
        audioElement.volume = currentVolume;
        const play = document.getElementById('play');
        const mute = document.getElementById('mute');
        const volume = document.getElementById('volume');
        // const canvas = document.getElementById('canvas');
        const currentShowView = document.getElementById('current-show');
        //let width = canvas.width = window.innerWidth;
        //let height = canvas.height = 60;
        //const context = canvas.getContext('2d');
        const isPlaying = makeToggle(false);
        const isMuted = makeToggle(false);
        const currentShow = {
            state: {
                title: 'Loading...',
                description: '',
                presenters: [],
                times: '',
            },
            set: (data, times) => {
                this.state = {
                    title: data.radio_show.name,
                    description: data.radio_show.description,
                    presenters: data.radio_show.presenters.map(p => p.name),
                    times
                }
            },
            get: () => this.state,
            update: () => {
                const holder = document.createElement('div');
                const title = document.createElement('h2');
                const description = document.createElement('p');
                const presenters = document.createElement('p');
                const times = document.createElement('p');
                holder.classList.add('show-holder');
                title.classList.add('show-title');
                description.classList.add('show-description');
                presenters.classList.add('show-presenters');
                times.classList.add('show-times');
                title.innerText = this.state.title;
                description.innerText = this.state.description;
                presenters.innerText = 'Presented by ' + this.state.presenters.join(', ');
                times.innerText = this.state.times;
                holder.append(title);
                holder.append(presenters);
                holder.append(times);
                currentShowView.innerHTML = "";
                currentShowView.append(holder);
            }
        };

        const padTime = (time) => {
            while (time.toString().length < 2) {
                time = "0" + time;
            }
            return time;
        }

        const getTimes = (startTime, endTime) =>
            \`\${startTime.getHours()}:\${padTime(startTime.getMinutes())}—\` +
            \`\${endTime.getHours()}:\${padTime(endTime.getMinutes())}\`

        const initAudioContext = () => {
            if (!audioContext) {
                audioContext = new AudioContext();
                source = audioContext.createMediaElementSource(audioElement);
                gain = audioContext.createGain();
                analyser = audioContext.createAnalyser();
                analyser.connect(audioContext.destination);
                source.connect(analyser);
                source.connect(gain);
                analyser.fftSize = 64;
                bufferLength = analyser.frequencyBinCount;
                dataArray = new Float32Array(bufferLength);
            }
        };

        const togglePlayer = () => {
            isPlaying.toggle();

            if (isPlaying.get()) {
                audioElement.play();
            } else {
                audioElement.pause();
            }

            play.classList.remove(!isPlaying.get() ? 'button--pause' : 'button--play');
            play.classList.add(isPlaying.get() ? 'button--pause' : 'button--play');
            play.innerHTML = isPlaying.get() ? pauseIcon : playIcon;
        };

        const handlePlayClick = () => {
            initAudioContext();
            togglePlayer();
        };

        const handleMuteClick = () => {
            isMuted.toggle();
            volume.value = audioElement.volume = isMuted.get() ? 0 : currentVolume;
            mute.classList.remove(!isMuted.get() ? 'button--unmute' : 'button--mute');
            mute.classList.add(isMuted.get() ? 'button--unmute' : 'button--mute');
            mute.innerHTML = isMuted.get() ? unmuteIcon : muteIcon;
        };

        const handleVolumeChange = () => {
            audioElement.volume = currentVolume = volume.value;
        };

        const handleResize = () => {
            //width = canvas.width = window.innerWidth;
        };

        play.addEventListener('click', handlePlayClick);
        mute.addEventListener('click', handleMuteClick);
        volume.addEventListener('change', handleVolumeChange);
        window.addEventListener('resize', handleResize);

    </script>
</body>

</html>`
export default template;