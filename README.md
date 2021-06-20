## API

- POST /auth/signup
- POST /auth/signin

- GET /tasks/ **traer todas las tareas**
- GET /tasks/:id **traer todas las tareas del usuario logueado**
- POST /tasks/create **crear una tarea**
- PUT /tasks/status/:id **actualizar el estado de un tarea**

- GET /users/all **traer los colaboradores**
- POST /users/create **crear una nueva tarea**
- GET /users/profile **trae los datos de perfil de la persona logueada**

## data Base

## package json
{
  "name": "agendapp-api",
  "version": "1.0.0",
  "description": "agendapp - api project",
  "main": "app.js",
  "scripts": {
    "start": "node --es-module-specifier-resolution=node app.js",
    "start:dev": "NODE_ENV=development nodemon -r esm --es-module-specifier-resolution=node app.js",
    "prod": "NODE_ENV=production node --es-module-specifier-resolution=node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jsuazag",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "esm": "^3.2.25",
    "express": "^4.17.1",
    "joi": "^17.4.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.12.8",
    "node-cron": "^3.0.0",
    "pg": "^8.6.0",
    "pg-hstore": "^2.3.3",
    "sequelize": "^6.6.2"
  },
  "type": "module",
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
