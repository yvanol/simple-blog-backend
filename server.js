const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // Import here

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes); // Mount here

// Base Route
app.get('/', (req, res) => {
    res.send('Blog API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});