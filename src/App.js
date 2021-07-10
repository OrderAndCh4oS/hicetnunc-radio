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

function App() {
    const {walletId} = useWallet();
    return (
        <div className={styles.radioView}>
            <div className={styles.headerBar}>
                <Logo/>
                <div className={styles.navBar}>
                    <Link className={styles.navBar_link} to={'/'}>All Tracks</Link>
                    <Link className={styles.navBar_link} to={'/playlists'}>Playlists</Link>
                    <Link className={styles.navBar_link} to={walletId ? `/tz/${walletId}` : '/tz'}>By
                                                                                                   Wallet</Link>
                </div>
            </div>
            <div className={styles.radioPlayerBar}>
                <RadioPlayer/>
            </div>
            <Switch>
                <Route exact path="/" component={AllTracksView}/>
                <Route exact path="/objkt/:objkt" component={AllTracksView}/>
                <Route exact path="/tz" component={WalletView}/>
                <Route path="/tz/:tz" component={WalletView}/>
                <Route path="/playlists" component={PlaylistView}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
