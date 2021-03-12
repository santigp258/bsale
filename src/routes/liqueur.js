const express = require("express");

const router = express.Router();

const mysqlConn = require("../database");

router.get("/", (req, res) => {
  mysqlConn.query("SELECT * FROM product", (err, rows, fields) => {
    !err ? res.json(rows) :res.json({status: false}); 
  });
});

router.get("/category/:id", (req, res) => {
  const { id } = req.params;

  mysqlConn.query(
    `SELECT * FROM product WHERE category = ?`,
    [id],
    (err, rows, fields) => {
      //return object
      !err ? res.json(rows) :res.json({status: false}); 
    }
  );
});

router.get("/category", (req, res) => {
  mysqlConn.query(`SELECT * FROM category`, (err, rows, fields) => {
    //return elements
    !err ? res.json(rows) :res.json({status: false}); 
  });
});

module.exports = router;
