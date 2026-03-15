const connection = require('./db');

exports.getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  connection.query(
    "SELECT * FROM users WHERE name = ?",
    [name],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res.json(results[0]);
      }

      connection.query(
        "INSERT INTO users (name) VALUES (?)",
        [name],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({
            id: result.insertId,
            name
          });
        }
      );
    }
  );
};