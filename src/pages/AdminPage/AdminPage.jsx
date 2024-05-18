import { useState, useEffect } from 'react';
import '../../css/tables.css';

export default function AdminPage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Data fetching failed');
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async(attendanceId) => {
    const response = await fetch(`/api/users/attendance/${attendanceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setAttendanceRecords(attendanceRecords.filter((attendance) => attendance._id !== attendanceId))
    }
  }

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-SG', options);
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
              <th></th>
              <th>Date</th>
              <th>Student id</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Contact Number</th>
              <th>Check In Time</th>
              <th>Late</th>
              <th>Absent</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((attendance, index) => (
              <tr key={attendance._id || index}>
                <td><button onClick={() => handleDelete(attendance._id)}>X</button></td>
                <td>{attendance.checkinDate}</td>
                <td>{attendance.studentInfo?._id}</td>
                <td>{attendance.studentInfo?.name}</td>
                <td>{attendance.studentInfo?.class}</td>
                <td>{attendance.studentInfo?.contact}</td>
                <td>{attendance.checkinTime}</td>
                <td style={{backgroundColor: attendance.isLate ? "yellow" : "white"}}>{attendance.isLate === true ? "Yes" : "n/a"}</td>
                <td style={{backgroundColor: attendance.isAbsent ? "red" : "white"}}>{attendance.isAbsent === true ? "Yes" : "n/a"}</td>
                <td><button>🖊</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
