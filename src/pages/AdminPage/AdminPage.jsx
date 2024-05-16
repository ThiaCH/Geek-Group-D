import { useState, useEffect } from 'react';
import '../../css/tables.css';

export default function AdminPage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students');
        if (!response.ok) throw new Error('Data fetching failed');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };
  
  return (
    <>
      <h1>Admin Page - Student Attendance ({getCurrentDate()})</h1>
      {error && <p>Error: {error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Log In Time</th>
              <th>Class</th>
              <th>Contact Number</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id || index}>
                <td>{student._id}</td>
                <td>{student.studentName}</td>
                <td>{student.createdAt}</td>
                <td>{student.class}</td>
                <td>{student.contact}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
