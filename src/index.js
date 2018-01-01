import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';

import App from './components/App';

function renderAppInElement(el) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, el);
}

document
    .querySelectorAll('.__react-root')
    .forEach(renderAppInElement);
