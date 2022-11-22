import React from 'react';
import ReactDOM from 'react-dom/client';
import './initializer.css';
import App from './App';
import store from './Store';
//CookiesProvider 와 Provider 선언으로 이제 Cookie와 Redux를 사용할 수 있다.
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </CookiesProvider>,
);
