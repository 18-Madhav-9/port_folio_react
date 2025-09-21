import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import AppContent from "./components/layout/AppContent";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Stack from "./pages/Stack";
import Stats from "./pages/Stats";
import Thoughts from "./pages/Thoughts";
import ArticleDetail from "./components/common/ArticleDetail"

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/thoughts/:slug" element={<ArticleDetail />} />
            <Route path="/stack" element={<Stack />} />
          </Routes>
        </AppContent>
      </Router>
    </ThemeProvider>
  );
};

export default App;