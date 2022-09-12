import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './Reducers'

let store = createStore(RootReducer) 

export const serverApiUrl = "http://localhost:1800/" 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

    <App />
    </Provider>

  </React.StrictMode>
);

reportWebVitals();
