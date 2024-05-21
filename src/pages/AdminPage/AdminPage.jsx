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
  const [displayNewForm, setDisplayNewForm] = useState(false); 
  const [newAttendance, setNewAttendance] = useState({
    name: "",
    class: ""
  });
  const [search, setSearch] = useState("");
  const [filteredAttendanceRecords, setFilteredAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/attendance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Data fetching failed');
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (err) {
        log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const filteredRecords = attendanceRecords.filter((record) => record.checkinDate === new Date().toDateString().split(" ").slice(1).join(" "));
  useEffect(() => {
    setFilteredAttendanceRecords(filteredRecords);
  }, [attendanceRecords]);   // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    if (search) {
      const searchData = attendanceRecords.filter((record) => record.checkinDate.includes(search)
      || record.studentInfo?.class.includes(search)
      || record.studentInfo?.name.includes(search)
      || JSON.stringify(record.isAbsent).includes(search));
      setFilteredAttendanceRecords(searchData)
    } else {
      setFilteredAttendanceRecords(filteredRecords);
    }
  };

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
    const { name, value, type, checked } = evt.target;
    const newValue = type === 'checkbox' ? checked : value;
    // Check if the field is part of studentInfo
    if (['class', 'contact'].includes(name)) {
      setAttendanceData(previewData => ({
        ...previewData,
        studentInfo: {
          ...previewData.studentInfo,
          [name]: newValue
        }
      }));
    } else {
      // Update other fields directly in attendanceData
      setAttendanceData(previewData => ({
        ...previewData,
        [name]: newValue
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
    // log(attendanceData);
    setAttendanceRecords(attendanceRecords.map((record) => {
      if (record._id === jsonData._id) {
        return jsonData;
      }
      return record;
    }));
    setDisplayEditForm(false);
  }

  const handleCloseEdit = () => {
    setAttendanceData({});
    setDisplayEditForm(false);
  }

  const handleNewChange = (evt) => {
    setNewAttendance({
      ...newAttendance,
      [evt.target.name]: evt.target.value
    })
  }

  const handleNewSubmit = async (evt) => {
    evt.preventDefault();
      const response = await fetch('/api/users/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAttendance),
      });
      if (!response.ok) {
        setError("Log in attendance failed, please check if student exists or have already logged attendance!")
        throw new Error('Data creation failed');
      }
      const json = await response.json();
      log(json);
      setAttendanceRecords([...attendanceRecords, json]);
      setNewAttendance({
        name: "",
        class: ""
      });
      setDisplayNewForm(false);
  }

  const handleCloseNew = () => {
    setNewAttendance({
      name: "",
      class: ""
    });
    setError(null);
    setDisplayNewForm(false);
  }

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-SG', options);
  };
  
  return (
    <>
      <h1>Admin Page - Student Attendance ({getCurrentDate()})</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
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
                    <th>Reason</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendanceRecords.map((attendance, index) => (
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
                      <td>{attendance.withReason === true ? "yes" : "n/a"}</td>
                      <td><button onClick={() => handleEdit(attendance)}>🖊</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={{width: "40px", height: "40px", borderRadius: "50%"}} onClick={() => setDisplayNewForm(true)}>+</button>
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
                <input type='text' name='isLate' value={attendanceData.isLate} onChange={handleEditChange} disabled={!attendanceData.withReason} />
                <label>Absent</label>
                <input type='text' name='isAbsent' value={attendanceData.isAbsent} onChange={handleEditChange} disabled={!attendanceData.withReason} />
                <label>Reason</label>
                <input type='checkbox' name='withReason' checked={attendanceData.withReason} onChange={handleEditChange} />
                <div style={{display: "flex", gap: "20px"}}>
                  <button type="submit">Save</button>
                  <button className='btn-sm' onClick={handleCloseEdit}>Cancel</button>
                </div>
              </form>
            </div>}    
          </div>
          {displayNewForm && (
          <div className='form-container' style={{maxWidth: "500px"}}>
            <form autoComplete="off" onSubmit={handleNewSubmit}>
              <label>Name</label>
              <input type='text' name='name' value={newAttendance.name.toLowerCase()} onChange={handleNewChange}/>
              <label>Class</label>
              <input type='text' name='class' value={newAttendance.class.toUpperCase()} onChange={handleNewChange}/>
              <div style={{display: "flex", gap: "20px"}}>
                  <button type="submit">Submit</button>
                  <button className='btn-sm' onClick={handleCloseNew}>Cancel</button>
              </div>
            </form>
            {error && <p>Error: {error}</p>}
          </div>)}
        </div>
      )}
    </>
  );
}