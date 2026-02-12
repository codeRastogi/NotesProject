import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import notesRoute from './routes/notesRoute.js'
import connectDB from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config()
const app = express()

// Middleware
app.use(express.json());
app.use(
  cors({
  origin: "http://localhost:5173",
   credentials: true,
}))
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoute)


// Connect to Database and Start Server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Server is running on http://localhost: ' + PORT);
  });
});
