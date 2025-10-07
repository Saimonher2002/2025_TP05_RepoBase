const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de MongoDB
const MONGO_URI = 'mongodb+srv://user:simonysofi@cluster0.g8jz6rt.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'crudbasico';
const COLLECTION_NAME = 'tasks';

let db;
let collection;

// Inicializar conexión a MongoDB
async function initDB() {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
    });
    
    db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    
    console.log('Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

// Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await collection.find({}).toArray();
    
    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      created_at: task.created_at
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una tarea por ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const task = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const formattedTask = {
      id: task._id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      created_at: task.created_at
    };
    
    res.json(formattedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const newTask = {
      title: title || '',
      description: description || '',
      completed: completed || false,
      created_at: new Date()
    };
    
    const result = await collection.insertOne(newTask);
    
    const createdTask = {
      id: result.insertedId,
      ...newTask
    };
    
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una tarea
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const updateData = {
      $set: {
        title: title,
        description: description,
        completed: completed
      }
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      updateData
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const updatedTask = {
      id: new ObjectId(id),
      title,
      description,
      completed
    };
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una tarea
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
async function startServer() {
  await initDB();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer();