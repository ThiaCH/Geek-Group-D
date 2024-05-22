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
    class: "" });
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
        log(data);
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
      <h1 style={{margin:"70px auto"}}>Admin Page - Student Attendance ({getCurrentDate()})</h1>
      
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
      <div className="container">
        <div className="row mb-3" style={{ background:"#cacaca", borderRadius:"15px", width:"50%", paddingTop:"20px", translate:"10px"}} >
          <div className="col">
            <input type="text" className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="col-auto" style={{translate:"-20px -10px"}}>
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Date</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Contact Number</th>
                  <th>Check In Time</th>
                  <th>Late</th>
                  <th>Absent</th>
                  <th>Reason</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendanceRecords.map((attendance, index) => (
                  <tr key={attendance._id || index}>
                    <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(attendance._id)}>Delete</button></td>
                    <td>{attendance.checkinDate}</td>
                    <td>{attendance.studentInfo?._id}</td>
                    <td>{attendance.studentInfo?.name}</td>
                    <td>{attendance.studentInfo?.class}</td>
                    <td>{attendance.studentInfo?.contact}</td>
                    <td>{attendance.checkinTime}</td>
                    <td className={attendance.isLate ? "table-warning" : ""}>{attendance.isLate ? "Yes" : "N/A"}</td>
                    <td className={attendance.isAbsent ? "table-danger" : ""}>{attendance.isAbsent ? "Yes" : "N/A"}</td>
                    <td>{attendance.withReason ? "Yes" : "N/A"}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={() => handleEdit(attendance)}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="btn btn-success rounded-circle" style={{width: "40px", height: "40px"}} onClick={() => setDisplayNewForm(true)}>+</button>
          </div>
        </div>

        {displayEditForm && (
          <div className="row">
            <div className="col">
              <form className="form-container" autoComplete="off" onSubmit={handleEditSubmit}>
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
                    <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseEdit}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {displayNewForm && (
          <div className="form-container" style={{ maxWidth: "500px" }}>
            <form autoComplete="off" onSubmit={handleNewSubmit}>
                  <label>Name</label>
                  <input type='text' name='name' value={newAttendance.name.toLowerCase()} onChange={handleNewChange}/>
                  <label>Class</label>
                  <input type='text' name='class' value={newAttendance.class.toUpperCase()} onChange={handleNewChange}/>
                  <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseNew}>Cancel</button>
              </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
          </div>
        )}

      </div>
      )}
    </>
  );
}