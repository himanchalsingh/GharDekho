import express from "express";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://ghar-dekho-jet.vercel.app", // Replace with your client domain
  credentials: true, // Allow credentials such as cookies or authorization headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Route handlers
app.use("/api/post", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
