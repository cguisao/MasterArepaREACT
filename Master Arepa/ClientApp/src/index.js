import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
import Profile from "./components_Admin/Profile";
import NavBar from "./components/Navbar";
import AddInventoryItem from './ComponentsInventory/AddInventoryItem';
import InventoryList from './ComponentsInventory/InventoryList';
import HomeInventoryList from './ComponentsInventory/HomeInventoryList';
import FoodTruckInventory from './ComponentsInventory/FoodTruckInventory';
import MainInventory from './ComponentsInventory/MainInventory';
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
          <NavBar />
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/addInventoryItem" component={AddInventoryItem} />
          <Route path="/InventoryList" component={InventoryList} />
          <Route path="/FoodTruckInventory" component={FoodTruckInventory} />
          <Route path="/MainInventory" component={MainInventory}/>
          <Route path="/HomeInventoryList" component={HomeInventoryList}/>
        </Switch>
        </BrowserRouter>
    </Auth0Provider>,
    rootElement);

serviceWorker.unregister();