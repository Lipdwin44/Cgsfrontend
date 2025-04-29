import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  CssBaseline,
  Container,
  Paper,
  TextField,
  Button
} from '@mui/material';
import {
  Payment as PaymentIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  HowToReg as HowToRegIcon
} from '@mui/icons-material';
 // existing import

const CompanyDashboard = () => {
  const [activeView, setActiveView] = useState('companyDashboard');
  const [studentCount, setStudentCount] = useState(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [domain, setDomain] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/student/count');
        const data = await response.json();
        if (typeof data === 'number') {
          setStudentCount(data);
        } else {
          console.error('Unexpected data format');
        }
      } catch (error) {
        console.error('Failed to fetch student count:', error);
      }
    };
    fetchStudentCount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !email || !contact_no || !domain) {
      setError('Please fill in all fields');
      setMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          contact_no,
          domain,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data || 'Registration successful!');
        setError('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setContactNo('');
        setDomain('');
        alert('Registration successful!');
      } else {
        setError(data || 'Registration failed. Please try again.');
        setMessage('');
      }
    } catch (error) {
      setError(`Something went wrong: ${error.message}`);
      setMessage('');
    }
  };

  const renderDashboardCards = () => (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 3,
      mb: 4
    }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PeopleIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h6">Students</Typography>
          <h1>{studentCount !== null ? studentCount : 'Loading...'}</h1>
        </Box>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <WorkIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h6">Offers</Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <BusinessIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h6">Companies</Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SchoolIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h6">Colleges</Typography>
        </Box>
      </Paper>
    </Box>
  );

  const renderPaymentHistory = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Payment History
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '16px' }}>2023-08-01</td>
              <td style={{ padding: '16px' }}>₹150</td>
              <td style={{ padding: '16px' }}>Paid</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </>
  );

  const renderStudentDetails = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Student Details
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>College</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Company</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Offer</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '16px' }}>John Doe</td>
              <td style={{ padding: '16px' }}>Potolino</td>
              <td style={{ padding: '16px' }}>Accenture</td>
              <td style={{ padding: '16px' }}>Full-time</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </>
  );

  // ✅ Student Registration Page
  const renderStudentRegistration = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Student Registration
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Domain"
            variant="outlined"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Contact Number"
            variant="outlined"
            type="text"
            value={contact_no}
            onChange={(e) => setContactNo(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Permanent Address"
            variant="outlined"
            multiline
            rows={2}
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            fullWidth
          />
          
          <TextField
            label="Residential Address"
            variant="outlined"
            multiline
            rows={2}
            value={residentialAddress}
            onChange={(e) => setResidentialAddress(e.target.value)}
            fullWidth
          />
          
          <TextField
            label="Pincode"
            variant="outlined"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            fullWidth
          />
          
          <Button variant="contained" color="primary" type="submit">
            Register Student
          </Button>
        </form>
      </Box>
    </>
    
  );
  

  // ✅ HR Registration Page
  const renderHrRegistration = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        HR Registration
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Company" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Contact Number" variant="outlined" fullWidth />
        <Button variant="contained" color="primary">Register HR</Button>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ width: 250 }}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setActiveView('companyDashboard')} selected={activeView === 'companyDashboard'}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Company Dashboard" />
          </ListItem>
          <ListItem button onClick={() => setActiveView('paymentHistory')} selected={activeView === 'paymentHistory'}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Payment History" />
          </ListItem>
          <ListItem button onClick={() => setActiveView('studentDetails')} selected={activeView === 'studentDetails'}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Student Details" />
          </ListItem>
          {/* New Menu Items */}
          <ListItem button onClick={() => setActiveView('studentRegistration')} selected={activeView === 'studentRegistration'}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary="Student Registration" />
          </ListItem>
          <ListItem button onClick={() => setActiveView('hrRegistration')} selected={activeView === 'hrRegistration'}>
            <ListItemIcon><HowToRegIcon /></ListItemIcon>
            <ListItemText primary="HR Registration" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 4 }}>
            {activeView === 'companyDashboard' && renderDashboardCards()}
            {activeView === 'paymentHistory' && renderPaymentHistory()}
            {activeView === 'studentDetails' && renderStudentDetails()}
            {activeView === 'studentRegistration' && renderStudentRegistration()}
            {activeView === 'hrRegistration' && renderHrRegistration()}


          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default CompanyDashboard;


