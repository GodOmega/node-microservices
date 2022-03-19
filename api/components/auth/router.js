const express = require("express");
const router = express.Router();

const service = require("./index");
const response = require("../../../utils/response");

// Routes
router.post('/login', login);


// Internal functions

async function login (req, res) {
  const { username, password } = req.body;
  const data = { username, password };

  service.login(data)
    .then((user) => response.success(req, res, user, 200))
    .catch((err) => response.error(req, res, err.message, 400))
}

module.exports = router;
