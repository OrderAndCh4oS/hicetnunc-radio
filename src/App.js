import { BrowserRouter, Route, Switch } from "react-router-dom";
import RadioView from './pages/radio-view/radio-view';
import './app.module.css';
import { basePath } from './constants';

function App() {
    return (
        <BrowserRouter basename={basePath}>
            <Switch>
                <Route exact path="/" component={RadioView} />
                <Route path="/tz/:tz" component={RadioView} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
