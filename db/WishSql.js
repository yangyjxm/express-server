var WishSql = {
  insert: 'INSERT INTO wish_info(wishName, createDate, createBy) VALUES(?,?,?) ',
  select: 'SELECT * FROM wish_info '
};

module.exports = WishSql;