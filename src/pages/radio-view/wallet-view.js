import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import WalletTrackList from '../../components/track-lists/wallet-track-list';
import { useHistory, useParams } from 'react-router';
import useTitle from '../../hooks/use-title';
import useWallet from '../../hooks/use-wallet';
import { gql, request } from 'graphql-request';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {creator_id: asc}) {
            creator_id
        }
    }
`;

const WalletView = () => {
    const {tz} = useParams();
    const {walletId, setWalletId, objkts, isLoading, setIsLoading, error} = useWallet();
    const [walletsWithAudio, setWalletsWithAudio] = useState([]);
    useTitle(`H=N Radio ${walletId ? `| ${walletId}` : ''}`);
    useEffect(() => {
        if(!tz || tz === walletId) return;
        setWalletId(tz);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tz]);

    useEffect(() => {
        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            const uniqueWalletsSet = new Set(data?.hic_et_nunc_token?.map(o => o.creator_id));
            const nextCreatorMetadata = (await Promise.allSettled(
                [...uniqueWalletsSet]
                    .map(id => getUserMetadataByWalletId(id)),
            ))
                .filter(res => res.status === 'fulfilled')
                .map((res) => ({
                    ...res.value.data,
                    walletId: res.value.config.url.split('/')[5],
                }));
            setWalletsWithAudio(nextCreatorMetadata);
        })();
    }, []);

    const history = useHistory();
    const [walletIdInput, setWalletIdInput] = useState('');

    const handleWalletIdChange = (event) => {
        setWalletIdInput(event.target.value);
    };

    const handleWalletIdSelect = (walletId) => () => {
        setWalletId(walletId);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
        setIsLoading(true);
        if(walletIdInput) history.push(`/tz/${walletIdInput}`);
    };

    return (
        <>
            {objkts ? (
                <>
                    {isLoading ? <p>Loading...</p> : <WalletTrackList/>}
                </>
            ) : (<>{isLoading ? <p>Loading...</p> : null}</>)}
            <div className={styles.walletIdEntry}>
                <input
                    className={styles.walletInput}
                    value={walletIdInput}
                    placeholder={'Enter a wallet address'}
                    onChange={handleWalletIdChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                    disabled={!walletIdInput}
                >Get Tracks
                </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            <div>
                <h2 className={styles.walletTitle}>Wallets</h2>
                {walletsWithAudio.map((w) => (
                    <div
                        key={w.walletId}
                        className={styles.walletRow}
                    >
                        <button
                            className={styles.walletRow_button}
                            onClick={handleWalletIdSelect(w.walletId)}
                        >{w.walletId}</button>
                        {w.twitter ? <div>
                            <a
                                className={styles.walletRow_alias}
                                href={`https://twitter.com/${w.twitter}`}
                            >@{w.twitter}</a>
                        </div> : null}
                        <img
                            alt={'Artist\'s avatar'}
                            className={styles.walletRow_avatar}
                            src={`https://services.tzkt.io/v1/avatars2/${w.walletId}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default WalletView;
