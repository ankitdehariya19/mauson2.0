import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
