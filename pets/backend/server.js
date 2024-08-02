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
});



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