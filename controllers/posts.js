const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        console.log("body", req.body)
        const post = new Post(req.body);
        console.log("post", post)
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            console.log(err)
            console.log(post)

            // REDIRECT TO THE ROOT
            return res.redirect(`/`); 
        })
    });
    app.get("/", (req, res) => {
        Post.find({})
        .then(posts => {
            console.log(posts)
            res.render("posts-index", {posts});
        })
        .catch(err => {
            console.log('error', err.message);
        });
    })
};
