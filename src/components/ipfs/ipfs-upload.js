import React, { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';

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

const Ipfs = () => {
    const [addedFileHash, setAddedFileHash] = useState(null);
    const [file, setFile] = useState(null);
    const ipfs = ipfsHttpClient('');

    const captureFile = async(event) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.target.files;
        if(!files.length) return;
        const nextFile = files[0];
        if(!nextFile)
            alert('Missing file');
        if(nextFile.file.size / 1024 / 1024 > MAX_FILESIZE)
            alert(`File is too large, max size: ${MAX_FILESIZE}Mb`);
        if(!(nextFile.type.match('image.*') && ALLOWED_MIME_TYPES.includes(nextFile.mimeType)))
            alert('File type not allowed, must be bmp, jpeg, png, gif or webp');

        const img = new Image();
        img.src = window.URL.createObjectURL(nextFile);

        if(img.width > MAX_WIDTH || img.height > MAX_HEIGHT)
            alert(`Image exceeds maximum dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px`);

        setFile(file);
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
            console.log(added);
            setAddedFileHash(added.cid.toString());
        } catch(err) {
            console.error(err);
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        await saveToIpfs();
        console.log('Submit Here');
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
                <div>
                    <a
                        id="gateway-link"
                        target='_blank'
                        rel='noreferrer'
                        href={'https://ipfs.io/ipfs/' + addedFileHash}
                    >
                        {addedFileHash}
                    </a>
                </div>
            </div>
        );
    }
};

export default Ipfs;