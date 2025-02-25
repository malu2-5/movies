import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from "./ApiContext"; // Import API context provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider> {/* Wrap App with ApiProvider */}
      <App />
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
