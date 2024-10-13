// sidebar/SidebarContext.js
import React, { createContext, useState } from 'react';

// Create a context for sidebar state
export const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  // State to control whether the sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle the sidebar open/closed state
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  // Context value to be provided to consumers
  const contextValue = {
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
