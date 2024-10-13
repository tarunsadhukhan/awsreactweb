import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import './css/Sidebar.css';
import vlogo from './css/vmenulogo.png';
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaBars, FaHome, FaCog, FaChartLine } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [menuData, setMenuData] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(250); // Default width
  const [hoveredMenuWidth, setHoveredMenuWidth] = useState(250); // Hovered width
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    axios.get('http://localhost:5000/api/companies', {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-user-id': userId
      }
    })
    .then(response => {
      const companies = response.data;
      setCompanyData(companies);
      if (companies.length > 0) {
        setSelectedOption({ value: companies[0].comp_id, label: companies[0].company_name });
        localStorage.setItem('comp_id', companies[0].comp_id);
        setSelectedCompany(companies[0].comp_id);
      }
    })
    .catch(error => console.error('Error fetching company data:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (selectedCompany) {
      axios.get(`http://localhost:5000/api/menu`, {
        headers: {
          'x-comp-id': selectedCompany,
          'x-user-id': userId,
          'x-token': token
        }
      })
      .then(response => {
        const menuHierarchy = buildMenuHierarchy(response.data);
        setMenuData(menuHierarchy);
      })
      .catch(error => console.error('Error fetching the menu:', error));
    }
  }, [selectedCompany]);

  const buildMenuHierarchy = (data) => {
    const menuMap = {};
    data.forEach(item => {
      menuMap[item.id] = { ...item, children: [] };
    });
    const menuHierarchy = [];
    data.forEach(item => {
      if (item.parent_id === 0) {
        menuHierarchy.push(menuMap[item.id]);
      } else if (menuMap[item.parent_id]) {
        menuMap[item.parent_id].children.push(menuMap[item.id]);
      } else {
        console.warn(`Parent ID ${item.parent_id} not found for item`, item);
      }
    });
    return menuHierarchy;
  };

  const toggleMenu = (id) => {
    setOpenItems(prevState => {
      const updatedOpenItems = {
        ...prevState,
        [id]: !prevState[id],
      };

      // Adjust the sidebar width after toggling the submenu
      adjustSidebarWidth(menuData, updatedOpenItems);
      return updatedOpenItems;
    });
  };

  const handleMenuClick = (id, child, path, event) => {
    event.preventDefault();
  //  toggleMenu(id);
   // navigate(path);
   console.log('Path:', path,child,'length',child.length);
    if ( child.length === 0) {
      console.log('Navigate to:', path);
      navigate(path);
      //    navigate(`/page/${path.id}`); // Only route for the last submenu
    } else {
      console.log('Toggle menu:', id);   
      toggleMenu(id);

     // Just toggle submenus for non-leaf items
   //   navigate(path);
 
    }
//    handleMouseEnter(); // Adjust the sidebar width after clicking a menu item
  };

  const handleCompanyChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    localStorage.setItem('comp_id', selectedOption.value);
    setSelectedCompany(selectedOption.value);
  };

  const adjustSidebarWidth = (menuData, openItemsState = openItems) => {
    let maxMenuLength = 0;

    const calculateMaxWidth = (items, currentLevel = 1) => {
      items.forEach(item => {
        let itemWidth = item.name.length * 10; // Approximate character width

        // Update maxMenuLength if current item is longer
        if (itemWidth > maxMenuLength) {
          maxMenuLength = itemWidth;
        }

        // If submenu is open, calculate the max width of the submenu (nested)
        if (openItemsState[item.id] && item.children.length > 0) {
          item.children.forEach(subItem => {
            const subItemWidth = subItem.name.length * 10 + (currentLevel * 10); // Indentation multiplier for levels

            if (subItemWidth > maxMenuLength) {
              maxMenuLength = subItemWidth;
            }

            // Recursively calculate for deeper levels (sub-submenu)
            if (subItem.children && openItemsState[subItem.id] && subItem.children.length > 0) {
              calculateMaxWidth(subItem.children, currentLevel + 1);
            }
          });
        }
      });
    };

    // Call the recursive function starting with the top-level menu items
    calculateMaxWidth(menuData);

    // Return the final calculated max width
    return maxMenuLength + 60; // Add some padding
  };

  const handleMouseEnter = () => {
    const maxWidth = adjustSidebarWidth(menuData);
    setHoveredMenuWidth(maxWidth);
    console.log('Max width:', maxWidth);
  };

  const handleMouseLeave = () => {
    setHoveredMenuWidth(250); // Fixed width when not interacting
    console.log('Max width:', 'maxWidth 250');
  };

  const companyOptions = companyData.map(company => ({
    value: company.comp_id,
    label: company.company_name
  }));

  const getMenuIcon = (menuName) => {
    switch (menuName.toLowerCase()) {
      case 'home':
        return <FaHome />;
      case 'settings':
        return <FaCog />;
      case 'reports':
        return <FaChartLine />;
      default:
        return <FiMenu />;
    }
  };

  const renderMenu = (items) => (
    <ul className="pl-4">
      {items.map(item => (
        <li key={item.id} className="mb-2">
          <div className="flex justify-between items-center">
            <a
              href={`/page/${item.id}`}
              className="sidebar-link cursor-pointer flex items-center"
              onClick={(event) => handleMenuClick(item.id,item.children, `/page/${item.id}`, event)}
            >
              <span className="mr-2">{getMenuIcon(item.name)}</span>
              {item.name}
            </a>
            {item.children.length > 0 && (
              <button
                onClick={() => toggleMenu(item.id)}
                className="text-sm text-gray-400"
                style={{
                  marginLeft: 'auto', // Push button to the right
                  marginRight: '20px', // Add space between button and sidebar border
                }}
              >
                {openItems[item.id] ? <IoIosArrowBack /> : <IoIosArrowDown />}
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
    <div style={{ display: 'flex' }}>
      <div
        className="sidebar"
      style={{
        display: 'flex',
    flexDirection: 'column',
    width: `${hoveredMenuWidth}px`, // Update based on hover/click
    backgroundColor: '#001f3f',
    color: 'black',
    transition: 'width 0.3s ease', // Smooth transition
    overflowY: 'auto', // Enables vertical scrolling
    maxHeight: '100vh', // Ensures the sidebar doesn’t exceed the viewport height
    paddingRight: '8px', // Optional: Ad
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // Space between logo and icon
          alignItems: 'center', // Vertically center logo and icon
          padding: '10px', // Padding around the logo and icon
        }}
      >
        <img
          src={vlogo}
          alt="Logo"
          style={{
            width: isSidebarOpen ? '80%' : '40px', // Resize logo based on sidebar state
            transition: 'width 0.3s ease', // Smooth logo resizing
            display: 'block', // Ensure the logo is always displayed
            margin: 'auto', // Center the logo
          }}
        />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
            padding: '10px',
          }}
        >
          <FiMenu />
        </button>
      </div>
      <div className="mb-4">
        <Select
          id="company-select"
          value={selectedOption}
          onChange={handleCompanyChange}
          options={companyOptions}
        />
      </div>
      {renderMenu(menuData)}
    </div>
</div>
  );
};

export default Sidebar;
