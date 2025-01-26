import React from 'react';
import styles from '../styles/Approve.module.css';

function Invoice() {
  // Sample invoice data (replace with your actual data)
  const invoiceData = {
    pearlInvoiceId: 'INV-47',
    invoiceDate: '2024-08-01',
    customer: {
      pearlCustomerId: 'CUSTOMER-2',
      isPerson: true,
      email: 'raju@techfarben.com',
      firstName: 'Raju',
      lastName: 'TechParties',
      country: 'IN',
      addressLine1: 'Race Road',
      addressLine2: '', // Add address line 2 if needed
      zip: '100001',
      vatRegistrationNumber: 'VAT-123',
    },
    invoice: {
      pearlInvoiceId: 'INV-47',
      invoiceDate: '09/30/2024',
      accountId: 159,
      locationId: 1,
      billingPeriod: '09/30/2024',
      items: [
        {
          skuId: '11',
          quantity: 1,
          rate: 100,
          taxId: 12,
        },
        // Add more items if needed
      ],
    },
  };

  // Handle invoice approval
  const handleApprove = () => {
    // Logic to handle invoice approval (e.g., API call)
    console.log('Invoice approved!');
  };

  return (
    <div className={styles.container}>
      <h2>Invoice Details</h2>
      <div className={styles.section}>
        <h3>Invoice Information</h3>
        <p>
          <strong> Invoice ID:</strong> {invoiceData.pearlInvoiceId}
        </p>
        <p>
          <strong>Invoice Date:</strong> {invoiceData.invoiceDate}
        </p>
      </div>

      <div className={styles.section}>
        <h3>Customer Information</h3>
        <p>
          <strong>Customer ID:</strong> {invoiceData.customer.pearlCustomerId}
        </p>
        <p>
          <strong>Name:</strong> {invoiceData.customer.firstName}{' '}
          {invoiceData.customer.lastName}
        </p>
        <p>
          <strong>Email:</strong> {invoiceData.customer.email}
        </p>
        {/* Add more customer details as needed */}
      </div>

      <div className={styles.section}>
        <h3>Invoice Items</h3>
        <table>
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Tax ID</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.skuId}</td>
                <td>{item.quantity}</td>
                <td>{item.rate}</td>
                <td>{item.taxId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className={styles.approveButton} onClick={handleApprove}>
        Approve
      </button>
    </div>
  );
}

export default Invoice;