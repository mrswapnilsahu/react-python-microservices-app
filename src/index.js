import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

    if (
        process.env.REACT_APP_BUILD_MODE === "serve" ||
        process.env.REACT_APP_BUILD_MODE === "gh-pages" ||
        process.env.NODE_ENV === "development"
      ) {

        const { worker } = require('./mocks/browser')
        worker.start();
      }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

