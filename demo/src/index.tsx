import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
