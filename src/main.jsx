import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { ThemeProvider } from './ThemeContext.jsx';
import AppWrapper from './App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <ThemeProvider>
  //   <App />
  //   </ThemeProvider>
  // </React.StrictMode>, 
   <React.StrictMode>
       <AppWrapper/>
  </React.StrictMode>,
)
