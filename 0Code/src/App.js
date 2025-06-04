import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneratorForm from './components/GeneratorForm';
import PaymentGateway from './components/PaymentGateway';
import Preview from './components/Preview';
import AdminDashboard from './components/AdminDashboard';
import UserAuth from './components/UserAuth';
import { AuthProvider } from './services/auth';
import './App.css';

function App() {
  const [generatedCode, setGeneratedCode] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={
              <GeneratorForm 
                setGeneratedCode={setGeneratedCode} 
                setUserPreferences={setUserPreferences} 
              />
            } />
            <Route path="/preview" element={
              <Preview 
                generatedCode={generatedCode} 
                userPreferences={userPreferences} 
              />
            } />
            <Route path="/payment" element={
              <PaymentGateway 
                generatedCode={generatedCode} 
                userPreferences={userPreferences} 
              />
            } />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<UserAuth />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;