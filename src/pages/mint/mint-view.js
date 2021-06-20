import React, { useContext, useEffect, useState } from 'react'
import Compressor from 'compressorjs'

import { HicetnuncContext } from '../../mint/context/HicetnuncContext'
import { Page, Container, Padding } from '../../mint/components/layout'
import { Input } from '../../mint/components/input'
import { Button, Curate, Primary } from '../../mint/components/button'
import { Upload } from '../../mint/components/upload'
import { Preview } from '../../mint/components/preview'
import { prepareFile, prepareDirectory } from '../../mint/data/ipfs'
import { prepareFilesFromZIP } from '../../mint/utils/html'
import {
  ALLOWED_MIMETYPES,
  ALLOWED_FILETYPES_LABEL,
  ALLOWED_COVER_MIMETYPES,
  ALLOWED_COVER_FILETYPES_LABEL,
  MINT_FILESIZE,
  MIMETYPE,
  MAX_EDITIONS,
  MIN_ROYALTIES,
  MAX_ROYALTIES,
} from '../../mint/constants'

//for template
import mintTemplate from './template';
import styles from './styles.js';
import { FeedbackComponent } from '../../mint/components/feedback'

const ALLOWED_AUDIO_MIMETYPES = [
  MIMETYPE.MP3,
]
const ALLOWED_AUDIO_FILETYPES_LABEL = ['mp3']

///////////////////////////////////////////////////


const coverOptions = {
  quality: 0.85,
  maxWidth: 1024,
  maxHeight: 1024,
}

const thumbnailOptions = {
  quality: 0.85,
  maxWidth: 350,
  maxHeight: 350,
}

// @crzypathwork change to "true" to activate displayUri and thumbnailUri
const GENERATE_DISPLAY_AND_THUMBNAIL = true

const MintView = () => {
  const { mint, getAuth, acc, setAccount, setFeedback, syncTaquito } =
    useContext(HicetnuncContext)
  // const history = useHistory()
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [amount, setAmount] = useState()
  const [royalties, setRoyalties] = useState()
  const [zipFile, setZipFile] = useState() // the uploaded file
  const [cover, setCover] = useState() // the uploaded or generated cover image, as it appears in the collection
  const [thumbnail, setThumbnail] = useState() // the uploaded or generated cover image


  ////////////////////////////////////////////////////

  const [audioCover, setAudioCover] = useState(''); // the image displayed when we view the objkt
  const [audioFile, setAudioFile] = useState('');

  ///////////////////////////////////

  const handleMint = async () => {
    console.log(acc)
    if (!acc) {
      console.log('need syn wallet')
      // warning for sync
      setFeedback({
        visible: true,
        message: 'sync your wallet',
        progress: true,
        confirm: false,
      })
      await syncTaquito()
      setFeedback({
        visible: false,
      })
    } else {
      console.log(acc)
      console.log('set wallet')
      await setAccount()
      // check mime type
      if (ALLOWED_MIMETYPES.indexOf(zipFile.mimeType) === -1) {
        // alert(
        //   `File format invalid. supported formats include: ${ALLOWED_FILETYPES_LABEL.toLocaleLowerCase()}`
        // )

        setFeedback({
          visible: true,
          message: `File format invalid. supported formats include: ${ALLOWED_FILETYPES_LABEL.toLocaleLowerCase()}`,
          progress: false,
          confirm: true,
          confirmCallback: () => {
            setFeedback({ visible: false })
          },
        })

        return
      }

      // check file size
      const filesize = (zipFile.size / 1024 / 1024).toFixed(4)
      if (filesize > MINT_FILESIZE) {
        // alert(
        //   `File too big (${filesize}). Limit is currently set at ${MINT_FILESIZE}MB`
        // )

        setFeedback({
          visible: true,
          message: `File too big (${filesize}). Limit is currently set at ${MINT_FILESIZE}MB`,
          progress: false,
          confirm: true,
          confirmCallback: () => {
            setFeedback({ visible: false })
          },
        })

        return
      }

      // file about to be minted, change to the mint screen

      setStep(2)

      setFeedback({
        visible: true,
        message: 'preparing OBJKT',
        progress: true,
        confirm: false,
      })

      // upload file(s)
      let nftCid
      if (
        [MIMETYPE.ZIP, MIMETYPE.ZIP1, MIMETYPE.ZIP2].includes(zipFile.mimeType)
      ) {
        let uint8View = new Uint8Array(zipFile.buffer);
        const files = await prepareFilesFromZIP(uint8View)

        nftCid = await prepareDirectory({
          name: title,
          description,
          tags,
          address: acc.address,
          files,
          cover,
          thumbnail,
          generateDisplayUri: GENERATE_DISPLAY_AND_THUMBNAIL,
        })
      } else {
        // process all other files
        nftCid = await prepareFile({
          name: title,
          description,
          tags,
          address: acc.address,
          buffer: zipFile.buffer,
          mimeType: zipFile.mimeType,
          cover,
          thumbnail,
          generateDisplayUri: GENERATE_DISPLAY_AND_THUMBNAIL,
        })
      }

      mint(getAuth(), amount, nftCid.path, royalties)
    }
  }

  const handlePreview = () => {
console.log(audioFile)
    setStep(1)
  }

  const generateCompressedImage = async (props, options) => {
    const blob = await compressImage(props.file, options)
    const mimeType = blob.type
    const buffer = await blob.arrayBuffer()
    const reader = await blobToDataURL(blob)
    return { mimeType, buffer, reader }

  }

  const generateCompressedImgForZip = async (props, options) => {
    const blob = await compressImage(props.file, options)

    const compressedImg = new File([blob], "cover")
    return compressedImg
  }

  const compressImage = (file, options) => {
    return new Promise(async (resolve, reject) => {
      new Compressor(file, {
        ...options,
        success(blob) {
          resolve(blob)
        },
        error(err) {
          reject(err)
        },
      })
    })
  }

  const blobToDataURL = async (blob) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onerror = reject
      reader.onload = (e) => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  const handleAudioUpload = (props) => {
    setAudioFile(props.file);
  }

  const handleCoverUpload = async (props) => {
    await generateCoverAndThumbnail(props)
  }

  const generateCoverAndThumbnail = async (props) => {
    // TMP: skip GIFs to avoid making static
    if (props.mimeType === MIMETYPE.GIF) {
      setCover(props)
      setThumbnail(props)
      setAudioCover(props)
      return
    }

    const cover = await generateCompressedImage(props, coverOptions)
    setCover(cover)

    const zipImg = await generateCompressedImgForZip(props, coverOptions)
    setAudioCover(zipImg)

    const thumb = await generateCompressedImage(props, thumbnailOptions)
    setThumbnail(thumb)
  }

  const limitNumericField = async (target, minValue, maxValue) => {
    if (target.value === '') target.value = '' // Seems redundant but actually cleans up e.g. '234e'
    target.value = Math.round(
      Math.max(Math.min(target.value, maxValue), minValue)
    )
  }

  const handleValidation = () => {

    return audioCover && audioFile ? false : true;

  }



  return (
    <Page title="mint" large>
      <FeedbackComponent />
      {step === 0 && (
        <>
          <Container>
            <Padding>
              <Input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                label="title"
                value={title}
              />

              <Input
                type="text"
                style={{ whiteSpace: 'pre' }}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                label="description"
                maxlength="5000"
                value={description}
              />

              <Input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                placeholder="tags (comma separated. example: illustration, digital)"
                label="tags"
                value={tags}
              />

              <Input
                type="number"
                min={1}
                max={MAX_EDITIONS}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={(e) => {
                  limitNumericField(e.target, 1, MAX_EDITIONS)
                  setAmount(e.target.value)
                }}
                placeholder={`editions (no. editions, 1-${MAX_EDITIONS})`}
                label="editions"
                value={amount}
              />

              <Input
                type="number"
                min={MIN_ROYALTIES}
                max={MAX_ROYALTIES}
                onChange={(e) => setRoyalties(e.target.value)}
                onBlur={(e) => {
                  limitNumericField(e.target, MIN_ROYALTIES, MAX_ROYALTIES)
                  setRoyalties(e.target.value)
                }}
                placeholder={`royalties after each sale (between ${MIN_ROYALTIES}-${MAX_ROYALTIES}%)`}
                label="royalties"
                value={royalties}
              />
            </Padding>
          </Container>

          <Container>
            <form>
              <Upload
                label="Upload cover image"
                allowedTypes={ALLOWED_COVER_MIMETYPES}
                allowedTypesLabel={ALLOWED_COVER_FILETYPES_LABEL}
                onChange={handleCoverUpload}
              />
              <Upload
                label="Upload music file"
                allowedTypes={ALLOWED_AUDIO_MIMETYPES}
                allowedTypesLabel={ALLOWED_AUDIO_FILETYPES_LABEL}
                onChange={handleAudioUpload}
              />
            </form>
          </Container>
          <Container>
            <Padding>
              <Button onClick={handlePreview} fit disabled={handleValidation()}>
                <Curate>Preview</Curate>
              </Button>
            </Padding>
          </Container>
        </>
      )}

      {step === 1 && (
        <>
          <Container>
            <Padding>
              <div style={{ display: 'flex' }}>
                <Button onClick={() => setStep(0)} fit>
                  <Primary>
                    <strong>back</strong>
                  </Primary>
                </Button>
              </div>
            </Padding>
          </Container>

          <Container>
            <Padding>
              <Preview
                coverImg={audioCover}
                audioFile={audioFile}
                title={title}
                description={description}
                tags={tags}
              />
            </Padding>
          </Container>

          <Container>
            <Padding>
              <Button onClick={handleMint} fit>
                <Curate>mint OBJKT</Curate>
              </Button>
            </Padding>
          </Container>

          <Container>
            <Padding>
              <p>this operation costs 0.08~ tez</p>
              <p>Your royalties upon each sale are {royalties}%</p>
            </Padding>
          </Container>
        </>
      )}
    </Page>
  )
}

export default MintView;