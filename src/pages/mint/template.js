const template = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta property="og:image" content="cover.jpg" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hic et Nunc: Audio Track</title>
    <link type="text/css" rel="stylesheet" href="styles.css"/>
</head>
<body>
    <audio id="radio-stream" src="music.mp3"></audio>
    <div class="cover-holder">
        <img class="cover" src="cover.jpg" alt="">
    </div>
    <div class="player-bar">
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
        const isPlaying = makeToggle(false);
        const isMuted = makeToggle(false);

        const padTime = (time) => {
            while (time.toString().length < 2) {
                time = "0" + time;
            }
            return time;
        }

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
            // Todo: Implement resize handler
        };

        play.addEventListener('click', handlePlayClick);
        mute.addEventListener('click', handleMuteClick);
        volume.addEventListener('change', handleVolumeChange);
        window.addEventListener('resize', handleResize);
    </script>
</body>

</html>
`
export default template;