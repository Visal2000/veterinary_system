// PetProfile.js
/*import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';
import './Profile.css'; // Import the CSS file

export default function PetProfile() {
  const [treatments, setTreatments] = useState([]);
  const [treatmentName, setTreatmentName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');

  const handleAddTreatment = () => {
    const newTreatment = { treatmentName, doctor, date };
    setTreatments([...treatments, newTreatment]);
    setTreatmentName('');
    setDoctor('');
    setDate('');
  };

  return (
    <section className="pet-profile-section">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="pet avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">Tommy</p>
                <p className="text-muted mb-4">ID : wqjk1efh</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Buddy</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Birthday</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">buddy@petemail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Breed</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner ID</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Email Address</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">visalsathsara55@gmail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Registration Date</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">2022-07-09</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>   
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBCard className="mt-4">
              <MDBCardBody>
                <h4>Add Treatment</h4>
                <MDBInput
                  label="Treatment Name"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="mb-3"
                />
                <MDBInput
                  label="Doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="mb-3"
                />
                <MDBInput
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mb-3"
                />
                <MDBBtn onClick={handleAddTreatment}>Add Treatment</MDBBtn>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mt-4">
              <MDBCardBody>
                <h4>Treatment History</h4>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Treatment Name</th>
                      <th>Doctor</th>
                      <th>Date</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {treatments.map((treatment, index) => (
                      <tr key={index}>
                        <td>{treatment.treatmentName}</td>
                        <td>{treatment.doctor}</td>
                        <td>{treatment.date}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}*/


import React, { useState, useEffect } from 'react';
                    import {
                      MDBCol,
                      MDBContainer,
                      MDBRow,
                      MDBCard,
                      MDBCardText,
                      MDBCardBody,
                      MDBCardImage,
                      MDBInput,
                     
                      
                    } from 'mdb-react-ui-kit';
                    import { useParams, useNavigate } from 'react-router-dom';
                    import axios from 'axios';
                    import './Profile.css';
                    
                    export default function DocProfile() {
                      const { docId } = useParams();
                      const navigate = useNavigate();
                      
                      const [docData, setDocData] = useState(null);
                      const [isEditing, setIsEditing] = useState(false);
                      const [imageFile, setImageFile] = useState(null);
                      const [previewImage, setPreviewImage] = useState(null);
                    
                      useEffect(() => {
                        const fetchDocData = async () => {
                          try {
                            const response = await axios.get(`http://localhost:5000/doctors/${docId}`);
                            setDocData(response.data);
                            setPreviewImage(response.data.docImage); // Set the preview image
                          } catch (err) {
                            console.error('Error fetching pet data:', err);
                          }
                        };
                        fetchDocData();
                      }, [docId]);
                    
                    
                      const handleUpdateDoc = async () => {
                        const formData = new FormData();
                        formData.append('docName', docData.docName);
                        formData.append('birthday', docData.birthday);
                        formData.append('address', docData.address);
                        formData.append('registrationDate', docData.registrationDate);
                        if (imageFile) {
                        formData.append('docImage', imageFile);
                        }
                    
                        try {
                          await axios.put(`http://localhost:5000/doctors/${docId}`, formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          });
                          window.alert('Doctor updated successfully.');
                          setIsEditing(false);
                        } catch (err) {
                          console.error('Error updating pet data:', err);
                        }
                      };
                    
                      const handleDeleteDoc = async () => {
                        try {
                          await axios.delete(`http://localhost:5000/doctors/${docId}`);
                          window.alert('Doctor deleted successfully.');
                          navigate('/Doclist'); // Redirect to doc list or another appropriate page
                          
                        } catch (err) {
                          console.error('Error deleting Doctor data:', err);
                        }
                      };
                    
                  
                    
                      const handleImageChange = (e) => {
                        const file = e.target.files[0];
                        setImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreviewImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      };
                    
                      if (!docData) {
                        return <div>Loading...</div>;
                      }
                    
                      return (
                        <section className="pet-profile-section">
                          <MDBContainer>
                            <MDBRow>
                              <MDBCol>
                                <MDBCard>
                                  <MDBCardBody className="text-center">
                                    <MDBCardImage
                                      src={previewImage || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                                      alt="pet avatar"
                                      className="rounded-circle"
                                      style={{ width: '150px' }}
                                      fluid
                                    />
                                    {isEditing && (
                                      <MDBInput type="file" onChange={handleImageChange} />
                                    )}
                                    <p className="text-muted mb-1">{docData.docName}</p>
                                    <p className="text-muted mb-4">ID : {docData.docId}</p>
                                  </MDBCardBody>
                                </MDBCard>
                              </MDBCol>
                    
                              <MDBCol>
                                <MDBCard>
                                  <MDBCardBody>
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Name</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={docData.docName}
                                            onChange={(e) => setDocData({ ...docData, docName: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{docData.docName}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Birthday</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            type="date"
                                            value={docData.birthday.split('T')[0]} // Handle date format
                                            onChange={(e) => setDocData({ ...docData, birthday: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{docData.birthday}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Address</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={docData.address}
                                            onChange={(e) => setDocData({ ...docData, address: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{docData.address}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>

                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Registration Date</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            type="date"
                                            value={docData.registrationDate.split('T')[0]} // Handle date format
                                            onChange={(e) => setDocData({ ...docData, registrationDate: e.target.value })}
                                          />
                                        ) : (
                                          
                                            <MDBCardText className="text-muted">{docData.registrationDate}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      {isEditing ? (
                                        <button className='update-btn' onClick={handleUpdateDoc} color="success">Save Changes</button>
                                      ) : (
                                        <>
                                          <button className='update-btn' onClick={() => setIsEditing(true)} color="primary">Edit</button>
                                          <button className='delete-btn' onClick={handleDeleteDoc} color="danger">Delete Doctor</button>
                                        </>
                                      )}
                                    </MDBCardBody>
                                  </MDBCard>
                                </MDBCol>
                              </MDBRow>
                      
                              
                            </MDBContainer>
                          </section>
                        );
                      }