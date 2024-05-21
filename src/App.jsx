import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Search from './Search';
import { ThemeProvider, useTheme } from './ThemeContext';
import './index.css';

function NotFound() {
  return <h1 style={{textAlign:"center"}}>404 Not Found</h1>;
}

function App() {
  const { theme } = useTheme();

  return (
    <div className={`toggleColor ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route path="/gallery" element={<Search />} />
          <Route path="/gallery/search/:query" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
