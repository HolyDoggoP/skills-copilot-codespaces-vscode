// Create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/:id
// http://localhost:3000/comments?postId=1

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Array of comments
const comments = [
    { id: 1, postId: 1, author: 'John Doe', content: 'First comment' },
    { id: 2, postId: 1, author: 'Jane Doe', content: 'Second comment' },
    { id: 3, postId: 2, author: 'Jim Doe', content: 'Third comment' },
    { id: 4, postId: 2, author: 'Josh Doe', content: 'Fourth comment' }
];

// GET /comments
// Get all comments
router.get('/', (req, res) => {
    res.send(comments);
});

// GET /comments/:id
// Get a comment by id
router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

// GET /comments?postId=1
// Get comments by postId
router.get('/', (req, res) => {
    const comment = comments.find(c => c.postId === parseInt(req.query.postId));
    if (!comment) return res.status(404).send('The comment with the given postId was not found.');
    res.send(comment);
});

// POST /comments
// Create a new comment
router.post('/', (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = {
        id: comments.length + 1,
        postId: req.body.postId,
    };
});