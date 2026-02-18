

exports.getTasks = (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


exports.addTask = (req, res) => {
  const { title } = req.body;

  connection.query(
    'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    [title, false],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: result.insertId,
        title,
        completed: false
      });
    }
  );
};


exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  connection.query(
    'UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, title, completed });
    }
  );
};


exports.deleteTask = (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM tasks WHERE id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    }
  );
};

