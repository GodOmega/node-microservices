const express = require("express");
const router = express.Router();

// const secureMiddleware= require('./secure'); 
const response = require("../../../utils/response");
const service = require("./index");
// Routes
router.get('/', list);
router.post('/', addPost);


// Internal functions

async function list(req, res) {
    service.list()
        .then((posts) => response.success(req, res, posts, 200))
        .catch((err) => response.error(req, res, err.message, 400))
}

async function addPost(req, res){
    const { title, id } = req.body
    service.addPost({title, id})
        .then((posts) => response.success(req, res, posts, 200))
        .catch((err) => response.error(req, res, err.message, 400))
}

module.exports = router;
