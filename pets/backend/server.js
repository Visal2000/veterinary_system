const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cpktnwt45@2665',
  database: 'vetez',
});


db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});






/*app.post('/add-pet', (req, res) => {
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




  // Endpoint to fetch a pet by ID
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
});*/



app.post('/add-doctor', (req, res) => {
  const { docName, birthday, address, registrationDate, docId } = req.body;
  const query = 'INSERT INTO doctors (docName, birthday, address, registrationDate, docId) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [docName, birthday, address, registrationDate, docId], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Doctor added successfully');
    }
  });
});


app.get('/doctors', (req, res) => {
  const sql = 'SELECT * FROM doctors';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving doctors');
    } else {
      res.status(200).json(results);
    }
  });
});







// Endpoint to fetch a pet by ID
app.get('/doctors/:docId', (req, res) => {
const { docId } = req.params;
const sql = 'SELECT * FROM doctors WHERE docId = ?';
db.query(sql, [docId], (err, results) => {
  if (err) {
    res.status(500).send('Error fetching doctor');
  } else if (results.length === 0) {
    res.status(404).send('doctor not found');
  } else {
    res.json(results[0]);
  }
});
});







app.post('/add-appointment', (req, res) => {
  const {petId, name, reason, doctor, date } = req.body;
  const query = 'INSERT INTO appointments (petId, name, reason, doctor, date) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [petId, name, reason, doctor, date], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('appointment added successfully');
    }
  });
});


app.get('/appointments', (req, res) => {
  const sql = 'SELECT * FROM appointments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving appointments');
    } else {
      res.status(200).json(results);
    }
  });
});







// Endpoint to fetch a pet by ID
app.get('/appointment/:appId', (req, res) => {
const { appId } = req.params;
const sql = 'SELECT * FROM appointments WHERE appId = ?';
db.query(sql, [appId], (err, results) => {
  if (err) {
    res.status(500).send('Error fetching appointment');
  } else if (results.length === 0) {
    res.status(404).send('appointment not found');
  } else {
    res.json(results[0]);
  }
});
});











// API to add a notice
app.post('/add-notice', (req, res) => {
  const { ownerName, ownerId, description, mobileNumber, date, image } = req.body;
  const query = 'INSERT INTO notices (ownerName, ownerId, description, mobileNumber, date, image) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [ownerName, ownerId, description, mobileNumber, date, image], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice added successfully');
    }
  });
});

// API to get all notices
app.get('/notices', (req, res) => {
  const query = 'SELECT * FROM notices';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});

// API to update a notice
app.put('/update-notice/:id', (req, res) => {
  const { id } = req.params;
  const { ownerName, ownerId, description, mobileNumber, date, image } = req.body;
  const query = 'UPDATE notices SET ownerName = ?, ownerId = ?, description = ?, mobileNumber = ?, date = ?, image = ? WHERE id = ?';

  db.query(query, [ownerName, ownerId, description, mobileNumber, date, image, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice updated successfully');
    }
  });
});

// API to delete a notice
app.delete('/delete-notice/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notices WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Notice deleted successfully');
    }
  });
});











// API to get total doctors count
app.get('/total-doctors', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM doctors';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors count:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ count: results[0].count });
    }
  });
});

// API to get total appointments count
app.get('/total-appointments', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM appointments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching appointments count:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ count: results[0].count });
    }
  });
});























































// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}












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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API endpoint to add a pet
app.post('/add-pet', upload.single('petImage'), (req, res) => {
  const { petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email } = req.body;
  const petImage = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = 'INSERT INTO pets (petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email, petImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [petName, birthday, breed, ownerName, ownerId, address, registrationDate, petId, email, petImage];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting pet:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Pet added');
  });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Update pet data by ID, including image
app.put('/pets/:petId', upload.single('petImage'), (req, res) => {
  const { petId } = req.params;
  const { petName, birthday, breed, ownerName, ownerId, address, registrationDate, email } = req.body;
  const petImage = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = 'UPDATE pets SET petName = ?, birthday = ?, breed = ?, ownerName = ?, ownerId = ?, address = ?, registrationDate = ?, email = ?';
  const values = [petName, birthday, breed, ownerName, ownerId, address, registrationDate, email];

  if (petImage) {
    sql += ', petImage = ?';
    values.push(petImage);
  }

  sql += ' WHERE petId = ?';
  values.push(petId);

  db.query(sql, values, (err, results) => {
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


// API to get total pets count
app.get('/total-pets', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM pets';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pets count:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ count: results[0].count });
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