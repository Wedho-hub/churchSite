import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Ministry from "./models/Ministry.js";
import Bulletin from "./models/Bulletin.js";
import Resource from "./models/Resource.js";
import Gallery from "./models/Gallery.js";
import Blog from "./models/Blog.js";

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ Ministries
    await Ministry.deleteMany();
    await Ministry.insertMany([
      { name: "Youth Ministry", description: "Empowering the next generation" },
      { name: "Women's Ministry", description: "Support, fellowship, growth" },
      {
        name: "Men's Fellowship",
        description: "Strengthening spiritual leadership",
      },
    ]);

    // ✅ Bulletins
    await Bulletin.deleteMany();
    await Bulletin.insertMany([
      {
        title: "Sabbath Announcements",
        date: new Date(),
        fileUrl: "/uploads/bulletin1.pdf",
      },
    ]);

    // ✅ Resources
    await Resource.deleteMany();
    await Resource.insertMany([
      {
        title: "Sabbath School Lesson",
        type: "pdf",
        link: "https://example.com/lesson.pdf",
      },
      {
        title: "Church Manual",
        type: "pdf",
        link: "https://example.com/manual.pdf",
      },
    ]);

    // ✅ Gallery
    await Gallery.deleteMany();
    await Gallery.insertMany([
      { url: "/uploads/church1.jpg", caption: "Praise & Worship" },
      { url: "/uploads/church2.jpg", caption: "Baptism Ceremony" },
    ]);

    // ✅ Blogs
    await Blog.deleteMany();
    await Blog.insertMany([
      {
        title: "Welcome to Inkosiyeza SDA",
        slug: "welcome",
        content: "We are excited to launch our new church website!",
        image: "/uploads/blog1.jpg",
      },
    ]);

    console.log("✅ Initial data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();
