const connection = require('./db');

exports.getTasks = (req, res) => {

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }

  connection.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (err, results) => {

      if (err) return res.status(500).json({ error: err.message });

      const formatted = results.map(task => ({
        ...task,
        completed: !!task.completed
      }));

      res.json(formatted);
    }
  );
};
exports.addTask = (req, res) => {

  const { title, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }

  connection.query(
    'INSERT INTO tasks (title, completed, user_id) VALUES (?, ?, ?)',
    [title, false, userId],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: result.insertId,
        title,
        completed: false,
        user_id: userId
      });
    }
  );
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  connection.query(
    'UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
    [title, !!completed, id, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found for this user' });
      }

      res.json({ id, title, completed: !!completed, user_id: userId });
    }
  );
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  connection.query(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [id, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found for this user' });
      }

      res.status(204).send();
    }
  );
};


exports.getAllTasksGrouped = (req, res) => {

  const { userId } = req.query;

  connection.query(
    "SELECT role FROM users WHERE id = ?",
    [userId],
    (err, userResults) => {

      if (!userResults.length || userResults[0].role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
      }

      connection.query(
        `
        SELECT 
          users.id as userId, 
          users.name, 
          users.role,
          tasks.id as taskId, 
          tasks.title, 
          tasks.completed
        FROM users
        LEFT JOIN tasks ON users.id = tasks.user_id
        ORDER BY users.id
        `,
        (err, results) => {

          if (err) return res.status(500).json({ error: err.message });

          const grouped = {};

          results.forEach(row => {

            if (!grouped[row.userId]) {
              grouped[row.userId] = {
                userId: row.userId,
                name: row.name,
                role: row.role,
                tasks: []
              };
            }

            if (row.taskId) {
              grouped[row.userId].tasks.push({
                id: row.taskId,
                title: row.title,
                completed: !!row.completed
              });
            }

          });

          res.json(Object.values(grouped));
        }
      );
    }
  );
};