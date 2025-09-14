const fs = require("fs");
const express = require("express");

const app = express();

const port = 8000;

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`));

// Route functions
const getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    result: posts.length,
    data: {
      posts,
    },
  });
};
const getSinglePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((el) => el.id === id);

  if (!post) {
    return res.status(404).json({ status: "fail", message: "Post not found" });
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};
const addPost = (req, res) => {
  const newId = posts[posts.length - 1].id + 1;
  const post = {
    id: newId,
    title: "How to post",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt ratione, libero vel voluptas distinctio numquam labore quo expedita non omnis voluptates obcaecati odio at eos quisquam officiis voluptatum ipsum totam.",
  };

  posts.push(post);

  fs.writeFile(`${__dirname}/posts.json`, JSON.stringify(posts), (err) => {
    res.status(201).json({
      status: "success",
      data: "Post written!",
    });
  });
};
const modifyPost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((el) => el.id === id);
  if (!post) {
    return res.status(404).json({ status: "fail", message: "Post not found" });
  }
  res.status(200).json({
    status: "success",
    message: "The post has been updated!",
    data: post,
  });
};
const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const newPosts = posts.filter((el) => el.id !== id);

  fs.writeFile(
    `${__dirname}/deleted-posts.json`,
    JSON.stringify(newPosts),
    (err) => {
      res.status(204).json({
        status: "success",
        message: "The post has been deleted!",
      });
    }
  );
};

// Get request (All posts)
app.get("/posts", getAllPosts);
app.get("/posts/:id", getSinglePost);
app.post("/posts", addPost);
app.patch("/posts/:id", modifyPost);
app.delete("/posts/:id", deletePost);

app.listen(port, () => {
  console.log(`Listening on port ${port}......`);
});
