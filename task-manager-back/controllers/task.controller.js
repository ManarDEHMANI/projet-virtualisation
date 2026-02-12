let tasks = [
    { id: 1, title: 'Première tâche', completed: false }
  ];
  
  exports.getTasks = (req, res) => {
    console.log('GET /tasks');
    res.json(tasks);
  };
  
  exports.addTask = (req, res) => {
    console.log('POST /tasks', req.body);
    const task = {
      id: Date.now(),
      title: req.body.title,
      completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
  };
  
  exports.updateTask = (req, res) => {
    console.log('PUT /tasks', req.params.id, req.body);
    tasks = tasks.map(t =>
      t.id == req.params.id ? req.body : t
    );
    res.json(req.body);
  };
  
  exports.deleteTask = (req, res) => {
    console.log('DELETE /tasks', req.params.id);
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
  };
  