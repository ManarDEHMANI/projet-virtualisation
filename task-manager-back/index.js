const express = require('express');
const app = express();

app.get('/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Première tâche', completed: false }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
