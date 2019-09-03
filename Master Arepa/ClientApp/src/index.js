import React from 'react';
import ReactDOM from 'react-dom';
import Index7 from './Index7';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const onRedirectCallback = appState => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

ReactDOM.render(
    <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}>
        <BrowserRouter basename={baseUrl}>
            <Index7 />
        </BrowserRouter>
    </Auth0Provider>,
    rootElement);

serviceWorker.unregister();
