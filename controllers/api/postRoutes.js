const router = require("express").Router(); 
const {User, Post, Comment} = require("../../models"); 
const withAuth = require("../../utils/auth");  

router.get("/", async (req, res) => {
    try { 
        const postData = await Post.findAll({ 
            include: {models:User, models:Comment}
        }) 
        
    } catch (err) { 
        res.status(500).json(err)
    }

}) 

router.get("/:id", async (req,res) => { 
    try { 
        const postData = await Post.findByPk(req.params.id, { 
            attributes: ["id", "title", "post_content", "user_id"],
            include: [{
                model: User,
                attributes: ["name"],
            },
                { 
                model: Comment,
                attributes: ["id", "user_id", "post_id", "comment_text"], 
                include: { 
                    model: User, 
                    attributes: ["name"],
                }

            }]
        })  

        if (!postData) { 
            res.status(404).json({ message: "No review found with this id"});
            return;
        } else { 
            res.json(postData);
        }

        

    } catch (err) { 
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => { 
    try { 
        if(!req.session.user) { 
            return req.status(400).json({message: "Please login!"})
        } 

        const postData = await Post.create({ 
            title: req.body.title, 
            post_content: req.body.post_content, 
            user_id: req.session.user.id, 
        }) 

        res.status(200).json(postData)


    } catch (err) { 
        console.log(err);
        res.status(500).json(err);
    }
}); 

router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbReviewData) => {
        if (!dbReviewData) {
          res.status(404).json({ message: "No review with this id found" });
          return;
        }
        res.json(dbReviewData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //update a review
  router.put("/:id", withAuth, (req, res) => {
    Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((dbReviewData) => {
        if (!dbReviewData) {
          res.status(404).json({ message: "No review with this id found" });
          return;
        }
        res.json(dbReviewData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;