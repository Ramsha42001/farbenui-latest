import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Approve.module.css';

function Approve() {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceDetails = location.state?.invoiceDetails;

  console.log('Invoice Details:', invoiceDetails); // Add this to debug the data structure

  if (!invoiceDetails) {
    return (
      <div className={styles.container}>
        <h2>No Invoice Details Available</h2>
        <button onClick={() => navigate('/')}>Return to Invoice Generation</button>
      </div>
    );
  }

  // Calculate total amount
  const calculateTotal = () => {
    return invoiceDetails.items?.reduce((total, item) => {
      return total + (item.quantity * item.rate);
    }, 0) || 0;
  };

  const handleApprove = () => {
    console.log('Invoice approved');
  };

  const handleReject = () => {
    console.log('Invoice rejected');
  };

  return (
    <div className={styles.container}>
      <h2>Review and Approve Invoice</h2>

      {/* Invoice Information */}
      <div className={styles.section}>
        <h3>Invoice Information</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <strong>Invoice ID:</strong>
            <span>{invoiceDetails.id || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Invoice Date:</strong>
            <span>{invoiceDetails.date ? new Date(invoiceDetails.date).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className={styles.section}>
        <h3>Customer Information</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <strong>Customer ID:</strong>
            <span>{invoiceDetails.customerId || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Name:</strong>
            <span>{invoiceDetails.client || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong>
            <span>{invoiceDetails.customerEmail || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Address:</strong>
            <span>
              {invoiceDetails.customerAddress || 'N/A'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>VAT Number:</strong>
            <span>{invoiceDetails.vatNumber || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className={styles.section}>
        <h3>Invoice Items</h3>
        <div className={styles.tableContainer}>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Tax ID</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.skuId || 'N/A'}</td>
                  <td>{item.quantity || 0}</td>
                  <td>${(item.rate || 0).toFixed(2)}</td>
                  <td>{item.taxId || 'N/A'}</td>
                  <td>${((item.quantity || 0) * (item.rate || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className={styles.totalLabel}>Total Amount:</td>
                <td className={styles.totalAmount}>{invoiceDetails.total_amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          className={`${styles.button} ${styles.approveButton}`}
          onClick={handleApprove}
        >
          Approve Invoice
        </button>
        <button 
          className={`${styles.button} ${styles.rejectButton}`}
          onClick={handleReject}
        >
          Reject Invoice
        </button>
      </div>
    </div>
  );
}

export default Approve;