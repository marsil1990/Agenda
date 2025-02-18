import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

//Singleton: Conexión a la Base de Datos
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.pool = new pg.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    Database.instance = this;
  }

    // Definición de una función asíncrona llamada 'query'
  async query(sql, params) {
    // Obtener una conexión del pool de conexiones
    const client = await this.pool.connect();

    // Bloque 'try' para manejar la ejecución de la consulta
    try {
        // Ejecutar la consulta SQL con los parámetros proporcionados
        const result = await client.query(sql, params);

        // Retornar el resultado de la consulta
        return result;
    } finally {
        // Bloque 'finally' para asegurar que la conexión se libere
        // independientemente de si la consulta fue exitosa o no
        client.release();
    }
  }
}

const db = new Database();
export default db;