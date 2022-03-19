const express = require("express");
const router = express.Router();

const secureMiddleware= require('./secure'); 
const response = require("../../../utils/response");
const service = require("./index");
// Routes
router.get('/', list);
router.post('/follow/:id', follow);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secureMiddleware('update') , upsert);


// Internal functions
async function list (req, res) {
  service.list()
    .then((users) => response.success(req, res, users, 200))
    .catch((err) => response.error(req, res, err, 500))
}

async function get (req, res) {
  const { id } = req.params;
  const data = { id };

  service.get(data)
    .then((user) => response.success(req, res, user, 200))
    .catch((err) => response.error(req, res, err, 500))

}

async function follow (req, res, next) {
  const data = {
    userId:  req.body.userId,
    followId:  req.params.id 
  }
  service.follow(data)
    .then((user) => response.success(req, res, user, 200))
    .catch((err) => response.error(req, res, err, 500))
}

async function upsert (req, res) {
  const { name, id, username, password } = req.body;
  const data = { name, id, username, password };

  service.upsert(data)
    .then((user) => response.success(req, res, user, 201))
    .catch((err) => response.error(req, res, err, 500))
}

module.exports = router;
