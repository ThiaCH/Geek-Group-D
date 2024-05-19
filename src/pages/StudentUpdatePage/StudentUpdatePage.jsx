import { useState } from 'react';
import '../../css/studentupdate.css';

export default function StudentUpdate () {
  const [formData, setFormData] = useState({
    studentName: '',
    contactNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Assuming the server responds with JSON
      console.log(data);
      alert('Update successful!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Update failed!');
    }
  };

  return (
    <>
      <h1 className='update-title'>Update Student Profile</h1>

      <div className="update-form-container">
        <form>
          <div className="update-form-group">
            <label htmlFor="studentName">Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <br/>
          
          <div className="update-form-group">
            <label htmlFor="contactNumber">Contact:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="update-form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="update-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className='update-save-btn-container'>
            <button type="button" onClick={handleSave} className="update-save-btn">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
