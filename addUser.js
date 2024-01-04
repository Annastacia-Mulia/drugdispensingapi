const express = require('express')
const router = express.Router()
const database = require('./dbconnection.js')

router.put('/updateDrugs' , (req,res)=>{
    const {drug_id, name, description, category_id, price } = req.body
    dbconnection.query('UPDATE drugs SET name= ? , price = ?, description= ?, category_id =? WHERE drug_id = ? ',[name,price, description, category_id, drug_id], (err,rows)=>{
        if(err) throw err;
        else{
            res.send({message: "Successfully updated record"})
        }
    })
})
router.post('/addDrugs', (req, res) => {
    const {drugID, drugname, description, price, category_id  } = req.body;
    database.query(
      'INSERT INTO drugs (drugID, drugname, description, price, category_id) VALUES ( ?, ?, ?, ?, ?)',
      [drugID, drugname, description,price, category_id],
      (err, result) => {
        if (err) {
          console.error('Error inserting new drug:', err);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        } else {
          res.json({
            message: 'Successfully inserted new drug',
            insertedId: result.insertId,
          });
        }
      }
    );
  });
  router.post('/addCategory', (req, res) => {
    const name = req.body;
    database.query(
      'INSERT INTO drugcategory (category_id ,name) VALUES(?,?)',[category_id ,name],
      (err, result) => {
        if (err) {
          console.error('Error inserting new category:', err);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        } else {
          res.json({
            message: 'Successfully inserted new category',
            insertedId: result.insertId,
          });
        }
      }
    );
  });

router.put('/updateCategory', (req, res) => {
    const { category_id, name } = req.body;
    database.query(
      'UPDATE drug_categories SET name = ? WHERE category_id = ?',
      [name, category_id],
      (err, result) => {
        if (err) {
          console.error('Error updating drug category:', err);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        } else {
          if (result.affectedRows > 0) {
            res.json({
              message: 'Successfully updated drug category',
            });
          } else {
            res.json({
              message: 'Category not found or no changes made',
            });
          }
        }
      }
    );
  });
  
  router.post('/addUsers', (req, res) => {
    const {name, age, email, drugs, gender, password } = req.body;
    database.query(
      'INSERT INTO patients (name, email, password, drugs, age, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, drugs, age, gender],
      (err, result) => {
        if (err) {
          console.error('Error inserting new user:', err);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        } else {
          res.json({
            message: 'Successfully inserted new user',
            insertedId: result.insertId,
          });
        }
      }
    );
  });

router.put('/updateUsers', (req, res) => {
    const { SSN, name, email, password, drugs, age, gender} = req.body;
    database.query(
      'UPDATE patients SET name=?, email=?, password=?, drugs=?, age=?, gender=? WHERE SSN = ?',
      [ SSN, name, email,  password, drugs,  age, gender],
      (err, result) => {
        if (err) {
          console.error('Error updating user:', err);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        } else {
          if (result.affectedRows > 0) {
            res.json({
              message: 'Successfully updated user',
            });
          } else {
            res.json({
              message: 'User not found or no changes made',
            });
          }
        }
      }
    );
  });
  
module.exports =router;