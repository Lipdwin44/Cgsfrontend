import React, { useState } from 'react';
import './AcceptedStudents.css';
import { FaUserGraduate } from 'react-icons/fa';

const mockData = [
  { id: 1, jobId: 'JOB123', date: '2025-04-01', name: 'Alice Johnson' },
  { id: 2, jobId: 'JOB124', date: '2025-04-02', name: 'Bob Smith' },
  { id: 3, jobId: 'JOB125', date: '2025-04-05', name: 'Charlie Brown' },
];

const AcceptedStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="accepted-container">
      <div className="accepted-header">
        <FaUserGraduate className="student-icon" />
        <h2>Accepted Students</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Accepted Date</th>
              <th>Job ID</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.date}</td>
                  <td>{student.jobId}</td>
                  <td>
                    <button className="view-btn">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'gray' }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedStudents;