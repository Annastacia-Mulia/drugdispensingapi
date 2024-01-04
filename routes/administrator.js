
const express =require('express');
const router =express.Router();
const database = require('../dbconnection.js')


 //list all users
 router.get('/', (req,res)=>{
   res.render('index')
 })
 router.get('/users',(req, res) => {
  database.query('SELECT * FROM users', (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
 //just the users no details
 router.get('/user',(req, res) => {
  database.query('SELECT * from patients where patients.SSN=32225', (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
  
 router.get('/gender',(req, res) => {
  database.query('SELECT * from patients where patients.gender=F', (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })

 router.post('/add', (req,res)=>{
    UserModel.create(req.body)
    .then(data=>res.send(data))
    .catch(err =>console.log(err));

 })
 //one user by id
 router.get('/users/:id',(req, res) => {
  database.query(`SELECT * FROM users where id = ${req.params.id}`, (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
 //sort users by gender
 router.get('/patients/gender/:gender',(req, res) => {
  const gender = req.params.gender;
  database.query(`SELECT * FROM patients WHERE gender = '${gender}'`, (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
 //sort users who purchased certain drugs
 router.get('/patients/drugs/:drug',(req, res) => {
  const drugs = req.params.drug;
  database.query(`SELECT * FROM patients WHERE FIND_IN_SET('${drugs}', drugs) > 0;
  `, (err,results)=>{//NOTE:WORKS NOW!!!!! 
    if(err)return console.error(err)
    return res.send(results)})
 })
 //sort users who purchased drug on specific date
 router.get('/patients/purchase/:purchasedate',(req, res) => {
  const purchasedate = req.params.purchasedate;
  database.query(`SELECT * FROM patients WHERE purchasedate = '${purchasedate}'`, (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })

 //sort users by last login
 router.get('/patients/login/:lastlogin',(req, res) => {
  const lastlogin = req.params.lastlogin;
  database.query(`SELECT * FROM patients WHERE lastlogin = '${lastlogin}'`, (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
 //secure endpoint -- list of drugs by a user
 router.get('/patients/drugs',(req, res) => {
  database.query('SELECT patients.SSN, patients.name , drugs from patients', (err,results)=>{
    if(err)return console.error(err)
    return res.send(results)})
 })
  
 module.exports =router 