const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./routes/task.routes'));

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
