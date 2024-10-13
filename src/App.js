import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page90 from './pages/Page90';
import Page92 from './pages/Page92';
import Page93 from './pages/Page93';
import Page96 from './pages/Page96';
import Page504 from './pages/Page504';
import Page505 from './pages/Page505';
import Page506 from './pages/Page506'; // Import Page506
import Page693 from './pages/Page693';
import Sidebar from './Sidebar';
import LoginPage from './pages/LoginPage'; // Import Login Page
import Page505table from './pages/Page505table';
import DetailPage from './pages/Page505details';

 


//import {SidebarProvider} from '.sidebar/SidebarContext'; // Import SidebarContext
import { SidebarProvider } from './sidebar/SidebarContext';
//import Page508 from './pages/Page508';
//import Page693 from './pages/Page693';

//import { SidebarProvider } from './SidebarContext'; // Import SidebarProvider

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleLogin = () => {
    setIsAuthenticated(true); // Set to true after successful login
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />

 
        
        {/* Protected Routes: Redirect to login if not authenticated */}
        {isAuthenticated ? (
          <Route path="*" element={
            <SidebarProvider>
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
                  <Route path="/page/506" element={<Page506 />} />
                
                  <Route path="/page/693" element={<Page693 />} />
                  {/* Default route, redirect to /page/90 */}
                
                  <Route path="/" element={<Page505 submittedValues={{}} />} />
                  <Route path="/details/:eb_no" element={<DetailPage />} />
                </Routes>
              </div>
            </div>
            </SidebarProvider>
          } />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
