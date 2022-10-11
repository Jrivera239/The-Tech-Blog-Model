const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// return all posts for homepage from db
router.get('/', (req, res) => {
    console.log('');
    Post.findAll({
        attributes: [
            'id', 
            'post_url',
            'title',
            'created_at',
            [sequelize.literal()]
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'post_id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal()]
        ], 
        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'post_id',' comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Try a dfferent ID'});
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('feedback', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;