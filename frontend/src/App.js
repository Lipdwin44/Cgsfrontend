import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login123 from './components/Login123';
import RoleTable from './components/RoleTable';
import StudentDashboard from './components/StudentDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import StudentCountCard from './components/StudentCountCard';
import Registerfromstudent from './components/Registerfromstudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login123 />} />
        <Route path="/roletable" element={<RoleTable />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/Registerfromstudent" component={<Registerfromstudent/>} />
  
        
        {/* ✅ Student Count Card Route */}
        <Route path="/studentcount" element={<div className="dashboard-wrapper">
              <StudentCountCard />
            </div>
          }
        />

        {/* 🔒 Optional: Add a fallback route or 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



