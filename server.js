const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const next = require("next");
require("dotenv").config(); // Tải biến môi trường từ tệp .env

const connectMongoDB = require("./utils/mongodb"); // Import tệp kết nối
const User = require("./models/User");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

connectMongoDB();

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// Đối với Express, bạn có thể xử lý các tùy chỉnh và tạo tuyến đường tại đây

// Đối với Next.js, bạn có thể cấu hình xử lý các tùy chỉnh và tạo trang tại đây

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

// Khi cần, bạn có thể sử dụng Socket.IO để thực hiện các tác vụ WebSocket.
const accessUser = new Map();
let stackOnline = [];

io.on("connection", async (socket) => {
  console.log("connected");

  const email = socket.handshake.query.email;
  const accessTime = new Date();

  if (email !== "") {
    stackOnline.push(email);
    if (!accessUser.get(email)) {
      accessUser.set(email, accessTime);
    }
  }

  const currentUser = await User.findOne({ email });

  if (accessUser.get(email)) {
    socket.emit("access-start", {
      time: accessUser.get(email),
      point: currentUser ? currentUser.point : 0,
    });
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    const index = stackOnline.indexOf(email);

    if (index !== -1) {
      stackOnline.splice(index, 1);

      // người dùng hoàn toàn disconnect
      if (stackOnline.indexOf(email) === -1) {
        const liveAccess = new Date() - new Date(accessUser.get(email));
        const point = Math.floor(
          liveAccess / (1000 * process.env.TIME_TO_POINT),
        );

        // Cập nhật điểm
        if (point >= 1) {
          User.findOneAndUpdate(
            { email: email },
            { $inc: { point: point } },
            { upsert: true, new: true },
          )
            .then((result) => {
              console.log("Dữ liệu đã được cập nhật hoặc tạo mới:", result);
            })
            .catch((error) => {
              console.error("Lỗi:", error);
            });
        }

        accessUser.delete(email);
        console.log(accessUser);
      }
    }
  });
});
