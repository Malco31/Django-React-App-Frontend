import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

