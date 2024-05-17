import { useState } from 'react';
import '../../css/studentupdate.css'

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);  // To be replace with Post
  };

  return (
    <div className="form-container">

      <h1>Update Student Profile</h1>

      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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
        
        <div className="form-group">
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

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
}