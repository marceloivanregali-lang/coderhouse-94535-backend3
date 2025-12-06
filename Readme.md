# 🐾 Pets API – Backend Coderhouse 94535

API completa para gestión de mascotas, usuarios y adopciones.  
Proyecto desarrollado con **Node.js, Express, MongoDB, Swagger y Docker**, incluyendo sistema de testing automatizado.

---

## 🚀 Inicio Rápido

### 🔧 Requisitos previos

- Node.js 20+
- MongoDB local o Atlas
- Docker (opcional para correr contenedor)
- Git

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <url-del-repo>
Instalar dependencias:

bash
Copiar:
npm install
▶️ Ejecutar el servidor
🔥 Modo desarrollo (con nodemon)
bash
Copiar:
npm run dev
🌐 Puerto por defecto
El servidor corre en:

arduino
Copiar:
http://localhost:8080
🐳 Ejecutar con Docker
1️⃣ Construir la imagen
bash
Coiar:
docker build -t pets-app .
2️⃣ Ejecutar el contenedor
bash
Copiar:
docker run -d -p 8080:8080 --name pets-container pets-app
Para ver los contenedores:

bash
Copiar:
docker ps -a
🗄 Variables de entorno
Crea un archivo:

bash
Copiar:
.env
Con los siguientes valores:

ini
Copiar:
MONGO_URL=mongodb://localhost:27017/coderhouse
PORT=8080
📚 Documentación Swagger
Una vez corriendo el servidor, ingresar a:

👉 http://localhost:8080/docs

Ahí podés visualizar y probar los endpoints.

📦 Endpoints principales
👤 Usuarios
GET /api/users

POST /api/users

PUT /api/users/:id

DELETE /api/users/:id

🐾 Mascotas
GET /api/pets

POST /api/pets

PUT /api/pets/:id

DELETE /api/pets/:id

🍼 Adopciones
GET /api/adoptions

POST /api/adoptions

🧪 Mocks
GET /api/mocks/generateData

🧪 Testing
Ejecutar los test automatizados:

bash
Copiar:
npm test
Tecnologías usadas para testing:

Mocha

Chai

Supertest

🗂 Estructura del proyecto
pgsql
Copy code
project/
│── argv/
│   └── server/
│       └── server.js
│
│── routes/
│   ├── users.routes.js
│   ├── pets.routes.js
│   ├── mocks.routes.js
│   └── Adoption.routes.js
│
│── config/
│   └── swagger.js
│
│── server-dotenv/
│   └── db-connection.js
│
│── test/
│── package.json
│── Dockerfile
│── .env

🛠 Tecnologías utilizadas
Node.js + Express

MongoDB + Mongoose

Docker

Swagger (Documentación)

dotenv

Mocha + Chai + Supertest

Faker

bcrypt


Proyecto desarrollado por Marcelo I. Regali
Curso Backend – Coderhouse 94535 (2025)


```
