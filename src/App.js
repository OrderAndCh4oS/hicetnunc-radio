import { Link, Route, Switch } from 'react-router-dom';
import WalletView from './pages/radio-view/wallet-view';
import './app.css';
import styles from './styles.module.css';
import PlaylistView from './pages/radio-view/playlist-view';
import Logo from './components/logo/logo';
import Footer from './components/footer/footer';
import useWallet from './hooks/use-wallet';
import AllTracksView from './pages/radio-view/all-tracks-view';
import RadioPlayer from './components/radio-player/radio-player';
//for minting and hDao
import HicetnuncContextProvider from './mint/context/HicetnuncContext'
import MintView from './pages/mint/mint-view';


function App() {
    const { walletId } = useWallet();


    return (
        <HicetnuncContextProvider>
            <div className={styles.radioView}>


                <div className={styles.headerBar}>
                    <Logo />
                    <div className={styles.navBar}>
                        <Link className={styles.navBar_link} to={'/'}>All Tracks</Link>
                        <Link className={styles.navBar_link} to={'/playlists'}>Playlists</Link>
                        <Link className={styles.navBar_link} to={walletId ? `/tz/${walletId}` : '/tz'}>By Wallet</Link>
                        <Link className={styles.navBar_link} to={'/mint'}>Mint</Link>
                    </div>
                </div>
                <div className={styles.radioPlayerBar}>
                    <RadioPlayer />
                </div>
                <Switch>
                    <Route exact path="/" component={AllTracksView} />
                    <Route exact path="/tz" component={WalletView} />
                    <Route path="/tz/:tz" component={WalletView} />
                    <Route path="/playlists" component={PlaylistView} />
                    <Route path="/mint" component={MintView} />
                </Switch>
                <Footer />
            </div>
        </HicetnuncContextProvider>
    );
}

export default App;
