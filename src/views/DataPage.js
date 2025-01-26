import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument, listDocuments, deleteDocument, setLoading } from '../features/document/documentSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { uploadFileToGCS } from '../utils/uploadFileToGCS';
import '../styles/DataPage.css';
import axios from 'axios';
import moment from 'moment';
import { Outlet } from 'react-router-dom';

function DataPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(null);
  const [pdfUrls, setPdfUrls] = useState([]);

  const isLoading = useSelector(state => state.document.isLoading);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setUserEmail(localStorage.getItem('email'));
  }, []);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteFile = async (documentId) => {
    await dispatch(deleteDocument(documentId));
    dispatch(listDocuments(userEmail));
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="">
        <Sidebar />
      </div>
    <Outlet/>
    </>
  );
}

export default DataPage;