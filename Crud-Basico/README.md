# 📝 CRUD Básico - Node.js + MongoDB Atlas

Aplicación CRUD básica con backend en Node.js y frontend en Node.js usando MongoDB Atlas (cluster en la nube).

## 🏗️ Estructura del Proyecto

```
crud-basico/
├── backend/
│   ├── server.js        # Backend API en Node.js
│   ├── package.json     # Dependencias backend
│   ├── .env             # Variables de entorno 
│   ├── .env.example     # Ejemplo de variables de entorno
│   └── .gitignore       # Archivos a ignorar en git
├── frontend/
│   ├── server.js        # Servidor Node.js
│   ├── package.json     # Dependencias Node
│   └── public/
│       └── index.html   # Frontend HTML/CSS/JS
└── README.md
```

## 🗄️ Configuración de MongoDB Atlas

### 1️⃣ Obtener tu Connection String

Según tu captura de pantalla, tu connection string es:

```
mongodb+srv://user:<db_password>@cluster0.tufmyql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 2️⃣ Configurar el archivo .env

1. En la carpeta `backend/`, crea un archivo llamado `.env`
2. Copia el contenido de `.env.example`
3. Reemplaza `<db_password>` con tu contraseña real
4. Agrega el nombre de la base de datos: `/crudbasico`

**Ejemplo:**
```env
MONGODB_URI=mongodb+srv://user:TuPassword123@cluster0.tufmyql.mongodb.net/crudbasico?retryWrites=true&w=majority
PORT=8080
```

⚠️ **IMPORTANTE**: 
- Reemplaza `user` con tu usuario de MongoDB si es diferente
- Reemplaza `<db_password>` con tu contraseña real
- La contraseña debe estar URL encoded (sin caracteres especiales o codificados)
- NO subas el archivo `.env` a git (ya está en `.gitignore`)

### 3️⃣ Whitelist tu IP en MongoDB Atlas

1. Ve a MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Agrega tu IP actual o usa `0.0.0.0/0` para desarrollo (permitir todas)

## 🚀 Instalación y Ejecución

### 1️⃣ Backend (Node.js - Puerto 8080)

```bash
cd backend
npm install
npm start
```

**Para desarrollo con auto-reload:**
```bash
npm run dev
```

✅ Verás el mensaje:
```
✅ Conectado a MongoDB Atlas exitosamente
🚀 Servidor corriendo en http://localhost:8080
📡 API disponible en http://localhost:8080/api/tasks
```

### 2️⃣ Frontend (Node.js - Puerto 3000)

```bash
cd frontend
npm install
npm start
```

El frontend estará corriendo en `http://localhost:3000`

## 📡 API Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea específica
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea
- `DELETE /api/tasks/:id` - Eliminar una tarea
- `GET /health` - Verificar estado del servidor y MongoDB

## 💾 Base de Datos MongoDB Atlas

- **Cluster**: Cluster0
- **Base de datos**: `crudbasico`
- **Colección**: `tasks` (se crea automáticamente)

### Estructura del documento:

```json
{
  "_id": ObjectId("..."),
  "title": "Comprar leche",
  "description": "En el supermercado",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## ✨ Funcionalidades

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validación de datos
- ✅ CORS habilitado
- ✅ Manejo de errores
- ✅ Variables de entorno para seguridad
- ✅ MongoDB Atlas (cloud database)
- ✅ Timestamps automáticos
- ✅ Interfaz moderna y responsive

## 🛠️ Tecnologías

### Backend:
- Node.js
- Express.js
- Mongoose (ODM para MongoDB)
- CORS
- dotenv (variables de entorno)

### Frontend:
- Node.js + Express (servidor estático)
- HTML5, CSS3, JavaScript (Vanilla)

### Base de Datos:
- MongoDB Atlas (Cloud)

## 🔧 Requisitos

- Node.js 14 o superior
- npm
- Cuenta en MongoDB Atlas (gratis)
- Connection string de MongoDB Atlas

## 🎯 Ejemplos de uso con curl

```bash
# Health check
curl http://localhost:8080/health

# Crear una tarea
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leche","description":"En el supermercado","completed":false}'

# Listar todas las tareas
curl http://localhost:8080/api/tasks

# Obtener una tarea específica
curl http://localhost:8080/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1

# Actualizar una tarea
curl -X PUT http://localhost:8080/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leche","description":"Ya comprada","completed":true}'

# Eliminar una tarea
curl -X DELETE http://localhost:8080/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1
```

## 🔍 Troubleshooting

### ❌ Error: "MongoServerError: bad auth"
- Verifica tu usuario y contraseña en `.env`
- Asegúrate de que la contraseña esté correcta
- Verifica que el usuario tenga permisos en la base de datos

### ❌ Error: "connect ETIMEDOUT"
- Verifica tu IP en Network Access de MongoDB Atlas
- Agrega tu IP actual o usa `0.0.0.0/0` para desarrollo
- Verifica tu conexión a internet

### ❌ Error: "puerto 8080 ya en uso"
- Cambia el puerto en `.env`: `PORT=8081`
- O mata el proceso: `lsof -ti:8080 | xargs kill` (Mac/Linux)

### ❌ Error: "Cannot find module 'dotenv'"
- Ejecuta: `npm install` en la carpeta backend

## 📝 Notas de Seguridad

- ✅ Usa variables de entorno (`.env`) para credenciales
- ✅ Nunca subas `.env` a git
- ✅ Usa `.env.example` para documentar variables necesarias
- ✅ En producción, usa variables de entorno del servidor
- ✅ Considera usar IP whitelist restrictiva en producción
- ✅ Cambia contraseñas regularmente

## 🚀 Deploy a Producción

### Opciones recomendadas:

1. **Railway.app** (más fácil)
   - Conecta tu repo de GitHub
   - Configura las variables de entorno
   - Deploy automático

2. **Vercel** (para el frontend)
   - Deploy del frontend
   - Variables de entorno en el dashboard

3. **Heroku**
   - `git push heroku main`
   - Config vars para `.env`

4. **Render.com**
   - Gratis para empezar
   - Configura variables de entorno

**Importante para producción:**
- Configura las variables de entorno en el servidor
- Actualiza la IP whitelist en MongoDB Atlas
- Cambia CORS para permitir solo tu dominio

## 📚 Recursos útiles

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Express.js Docs](https://expressjs.com/)
- [Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)