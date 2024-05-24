const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3056;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/external')
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const db = mongoose.connection;

const UserSchema = new mongoose.Schema({
  name: String,
  regd_no: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
  number: String,
  country: String, // Corrected the typo here
});

const User = mongoose.model('WTUSER', UserSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', async (req, res) => {
  const { name, regd_no, email, password, dob, gender, number, country } = req.body;
  try {
    const userr = new User({
      name,
      regd_no,
      email,
      password,
      dob,
      gender,
      number,
      country, // Corrected the typo here
    });
    await userr.save(); // Added the await keyword here
    console.log(userr); // Changed console to console.log
    res.send('Successfully submitted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting the form' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
