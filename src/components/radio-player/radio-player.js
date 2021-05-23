import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { createRef } from 'react/cjs/react.production.min';
import MuteButton from './mute-button';
import PlayPauseButton from './play-pause-button';
import PauseIcon from './pause-icon';
import PlayIcon from './play-icon';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';

let rAF;

const FilterTypes = Object.freeze({
    ALL: 0,
    CREATIONS: 1,
    COLLECTIONS: 2,
});

const RadioPlayer = ({audioObjkts, walletId}) => {
    const [audioState, setAudioState] = useState({
        audioContext: null,
        source: null,
        gain: null,
        analyser: null,
        bufferLength: null,
        dataArray: null,
    });
    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrackKey: null,
        currentId: null,
        isPlaying: false,
        isMuted: false,
        volume: 0.5,
    });
    const [runningTime, setRunningTime] = useState(0);
    const [tracks, setTracks] = useState(null);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);
    const [creatorMetadata, setCreatorMetadata] = useState({});
    const audioRef = createRef(null);

    useEffect(() => {
        setTracks(audioObjkts.map(o => ({
            id: o.token_id,
            creator: o.token_info.creators[0],
            name: o.token_info.name,
            src: `https://cloudflare-ipfs.com/ipfs/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
        })));
    }, [audioObjkts]);

    useEffect(() => {
        if(!tracks?.length || !audioRef.current) return;
        if(audioRef.current.src) return;
        audioRef.current.crossOrigin = 'anonymous';
        audioRef.current.src = tracks[0].src;
        audioRef.current.volume = playerState.volume;
        audioRef.current.mimeType = tracks[0].mimeType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioState, tracks]);

    useEffect(() => {
        if(!audioRef.current) return;
        if(audioState.audioContext) return;
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioRef.current);
        const gain = audioContext.createGain();
        const analyser = audioContext.createAnalyser();
        analyser.connect(audioContext.destination);
        source.connect(analyser);
        source.connect(gain);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        setAudioState({
            audioContext,
            source,
            gain,
            analyser,
            bufferLength,
            dataArray,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioRef]);

    useEffect(() => {
        if(!tracks) return;
        setFilteredTracks(tracks.filter(t => {
            switch(filter) {
                case FilterTypes.ALL:
                    return true;
                case FilterTypes.CREATIONS:
                    return t.creator === walletId;
                case FilterTypes.COLLECTIONS:
                    return t.creator !== walletId;
                default:
                    return true;
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks, filter]);

    useEffect(() => {
        if(!tracks) return;
        (async () => {
            const uniqueCreatorWalletIds = new Set(tracks.map(t => t.creator))
            const nextCreatorMetadata = (await Promise.allSettled(
                [...uniqueCreatorWalletIds]
                    .map(id => getUserMetadataByWalletId(id))
            ))
                .filter(res => res.status === 'fulfilled')
                .reduce((obj, res) => {
                    try {
                        const walletId = res.value.data.logo.split('.')[0]
                        obj[walletId] = res.value.data;
                    } catch(e) {
                        console.warn('Error fetching metadata:', e)
                    }
                    return obj;
                }, {});
            setCreatorMetadata(nextCreatorMetadata);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks, filter]);

    const updateTrackPlayDuration = (audioEl) => () => {
        rAF = requestAnimationFrame(updateTrackPlayDuration(audioEl));
        setRunningTime(audioEl.currentTime);
    };

    const getPlayTime = (time) => {
        const minutes = ~~(time / 60);
        const seconds = time - minutes * 60;
        return `${minutes}.${pad(~~seconds, 2)}`;
    };

    const handlePlay = () => {
        if(!audioRef.current) return;
        rAF = requestAnimationFrame(updateTrackPlayDuration(audioRef.current));
        audioState.audioContext.resume();
        audioRef.current.play();
        setPlayerState(prevState => ({...prevState, isPlaying: true}));
    };

    const handleSelectTrack = i => () => {
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(updateTrackPlayDuration(audioRef.current));
        audioRef.current.src = filteredTracks[i].src;
        audioState.audioContext.resume();
        audioRef.current.play();
        setRunningTime(0);
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            currentId: filteredTracks[i].id,
            isPlaying: true,
        }));
    };

    const handlePause = () => {
        if(!audioRef.current) return;
        cancelAnimationFrame(rAF);
        audioRef.current.pause();
        setPlayerState(prevState => ({...prevState, isPlaying: false}));
    };

    const handleMute = () => {
        if(!audioRef.current) return;
        audioRef.current.volume = 0;
        setPlayerState(prevState => ({...prevState, isMuted: true}));
    };

    const handleUnmute = () => {
        if(!audioRef.current) return;
        audioRef.current.volume = playerState.volume;
        setPlayerState(prevState => ({...prevState, isMuted: false}));
    };

    const handleVolumeChange = (event) => {
        if(!audioRef.current) return;
        const volume = event.target.value;
        audioRef.current.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleNext = () => {
        const {currentTrackKey} = playerState;
        const nextTrackKey = (currentTrackKey + 1) % filteredTracks.length;
        audioRef.current.src = filteredTracks[nextTrackKey].src;
        if(playerState.isPlaying) {
            audioState.audioContext.resume();
            audioRef.current.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: filteredTracks[nextTrackKey].id,
        }));
    };

    const handlePrev = () => {
        const {currentTrackKey} = playerState;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = filteredTracks.length - 1;
        audioRef.current.src = filteredTracks[prevTrackKey].src;
        if(playerState.isPlaying) {
            audioState.audioContext.resume();
            audioRef.current.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: prevTrackKey,
            currentId: filteredTracks[prevTrackKey].id,
        }));
    };

    const isTrackPlaying = id => playerState.isPlaying && playerState.currentId === id;

    const pad = (n, width, unit) => {
        unit = unit || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(unit) + n;
    };

    const getCreator = creator => {
        return creator.slice(0, 5) + '...' + creator.slice(-5);
    };

    if(!tracks) return <p>Loading...</p>;

    function getAlias(t) {
        return t.creator in creatorMetadata ? creatorMetadata[t.creator].alias : '';
    }

    return (
        <div className={styles.radioPlayerContainer}>
            <audio ref={audioRef}/>
            <div className={styles.playerBar}>
                <div className={styles.controlsHolder}>
                    <PlayPauseButton
                        isPlaying={playerState.isPlaying}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                    <input
                        className={styles.radioRange}
                        title="volume"
                        type="range"
                        value={playerState.volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleVolumeChange}
                    />
                    <MuteButton
                        isMuted={playerState.isMuted}
                        handleMute={handleMute}
                        handleUnmute={handleUnmute}
                    />
                    <div className={styles.runningTime}>{getPlayTime(runningTime)}</div>
                </div>
            </div>
            <div className={styles.nextPrevControls}>
                <button
                    className={styles.button_prevTrack}
                    onClick={handlePrev}
                >Prev
                </button>
                <button
                    className={styles.button_nextTrack}
                    onClick={handleNext}
                >Next
                </button>
                {playerState.currentTrackKey !== null
                    ?
                    <div className={styles.currentTrack}>{tracks[playerState.currentTrackKey].name}</div>
                    : null}
            </div>
            <div className={styles.filterTabs}>
                <button
                    className={`${styles.filterButton} ${filter === FilterTypes.ALL
                        ? styles.selected
                        : ''}`}
                    onClick={() => setFilter(FilterTypes.ALL)}
                >All
                </button>
                <button
                    className={`${styles.filterButton} ${filter === FilterTypes.CREATIONS
                        ? styles.selected
                        : ''}`}
                    onClick={() => setFilter(FilterTypes.CREATIONS)}
                >Creations
                </button>
                <button
                    className={`${styles.filterButton} ${filter === FilterTypes.COLLECTIONS
                        ? styles.selected
                        : ''}`}
                    onClick={() => setFilter(FilterTypes.COLLECTIONS)}
                >Collections
                </button>
            </div>
            {!filteredTracks.length ? <p>No audio tracks available</p> : (
                <div>
                    {filteredTracks.map((t, i) =>
                        <div key={t.id} className={styles.trackRow}>
                            {isTrackPlaying(t.id)
                                ? (
                                    <button
                                        className={`${styles.button} ${styles.button_pause_small} ${styles.button_playerControl_small}`}
                                        onClick={handlePause}
                                    ><PauseIcon/></button>
                                ) : (
                                    <button
                                        className={`${styles.button} ${styles.button_play_small} ${styles.button_playerControl_small}`}
                                        onClick={handleSelectTrack(i)}
                                    ><PlayIcon/></button>
                                )}
                            <span className={styles.trackRow_text}>
                                <a
                                    href={`https://hicetnunc.xyz/objkt/${t.id}`}
                                    className={styles.trackRow_link}
                                >#{t.id} {t.name}</a>
                                <br/>
                                By <a
                                    href={`https://hicetnunc.xyz/tz/${t.creator}`}
                                    className={styles.trackRow_link}
                                >{getCreator(t.creator)} {getAlias(t)}</a>
                            </span>
                            <img
                                alt={'Artist\'s avatar'}
                                className={styles.trackRow_avatar}
                                src={`https://services.tzkt.io/v1/avatars2/${t.creator}`}
                            />
                        </div>,
                    )}
                </div>
            )}
        </div>
    );
};

export default RadioPlayer;
