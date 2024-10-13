import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import axios from 'axios';
import './css/Sidebar.css';

const Sidebar = () => {
  const [menuData, setMenuData] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(response => setMenuData(buildMenuHierarchy(response.data)))
      .catch(error => console.error('Error fetching the menu:', error));
  }, []);

  const buildMenuHierarchy = (data) => {
    const menuMap = {};

    data.forEach(item => {
      menuMap[item.id] = { ...item, children: [] };
    });

    const menuHierarchy = [];

    data.forEach(item => {
      if (item.parent_id === 0) {
        menuHierarchy.push(menuMap[item.id]);
      } else {
        menuMap[item.parent_id].children.push(menuMap[item.id]);
      }
    });

    return menuHierarchy;
  };

  const toggleMenu = (id) => {
    setOpenItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleMenuClick = (id, path, event) => {
    event.preventDefault(); // Prevent default link behavior
    toggleMenu(id); // Toggle menu open/close
    navigate(path); // Navigate to the new path
  };

  const renderMenu = (items) => (
    <ul className="pl-4">
      {items.map(item => (
        <li key={item.id} className="mb-2">
          <div className="flex justify-between items-center">
            <a
              href={`/page/${item.id}`} // Use href for link
              className="sidebar-link cursor-pointer"
              onClick={(event) => handleMenuClick(item.id, `/page/${item.id}`, event)} // Handle click and navigation
            >
              {item.name}
            </a>
            {item.children.length > 0 && (
              <button 
                onClick={() => toggleMenu(item.id)} 
                className="text-sm text-gray-400"
              >
                {openItems[item.id] ? '-' : '+'}
              </button>
            )}
          </div>
          {item.children.length > 0 && openItems[item.id] && (
            <div className="ml-4">
              {renderMenu(item.children)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4 overflow-y-auto">
      {renderMenu(menuData)}
    </div>
  );
};

export default Sidebar;
