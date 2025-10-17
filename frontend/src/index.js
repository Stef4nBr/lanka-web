import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LeandingPage from './LeandingPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const root = createRoot(document.getElementById('root'));

root.render(

    <LeandingPage />

);

reportWebVitals();
