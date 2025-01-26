import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../styles/images/bot.png';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import farben_logo from '../styles/images/farbenbg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isForgetPassword, setForgetPassword] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleCreateAccountClick = () => {
    navigate('/signup');
  };
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );

  // --- OTP Input Change and Paste Handlers ---

  const handleOtpChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < otp.length - 1) {
      document.getElementById(`otp-box-${index + 1}`).focus();
    }
  };

  const handleOtpPaste = (event) => {
    const pasteData = event.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
    }
  };

  // --- Toggle between Login and Forgot Password ---

  const handleToggle = () => {
    setForgetPassword(!isForgetPassword);
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setTimer(60);
    setShowResend(false);
    setEmail('');
    setPassword('');
    setNewPassword('');
  };

  // --- Redirect if Authenticated ---

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/assistant');
    }
  }, [isAuthenticated, navigate]);

  // --- Timer useEffect ---

  useEffect(() => {
    let interval = null;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // --- Handle Login ---

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      dispatch(login({ token: data.access_token }));

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);

      navigate('/dashboard/assistant');
    } catch (err) {
      dispatch(loginFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Forgot Password (Send OTP) ---

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send OTP');
      }

      setOtpSent(true);
      setTimer(60);
      setShowResend(false);
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Resend OTP ---

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Resend OTP failed');
      }

      setOtpSent(true);
      setTimer(60);
      setShowResend(false);
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Change Password (Verify OTP and Reset) ---

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otp.join(''),
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Password change failed');
      }

      // Password change successful, redirect to login or show a success message
      handleToggle(); // Go back to the login form
      // Optionally, display a success message
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="login-container">
        <div className="row no-gutters">
          {/* Left side (Login form) */}
          <div className="col-md-5 login-form-container">
            <div className="login-form">
              <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'center', position:'relative'}}>
              <img src={farben_logo} style={{width:'100px',height:'100px',position:'absolute',left:'48px',top:'-40px' }} alt="Logo" />
              <h1 className="company-name">arben</h1>
              </div>
              <h4>
                {!isForgetPassword
                  ? 'Login to your account'
                  : 'Reset Password'}
              </h4>

              {/* --- Login Form --- */}
              {!isForgetPassword ? (
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <button
                      type="submit"
                      className=""
                      style={{
                        backgroundColor: '#EB5A3C',
                        color: 'white',
                        width: '300px',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'start'}}>
                    <Link
                      onClick={handleToggle}
                      style={{
                        color: '#EB5A3C',
                        textDecoration: 'none',
                        marginTop: '10px',
                      }}
                    >
                      Forgot Password?
                    </Link>
                    <Link to='/signup'
                      style={{
                        color: 'black',
                        textDecoration: 'none',
                        marginTop: '10px',
                        marginLeft:'5px'
                      }}
                    >
                      Create new account
                    </Link>
                    </div>
                  </div>
                </form>
              ) : (
                // --- Forgot Password Form ---
                <form
                  onSubmit={isOtpSent ? handleChangePassword : handleForgetPassword}
                >
                  {!isOtpSent && (
                    <div className="form-group">
                      <label htmlFor="email">
                        Enter Email for password Recovery
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isOtpSent}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {!isOtpSent ? (
                      <button
                        type="submit"
                        className=""
                        style={{
                          backgroundColor: '#EB5A3C',
                          color: 'white',
                          width: '300px',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                      >
                        {isLoading ? 'Loading...' : 'Send OTP'}
                      </button>
                    ) : (
                      <div className="otp-container-main">
                        <div className="otp-container">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength="1"
                              className="otp-box"
                              id={`otp-box-${index}`}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onPaste={handleOtpPaste}
                            />
                          ))}
                        </div>
                        <div className="timer">
                          {timer > 0
                            ? `OTP expires in: ${timer}s`
                            : 'OTP Expired!'}
                        </div>
                        {showResend && (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className=""
                            style={{
                              backgroundColor: '#EB5A3C',
                              color: 'white',
                              width: '300px',
                              padding: '10px',
                              borderRadius: '10px',
                              marginTop: '10px',
                            }}
                          >
                            Resend OTP
                          </button>
                        )}

                        <input
                         type="password"
                         placeholder="Enter new Password"
                         value={newPassword}
                         onChange={(e) =>
                           setNewPassword(e.target.value)
                         }
                         style={{ marginTop: '10px' }}
                         />
                         <button
                           type="submit"
                           className=""
                           style={{
                             backgroundColor: '#EB5A3C',
                             color: 'white',
                             width: '300px',
                             padding: '10px',
                             borderRadius: '10px',
                             marginTop: '10px',
                           }}
                           disabled={otp.some((digit) => digit === '') || newPassword === ''}
                         >
                           Change Password
                         </button>

                      </div>
                    )}
                    <Link
                      onClick={handleToggle}
                      style={{
                        color: '#EB5A3C',
                        textDecoration: 'none',
                        marginTop: '10px',
                      }}
                    >
                      Back To Login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* Right side (Image) */}
          <div className="col-md-7 d-none d-md-block login-image-container">
            <img src={loginImage} alt="Login Graphic" className="login-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;