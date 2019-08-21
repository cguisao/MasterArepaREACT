import React from 'react';
import ReactDOM from 'react-dom';
import Index7 from './Index7';
import Index8 from './Index8';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Root extends React.Component {

    render() {
        return(
            <BrowserRouter basename={'/'} >
                <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Index7}/>
                <Route path={`${process.env.PUBLIC_URL}/index-7`} component={Index7}/>  
                <Route path={`${process.env.PUBLIC_URL}/index-8`} component={Index8}/>   
              </Switch>
          </BrowserRouter>
        );
    }
   }

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
