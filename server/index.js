import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import publicRoute from './routes/Public.js'
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./connectMongoDb.js";
import ConnectCloudinary from "./Cloudinary.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp",
}))
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/public", publicRoute);

const PORT = process.env.PORT || 5000;

ConnectCloudinary()

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
