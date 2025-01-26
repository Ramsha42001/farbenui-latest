import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from '../styles/images/bot.png';
import Header from '../components/Header';
import farben_logo from '../styles/images/farbenbg.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        access: '',
        account: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Signup failed');
            }

            // Handle successful signup (e.g., navigate to login page)
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <style>
                {`
                    .signup-container .row {
                        margin-left: 0;
                        margin-right: 0;
                    }
                    .signup-container .no-gutters {
                        margin-right: 0;
                        margin-left: 0;
                    }
                    .signup-container .no-gutters > .col,
                    .signup-container .no-gutters > [class*="col-"] {
                        padding-right: 0;
                        padding-left: 0;
                    }
                `}
            </style>

            <div className="signup-container" style={{ marginTop: '70px' }}>
                <div className="row no-gutters">
                    {/* Left side (Signup form) */}
                    <div className="col-md-5 signup-form-container p-5">
                        <div className="signup-form">
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'center', position:'relative'}}>
              <img src={farben_logo} style={{width:'100px',height:'100px',position:'absolute',left:'48px',top:'-40px' }} alt="Logo" />
              <h1 className="company-name">arben</h1>
              </div>
                            <h4>Create your account</h4>
                            <form onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Enter your name'
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Enter your password'
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="access">Access</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="access"
                                        name="access"
                                        value={formData.access}
                                        onChange={handleChange}
                                        placeholder='Enter your access'
                                        required
                                                />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="account">Account</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="account"
                                        name="account"
                                        value={formData.account}
                                        onChange={handleChange}
                                        placeholder='Enter your account'
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="" disabled={loading} style={{backgroundColor:'#EB5A3C',border:'none',borderRadius:'10px',padding:'10px',color:'white',width:'100%'}}>
                                    {loading ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Right side (Image) */}
                    <div className="col-md-7 d-none d-md-block signup-image-container" style={{marginTop: 0,border:'10px solid black'}}>
                        <img
                            src={signupImage}
                            alt="Signup Graphic"
                            className=""
                            style={{marginTop: 0,width:'100%',height:'100%',padding:0}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
