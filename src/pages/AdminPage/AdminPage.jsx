import { useState, useEffect } from 'react';
import '../../css/tables.css';
import debug from "debug";

const log = debug('mern:pages:AdminPage');

export default function AdminPage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [displayNewForm, setDisplayNewForm] = useState(false); // eslint-disable-line no-unused-vars

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

  const handleEdit = (attendance) => {
    setDisplayEditForm(true);
    setAttendanceData(attendance);
    // log(attendanceData)
  }

  const handleEditChange = (evt) => {
    const { name, value } = evt.target;

    // Check if the field is part of studentInfo
    if (['class', 'contact'].includes(name)) {
      setAttendanceData(previewData => ({
        ...previewData,
        studentInfo: {
          ...previewData.studentInfo,
          [name]: value
        }
      }));
    } else {
      // Update other fields directly in attendanceData
      setAttendanceData(previewData => ({
        ...previewData,
        [name]: value
      }));
    }
  }

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    const response = await fetch(`/api/users/attendance/${attendanceData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData)
    });
    const jsonData = await response.json();
    log(attendanceData);
    setAttendanceRecords(attendanceRecords.map((record) => {
      if (record._id === jsonData._id) {
        return jsonData;
      }
      return record;
    }));
    setDisplayEditForm(false);
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
        <div style={{display: "flex", gap: "10px"}}>
          <div className='table'>
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
                    <td style={{backgroundColor: attendance.isLate ? "yellow" : "white"}}>{attendance.isLate === true ? "yes" : "n/a"}</td>
                    <td style={{backgroundColor: attendance.isAbsent ? "red" : "white"}}>{attendance.isAbsent === true ? "yes" : "n/a"}</td>
                    <td><button onClick={() => handleEdit(attendance)}>🖊</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button style={{width: "40px", height: "40px", borderRadius: "50%"}}>+</button>
          </div>
          {displayEditForm && 
          <div className='form-container'>
            <form autoComplete="off" onSubmit={handleEditSubmit}>
              <label>Date</label>
              <input type='text' name='checkinDate' value={attendanceData.checkinDate} disabled />
              <label>Student Name</label>
              <input type='text' name='name' value={attendanceData.studentInfo?.name} disabled />
              <label>Class</label>
              <input type='text' name='class' value={attendanceData.studentInfo?.class} onChange={handleEditChange} />
              <label>Contact Number</label>
              <input type='tel' name='contact' value={attendanceData.studentInfo?.contact} onChange={handleEditChange} />
              <label>Check In Time</label>
              <input type='text' name='checkinTime' value={attendanceData.checkinTime} onChange={handleEditChange} />
              <label>Late</label>
              <input type='text' name='isLate' value={attendanceData.isLate} onChange={handleEditChange} />
              <label>Absent</label>
              <input type='text' name='isAbsent' value={attendanceData.isAbsent} onChange={handleEditChange} />
              <button type="submit">Save</button>
            </form>
          </div>}
          {displayNewForm && 
          <div className='form-container' style={{maxWidth: "200px"}}>
            <form autoComplete='off'></form>
          </div>}      
        </div>
      )}
    </>
  );
}
