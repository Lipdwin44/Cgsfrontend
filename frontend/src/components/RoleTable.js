import React, { useState } from 'react';
import './JobPortal.css';
import axios from 'axios';
import AcceptedStudents from './AcceptedStudents';
import { FaBriefcase } from 'react-icons/fa';


const JobPortal = () => {
  const [activeSection, setActiveSection] = useState('jobPosting');
  const [formData, setFormData] = useState({
    companyName: '',
    hrName: '',
    hrEmail: '',
    hrNumber: '',
    jobDescription: '',
    jobtitle: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/job-post', formData);
      const data = response.data;
      setMessage(data || 'Job Posted Successfully!');
      setError('');
      setFormData({
        companyName: '',
        hrName: '',
        hrEmail: '',
        hrNumber: '',
        jobDescription: '',
        jobtitle: '',
      });
    } catch (error) {
      setError('Job posting failed. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/cgsss.jpeg" alt="Student Portal" className="sidebar-logo" />
          <h1 className="portal-title">Job Portal</h1>
        </div>
        <nav className="sidebar-nav">
          <button className={activeSection === 'jobPosting' ? 'active' : ''} onClick={() => setActiveSection('jobPosting')}>
            Post a Job
          </button>
          <button className={activeSection === 'accepted' ? 'active' : ''} onClick={() => setActiveSection('accepted')}>
            Accepted Students
          </button>
          <button className={activeSection === 'rejected' ? 'active' : ''} onClick={() => setActiveSection('rejected')}>
            Rejected Students
          </button>
        </nav>
      </aside>

      <main className="content">
        {activeSection === 'jobPosting' && (
          <div className="form-container">
            <h2 className="form-title">Post a New Job
            <FaBriefcase className="business-icon" />
            </h2>
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-row">
                <div className="input-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>HR Name</label>
                  <input
                    type="text"
                    name="hrName"
                    value={formData.hrName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>HR Email</label>
                  <input
                    type="email"
                    name="hrEmail"
                    value={formData.hrEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>HR Number</label>
                  <input
                    type="text"
                    name="hrNumber"
                    value={formData.hrNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="jobtitle"
                    value={formData.jobtitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Job Description</label>
                  <input
                    type="text"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Posting...' : 'Upload Job'}
                </button>
              </div>
            </form>

            {message && <div className="message success">{message}</div>}
            {error && <div className="message error">{error}</div>}
          </div>
        )}

        {activeSection === 'accepted' && <AcceptedStudents />}
        {activeSection === 'rejected' && <h2 className="section-title">Rejected Students List</h2>}
      </main>
    </div>
  );
};

export default JobPortal;