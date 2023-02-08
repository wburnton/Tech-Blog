const router = require('express').Router(); 
const {Comment} = require('../../models'); 
const withAuth = require('../utils/auth'); 

router.get('/', withAuth, async (req, res) => { 
    try { 
        const commentData = await Comment.findAll(); 
        res.json(commentData);
    
    
    } catch (err) { 
        res.status(500).json(err);
    }
}) 

router.get('/:id', async (req, res) => { 
    try{ 
        const commentData = await Comment.findByPk(req.params.id) 
        res.status(200).json(commentData);
    }  catch (err) { 
        res.status(500).json(err);
    }
    
}); 

router.post('/', withAuth, async (req, res) => { 
    try { 
        const commentPost = await Comment.create({ 
            ...req.body, 
            user_id: req.session.user_id, 
        }); 

        res.status(200).json(commentPost);


    } catch (err) { 
        res.status(400).json(err);
    }
}); 

router.put('/:id', withAuth, async (req, res) => { 
    try { 
        const updateComment = await Comment.update({ 
            comment_text: req.body.comment_text,
        })

    } catch (err) { 
        res.status(400).json(err);
    }
}) 

router.delete('/:id', withAuth, async (req, res) => { 
    try { 
        const commentData = await Comment.destroy({ 
            where: { 
                id: req.params.id,
            },
        })
    } catch (err) { 
        res.status(400).json(err); 
    }
})