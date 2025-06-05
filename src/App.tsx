
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import New from './pages/New';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
