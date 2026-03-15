const connection = require('./db');

exports.getAllUsers = (req, res) => {

  const { userId } = req.query;

  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, results) => {

      if (!results.length || results[0].role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
      }

      connection.query(
        "SELECT id, name, role FROM users",
        (err, users) => {

          res.json(users);

        }
      );
    }
  );
};

exports.createUser = (req, res) => {

  const { name } = req.body;

  connection.query(
    "SELECT * FROM users WHERE name = ?",
    [name],
    (err, results) => {

      if (results.length > 0) {
        return res.json(results[0]);
      }

      connection.query(
        "SELECT COUNT(*) as count FROM users",
        (err, countResult) => {

          const role = countResult[0].count === 0 ? "admin" : "user";

          connection.query(
            "INSERT INTO users (name, role) VALUES (?, ?)",
            [name, role],
            (err, result) => {

              res.status(201).json({
                id: result.insertId,
                name,
                role
              });

            }
          );
        }
      );
    }
  );
};