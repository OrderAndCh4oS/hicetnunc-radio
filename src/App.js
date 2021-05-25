import { Link, Route, Switch } from 'react-router-dom';
import WalletView from './pages/radio-view/wallet-view';
import './app.css';
import styles from './styles.module.css';
import PlaylistView from './pages/radio-view/playlist-view';
import Logo from './components/logo/logo';
import Footer from './components/footer/footer';
import useWallet from './hooks/use-wallet';

function App() {
    const {walletId} = useWallet()
    return (
        <div className={styles.radioView}>
            <div className={styles.headerBar}>
                <Logo/>
                <div className={styles.navBar}>
                    <Link className={styles.navBar_link} to={walletId ? `/tz/${walletId}` : '/'}>By Wallet</Link>
                    <Link className={styles.navBar_link} to={'/playlists'}>Playlists</Link>
                </div>
            </div>
            <Switch>
                <Route exact path="/" component={WalletView}/>
                <Route path="/tz/:tz" component={WalletView}/>
                <Route path="/playlists" component={PlaylistView}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
