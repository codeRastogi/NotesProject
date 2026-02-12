import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import notesRoute from './routes/notesRoute.js'
import connectDB from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config()
const app = express()
const __dirname = path.resolve();
// Middleware
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
}
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })

}


// Connect to Database and Start Server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost: ' + PORT);
  });
});
