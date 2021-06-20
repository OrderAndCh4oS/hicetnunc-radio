import React, { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import createPlaylist from '../../api/playlist/create-playlist';

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

const Ipfs = ({playlist}) => {
    const [addedFileHash, setAddedFileHash] = useState(null);
    const [file, setFile] = useState(null);
    const ipfs = ipfsHttpClient('/dns4/ipfs.infura.io/tcp/5001/https');

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
            setAddedFileHash(added.cid.toString());
        } catch(err) {
            console.error(err);
        }
    };

    /*
      {"wallet": "tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN",
      "name": "Hicathon Dev",
      "curator": "HEN Radio",
      "description": "The tracks that made hen.radio, listened to on repeat for hackday development",
      "coverIpfsHash": "#",
      "tracks": [
        {
          "id": 48594,
          "name": "A l\"Ouest",
          "trackIpfsHash": "QmawLCNM666CsHajN7MfJH9baWq2JRshxXX7QETL9dR4NA",
          "mimeType": "audio/ogg",
          "creator": "tz2EaL8HTqjZhVAWrQ3Ddp4wNCxPeE8CtM5f"
        },
        ]}
     */
    const handleSubmit = async(event) => {
        event.preventDefault();
        await saveToIpfs();
        console.log('Save this playlist', playlist)
        console.log('with this cover hash', addedFileHash);
        await createPlaylist({
            wallet: '', // <--- Should get wallet id from a dApp connection.
            curator: '', // <--- Should get alias from a dApp connection.
            coverIpfsHash: addedFileHash,
            ...playlist
        })
    };

    if(ipfs) {
        return (
            <div>
                <form id='capture-media' onSubmit={handleSubmit}>
                    <input
                        type='file'
                        name='input-file'
                        id='input-file'
                        onChange={captureFile}
                    />
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
};

export default Ipfs;
