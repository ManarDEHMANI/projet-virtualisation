const express = require('express');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user.routes');
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});