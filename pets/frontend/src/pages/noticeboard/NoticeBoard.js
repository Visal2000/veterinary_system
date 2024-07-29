// NoticeBoard.js
import React, { useState } from 'react';
import './NoticeBoard.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedNotices = notices.map((notice, index) =>
        index === currentNoticeIndex ? form : notice
      );
      setNotices(updatedNotices);
      setIsEditing(false);
    } else {
      setNotices([...notices, form]);
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

  const handleDelete = (index) => {
    const filteredNotices = notices.filter((_, i) => i !== index);
    setNotices(filteredNotices);
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






