const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const postmodel = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://user:0espwithhhcandhdc0@cluster0.kxdcv.mongodb.net/node-angular-database?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new postmodel({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: result._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  postmodel.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts Fetched Successfully",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  postmodel.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted!",
    });
  });
});

module.exports = app;
