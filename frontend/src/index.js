import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FabricTest from './Fabric';
import NavBar from './NavBar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <FabricTest />
  </React.StrictMode>
);

reportWebVitals();
