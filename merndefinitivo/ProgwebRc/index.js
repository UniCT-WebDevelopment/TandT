const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");



dotenv.config();


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology:true},()=>{
    console.log("connected to mongoDB");
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb( null, req.body.name)
       // cb(null,file.originalname)
    },
})
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"),(req,res)=>{
    try {
        return res.status(200).json("file caricato con successo");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts" , postRoute);

app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);



app.listen(8088,()=>{
    console.log("backend server e' pronto")
})