import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import data from './flights'

ReactDOM.render(
  <React.StrictMode>
    <App flights={data.result.flights}/>
  </React.StrictMode>,
  document.getElementById('root')
);