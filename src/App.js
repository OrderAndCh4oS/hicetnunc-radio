import { HashRouter, Route, Switch } from "react-router-dom";
import RadioView from './pages/radio-view/radio-view';
import './app.module.css';
import { publicUrl } from './constants';

function App() {
    console.log('pu', publicUrl)
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={RadioView} />
                <Route path="/tz/:tz" component={RadioView} />
            </Switch>
        </HashRouter>
    );
}

export default App;
