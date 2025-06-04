import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../services/auth';

const AdminDashboard = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchSalesData = async () => {
        try {
          const response = await api.getSalesData();
          setSales(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch sales data');
          setLoading(false);
        }
      };
      
      fetchSalesData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <div className="unauthorized">Unauthorized access</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="sales-overview">
        <h3>Sales Overview</h3>
        <div className="metrics">
          <div className="metric-card">
            <h4>Total Revenue</h4>
            <p>${sales.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="metric-card">
            <h4>Total Websites Sold</h4>
            <p>{sales.totalWebsites}</p>
          </div>
          <div className="metric-card">
            <h4>This Month</h4>
            <p>${sales.monthlyRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="recent-sales">
        <h3>Recent Sales</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Website</th>
              <th>Amount</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {sales.recentSales.map((sale, index) => (
              <tr key={index}>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>{sale.customerName}</td>
                <td>{sale.websiteName}</td>
                <td>${sale.amount.toFixed(2)}</td>
                <td>{sale.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="ai-recommendations">
        <h3>AI Recommendations</h3>
        <div className="recommendation">
          <p>{sales.aiRecommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;