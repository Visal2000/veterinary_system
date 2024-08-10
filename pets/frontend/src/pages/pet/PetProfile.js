






        /*            import React, { useState, useEffect } from 'react';
                    import {
                      MDBCol,
                      MDBContainer,
                      MDBRow,
                      MDBCard,
                      MDBCardText,
                      MDBCardBody,
                      MDBCardImage,
                      MDBInput,
                      MDBTable,
                      MDBTableHead,
                      MDBTableBody,
                     
                    } from 'mdb-react-ui-kit';
                    import { useParams, useNavigate } from 'react-router-dom';
                    import axios from 'axios';
                    import './Profile.css';
                    
                    export default function PetProfile() {
                      const { petId } = useParams();
                      const navigate = useNavigate();
                      const [petData, setPetData] = useState(null);
                      const [treatments, setTreatments] = useState([]);
                      const [treatmentName, setTreatmentName] = useState('');
                      const [doctor, setDoctor] = useState('');
                      const [date, setDate] = useState('');
                      const [isEditing, setIsEditing] = useState(false);
                      const [imageFile, setImageFile] = useState(null);
                      const [previewImage, setPreviewImage] = useState(null);
                    
                      useEffect(() => {
                        const fetchPetData = async () => {
                          try {
                            const response = await axios.get(`http://localhost:5000/pets/${petId}`);
                            setPetData(response.data);
                            setPreviewImage(response.data.petImage); // Set the preview image
                          } catch (err) {
                            console.error('Error fetching pet data:', err);
                          }
                        };
                        fetchPetData();
                      }, [petId]);
                    
                      useEffect(() => {
                        const fetchTreatments = async () => {
                          try {
                            const response = await axios.get(`http://localhost:5000/treatments/${petId}`);
                            setTreatments(response.data);
                          } catch (err) {
                            console.error('Error fetching treatments:', err);
                          }
                        };
                        fetchTreatments();
                      }, [petId]);
                    
                      const handleUpdatePet = async () => {
                        const formData = new FormData();
                        formData.append('petName', petData.petName);
                        formData.append('birthday', petData.birthday);
                        formData.append('breed', petData.breed);
                        formData.append('ownerName', petData.ownerName);
                        formData.append('ownerId', petData.ownerId);
                        formData.append('email', petData.email);
                        formData.append('registrationDate', petData.registrationDate);
                        if (imageFile) {
                        formData.append('petImage', imageFile);
                        }
                    
                        try {
                          await axios.put(`http://localhost:5000/pets/${petId}`, formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          });
                          window.alert('Pet updated successfully.');
                          setIsEditing(false);
                        } catch (err) {
                          console.error('Error updating pet data:', err);
                        }
                      };
                    
                      const handleDeletePet = async () => {
                        try {
                          await axios.delete(`http://localhost:5000/pets/${petId}`);
                          window.alert('Pet deleted successfully.');
                          navigate('/Petlist'); // Redirect to pet list or another appropriate page
                          await axios.delete(`http://localhost:5000/treatments/${petId}`); // Also delete treatments
                        } catch (err) {
                          console.error('Error deleting pet data:', err);
                        }
                      };
                    
                      const handleAddTreatment = async () => {
                        try {
                          await axios.post('http://localhost:5000/treatments', { petId, treatmentName, doctor, date });
                          setTreatments([...treatments, { treatmentName, doctor, date }]);
                          setTreatmentName('');
                          setDoctor('');
                          setDate('');
                          window.alert('Treatment added successfully.');
                        } catch (err) {
                          console.error('Error adding treatment:', err);
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
                    
                      if (!petData) {
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
                                    <p className="text-muted mb-1">{petData.petName}</p>
                                    <p className="text-muted mb-4">ID : {petData.petId}</p>
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
                                            value={petData.petName}
                                            onChange={(e) => setPetData({ ...petData, petName: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.petName}</MDBCardText>
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
                                            value={petData.birthday.split('T')[0]} // Handle date format
                                            onChange={(e) => setPetData({ ...petData, birthday: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.birthday}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Breed</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={petData.breed}
                                            onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.breed}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Owner Name</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={petData.ownerName}
                                            onChange={(e) => setPetData({ ...petData, ownerName: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.ownerName}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Owner ID</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={petData.ownerId}
                                            onChange={(e) => setPetData({ ...petData, ownerId: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.ownerId}</MDBCardText>
                                        )}
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                      <MDBCol>
                                        <MDBCardText>Email Address</MDBCardText>
                                      </MDBCol>
                                      <MDBCol>
                                        {isEditing ? (
                                          <MDBInput
                                            value={petData.email}
                                            onChange={(e) => setPetData({ ...petData, email: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.email}</MDBCardText>
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
                                            value={petData.address}
                                            onChange={(e) => setPetData({ ...petData, address: e.target.value })}
                                          />
                                        ) : (
                                          <MDBCardText className="text-muted">{petData.address}</MDBCardText>
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
                                            value={petData.registrationDate.split('T')[0]} // Handle date format
                                            onChange={(e) => setPetData({ ...petData, registrationDate: e.target.value })}
                                          />
                                        ) : (
                                          
                                            <MDBCardText className="text-muted">{petData.registrationDate}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      {isEditing ? (
                                        <button className='update-btn' onClick={handleUpdatePet} color="success">Save Changes</button>
                                      ) : (
                                        <>
                                          <button className='update-btn' onClick={() => setIsEditing(true)} color="primary">Edit</button>
                                          <button className='delete-btn' onClick={handleDeletePet} color="danger">Delete Pet</button>
                                        </>
                                      )}
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
                                      <button className='update-btn' onClick={handleAddTreatment}>Add Treatment</button>
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
                      }
                                */
                               
      







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
                        MDBTable,
                        MDBTableHead,
                        MDBTableBody,
                      } from 'mdb-react-ui-kit';
                      import { useParams, useNavigate } from 'react-router-dom';
                      import axios from 'axios';
                      import './PetProfile.css';
                      import { Modal, Button } from 'react-bootstrap';
                      
                      export default function PetProfile() {
                        const { petId } = useParams();
                        const navigate = useNavigate();
                        const [petData, setPetData] = useState(null);
                        const [treatments, setTreatments] = useState([]);
                        const [treatmentName, setTreatmentName] = useState('');
                        const [doctor, setDoctor] = useState('');
                        const [date, setDate] = useState('');
                        const [isEditing, setIsEditing] = useState(false);
                        const [imageFile, setImageFile] = useState(null);
                        const [previewImage, setPreviewImage] = useState(null);
                        const [showModal, setShowModal] = useState(false);
                        const closeModal = () => setShowModal(false);
  
                      
                        useEffect(() => {
                          const fetchPetData = async () => {
                            try {
                              const response = await axios.get(`http://localhost:5000/pets/${petId}`);
                              setPetData(response.data);
                              setPreviewImage(response.data.petImage); // Set the preview image
                            } catch (err) {
                              console.error('Error fetching pet data:', err);
                            }
                          };
                          fetchPetData();
                        }, [petId]);
                      
                        useEffect(() => {
                          const fetchTreatments = async () => {
                            try {
                              const response = await axios.get(`http://localhost:5000/treatments/${petId}`);
                              setTreatments(response.data);
                            } catch (err) {
                              console.error('Error fetching treatments:', err);
                            }
                          };
                          fetchTreatments();
                        }, [petId]);
                      
                        const handleUpdatePet = async () => {
                          const formData = new FormData();
                          formData.append('petName', petData.petName);
                          formData.append('birthday', petData.birthday);
                          formData.append('breed', petData.breed);
                          formData.append('ownerName', petData.ownerName);
                          formData.append('address', petData.address);
                          formData.append('ownerId', petData.ownerId);
                          formData.append('email', petData.email);
                          formData.append('registrationDate', petData.registrationDate);
                          if (imageFile) {
                          formData.append('petImage', imageFile);
                          }
                      
                          try {
                            await axios.put(`http://localhost:5000/pets/${petId}`, formData, {
                              headers: {
                                'Content-Type': 'multipart/form-data',
                              },
                            });
                            window.alert('Pet updated successfully.');
                            setIsEditing(false);
                          } catch (err) {
                            console.error('Error updating pet data:', err);
                          }
                        };
                      
                        const handleDeletePet = async () => {
                          try {
                            await axios.delete(`http://localhost:5000/pets/${petId}`);
                            window.alert('Pet deleted successfully.');
                            navigate('/Petlist'); // Redirect to pet list or another appropriate page
                            await axios.delete(`http://localhost:5000/treatments/${petId}`); // Also delete treatments
                          } catch (err) {
                            console.error('Error deleting pet data:', err);
                          }
                        };
                      
                        const handleAddTreatment = async () => {
                          try {
                            await axios.post('http://localhost:5000/treatments', { petId, treatmentName, doctor, date });
                            setTreatments([...treatments, { treatmentName, doctor, date }]);
                            setTreatmentName('');
                            setDoctor('');
                            setDate('');
                            window.alert('Treatment added successfully.');
                          } catch (err) {
                            console.error('Error adding treatment:', err);
                          }
                        };
                     
                        
                        const handleImageChange = (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            console.error('No file selected.');
                          }
                        };
                      
                        if (!petData) {
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
                                      <p className="text-muted mb-1">{petData.petName}</p>
                                      <p className="text-muted mb-4">ID : {petData.petId}</p>
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
                                              value={petData.petName}
                                              onChange={(e) => setPetData({ ...petData, petName: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.petName}</MDBCardText>
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
                                              value={petData.birthday.split('T')[0]} // Handle date format
                                              onChange={(e) => setPetData({ ...petData, birthday: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.birthday}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      <MDBRow>
                                        <MDBCol>
                                          <MDBCardText>Breed</MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                          {isEditing ? (
                                            <MDBInput
                                              value={petData.breed}
                                              onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.breed}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      <MDBRow>
                                        <MDBCol>
                                          <MDBCardText>Owner Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                          {isEditing ? (
                                            <MDBInput
                                              value={petData.ownerName}
                                              onChange={(e) => setPetData({ ...petData, ownerName: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.ownerName}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      <MDBRow>
                                        <MDBCol>
                                          <MDBCardText>Owner ID</MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                          {isEditing ? (
                                            <MDBInput
                                              value={petData.ownerId}
                                              onChange={(e) => setPetData({ ...petData, ownerId: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.ownerId}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
                                      <MDBRow>
                                        <MDBCol>
                                          <MDBCardText>Email Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                          {isEditing ? (
                                            <MDBInput
                                              value={petData.email}
                                              onChange={(e) => setPetData({ ...petData, email: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.email}</MDBCardText>
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
                                              value={petData.address}
                                              onChange={(e) => setPetData({ ...petData, address: e.target.value })}
                                            />
                                          ) : (
                                            <MDBCardText className="text-muted">{petData.address}</MDBCardText>
                                          )}
                                        </MDBCol>
                                      </MDBRow>
                                      <hr />
  
  
                                      <MDBRow>
                                        <MDBCol>
                                          <MDBCardText>Registration Date</MDBCardText>
                                        </MDBCol>
                                        <MDBCol>
                                          
                                            
                                              <MDBCardText className="text-muted">{petData.registrationDate}</MDBCardText>
                                            
                                          </MDBCol>  
                                        </MDBRow> 
                                        <hr />
                                        {isEditing ? (
                                           <button className='button button-save' onClick={handleUpdatePet} color="success">Save Changes</button>
                                          
                                              ) : (
                                                <>
                                                  <button className='button button-primary' onClick={() => setIsEditing(true)} color="primary">Edit</button>
                                                  <button className='button button-danger' onClick={() => setShowModal(true)} color="danger">Delete Pet</button>
                                                </>
                                              )}
  
                                          
                                       
  
  
                                      
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
                                        <button className='button button-save' onClick={handleAddTreatment}>Add Treatment</button>
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
  
  
        {/* Modal for confirmation */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header >
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this pet?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
              handleDeletePet();
              closeModal();
            }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
  
      </section>
    );
  
  
                        }
  
        
                                                                          
