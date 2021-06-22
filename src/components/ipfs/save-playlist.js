import React, { useRef, useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import createPlaylist from '../../api/playlist/create-playlist';
import useUser from '../../hooks/use-user';
import { trimWalletAddress } from '../../utilities/general';
import styles from './styles.module.css';

const ALLOWED_MIME_TYPES = [
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
];
const MAX_FILESIZE = 2;
const MAX_WIDTH = 2048;
const MAX_HEIGHT = 2048;

const SavePlaylist = ({playlist}) => {
    const {wallet, profile} = useUser();
    const [file, setFile] = useState(null);
    const ipfs = ipfsHttpClient('/dns4/ipfs.infura.io/tcp/5001/https');
    const descriptionRef = useRef();
    const fileRef = useRef();
    const makeImage = nextFile => {
        const img = new Image();
        img.src = window.URL.createObjectURL(nextFile);
        return img;
    };

    const captureFile = async(event) => {
        const files = event.target.files;
        if(!files.length) return;
        const nextFile = files[0];
        if(!nextFile)
            alert('Missing file');
        if(nextFile.size / 1024 / 1024 > MAX_FILESIZE)
            alert(`File is too large, max size: ${MAX_FILESIZE}Mb`);
        if(!ALLOWED_MIME_TYPES.includes(nextFile.type))
            alert('File type not allowed, must be bmp, jpeg, png, gif or webp');
        const img = makeImage(nextFile);
        if(img.width > MAX_WIDTH || img.height > MAX_HEIGHT)
            alert(`Image exceeds maximum dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px`);

        setFile(nextFile);
    };

    const saveToIpfs = async() => {
        if(!file) alert('Please select a cover image to upload');
        try {
            const added = await ipfs.add(
                file,
                {
                    progress: (data) => console.log(`received: ${data}`),
                },
            );
            return added.cid.toString();
        } catch(err) {
            console.error(err);
        }
    };

    const handleSubmit = async() => {
        const coverIpfsHash = await saveToIpfs();
        const description = descriptionRef.current.value || '';
        try {
            await createPlaylist({
                ...playlist,
                description,
                wallet,
                curator: profile.alias || trimWalletAddress(wallet),
                coverIpfsHash,
            });
            descriptionRef.current.value = '';
            fileRef.current.value = '';
            setFile(null);
            // Todo: Show success message
        } catch(e) {
            // Todo: handle errors
            console.log(e)
        }
    };

    if(!(ipfs && wallet && profile)) return null;

    return (
        <div>
            <h3 className={styles.title}>Save Playlist</h3>
            <div className={styles.formField}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                    ref={descriptionRef}
                    className={styles.textarea}
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel}>Cover Image</label>
                <input
                    type='file'
                    name='input-file'
                    id='input-file'
                    onChange={captureFile}
                    ref={fileRef}
                />
            </div>
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default SavePlaylist;
