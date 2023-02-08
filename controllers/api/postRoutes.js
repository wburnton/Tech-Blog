const router = require('express').Router(); 
const {User, Post, Comment} = require('../../models'); 
const withAuth = require('../utils/auth');  

router.get('/', async (req, res) => {
    try { 
        const postData = await Post.findAll({ 
            include: {models:User, models:Comment}
        }) 
        
    } catch (err) { 
        res.status(500).json(err)
    }

}) 

router.get('/:id', async (req,res) => { 
    try { 
        const postData = await Post.findByPk(req.params.id, { 
            include: [{model: User, model: Comment}]
        }) 

        

    } catch (err) { 

    }
})

router.post('/', async (req, res) => { 
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

    }
})