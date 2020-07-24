var UserSql = {
  // insert: 'INSERT INTO User(id, userName, password) VALUES(?,?,?) ',
  // getUserById: 'SELECT * FROM user WHERE uid = ? ',
  query: 'SELECT * FROM loan_info where status != 2 '
};

module.exports = UserSql;