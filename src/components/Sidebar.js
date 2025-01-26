import React, { useState } from 'react';
import { FaBars, FaRocket, FaCloudUploadAlt } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { GoDependabot } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import "../styles/Sidebar.css";
import { GrClose } from "react-icons/gr";
import { DiGoogleAnalytics } from "react-icons/di";
import { CgFileDocument } from "react-icons/cg";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import arrow icons

const Sidebar = ({ children }) => {
  const [isDataOpen, setIsDataOpen] = useState(false); // State for Data submenu

  const menuItem = [
    // { path: "/overview", name: "Overview", icon: <RxDashboard /> },
    { path: "/dashboard/assistant", name: "Dashboard", icon: <RxDashboard /> },
    {
      path: "/data", name: "Data", icon: <FaFileInvoiceDollar />,
      subItems: [ // Add subItems directly to the Data item
        { path: "/data/documents", name: "Documents", icon: <FaCloudUploadAlt /> },
        { path: "/data/invoice", name: "Invoice", icon: <FaFileInvoiceDollar /> },
      ]
    },
    { path: "/bot-list", name: "Create Agent", icon: <FaRocket /> },
    { path: "/marketplace", name: "Marketplace", icon: <BsShop /> },
    { path: "/instruction", name: "Instruction", icon: <CgFileDocument /> },
    // { path: "/bot-setting", name: "Bot Settings", icon: <GoDependabot /> },
  ];

  const toggleDataSubMenu = () => {
    setIsDataOpen(!isDataOpen);
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='top-section'>
          {/* {isOpen && <h1 className='logo'>Farben.ai</h1>} */}
          <div className='bars'>
            {/* You might want a hamburger menu here for smaller screens */}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.path}
              className="link"
              activeClassName="active"
            >
              <div className='icon'>{item.icon}</div>
              <div className='link-text' style={{ fontSize: '1.1rem' }}>{item.name}</div> {/* Increase font size */}
              {item.subItems && ( // Conditionally render arrow icon
                <div className='arrow-icon' onClick={toggleDataSubMenu}>
                  {isDataOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              )}
            </NavLink>
            {/* Render subItems if Data is open and subItems exist */}
            {item.subItems && isDataOpen && (
              <div className='sub-menu'>
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    to={subItem.path}
                    key={subIndex}
                    className="link sub-link"
                    activeClassName="active"
                  >
                    <div className='icon'>{subItem.icon}</div>
                    <div className='link-text' style={{ fontSize: '1rem' }}>{subItem.name}</div> {/* Smaller font size for sub-items */}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;