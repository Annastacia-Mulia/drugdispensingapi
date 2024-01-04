const express = require('express')
const router = express.Router()
const database = require('./dbconnection.js')

router.post('/' , (req,res)=>{

    const {id, name, email, password} = req.body
    database.query('INSERT INTO users (id, name, email, password) values (?,?,?,?)', [id, name, email, password], (err,rows)=>{
        if(err) throw err;
        else{
            res.send({message: "You have successfully been registered!"})
        }
    })
    //console.log(req.body)hahaha
})
module.exports =router;