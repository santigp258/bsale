const express = require("express");

const router = express.Router();

const mysqlConn = require("../database");

router.get("/", (req, res) => {
  mysqlConn.query("SELECT * FROM product", (err, rows, fields) => {
    if(!err){
      res.json(rows)
    }else{
      console.log(err);
      res.json({ status: false })
    }
  });
});
//search product by id
router.get("/product/:id", (req, res) => {
  const { id } = req.params;

  mysqlConn.query(
    `SELECT * FROM product WHERE id = ?`,
    [id],
    (err, rows, fields) => {
      //return object
      if(!err){
        res.json(rows[0])
      }else{
        console.log(err);
        res.json({ status: false })
      }
    }
  );
});

router.get("/category/:id", (req, res) => {
  const { id } = req.params;

  mysqlConn.query(
    `SELECT * FROM product WHERE category = ?`,
    [id],
    (err, rows, fields) => {
      //return object
      if(!err){
        res.json(rows)
      }else{
        console.log(err);
        res.json({ status: false })
      }
    }
  );
});

//all category
router.get("/category", (req, res) => {
  mysqlConn.query(`SELECT * FROM category`, (err, rows, fields) => {
    //return elements
    if(!err){
      res.json(rows)
    }else{
      console.log(err);
      res.json({ status: false })
    }
  });
});

//search by name
router.get("/search/:name", (req, res) => {
  const { name } = req.params;
  mysqlConn.query(
    `SELECT * FROM product WHERE name LIKE '%${name}%'`,
    (err, rows, fields) => {
      //return elements
      if(!err){
        res.json(rows);
      }else{
        console.log(err);
        res.json({ status: false, name })
      }
    }
  );
});

module.exports = router;
