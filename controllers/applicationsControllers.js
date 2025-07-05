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
    const {nama_pt, posisi, tgl_apply, status, notes} = req.body
    const allowedStatus = ["menunggu", "diterima", "ditolak"];
    if(!nama_pt||!posisi||!status){
        return res.status(400).json({error: "Semua field harus diisi"})
    }
    if(!allowedStatus.includes(status)){
        return res.status(400).json({error: "Status tidak valid (menunggu, diterima, ditolak)"});
    }

    db.query('INSERT INTO applications (nama_pt, posisi, tgl_apply, status, notes) VALUES (?, ?, ?, ?, ?)',
        [nama_pt, posisi, tgl_apply, status, notes], (err, results) => {
            if(err){
                console.error('Database error:', err);
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({message: "Data lamaran berhasil disimpan", id: results.insertId});
        }
    )
}

module.exports = {
    getApp,
    postApp
};