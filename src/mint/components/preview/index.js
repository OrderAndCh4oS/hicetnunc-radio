
import React, { useState, useEffect } from 'react'
import styles from '../../../components/radio-player/styles.module.css';
import { renderMediaType } from '../media-types'
import { Tags } from '../tags'
import PlayPauseButton from '../../../components/radio-player/play-pause-button';
import MuteButton from '../../../components/radio-player/mute-button';
import getAudioTime from '../../../utilities/get-audio-time';
import useRadio from '../../../hooks/use-radio';

export const Preview = ({ title, description, mimeType, displayUri , previewUri, tags }) => {
  const token_tags = tags !== '' ? tags.replace(/\s/g, '').split(',') : []
  console.log(token_tags);
  return (
    <div className={styles.container}>
      <div className={styles.media}>
        {renderMediaType({
          mimeType,
          previewUri,
          displayUri,
          interactive: true,
          preview: true,
        })}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <Tags token_tags={token_tags} preview={true} />
      </div>
    </div>
  )
}
