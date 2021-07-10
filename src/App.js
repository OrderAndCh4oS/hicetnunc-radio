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
import { Helmet } from "react-helmet";

const getMetaTags = () => {
    const metaTags = [
        { itemprop: 'name', content: 'title' },
        { itemprop: 'description', content: 'description' },
        { name: 'description', content: 'description' },
        { name: 'twitter:site', content: '@hen_radio' },
        { name: 'twitter:title', content: `Hen.radio` },
        { name: 'twitter:description', content: 'description' },
        { name: 'twitter:creator', content: '@hen_radio' },
        { name: 'og:title', content: `Hen.radio` },
        { name: 'og:type', content: 'contentType' },
        { name: 'og:url', content: 'url' },
        { name: 'og:description', content: 'description' },
        { name: 'og:site_name', content: 'Hen.radio' },
        { name: 'og:locale', content: 'en_EN' },
    ];
    return metaTags;
}

function App() {
    const { walletId } = useWallet();
    return (

        <div className={styles.radioView}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="https://hen.radio" />
            </Helmet>
            <div className={styles.headerBar}>
                <Logo />
                <div className={styles.navBar}>
                    <Link className={styles.navBar_link} to={'/'}>All Tracks</Link>
                    <Link className={styles.navBar_link} to={'/playlists'}>Playlists</Link>
                    <Link className={styles.navBar_link} to={walletId ? `/tz/${walletId}` : '/tz'}>By
                        Wallet</Link>
                </div>
            </div>
            <div className={styles.radioPlayerBar}>
                <RadioPlayer />
            </div>
            <Switch>
                <Route exact path="/" component={AllTracksView} />
                <Route exact path="/objkt/:objkt" component={AllTracksView}>

                </Route>
                <Route exact path="/tz" component={WalletView} />
                <Route path="/tz/:tz" component={WalletView} />
                <Route path="/playlists" component={PlaylistView} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
