import { Route, Switch } from 'react-router-dom';
import RadioView from './pages/radio-view/radio-view';
import './app.module.css';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={RadioView}/>
            <Route path="/tz/:tz" component={RadioView}/>
        </Switch>
    );
}

export default App;
