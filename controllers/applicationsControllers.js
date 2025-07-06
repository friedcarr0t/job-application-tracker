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

const getId = (req, res) => {
    const {id} = req.params
    db.query('SELECT*FROM applications WHERE id = ?',
        [id], (err, result) => {
            if(err){
                console.error('Database error', err);
                return res.status(500).json({error: "masalah database atau koneksi"})
            }
            if(result.length === 0){
                return res.status(404).json({error: "data tidak ditemukan"});
            } else {
                return res.status(200).json(result[0]);
            }
            
        }
    )
}

const putApp = (req, res) => {
    const {id} = req.params;
    const allowedFields = ['nama_pt', 'posisi', 'tgl_apply', 'status', 'notes']
    const allowedStatus = ["menunggu", "diterima", "ditolak"];
    
    let fields = [];
    let values = [];

    for (let key of allowedFields) {
        if(req.body[key] !== undefined && req.body[key] !== ""){
            if(key === 'status' && !allowedStatus.includes(req.body[key])){
                return res.status(400).json({error: 'status tidak valid'})
            }
            fields.push(`${key} = ?`)
            values.push(req.body[key])
        }
    }

    if(fields.length === 0){
        return res.status(400).json({error: "tidak ada yg diupdate"})
    }
    values.push(id)

    const sql = `UPDATE applications SET ${fields.join(', ')} WHERE id = ?`
    db.query(sql, values, (err, result) => {
            if(err) return res.status(500).json(err);
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'id tidak ditemukakn'})
            } else {
                return res.status(200).json(result);
            }
        }
    )
}

const delApp = (req, res) => {
    const {id} = req.params;
    db.query(`DELETE FROM applications WHERE id = ?`,
        [id], (err, result) => {
            if(err) return res.status(500).json(err);
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'id tidak ditemukan'});
            }
            return res.status(200).json({message: 'data berhasil dihapus'});
        })
}

module.exports = {
    getApp,
    getId,
    postApp,
    putApp,
    delApp
};