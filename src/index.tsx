import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* ↑でAppコンポーネントを見に行く */}
  </React.StrictMode>,
  document.getElementById('root')
);