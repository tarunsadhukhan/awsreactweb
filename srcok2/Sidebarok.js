import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import './css/Sidebar.css';
 


const Sidebar = () => {
  const [menuData, setMenuData] = useState([]);
  const [openItems, setOpenItems] = useState({});

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

  const renderMenu = (items) => (
    <ul className="pl-4">
      {items.map(item => (
        <li key={item.id} className="mb-2">
          <div className="flex justify-between items-center">
            <Link 
              to={`/page/${item.id}`} // Navigation link with ID
             className="sidebar-link cursor-pointer"
            >
              {item.name}
            </Link>
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
