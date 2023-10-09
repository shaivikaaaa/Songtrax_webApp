import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';
import EditSample from './components/EditSample';
import Share from './components/Share'; // Import your Share component

/**
 * The main application component.
 *
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/edit-sample/:id" element={<EditSample />} />
          <Route path="/create-sample/" element={<EditSample />} />
          <Route path="/share-sample/:id" element={<Share />} /> {/* Add this route for the Share component */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
