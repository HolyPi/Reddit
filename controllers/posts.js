const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.get('/post/new', (req, res) => {
        res.render('posts-new')
      
      })
    app.post('/post/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
        
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            console.log(err)
            console.log(post)

            // REDIRECT TO THE ROOT
            return res.redirect(`/`); 
        })
    });

    app.get("/", (req, res) => {
        Post.find({}).lean()
        .then(posts => {
            console.log(posts[0])
            const context = {
                posts: posts,
            }
            res.render("posts-index", {posts: context.posts });
        })
        .catch(err => {
            console.log('error', err.message);
        });
    })
    
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).lean()
          .then(post => {
            const context = {
                post: post 
            }
            res.render("posts-show", {post: context.post });
          })
          .catch(err => {
            console.log(err.message);
          });
    });
};