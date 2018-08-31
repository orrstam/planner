import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import {
  taskStore
 } from './stores';

const stores = {
  taskStore
}

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();