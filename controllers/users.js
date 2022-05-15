
const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

    const { q, name, apiKey, page = 1, limit = 100} = req.query;

    res.json({
        msg: 'get api',
        q,
        name,
        apiKey,
        limit,
        page
    });
}

const putUsers = (req = request, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        msg: 'put api',
        id
    });
}

const postUsers = (req = request, res = response) => {

    const {name, age} = req.body;

    res.status(201).json({
        msg: 'post api',
        name, 
        age
    });
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: 'delete api',
    });
}

const patchUsers = (req = request, res = response) => {
    res.json({
        msg: 'patch api',
    });
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
}
