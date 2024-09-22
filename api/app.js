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
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/post", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("server is running");
});
