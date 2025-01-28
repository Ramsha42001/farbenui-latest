import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import Image_1 from '../styles/images/img-1.jpeg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../styles/images/fai1.png';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import farben_logo from '../styles/images/farbenbg.png';

const RESTRICTED_ROUTES = ['/login', '/signup'];
const DASHBOARD_ROUTE = '/dashboard';

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [nestedDropdown, setNestedDropdown] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const username = useSelector((state) => state.auth.user?.username);

    const [errorMessage, setErrorMessage] = useState("");
    const handleClickOutside = (event) => {
        if (navbarOpen && !event.target.closest('.navbar')) {
            setNavbarOpen(false);
            setNestedDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [navbarOpen]);

    const toggleNestedDropdown = (dropdownId) => {
        setNestedDropdown(nestedDropdown === dropdownId ? null : dropdownId);
    };


    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

    return (
        <header className='top-header-container'>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow" style={{height: '70px',backgroundColor:'rgb(251, 249, 249)'}}>
                {/* <div className="container d-flex justify-content-between align-items-centerd-flex "> */}
                <div className="container " style={{backgroundColor:'rgb(251, 249, 249)'}}>

                    {/* Left side with logo and brand */}
                    <div className="logo-brand-container d-flex align-items-center position-relative">
                      <Link to="/"> <img style={{ width: '60px', height: '60px',position:'absolute',left:'10px',top:'-15px' }} src={farben_logo} alt="Logo" /></Link> 
                        <Link className="navbar-brand " to="/" style={{marginLeft:'43px',marginTop:'10px'}}></Link>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setNavbarOpen((prev) => !prev)}
                        aria-controls="navbarSupportedContent"
                        aria-expanded={navbarOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">

                            {location.pathname === '/' && (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to="#"
                                            onClick={() => toggleNestedDropdown('product')}
                                        >
                                            Product
                                        </Link>
                                        <div className={`dropdown-menu ${nestedDropdown === 'product' ? 'show' : ''}`}>
                                            <Link className="dropdown-item" to="#">Overview</Link>
                                            <Link className="dropdown-item" to="#">Farben AI</Link>
                                            <Link className="dropdown-item" to="#">Chat Automation</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle text-danger"
                                            to="#"
                                            onClick={() => toggleNestedDropdown('solutions')}
                                        >
                                            Solutions
                                        </Link>
                                        <div className={`dropdown-menu ${nestedDropdown === 'solutions' ? 'show' : ''}`}>
                                            <Link className="dropdown-item text-danger" to="#">Solution 1</Link>
                                            <Link className="dropdown-item text-danger" to="#">Solution 2</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to="#"
                                            onClick={() => toggleNestedDropdown('resources')}
                                        >
                                            Resources
                                        </Link>
                                        <div className={`dropdown-menu ${nestedDropdown === 'resources' ? 'show' : ''}`}>
                                            <Link className="dropdown-item" to="#">Resource 1</Link>
                                            <Link className="dropdown-item" to="#">Resource 2</Link>
                                        </div>
                                    </li>
                                </>

                            )}
                        </ul>
                        {(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login') ? (
                            <div className="d-flex align-items-center right-container">
                                <Link className="button-header btn btn-outline-primary" style={{backgroundColor: '', borderWidth: '2px',borderRadius: '30px'}} to="/login">Login</Link>
                                <Link className="button-header btn btn-primary" style={{backgroundColor: '#EB5A3C',borderRadius: '30px'}} to="/signup">Signup</Link>
                            </div>
                        ) :""}
                        {isLoggedIn && (
                            <div className="d-flex align-items-center right-container">
                                <div className="message-profile-container">
                                    <span className="welcome-message px-3">Welcome, {username}</span>
                                    <CgProfile className="profile-icon" size={40} />
                                </div>
                                <button className="button-header btn btn-primary" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
