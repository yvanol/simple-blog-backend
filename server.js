const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Configured to permit incoming requests from your deployed frontend domain securely
app.use(cors({
    origin: [
        'http://localhost:5173', // Local Vite Dev Server
        /\.vercel\.app$/        // Any staging or production Vercel deployment URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes); // Accessible via /api/upload/signature

// Base Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Blog API is running smoothly...' });
});

const PORT = process.env.PORT || 5000;

// Explicitly bind to '0.0.0.0' interface to allow Render infrastructure routing
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});