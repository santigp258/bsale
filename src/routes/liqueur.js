const express = require("express");

const router = express.Router();

const mysqlConn = require("../database");

router.get("/", (req, res) => {
  mysqlConn.query("SELECT * FROM product", (err, rows, fields) => {
    !err ? res.json(rows) : console.log(err); 
  });
});

router.get("/category/:id", (req, res) => {
  const { id } = req.params;

  mysqlConn.query(
    `SELECT * FROM category WHERE id = ?`,
    [id],
    (err, rows, fields) => {
      //return object
      !err ? res.json(rows[0]) : console.log(err); 
    }
  );
});

router.get("/category", (req, res) => {
  mysqlConn.query(`SELECT * FROM category`, (err, rows, fields) => {
    //return elements
    !err ? res.json(rows) : console.log(err); 
  });
});

module.exports = router;
