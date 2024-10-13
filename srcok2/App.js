import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Page90 from './pages/Page90';
import Page92 from './pages/Page92';
import Page93 from './pages/Page93';
import Page96 from './pages/Page96';
import Page504 from './pages/Page504';
import Page505 from './pages/Page505';
import Page506 from './pages/Page506'; // Import Page506


import Sidebar from './Sidebar';
 
const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/page/90" element={<Page90 />} />
            <Route path="/page/92" element={<Page92 />} />
            <Route path="/page/93" element={<Page93 />} />
            <Route path="/page/96" element={<Page96 />} />
            <Route path="/page/504" element={<Page504 />} />
            <Route path="/page/505" element={<Page505 />} />
            <Route path='/page/506' element={<Page506 />} />
            {/* Add more routes for other IDs as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
