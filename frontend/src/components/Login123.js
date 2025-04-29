import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import "./Login.css";
// import { FaUser, FaLock } from "react-icons/fa";

function Register() {

  const [studentname, setStudentname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        studentname,
        password,
      });
  
      alert(response.data);
  
      const { firstName, role,token } = response.data;
  
      localStorage.setItem("user", JSON.stringify({ studentname, firstName, role,token }));
  
      if (role === 'Owner') {
        navigate('/CompanyDashboard');
      } else if (role === 'Hr' || role === 'student') {
        navigate('/roletable');
      } else {
        navigate('/studentdashboard');
      }
  
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data) {
        alert('Login failed: ' + error.response.data);
      } else {
        alert('Login failed: Server not responding or unexpected error');
      }
    }
  };
    
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">STUDENT LOGIN</h2>
        <div className="student-icon">
          <img src="/graduation.jpg" alt="student" />
        </div>
        <div className="form-group">
          {/* <FaUser className="icon" /> */}
          <input type="email" 
          placeholder="Username"
          value={studentname}
          onChange={(e) => setStudentname(e.target.value)}
        />
          
  
        </div>
        <div className="form-group">
          {/* <FaLock className="icon" /> */}
          <input type="password" 
  
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>LOGIN</button>
   
        <button className="login-button">Register</button>
        

      </div>
    </div>
  );
}

export default Register;