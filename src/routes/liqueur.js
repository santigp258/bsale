const express = require("express");

const router = express.Router();

const mysqlConn = require("../database");

router.get("/", (req, res) => {
  mysqlConn.query("SELECT * FROM product", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/category/:id", (req, res) => {
  const { id } = req.params;

  mysqlConn.query(`SELECT * FROM category WHERE id = ?`, [id], (err, rows, fields) =>{
      if(!err){
          res.json(rows[0]); //return object
      }
  })
});

module.exports = router;
