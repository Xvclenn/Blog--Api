const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const port = 8000;
const app = express();

let blogs = [];

app.use(cors());
app.use(express.json());

app.get("/blogs", (req, res) => {
    res.json(blogs);
});

app.get("/blogs/:id", (req, res) => {
    const { id } = req.params;
    const one = blogs.find((blog) => blog.id === id);
    if (one) {
        res.json(one);
    } else {
        res.sendStatus(404);
    }
});

app.post("/blogs", (req, res) => {
    const { title } = req.body;
    const { author } = req.body;
    const { img } = req.body;
    const { blogBody } = req.body;
    const newBlog = {
        id: uuidv4(),
        title: title,
        author: author,
        blogBody: blogBody,
        img: img,
    };
    // blogs.unshift(newBlog);
    blogs.push(newBlog);
    res.json(blogs);
});

app.delete("/blogs/:id", (req, res) => {
    const { id } = req.params;
    const one = blogs.find((blog) => blog.id === id);
    if (one) {
        const newList = blogs.filter((blog) => blog.id !== id);
        blogs = newList;
        res.json({ deletedId: id });
    } else {
        res.sendStatus(404);
    }
});

app.put("/blogs/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const index = blogs.findIndex((blog) => blog.id === id);
    if (index > -1) {
        blogs[index].title = title;
        res.json({ updatedId: id });
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log("OK", port);
});
