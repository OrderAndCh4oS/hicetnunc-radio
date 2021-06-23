/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

export const AudioComponent = ({
  artifactUri,
  displayUri,
  previewUri,
  preview,

 }) => {
 

  const classes = classnames({
    [styles.container]: true,
  })
  return (
    <>
      <div className={classes}>
        {true && <audio src={preview ? previewUri : artifactUri} controls />}
        {true && <img src={displayUri} alt="album cover" />}
      </div>
    </>
  )
}
