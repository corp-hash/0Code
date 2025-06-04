import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const GeneratorForm = ({ setGeneratedCode, setUserPreferences }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessModel: 'ecommerce',
    colorScheme: '#2563eb',
    contactEmail: '',
    contactPhone: '',
    additionalFeatures: []
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.generateWebsite(formData);
      setGeneratedCode(response.data.code);
      setUserPreferences(formData);
      navigate('/preview');
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-form">
      <h1>0Code Website Generator</h1>
      <p>Create your tailor-made website in minutes</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Business/Website Name</label>
          <input 
            type="text" 
            name="businessName" 
            value={formData.businessName} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Business Model</label>
          <select 
            name="businessModel" 
            value={formData.businessModel} 
            onChange={handleChange}
          >
            <option value="ecommerce">E-commerce</option>
            <option value="portfolio">Portfolio</option>
            <option value="blog">Blog</option>
            <option value="corporate">Corporate</option>
            <option value="saas">SaaS</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Color Scheme</label>
          <input 
            type="color" 
            name="colorScheme" 
            value={formData.colorScheme} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Contact Email</label>
          <input 
            type="email" 
            name="contactEmail" 
            value={formData.contactEmail} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Contact Phone</label>
          <input 
            type="tel" 
            name="contactPhone" 
            value={formData.contactPhone} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Additional Features</label>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={formData.additionalFeatures.includes('seo')}
                onChange={() => {
                  setFormData(prev => ({
                    ...prev,
                    additionalFeatures: prev.additionalFeatures.includes('seo') 
                      ? prev.additionalFeatures.filter(f => f !== 'seo')
                      : [...prev.additionalFeatures, 'seo']
                  }));
                }}
              />
              SEO Optimization
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={formData.additionalFeatures.includes('multilingual')}
                onChange={() => {
                  setFormData(prev => ({
                    ...prev,
                    additionalFeatures: prev.additionalFeatures.includes('multilingual') 
                      ? prev.additionalFeatures.filter(f => f !== 'multilingual')
                      : [...prev.additionalFeatures, 'multilingual']
                  }));
                }}
              />
              Multilingual Support
            </label>
          </div>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Website'}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;