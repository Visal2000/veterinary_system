
import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';
import axios from 'axios';

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    ownerName: '',
    ownerId: '',
    description: '',
    mobileNumber: '',
    date: new Date().toLocaleDateString(),
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(null);

  useEffect(() => {
    // Fetch notices from the backend
    axios.get('http://localhost:5000/notices')
      .then(response => setNotices(response.data))
      .catch(error => console.error('Error fetching notices:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:5000/update-notice/${notices[currentNoticeIndex].id}`, form);
        setNotices(notices.map((notice, index) =>
          index === currentNoticeIndex ? form : notice
        ));
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating notice:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:5000/add-notice', form);
        setNotices([...notices, form]);
      } catch (error) {
        console.error('Error adding notice:', error);
      }
    }
    setForm({
      ownerName: '',
      ownerId: '',
      description: '',
      mobileNumber: '',
      date: new Date().toLocaleDateString(),
      image: null,
    });
  };

  const handleEdit = (index) => {
    setForm(notices[index]);
    setIsEditing(true);
    setCurrentNoticeIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/delete-notice/${notices[index].id}`);
      window.alert('delete');
     

      setNotices(notices.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <div className="notice-board-section">
      <div className="add-notice-container">
        <h2>{isEditing ? 'Edit Notice' : 'Add Notice'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Owner Name:</label>
            <input
              type="text"
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Owner ID:</label>
            <input
              type="text"
              name="ownerId"
              value={form.ownerId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="text" name="date" value={form.date} readOnly />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="form-group">
            <button type="submit">{isEditing ? 'Update Notice' : 'Add Notice'}</button>
          </div>
        </form>
      </div>
      <div className="view-notices-container">
        <h2>View Notices</h2>
        {notices.length > 0 ? (
          <ul>
            {notices.map((notice, index) => (
              <li key={index}>
                {notice.image && <img src={notice.image} alt="Notice" className="notice-image" />}
                <p>
                  <strong>Owner Name:</strong> {notice.ownerName}
                </p>
                <p>
                  <strong>Owner ID:</strong> {notice.ownerId}
                </p>
                <p>
                  <strong>Description:</strong> {notice.description}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {notice.mobileNumber}
                </p>
                <p>
                  <strong>Date:</strong> {notice.date}
                </p>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notices to display.</p>
        )}
      </div>
    </div>
  );
}







