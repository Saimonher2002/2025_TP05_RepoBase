# 📝 CRUD Básico - Go + Node.js + MongoDB

Aplicación CRUD básica con backend en Go y frontend en Node.js usando MongoDB.

## 🏗️ Estructura del Proyecto

```
crud-basico/
├── backend/
│   ├── main.go          # Backend API en Go
│   └── go.mod           # Dependencias Go
├── frontend/
│   ├── server.js        # Servidor Node.js
│   ├── package.json     # Dependencias Node
│   └── public/
│       └── index.html   # Frontend HTML/CSS/JS
└── README.md
```

## 🗄️ Instalación de MongoDB

### Opción 1: Docker (Recomendado - Más Fácil)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Opción 2: MongoDB Local

1. Descarga MongoDB desde: https://www.mongodb.com/try/download/community
2. Instala y ejecuta el servicio
3. MongoDB correrá en `mongodb://localhost:27017`

### Verificar que MongoDB está corriendo:

```bash
# Con Docker
docker ps

# Sin Docker (si lo instalaste localmente)
mongosh
```

## 🚀 Instalación y Ejecución

### 1️⃣ Backend (Go - Puerto 8080)

```bash
cd backend
go mod download
go run main.go
```

✅ Verás el mensaje: "Conectado a MongoDB exitosamente"  
El backend estará corriendo en `http://localhost:8080`

### 2️⃣ Frontend (Node.js - Puerto 3000)

```bash
cd frontend
npm install
npm start
```

El frontend estará corriendo en `http://localhost:3000`

## 📡 API Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/{id}` - Obtener una tarea específica
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/{id}` - Actualizar una tarea
- `DELETE /api/tasks/{id}` - Eliminar una tarea

## 💾 Base de Datos MongoDB

- **Base de datos**: `crudbasico`
- **Colección**: `tasks`

### Estructura del documento:

```json
{
  "_id": ObjectId("..."),
  "title": "Comprar leche",
  "description": "En el supermercado",
  "completed": false,
  "created_at": ISODate("2024-01-01T00:00:00Z")
}
```

## ✨ Funcionalidades

- ✅ Crear tareas con título y descripción
- ✅ Marcar tareas como completadas
- ✅ Editar tareas existentes
- ✅ Eliminar tareas
- ✅ Interfaz responsive y moderna
- ✅ Timestamp de creación
- ✅ IDs únicos con ObjectId de MongoDB

## 🛠️ Tecnologías

- **Backend**: Go 1.21+, Gorilla Mux, MongoDB Driver
- **Frontend**: Node.js, Express, HTML5, CSS3, JavaScript
- **Base de Datos**: MongoDB

## 📝 Notas

- MongoDB debe estar corriendo antes de iniciar el backend
- El CORS está habilitado en el backend
- Los datos persisten en MongoDB
- Se crea automáticamente la base de datos y colección

## 🔧 Requisitos

- Go 1.21 o superior
- Node.js 14 o superior
- MongoDB 5.0+ (local o Docker)
- npm

## 🎯 Comandos útiles de MongoDB

```bash
# Conectarse a MongoDB
mongosh

# Ver todas las bases de datos
show dbs

# Usar la base de datos crudbasico
use crudbasico

# Ver todas las tareas
db.tasks.find()

# Contar tareas
db.tasks.countDocuments()

# Eliminar todas las tareas
db.tasks.deleteMany({})

# Eliminar la base de datos
db.dropDatabase()
```

## 🎯 Ejemplo de uso con curl

```bash
# Crear una tarea
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leche","description":"En el supermercado","completed":false}'

# Listar todas las tareas
curl http://localhost:8080/api/tasks

# Actualizar una tarea (usa el ID que obtuviste al crear)
curl -X PUT http://localhost:8080/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leche","description":"Ya comprada","completed":true}'

# Eliminar una tarea
curl -X DELETE http://localhost:8080/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1
```

## 🐳 Comandos Docker para MongoDB

```bash
# Iniciar MongoDB
docker start mongodb

# Detener MongoDB
docker stop mongodb

# Ver logs
docker logs mongodb

# Eliminar el contenedor
docker rm mongodb

# Crear con persistencia de datos
docker run -d -p 27017:27017 -v mongodb_data:/data/db --name mongodb mongo:latest
```

## 🔍 Troubleshooting

**Error: "No se pudo conectar a MongoDB"**
- Verifica que MongoDB esté corriendo: `docker ps` o `mongosh`
- Verifica el puerto 27017: `netstat -an | grep 27017`

**Error: "puerto 8080 ya en uso"**
- Cambia el puerto en `main.go`: `:8080` → `:8081`

**Error: "puerto 3000 ya en uso"**
- Cambia el puerto en `server.js`: `3000` → `3001`