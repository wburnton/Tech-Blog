const router = require("express").Router(); 
const {User, Post, Comment} = require("../../models"); 
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");  

router.get("/", async (req, res) => {
    try { 
        const postData = await Post.findAll({ 
          attributes: ["id", "title", "post_content", "user_id"],
            include: [{model:User, attributes: ["name"],},], 
           
        }) 
        res.status(200).json(postData);
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
            res.status(200).json(postData);
        }

        

    } catch (err) { 
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => { 
    try { 
       

        const postData = await Post.create({ 
            ...req.body, 
            user_id: req.session.user_id, 
        }) 

        res.status(200).json(postData)


    } catch (err) { 
        console.log(err);
        res.status(400).json(err);
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