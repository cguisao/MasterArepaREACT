import React from 'react';
import ReactDOM from 'react-dom';
import Index7 from './Index7';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Index7 />
    </BrowserRouter>,
    rootElement);

registerServiceWorker();
