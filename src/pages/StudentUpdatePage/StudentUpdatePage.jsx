import { useState } from 'react';
import '../../css/studentupdate.css';
import { updateStudent } from '../../utilities/users-service'; 


export default function StudentUpdate({user}) {
  const [formData, setFormData] = useState({
    id: '',
    studentName: '',
    contactNumber: '',
    email: '',
    // password: ''
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
      const data = await updateStudent({
        id: user._id,
        name: formData.studentName === '' ? user.name : formData.studentName,
        email: formData.email === '' ? user.email : formData.email,
        contact: formData.contactNumber === '' ? user.contact : formData.contactNumber,
        // password: formData.password   
      });
      console.log(data)
      alert('Update successful!');
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Update failed! Error: ${error.message}`);
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
              placeholder={user.name}
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
              placeholder={user.contact}
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
              placeholder={user.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* <br/>
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
          </div> */}
          <br/>
          <div className='update-save-btn-container'>
            <button type="button" onClick={handleSave} className="update-save-btn">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
