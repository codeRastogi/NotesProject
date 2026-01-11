import express from 'express'
import notesRoute from './routes/notesRoute.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
const app = express()
app.use(express.json());
app.use("/api/notes", notesRoute)

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost: ' + PORT);
})

//mongodb+srv://harshit1122ras_db_user:AYsYK1ZiudQWbm5Y@cluster0.ulrtifi.mongodb.net/?appName=Cluster0