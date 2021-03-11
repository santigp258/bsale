const mysql = require("mysql");

const mysqlConn = mysql.createConnection({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

mysqlConn.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('DB is connected')
    }
});

module.exports = mysqlConn;
