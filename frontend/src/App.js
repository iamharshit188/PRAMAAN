import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
// Main App Begins here
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-white py-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PRAMAAN - Professional Reports & Analysis on Money, Assets And Net-gains </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
