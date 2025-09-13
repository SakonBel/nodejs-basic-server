const fs = require("fs");
const express = require("express");

const app = express();

const port = 8000;

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`));

// Get request
app.get("/posts", (req, res) => {
  res.status(200).json({
    status: "success",
    result: posts.length,
    data: {
      posts,
    },
  });
});

// Post request
app.post("/posts", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Listening on port ${port}......`);
});
