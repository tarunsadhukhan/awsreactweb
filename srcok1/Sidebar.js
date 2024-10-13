import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import './css/Sidebar.css'; // Ensure this file contains the custom CSS
import logo from './css/vmenulogo.png';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import sarr from './css/icons8-forward-48.png';

const Sidebar = () => {
  const [menuData, setMenuData] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(response => setMenuData(buildMenuHierarchy(response.data)))
      .catch(error => console.error('Error fetching the menu:', error));

    axios.get('http://localhost:5000/api/companies')
      .then(response => {
        const companies = response.data;
        setCompanyData(companies);
        if (companies.length > 0) {
          setSelectedOption({ value: companies[0].comp_id, label: companies[0].company_name });
        }
      })
      .catch(error => console.error('Error fetching company data:', error));
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
    event.preventDefault();
    toggleMenu(id);
    navigate(path);
  };

  const handleCompanyChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log('Selected company:', selectedOption);
  };

  const renderMenu = (items) => (
    <ul className="pl-4">
      {items.map(item => (
        <li key={item.id} className="mb-2">
          <div className="flex justify-between items-center">
            <a
              href={`/page/${item.id}`}
              className="sidebar-link cursor-pointer"
              onClick={(event) => handleMenuClick(item.id, `/page/${item.id}`, event)}
            >
              {item.name}
            </a>
            {item.children.length > 0 && (
              <button 
                onClick={() => toggleMenu(item.id)} 
                className="text-sm text-gray-400"
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

  const companyOptions = companyData.map(company => ({
    value: company.comp_id,
    label: company.company_name
 
  }));

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4 overflow-y-auto">
      {/* Logo */}
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="w-32 mx-auto" />
      </div>
      {/* Company Select */}
      <div className="mb-4">
{/*         <label htmlFor="company-select" className="block mb-2 text-white">Select Company:</label>
 */}        <Select
          id="company-select"
          options={companyOptions}
          value={selectedOption}
          onChange={handleCompanyChange}
          placeholder="Select company"
    /*      className="basic-single" */
         classNamePrefix="custom-select" // Set a custom prefix
         />
      </div>
      {/* Menu */}
      {renderMenu(menuData)}
    </div>
  );
};

export default Sidebar;
