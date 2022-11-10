import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Main} from './components/Main'
import {Home} from './components/Home'
import {Nav} from './components/Nav';
import {Form} from './components/Form'
import {RecipeDetails} from './components/RecipeDetails'
import {SearchBar} from './components/SearchBar'

function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path={'/'}>
            <Main/> 
          </Route>
          <Route path={'/Home'}>
            <Nav follow={true}/>
            <SearchBar/>
            <Home/>
          </Route>
          <Route path={'/Create'}>
            <Form/>
          </Route>
          <Route path={'/Recipe/name/:name'}>
            
          </Route>
          <Route path={'/Recipe/Details/:id'}>
            <RecipeDetails/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
