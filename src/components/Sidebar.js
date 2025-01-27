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
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Sidebar = ({ children }) => {
  const menuItem = [
    { path: "/dashboard/assistant", name: "Overview", icon: <RxDashboard /> },
    {
      path: "/data",
      name: "Data",
      icon: <FaFileInvoiceDollar />,
      subItems: [
        { path: "/data/documents", name: "Documents", icon: <FaCloudUploadAlt /> },
        { path: "/data/invoice", name: "Invoice", icon: <FaFileInvoiceDollar /> },
        { path: "/data/approve", name: "Approve", icon: <FaFileInvoiceDollar /> }
      ]
    },
    { path: "/bot-list", name: "Create Agent", icon: <FaRocket /> },
    { path: "/marketplace", name: "Marketplace", icon: <BsShop /> },
    { path: "/instruction", name: "Instruction", icon: <CgFileDocument /> },
  ];

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='top-section'>
          {/* Hamburger menu might be added here for smaller screens */}
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.path}
              className="link"
              activeClassName="active"
            >
              <div className='icon'>{item.icon}</div>
              <div className='link-text' style={{ fontSize: '1.1rem' }}>{item.name}</div>
            </NavLink>

            {/* Always render subItems if they exist */}
            {item.subItems && (
              <div className='sub-menu'>
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    to={subItem.path}
                    key={subIndex}
                    className="link sub-link"
                    activeClassName="active"
                  >
                    <div className='icon'>{subItem.icon}</div>
                    <div className='link-text' style={{ fontSize: '1rem' }}>{subItem.name}</div>
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