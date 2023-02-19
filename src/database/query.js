const db = require("./database");


exports.execute_query = async (search_query) => {

  return new Promise((resolve, reject) => {
    db.getConnection(async (err, connection) => {
      if (err) reject(err);

      connection.query(search_query, async (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
      });

      connection.release();
    });
  });
};
