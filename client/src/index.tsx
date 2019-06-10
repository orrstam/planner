import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import theme from './config/theme';

import {
  taskStore,
  typeStore,
  modalStore,
  userStore
 } from './stores';

const stores = {
  taskStore,
  typeStore,
  modalStore,
  userStore
}

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();