const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const fs = require("fs");
const FormData = require("form-data"); // ✅ Correct form-data package for Node
const multer = require("multer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connections
mongoose.connect('mongodb+srv://yashraaj2005:jNhjbd1RkdHcadzg@appointments.5naz5xa.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
});

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  location: String,
  lat: Number,
  lng: Number,
});

const appointmentSchema = new mongoose.Schema({
  userId: String,
  doctorId: String,
  date: String,
  time: String,
});

const medSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  time: String,
  taken: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Medication = mongoose.model('Medication', medSchema);

// Routes
// Doctors
app.get('/doctors', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Appointments
app.post('/appointments', async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;
    const appointment = new Appointment({ userId, doctorId, date, time });
    await appointment.save();

    const appointmentDateTime = new Date(`${date}T${time}`);
    const reminderTime = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);
    const delay = reminderTime.getTime() - Date.now();

    const sendReminder = async () => {
      const user = await User.findById(userId);
      const doctor = await Doctor.findById(doctorId);

      if (!user || !doctor) {
        console.error('❌ User or Doctor not found', { userId, doctorId });
        return;
      }

      const aiResponse = await axios.post('http://localhost:5000/generate-email', {
        userName: user.name,
        doctorName: doctor.name,
        time,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Appointment Reminder',
        text: aiResponse.data.message,
      });

      console.log(`📧 Reminder sent to ${user.email} for Dr. ${doctor.name}`);
    };

    if (delay > 0) {
      setTimeout(sendReminder, delay);
    } else {
      console.log('⚠️ Reminder time already passed. Sending immediately for testing...');
      await sendReminder();
    }

    res.send({ message: 'Appointment created & reminder scheduled!' });
  } catch (error) {
    console.error('❌ Error scheduling appointment:', error);
    res.status(500).send({ error: 'Something went wrong.' });
  }
});

app.get('/appointments/:userId', async (req, res) => {
  const { userId } = req.params;
  const appointments = await Appointment.find({ userId });
  res.json(appointments);
});

// Seed Routes
app.post('/seed-doctors', async (req, res) => {
  await Doctor.insertMany([
    {
      name: 'Dr. Asha Mehta',
      specialization: 'Gynecologist',
      location: 'Bangalore',
      lat: 12.9716,
      lng: 77.5946,
    },
    {
      name: 'Dr. Rajesh Iyer',
      specialization: 'Cardiologist',
      location: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
    },
  ]);
  res.send('✅ Doctors seeded');
});

app.post('/seed-user', async (req, res) => {
  const newUser = await User.create({
    name: 'Yashas Nagraj',
    email: 'yashas@example.com',
    location: 'Bangalore',
  });
  res.send(newUser);
});

// Medication Routes
app.get('/medications', async (req, res) => {
  const meds = await Medication.find();
  res.json(meds);
});

app.post('/medications', async (req, res) => {
  const med = new Medication(req.body);
  await med.save();
  res.json(med);
});

app.delete('/medications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Medication.findByIdAndDelete(id);
    res.status(200).send({ message: 'Deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete' });
  }
});

app.patch('/medications/:id/take', async (req, res) => {
  await Medication.findByIdAndUpdate(req.params.id, { taken: true });
  res.sendStatus(200);
});

// Chat Proxy to Flask
app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post('http://127.0.0.1:5000/chat', { prompt });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Email Generation Endpoint
app.post('/generate-email', (req, res) => {
  const { userName, doctorName, time } = req.body;
  
  const message = `Dear ${userName},\n\nThis is a reminder for your appointment with ${doctorName} at ${time}.\n\nPlease arrive 15 minutes before your scheduled time.\n\nBest regards,\nYour Healthcare Team`;
  
  res.json({ message });
});

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("file"), async (req, res) => {
  const file = req.file;

  const form = new FormData();
  form.append("file", fs.createReadStream(file.path), file.originalname);

  try {
    const response = await axios.post("http://localhost:5000/analyze", form, {
      headers: form.getHeaders(),
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error during AI analysis:", err.message);
    res.status(500).send("AI Analysis Failed");
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
