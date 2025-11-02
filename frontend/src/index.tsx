import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LeandingPage from './LeandingPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(<LeandingPage />);

reportWebVitals();
