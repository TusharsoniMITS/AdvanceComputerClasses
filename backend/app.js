const express= require('express')
const app = express()
const port = 4700
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')

const cloudinary=require("cloudinary").v2
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLINT_NAME,
    api_key:process.env.CLOUDINARY_CLINT_API,
    api_secret:process.env.CLOUDINARY_CLINT_SECRET,
  });

// for connectivity to react
const cors = require('cors')
// app.use(cors())

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (Vite default port)
    credentials: true, // Allow cookies to be sent
  })
);

// fileuploader for image
const fileuploader = require('express-fileupload')

// call function of fileuploader
app.use(fileuploader({ useTempFiles: true }))

// for dataget in ap (change formate)
app.use(express.json())

const cookieParse = require('cookie-parser')

// token gET
app.use(cookieParse());

// Connect to maongoose
const connectDb = require('./db/ConnectDb')
connectDb()

// load route
app.use('/api', web)
// Localhost:4000/api


// server create
app.listen(port, () => console.log("server start localhost : 4700"))
