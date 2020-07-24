// connect mySql
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: '111.229.251.142',
  user: 'root',
  password: 'Password@123',
  database: 'data'
});

function query(sql, values, callback) {
  console.log("db pool");
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("get connection ");
    //Use the connection
    connection.query(sql, values, function (err, results, fields) {
      console.log(JSON.stringify(results));
      //每次查询都会 回调
      callback(err, results);
      //只是释放链接，在缓冲池了，没有被销毁
      connection.release();
      if (err) throw error;
    });
  });
}

exports.query = query;