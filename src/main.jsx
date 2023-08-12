import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store.jsx';
// eslint-disable-next-line import/namespace
import { ErrorBoundary } from 'react-error-boundary';
import Error_boundry from './Components/Error_boundry.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error_boundry}>
      <Provider store={Store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
