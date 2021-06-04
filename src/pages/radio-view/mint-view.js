import useTitle from '../../hooks/use-title';
import RadioPlayer from '../../components/radio-player/radio-player';
import TrackList from '../../components/track-list/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect, useState } from 'react';

const MintView = () => {
    useTitle(`H=N Radio Mint`);

    return (
        <>
           <h1>Mint</h1>
           <h2>Getting started</h2>
           <p><b><a href='https://github.com/hicetnunc2000/hicetnunc/wiki/Getting-Started-with-Tezos'>This link</a></b> is a good place to start your Tezos digital art journey. You just need Tezos in a Kukai wallet. Then go to <b><a href='https://www.hicetnunc.xyz/'>hicetnunc</a> </b> and sync your wallet from the top right, and you are ready to mint.</p>
           <h2>Minting music</h2>
           <p>To mint music, we recommend that you use an html template, and add the HEN.RADIO tag when minting. Doing so, your music will look good in your collection, and will be discoverable on this radio. You will find templates <a href='https://github.com/hicetnunc2000/hicetnunc/wiki/Tools-made-by-the-community#minting-tools'><b>here</b>. More to come soon.</a></p>
           <p>A tool to prepare your zip for minting can be found <a href='http://54.204.78.173:3000/'><b>here</b>(test only)</a>, and will eventually allow you to mint music templates directly.</p>
        </>
    );
};

export default MintView;


