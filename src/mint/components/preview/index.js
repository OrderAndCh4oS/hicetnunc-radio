
import React, { useState, useEffect } from 'react'
import styles from '../../../components/radio-player/styles.module.css';
import PlayPauseButton from '../../../components/radio-player/play-pause-button';
import MuteButton from '../../../components/radio-player/mute-button';
import getAudioTime from '../../../utilities/get-audio-time';
import useRadio from '../../../hooks/use-radio';

export const Preview = ({ title, description, coverImg, audioFile, tags }) => {
  const [preview, setPreview] = useState();
  const {
    audio
  } = useRadio();




  useEffect(() => {

    const reader = new FileReader();

    const playFile = (file) => {

      const url = window.URL.createObjectURL(file);
      audio.src = url;

    }

    const displayImg = (img) => {
      reader.onloadend = (e) => {
        setPreview(e.target.result);
      }

      reader.readAsDataURL(img);
    };

    playFile(audioFile);
    displayImg(coverImg);
  }, []);



  return (
    <div className={styles.radioPlayerContainer}>
      <div className={styles.playerBar}>
        <div className={styles.controlsHolder}>
          <PlayPauseButton />
          <input
            className={styles.radioRange}
            title="volume"
            type="range"

            min="0"
            max="1"
            step="0.01"

          />
          <MuteButton />
        </div>
      </div>

      <img src={preview} alt=""></img>
    </div>
  );
};
