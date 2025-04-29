import React, { useEffect, useState } from 'react';
import './StudentCountCard.css'; // Styling for count card

const StudentCountCard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/student/count');

        if (!response.ok) {
          throw new Error('Failed to fetch student count');
        }

        const data = await response.json();

        // Since your backend returns just a number:
        if (typeof data === 'number') {
          setCount(data);
        } else {
          throw new Error('Unexpected data format');
        }

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className="count-card">
      <h2>Total Students</h2>
      {loading ? (
        <p className="count-loading">Loading...</p>
      ) : error ? (
        <p className="count-error">{error}</p>
      ) : (
        <p className="count-number">{count}</p>
      )}
    </div>
  );
};

export default StudentCountCard;





