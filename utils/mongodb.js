const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Đã kết nối đến cơ sở dữ liệu");
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
  }
};

module.exports = connectToDatabase;
