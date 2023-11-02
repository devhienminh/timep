/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    timeToPoint: process.env.TIME_TO_POINT,
    pointToSave: process.env.POINT_TO_SAVE,
    server: process.env.SERVER,
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // Thay 'example.com' bằng tên miền của hình ảnh bạn muốn sử dụng
  },
};

module.exports = nextConfig;
