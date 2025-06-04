import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PaymentGateway = ({ generatedCode, userPreferences }) => {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await api.processPayment({
        method: paymentMethod,
        details: paymentDetails,
        amount: 150,
        currency: 'USD',
        userPreferences,
        code: generatedCode
      });
      
      if (response.success) {
        setSuccess(true);
        setDownloadLink(response.downloadLink);
        
        // Track conversion
        window.gtag('event', 'conversion', {
          'send_to': 'AW-123456789/AbC-D_EFGHIJKLmnopqr',
          'value': 150.00,
          'currency': 'USD'
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-gateway">
      <h2>Complete Your Purchase</h2>
      <p>Pay $150 to download your custom website code and deployment instructions</p>
      
      {!success ? (
        <div className="payment-form">
          <div className="payment-methods">
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="visa" 
                checked={paymentMethod === 'visa'} 
                onChange={() => setPaymentMethod('visa')} 
              />
              Credit/Debit Card (Visa/Mastercard)
            </label>
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="mpesa" 
                checked={paymentMethod === 'mpesa'} 
                onChange={() => setPaymentMethod('mpesa')} 
              />
              M-Pesa
            </label>
          </div>
          
          {paymentMethod === 'visa' && (
            <div className="card-details">
              <input 
                type="text" 
                placeholder="Card Number" 
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Expiry Date (MM/YY)" 
                onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="CVV" 
                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Cardholder Name" 
                onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})} 
              />
            </div>
          )}
          
          {paymentMethod === 'mpesa' && (
            <div className="mpesa-details">
              <input 
                type="tel" 
                placeholder="M-Pesa Phone Number" 
                onChange={(e) => setPaymentDetails({...paymentDetails, phone: e.target.value})} 
              />
              <p>You will receive an M-Pesa prompt to complete payment</p>
            </div>
          )}
          
          <button onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay $150'}
          </button>
          
          <div className="security-badges">
            <img src="/assets/images/ssl-secure.png" alt="SSL Secure" />
            <img src="/assets/images/pci-compliant.png" alt="PCI Compliant" />
          </div>
        </div>
      ) : (
        <div className="success-message">
          <h3>Payment Successful!</h3>
          <p>Your custom website code is ready for download.</p>
          <a href={downloadLink} className="download-button">
            Download Website Package
          </a>
          <div className="deployment-instructions">
            <h4>Deployment Instructions:</h4>
            <ol>
              <li>Unzip the downloaded package</li>
              <li>Upload all files to your web hosting</li>
              <li>Configure your domain settings</li>
              <li>Test all functionality</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;