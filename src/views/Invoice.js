import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listDocuments, deleteDocument, setLoading } from '../features/document/documentSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/DataPage.css';
import axios from 'axios';
import moment from 'moment';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaFileInvoice } from 'react-icons/fa';

function Invoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(null);
  const [pdfUrls, setPdfUrls] = useState([]);
  const isLoading = useSelector(state => state.document.isLoading);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});

  // Ref for dropdown menus
  const dropdownRefs = useRef({});


  //post request for generate invoice 
  const handleGenerateInvoice=async(filename)=>{
    try {
      const response = await axios.post(
        'https://farbenai-server-service-1087119049852.us-central1.run.app/contract',
        { file_name: filename },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //  console.log("Hello")
      // console.log(response.data.invoice_details)
      setInvoiceData(response.data.invoice_details)
      if (response.status === 200) {
        // Handle successful response
        console.log('Invoice generated successfully:', response.data);
        if (window.confirm('Invoice generated successfully. Do you want to proceed to approval?')) {
          // Navigate to Approve page with invoice data
          navigate('/data/approve', { 
            state: { 
              invoiceDetails: response.data.invoice_details 
            }
          });
        }
      } else {
        console.error('Error generating invoice:', response.data);
        alert(`Error generating invoice: ${response.data?.detail || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('An error occurred while generating the invoice.');
    }
  }

  const toggleDataSubMenu = (documentId) => {
    if (activeDropdown === documentId) {
      // If clicking the same dropdown, close it
      setActiveDropdown(null);
    } else {
      // If clicking a different dropdown, open it
      setActiveDropdown(documentId);
    }
  };

  const fetchDocuments = async () => {
    if (token) {
      try {
        const documentsResponse = await axios.get('https://farbenai-server-service-1087119049852.us-central1.run.app/contract', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPdfUrls(documentsResponse.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        if (error.response) {
          console.error("Error Status:", error.response.status);
          console.error("Error Data:", error.response.data);

          if (error.response.status === 401) {
            navigate('/login');
          } else if (error.response.status === 403) {
            // Handle forbidden error
          }
        } else {
          console.error("Error Message:", error.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [token, navigate]);

  useEffect(() => {
    if (userEmail) {
      dispatch(listDocuments(userEmail));
    }
  }, [userEmail, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown].contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email')
    setToken(storedToken);
    setUserEmail(storedEmail);
  }, []);

  const handleDeleteFile = async (filename) => {
    console.log(filename)
    if (window.confirm('Are you sure you want to delete this file?')) {
      dispatch(setLoading(true)); // Set loading state before request
      try {
        const response = await axios.post(
          'https://farbenai-server-service-1087119049852.us-central1.run.app/delete-contract',
          { file_name: filename },
          { headers: { Authorization: `Bearer ${token}` } } 
        );

        if (response.status === 200) {
          fetchDocuments(); // Refresh the document list
          alert("File deleted successfully");
        } else {
          console.error('Error deleting file:', response.data);
          alert(`Error deleting file: ${response.data?.detail || "An error occurred"}`); 
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        alert("An error occurred while deleting the file.");
      } finally {
        dispatch(setLoading(false)); // Ensure loading state is reset
      }
    }
  };

  const handleDownload = (url, filename) => {
    console.log("Downloading:", url, filename);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }
    if (!userEmail) {
      alert('User email not found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        'https://farbenai-server-service-1087119049852.us-central1.run.app/upload-contract/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        setFile(null);
        await fetchDocuments();
        toggleModal();
      } else {
        alert(`Upload failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="">
        <Sidebar />
      </div>
      <div className="content-container ">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Data Upload</h3>
          <button className="new-button" onClick={toggleModal}>&nbsp;+&nbsp; New </button>
        </div>

        <div className="row col-12">
          <div className="col-12">
            {showModal && (
              <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Upload File</h5>
                      <button type="button" className="btn-close" onClick={toggleModal}></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">Choose File</label>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                        <div className="text-center">
                          <button type="submit" className="submit-button">
                            {isLoading ? "Loading..." : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-left w-100 my-5">
              <h5 className="font-weight-bold">Contract</h5>
              <div className="my-3">
                {pdfUrls.length === 0 ? (
                  <p className="text-center text-muted">No files uploaded yet.</p>
                ) : (
                  <div className="table-responsive" style={{ height: '500px' }}>
                    <table className="table table-hover" style={{ fontSize: '14px' }}>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">File Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Status</th>
                          <th scope="col">Uploaded At</th>
                          <th scope="col">Last Updated</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdfUrls.map((doc, index) => (
                          <tr key={doc.document_id}>
                            <td className="align-middle">{index + 1}</td>
                            <td className="align-middle" style={{ fontSize: '14px' }}>
                              {doc.filename.toUpperCase()}
                            </td>
                            <td className="align-middle">
                              {doc.filename.split('.').pop().toUpperCase()}
                            </td>
                            <td className="align-middle">
                              Processed
                            </td>
                            <td className="align-middle">
                              {moment(doc.created_at).format('YYYY-MM-DD HH:mm')}
                            </td>
                            <td className="align-middle">
                              {moment(doc.updated_at).format('YYYY-MM-DD HH:mm')}
                            </td>
                            <td className="align-middle">
                              <div
                                className="btn-group"
                                ref={el => (dropdownRefs.current[doc.document_id] = el)}
                              >
                                <div
                                  onClick={() => toggleDataSubMenu(doc.document_id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {activeDropdown === doc.document_id ? (
                                    <IoIosArrowUp />
                                  ) : (
                                    <IoIosArrowDown />
                                  )}
                                </div>
                                {/* Dropdown Menu */}
                                {activeDropdown === doc.document_id && (
                                  <div
                                    className="dropdown-menu show"
                                    style={{
                                      position: 'absolute',
                                      left: '-100px',
                                      top: '25px',
                                    }}
                                  >
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        handleGenerateInvoice(doc.filename)
                                      }}
                                    >
                                      <FaFileInvoice className="icon-space" /> Generate Invoice
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleDeleteFile(doc.document_id);
                                      }}
                                    >
                                      <RiDeleteBin6Line className="icon-space" />{" "}
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice; 