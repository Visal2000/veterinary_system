// PetProfile.js
import React, { useState } from 'react';
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
                    <MDBCardText className="text-muted">2000-04-09</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Breed</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Labrador</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Kamal</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner ID</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Owner01</MDBCardText>
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
}









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
                    <MDBCardText className="text-muted">2000-04-09</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Breed</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Labrador</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Kamal</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner ID</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Owner01</MDBCardText>
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
                    <MDBCardText className="text-muted">2000-04-09</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Breed</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Labrador</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner Name</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Kamal</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText>Owner ID</MDBCardText>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardText className="text-muted">Owner01</MDBCardText>
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
}
*/





