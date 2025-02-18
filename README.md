# Project Schedule

Este proyecto es una aplicación web con **Express.js** en el backend y **React.js** en el frontend.

## **Descripción**

Esta página permite a los usuarios registrarse para reservar un lugar, por ejemplo, en una agenda de una manicurista. Además, la dueña podrá agregar, modificar, eliminar y editar las reservaciones de los clientes.

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

## **Configuración de la Base de Datos en PostgreSQL**

Ejecuta los siguientes comandos en PostgreSQL para crear la base de datos y las tablas necesarias:

```sql
CREATE DATABASE project_schedule;

\c project_schedule;

CREATE TABLE customer (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number BIGINT
);

CREATE TABLE booked_users (
    email_user VARCHAR(255) REFERENCES customer(email),
    day INTEGER,
    month INTEGER,
    year INTEGER,
    hour VARCHAR(5),
    cost NUMERIC(10,2),
    done BOOLEAN,
    PRIMARY KEY (email_user, day, month, year, hour)
);
```

---

## **Configuración del Backend**

1. Clona el repositorio:
   ```sh
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd project-schedule
   ```
2. Instala las dependencias del backend:
   ```sh
   cd backend  # O la carpeta donde esté el backend
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en la carpeta `backend` y copia el siguiente contenido:
     ```env
     DB_USER=postgres
     DB_HOST=localhost
     DB_NAME=project-schedule
     DB_PASSWORD=tu_contraseña
     DB_PORT=5432

     SESSION_SECRET=TOPSECRET
     PORT=5000
     CORS_ORIGIN=http://localhost:3000
     ```
4. Inicia el servidor backend:
   ```sh
   npm run dev
   ```

---

## **Configuración del Frontend**

1. Instala las dependencias del frontend:
   ```sh
   cd ../frontend
   npm install
   ```
2. Inicia el servidor frontend:
   ```sh
   npm start
   ```
3. La aplicación estará disponible en `http://localhost:3000`

---

## **Comandos Útiles**

- `npm start` - Inicia la aplicación en modo producción.
- `npm run dev` - Inicia el backend en modo desarrollo con Nodemon.

---

## **Contribuciones**

Si quieres contribuir, haz un fork del repositorio y abre un pull request.

---

## **Licencia**

Este proyecto ha sido desarrollado por **Marcos Silvera** y está bajo la licencia MIT.

---

# Project Schedule (English Version)

This project is a web application with **Express.js** on the backend and **React.js** on the frontend.

## **Description**

This page allows users to register and book a place, such as an appointment in a manicurist's schedule. Additionally, the owner will be able to add, modify, delete, and edit client reservations.

## **Prerequisites**

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

## **Database Setup in PostgreSQL**

Run the following commands in PostgreSQL to create the database and necessary tables:

```sql
CREATE DATABASE project_schedule;

\c project_schedule;

CREATE TABLE customer (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number BIGINT
);

CREATE TABLE booked_users (
    email_user VARCHAR(255) REFERENCES customer(email),
    day INTEGER,
    month INTEGER,
    year INTEGER,
    hour VARCHAR(5),
    cost NUMERIC(10,2),
    done BOOLEAN,
    PRIMARY KEY (email_user, day, month, year, hour)
);
```

---

## **Backend Setup**

1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_USER/YOUR_REPOSITORY.git
   cd project-schedule
   ```
2. Install backend dependencies:
   ```sh
   cd backend  # Or the folder where the backend is located
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` folder and copy the following content:
     ```env
     DB_USER=postgres
     DB_HOST=localhost
     DB_NAME=project-schedule
     DB_PASSWORD=your_password
     DB_PORT=5432

     SESSION_SECRET=TOPSECRET
     PORT=5000
     CORS_ORIGIN=http://localhost:3000
     ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

---

## **Frontend Setup**

1. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
2. Start the frontend server:
   ```sh
   npm start
   ```
3. The application will be available at `http://localhost:3000`

---

## **Useful Commands**

- `npm start` - Starts the application in production mode.
- `npm run dev` - Starts the backend in development mode with Nodemon.

---

## **Contributions**

If you want to contribute, fork the repository and open a pull request.

---

## **License**

This project was developed by **Marcos Silvera** and is licensed under the MIT license.

