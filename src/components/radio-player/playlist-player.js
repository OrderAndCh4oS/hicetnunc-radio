import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MuteButton from './mute-button';
import PlayPauseButton from './play-pause-button';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import TrackList from '../track-list/track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from '../track-list/tracks-filter-bar';
import useRadio from '../../hooks/use-radio';
import getAudioTime from '../../utilities/get-audio-time';

const PlaylistPlayer = ({playlist}) => {
    const {
        audio,
        audioError,
        playerState,
        setPlayerState,
        controls,
        isTrackPlaying,
        runningTime
    } = useRadio();

    const [creatorMetadata, setCreatorMetadata] = useState({});

    audio.onended = () => {
        if(!playlist.tracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (playerState.currentTrackKey + 1) % playlist.tracks.length;
        audio.src = playlist.tracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: playlist.tracks[nextTrackKey].id,
        }));
    };

    useEffect(() => {
        if(!playlist.tracks?.length || !audio) return;
        if(audio.src) return;
        audio.crossOrigin = 'anonymous';
        audio.src = playlist.tracks[0].src;
        audio.volume = playerState.volume;
        audio.mimeType = playlist.tracks[0].mimeType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playlist.tracks]);

    useEffect(() => {
        if(!playlist.tracks) return;
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
    }, [playlist]);

    if(!playlist.tracks) return <p>Loading...</p>;

    return (
        <div className={styles.radioPlayerContainer}>
            <div className={styles.playerBar}>
                <div className={styles.controlsHolder}>
                    <PlayPauseButton/>
                    <input
                        className={styles.radioRange}
                        title="volume"
                        type="range"
                        value={playerState.volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={controls.volume}
                    />
                    <MuteButton/>
                </div>
                <div className={styles.runningTime}>{getAudioTime(runningTime)} of {getAudioTime(audio.duration)}</div>
            </div>
            <div className={styles.nextPrevControls}>
                <button
                    className={styles.button_prevTrack}
                    onClick={controls.previous(playlist.tracks)}
                >Prev
                </button>
                <button
                    className={styles.button_nextTrack}
                    onClick={controls.next(playlist.tracks)}
                >Next
                </button>
                {playerState.currentTrackKey !== null
                    ? (
                        <div className={styles.currentTrack}>
                            {playlist.tracks[playerState.currentTrackKey].name}
                        </div>
                    ) : null}
            </div>
            {audioError && <p className={styles.errorText}>{audioError}</p>}
            <TrackList
                filteredTracks={playlist.tracks}
                isTrackPlaying={isTrackPlaying}
                handlePause={controls.pause}
                handleSelectTrack={controls.selectTrack(playlist.tracks)}
                creatorMetadata={creatorMetadata}
            />
        </div>
    );
};

export default PlaylistPlayer;
