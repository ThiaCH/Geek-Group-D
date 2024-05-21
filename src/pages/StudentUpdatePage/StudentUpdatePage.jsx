import { useState } from 'react';
import { updateStudent } from '../../utilities/users-service'; 
import '../../css/studentupdate.css';


export default function StudentUpdate({user}) {
  const [formData, setFormData] = useState({
    id: '',
    studentName: '',
    contactNumber: '',
    email: '',
    nok: '',
    nokContact: '',
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
        contact: formData.contactNumber === '' ? user.contact : formData.contactNumber,
        email: formData.email === '' ? user.email : formData.email,
        emergencyContactPerson: formData.nok === '' ? user.emergencyContactPerson : formData.nok,
        emergencyContactNumber: formData.nokContact === '' ? user.emergencyContactNumber : formData.nokContact,
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
            <label htmlFor="nok">Emergency Contact Person</label>
            <input
              type="text"
              id="nok"
              name="nok"
              placeholder={user.emergencyContactPerson}
              value={formData.nok}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="update-form-group">
            <label htmlFor="nokContact">Emergency Contact Number</label>
            <input
              type="text"
              id="nokContact"
              name="nokContact"
              placeholder={user.emergencyContactNumber}
              value={formData.nokContact}
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
