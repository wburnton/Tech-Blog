const router = require('express').Router(); 
const {Comment} = require('../../models'); 
const withAuth = require('../utils/auth'); 

router.get('/', withAuth, async (req, res) => { 
    try { 
        const commentData = await Comment.findAll(); 
        res.json(commentData);
    
    
    } catch (err) { 

    }
})