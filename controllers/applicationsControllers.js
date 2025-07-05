// const { application } = require('express');
const {db} = require('../models/db')

const getApp = (req, res) => {
    db.query('SELECT*FROM applications', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    })
}

const postApp = (req, res) => {
    db.query('INSERT INTO applications')
}

module.exports = {getApp};