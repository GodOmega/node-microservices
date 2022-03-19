const express = require("express");
const response = require("../utils/response");
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);

async function list(req, res, next){
    const { table } = req.params
    const data = await Store.list({table});
    response.success(req, res, data, 200);
}

async function get(req, res, next){
    const { table, id } = req.params;
    const data = await Store.get({table, id});
    response.success(req, res, data, 200);
}

async function insert(req, res, next){
    const { table } = req.params;
    const data = await Store.upsert({table, data: req.body});
    response.success(req, res, data, 201);
}



module.exports = router;