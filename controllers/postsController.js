const fs = require("fs");

const FILE_PATH = `${__dirname}/../posts.json`;

// Retrieve all the posts
const posts = JSON.parse(fs.readFileSync(FILE_PATH));

// Middleware params handler
exports.checkID = (req, res, next, val) => {
  if (!val)
    return res.status(404).json({
      status: "Error",
      message: "Post not found!",
    });
  next();
};

// Route handlers
exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    result: posts.length,
    data: {
      posts,
    },
  });
};
exports.getSinglePost = (req, res) => {
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
exports.addPost = (req, res) => {
  const newId = posts[posts.length - 1].id + 1;
  const post = {
    id: newId,
    title: "How to post",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt ratione, libero vel voluptas distinctio numquam labore quo expedita non omnis voluptates obcaecati odio at eos quisquam officiis voluptatum ipsum totam.",
  };

  posts.push(post);

  fs.writeFile(FILE_PATH, JSON.stringify(posts), (err) => {
    res.status(201).json({
      status: "success",
      data: "Post written!",
    });
  });
};
exports.modifyPost = (req, res) => {
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
exports.deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const newPosts = posts.filter((el) => el.id !== id);

  fs.writeFile(
    `${__dirname}/../deleted-posts.json`,
    JSON.stringify(newPosts),
    (err) => {
      res.status(204).json({
        status: "success",
        message: "The post has been deleted!",
      });
    }
  );
};
