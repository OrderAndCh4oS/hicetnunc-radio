import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MuteButton from './mute-button';
import PlayPauseButton from './play-pause-button';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import TrackList from '../track-list/track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from '../track-list/tracks-filter-bar';
import useRadio from '../../hooks/use-radio';

let rAF;

const pad = (n, width, unit) => {
    unit = unit || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(unit) + n;
};

const RadioPlayer = ({audioObjkts, walletId}) => {
    const {audio, audioContext} = useRadio();
    // console.log('RE-RENDERED');

    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrackKey: 0,
        currentId: null,
        isPlaying: null,
        isMuted: false,
        volume: 0.5,
        stateUpdatedBy: null,
    });
    const [runningTime, setRunningTime] = useState(0);
    const [tracks, setTracks] = useState(null);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);
    const [creatorMetadata, setCreatorMetadata] = useState({});
    const [error, setError] = useState(null);

    audio.onended = () => {
        // console.log('ENDED');
        if(!filteredTracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (getCurrentTrackKey() + 1) % filteredTracks.length;
        audio.src = filteredTracks[nextTrackKey].src;
        playAudio();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: filteredTracks[nextTrackKey].id,
        }));
    };

    useEffect(() => {
        // console.log('SET TRACKS');
        setTracks(audioObjkts.map(o => ({
            id: o.token_id,
            creator: o.token_info.creators[0],
            name: o.token_info.name,
            src: `https://cloudflare-ipfs.com/ipfs/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
        })));
    }, [audioObjkts]);

    useEffect(() => {
        // console.log('INIT AUDIO');
        if(!tracks?.length || !audio) return;
        if(audio.src) return;
        audio.crossOrigin = 'anonymous';
        audio.src = tracks[0].src;
        audio.volume = playerState.volume;
        audio.mimeType = tracks[0].mimeType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    useEffect(() => {
        // console.log('SET FILTER');
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
        // console.log('GET METADATA');
        if(!tracks) return;
        (async() => {
            const uniqueCreatorWalletIds = new Set(tracks.map(t => t.creator));
            const nextCreatorMetadata = (await Promise.allSettled(
                [...uniqueCreatorWalletIds]
                    .map(id => getUserMetadataByWalletId(id)),
            ))
                .filter(res => res.status === 'fulfilled')
                .reduce((obj, res) => {
                    try {
                        const walletId = res.value.data.logo.split('.')[0];
                        obj[walletId] = res.value.data;
                    } catch(e) {
                        console.warn('Error fetching metadata:', e);
                    }
                    return obj;
                }, {});
            setCreatorMetadata(nextCreatorMetadata);
        })();
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

    const getCurrentTrackKey = () => {
        return playerState.currentTrackKey;
    };

    const playAudio = async () => {
        try {
            audioContext.resume();
            await audio.play();
        } catch(e) {
            console.log('W!@£$R`t')
            setError('Failed to play track, possibly unsupported media.');
            setTimeout(() => {
                setError(null)
            }, 4000);
            console.log(e);
        }
    };

    const handlePlay = () => {
        if(!audio) return;
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
        playAudio();
        setPlayerState(prevState => ({...prevState, isPlaying: true}));
    };

    const handleSelectTrack = i => () => {
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
        audio.src = filteredTracks[i].src;
        playAudio();
        setRunningTime(0);
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            currentId: filteredTracks[i].id,
            isPlaying: true,
        }));
    };

    const handlePause = () => {
        if(!audio) return;
        cancelAnimationFrame(rAF);
        audio.pause();
        setPlayerState(prevState => ({...prevState, isPlaying: false}));
    };

    const handleMute = () => {
        if(!audio) return;
        audio.volume = 0;
        setPlayerState(prevState => ({...prevState, isMuted: true}));
    };

    const handleUnmute = () => {
        if(!audio) return;
        audio.volume = playerState.volume;
        setPlayerState(prevState => ({...prevState, isMuted: false}));
    };

    const handleVolumeChange = (event) => {
        if(!audio) return;
        const volume = event.target.value;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleNext = () => {
        const {currentTrackKey} = playerState;
        if(!filteredTracks.length) return;
        const nextTrackKey = (currentTrackKey + 1) % filteredTracks.length;
        audio.src = filteredTracks[nextTrackKey].src;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: filteredTracks[nextTrackKey].id,
        }));
    };

    const handlePrev = () => {
        const {currentTrackKey} = playerState;
        if(!filteredTracks.length) return;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = filteredTracks.length - 1;
        audio.src = filteredTracks[prevTrackKey].src;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: prevTrackKey,
            currentId: filteredTracks[prevTrackKey].id,
        }));
    };

    const isTrackPlaying = id => playerState.isPlaying && playerState.currentId === id;

    if(!tracks) return <p>Loading...</p>;

    return (
        <div className={styles.radioPlayerContainer}>
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
            {error && <p className={styles.errorText}>{error}</p>}
            <TracksFilterBar filter={filter} setFilter={setFilter}/>
            <TrackList
                filteredTracks={filteredTracks}
                isTrackPlaying={isTrackPlaying}
                handlePause={handlePause}
                handleSelectTrack={handleSelectTrack}
                creatorMetadata={creatorMetadata}
            />
        </div>
    );
};

export default RadioPlayer;
