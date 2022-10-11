const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuthenticate = require('../utils/authenticate');

// return all posts for dashboard from db //
router.get('/', withAuthenticate, (req, res) => {
    console.log(req.session);
    console.log('');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]})
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, 
      {
        include: [
            {
              model: Comment,
              attributes: ['id','user_id', 'comment_text', 'post_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
            }
            },
            {
              model: User,
              attributes: ['username']
            }
        ]})
        .then(dbPostData => {
            if (dbPostData) 
            {
              const post = dbPostData.get({ plain: true });

              res.render('edit-post', 
              {
                post,
                loggedIn: true 
              });
            } else 
            {
              res.status(404).end();
        }})
        .catch(err => {
          console.log(err)
          res.status(500).json(err);
    });
});

module.exports = router;
