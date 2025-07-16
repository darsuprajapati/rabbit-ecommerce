const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db.js")
const mainRoutes = require("./routes/main.routes.js")

const app = express()

// golabl middleware 
app.use(express.json())
app.use(cors())
dotenv.config();

const PORT = process.env.PORT || 3000

// connect to mongoDb Database
connectDB();

// API Routes
app.use("/api",mainRoutes)

app.get("/", (req, res) => {
    res.send("welcome to rabbit api")
})

// app.listen(PORT, () => {
//     console.log(`Server is running on Port http://localhost:${PORT}`);
// })

// ✅ Export app for Vercel
export default app