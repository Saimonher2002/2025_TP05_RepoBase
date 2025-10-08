const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudbasico';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas exitosamente'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/tasks/:id - Obtener una tarea específica
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'El título es requerido' });
        }

        const task = new Task({
            title,
            description: description || '',
            completed: completed || false
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/tasks/:id - Actualizar una tarea
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/tasks/:id - Eliminar una tarea
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api/tasks`);
});