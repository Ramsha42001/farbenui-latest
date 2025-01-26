import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument, listDocuments, deleteDocument, setLoading } from '../features/document/documentSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { uploadFileToGCS } from '../utils/uploadFileToGCS';
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
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(null);
  const [pdfUrls, setPdfUrls] = useState([]);
  const isLoading = useSelector(state => state.document.isLoading);
  const [openRows, setOpenRows] = useState({});

  // Ref for dropdown menus
  const dropdownRefs = useRef({});

  const invoiceData = [
    {
      id: 1,
      Sno: 1,
      FileName: "Contract_Farben_Final", // Added .pdf for download
      Type: "PDF",
      Status: "Processed",
      UploadedAt: "2025-01-01 10:00",
      LastUpdated: "2025-01-01 10:00",
    }
  ];

  // Function to close other dropdowns when one is opened
  const closeOtherDropdowns = (currentDocId) => {
    Object.keys(openRows).forEach(docId => {
      if (docId !== currentDocId && openRows[docId]) {
        setOpenRows(prev => ({ ...prev, [docId]: false }));
      }
    });
  };

  const fetchDocuments = async () => {
    if (token) {
      try {
        const documentsResponse = await axios.get('http://localhost:8080/documents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPdfUrls(documentsResponse.data);
        console.log(pdfUrls)
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



  const toggleDataSubMenu = (documentId) => {
    closeOtherDropdowns(documentId);
    setOpenRows(prev => ({
      ...prev,
      [documentId]: !prev[documentId]
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(openRows).forEach(docId => {
        if (
          dropdownRefs.current[docId] &&
          !dropdownRefs.current[docId].contains(event.target) &&
          openRows[docId]
        ) {
          setOpenRows(prev => ({ ...prev, [docId]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openRows]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setUserEmail(localStorage.getItem('email'));
  }, []);

  useEffect(() => {
    if (userEmail) {
      dispatch(listDocuments(userEmail));
    }
  }, [userEmail, dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteFile = async (documentId) => {
    await dispatch(deleteDocument(documentId));
    dispatch(listDocuments(userEmail));
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
        'http://localhost:8080/upload-pdf/',
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
          {invoiceData.length === 0 ? (
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
                  {invoiceData.map((doc, index) => (
                    <tr key={doc.id}>
                      <td className="align-middle">{doc.Sno}</td>
                      <td className="align-middle" style={{ fontSize: '14px' }}>
                        {doc.FileName}
                      </td>
                      <td className="align-middle">
                        {doc.Type.toUpperCase()}
                      </td>
                      <td className="align-middle">
                        {doc.Status.toUpperCase()}
                      </td>
                      <td className="align-middle">
                        {moment(doc.UploadedAt).format('YYYY-MM-DD HH:mm')}
                      </td>
                      <td className="align-middle">
                        {moment(doc.LastUpdated).format('YYYY-MM-DD HH:mm')}
                      </td>
                      <td className="align-middle">
                        <div
                          className="btn-group"
                          ref={el => (dropdownRefs.current[doc.id] = el)}
                        >
                          <div
                            onClick={() => toggleDataSubMenu(doc.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {openRows[doc.id] ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </div>
                          {/* Dropdown Menu */}
                          {openRows[doc.id] && (
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
                                  handleDownload(
                                    'http://localhost:8080/download-pdf/' +
                                      doc.FileName,
                                    doc.FileName
                                  );
                                  toggleDataSubMenu(doc.id);
                                }}
                              >
                                <FaFileInvoice className="icon-space" /> Generate Invoice
                              </button>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  handleDeleteFile(doc.id);
                                  toggleDataSubMenu(doc.id);
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