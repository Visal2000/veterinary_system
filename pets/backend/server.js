const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '200123704050A',
  database: 'vetez',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});








// Fetch all pets
app.get('/pets', (req, res) => {
  const sql = 'SELECT * FROM pets';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving pets');
    } else {
      res.status(200).json(results);
    }
  });
});

// Fetch pet data by ID
app.get('/pets/:petId', (req, res) => {
  const { petId } = req.params;
  const sql = 'SELECT * FROM pets WHERE petId = ?';
  db.query(sql, [petId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching pet');
    } else if (results.length === 0) {
      res.status(404).send('Pet not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new pet
app.post('/add-pet', (req, res) => {
  const { petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email } = req.body;
  const sql = 'INSERT INTO pets (petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving the pet');
    } else {
      res.status(200).send('Pet added successfully');
    }
  });
});

// Update pet data by ID
app.put('/pets/:petId', (req, res) => {
  const { petId } = req.params;
  const updatedPetData = req.body;
  const query = 'UPDATE pets SET ? WHERE petId = ?';
  db.query(query, [updatedPetData, petId], (err, results) => {
    if (err) {
      console.error('Error updating pet data:', err);
      res.status(500).send('Error updating pet data.');
    } else {
      res.send('Pet data updated successfully.');
    }
  });
});




// Delete pet data by ID
app.delete('/pets/:petId', (req, res) => {
  const { petId } = req.params;

  // Delete associated treatments first
  const deleteTreatmentsSql = 'DELETE FROM treatments WHERE petId = ?';
  db.query(deleteTreatmentsSql, [petId], (err) => {
    if (err) {
      console.error('Error deleting treatments:', err);
      res.status(500).send('Error deleting treatments.');
      return;
    }

    // Delete pet
    const deletePetSql = 'DELETE FROM pets WHERE petId = ?';
    db.query(deletePetSql, [petId], (err, result) => {
      if (err) {
        console.error('Error deleting pet data:', err);
        res.status(500).send('Error deleting pet data.');
      } else {
        res.send('Pet data deleted successfully.');
      }
    });
  });
});

// Fetch all treatments for a pet
app.get('/treatments/:petId', (req, res) => {
  const { petId } = req.params;
  const sql = 'SELECT * FROM treatments WHERE petId = ?';
  db.query(sql, [petId], (err, results) => {
    if (err) {
      console.error('Error fetching treatments:', err);
      res.status(500).send('Error fetching treatments.');
    } else {
      res.json(results);
    }
  });
});

// Add a new treatment
app.post('/treatments', (req, res) => {
  const { petId, treatmentName, doctor, date } = req.body;
  const sql = 'INSERT INTO treatments (petId, treatmentName, doctor, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [petId, treatmentName, doctor, date], (err, result) => {
    if (err) {
      console.error('Error adding treatment:', err);
      res.status(500).send('Error adding treatment.');
    } else {
      res.status(200).send('Treatment added successfully');
    }
  });
});

// Create treatments table if it does not exist
app.get('/create-treatments-table', (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS treatments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      petId VARCHAR(8),
      treatmentName VARCHAR(255),
      doctor VARCHAR(255),
      date DATE,
      FOREIGN KEY (petId) REFERENCES pets(petId) ON DELETE CASCADE
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating treatments table:', err);
      res.status(500).send('Error creating treatments table.');
    } else {
      res.send('Treatments table created or already exists.');
    }
  });
});







app.post('/addDoctor', (req, res) => {
  const { docId, docName, birthday, address, registrationDate } = req.body;

  const query = 'INSERT INTO doctors (docId, docName, birthday, address, registrationDate) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [docId, docName, birthday, address, registrationDate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      res.status(200).send('Doctor added successfully');
    }
  });
});





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

























/*// Set up storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Add notice
app.post('/notices', upload.single('image'), (req, res) => {
  const { ownerName, ownerId, description, mobileNumber, date } = req.body;
  const image = req.file ? fs.readFileSync(req.file.path) : null;

  const query = 'INSERT INTO notice (ownerName, ownerId, description, mobileNumber, date, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [ownerName, ownerId, description, mobileNumber, date, image], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice added');
    }
  });
});

// Get all notices
app.get('/notices', (req, res) => {
  db.query('SELECT * FROM notice', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});

// Update notice
app.put('/notices/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { ownerName, ownerId, description, mobileNumber, date } = req.body;
  const image = req.file ? fs.readFileSync(req.file.path) : null;

  const query = 'UPDATE notice SET ownerName = ?, ownerId = ?, description = ?, mobileNumber = ?, date = ?, image = ? WHERE id = ?';
  db.query(query, [ownerName, ownerId, description, mobileNumber, date, image, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice updated');
    }
  });
});

// Delete notice
app.delete('/notices/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notice WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice deleted');
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});   */