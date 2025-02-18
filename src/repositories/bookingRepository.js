import db from "../config/db.js";
//Repository: Acceso a la Base de Datos 
class BookingRepository {
  async findByEmail(email) {
    const result = await db.query("SELECT * FROM booked_users WHERE email_user = $1", [email]);
    return result.rows;
  }

  async findAll() {
    const result = await db.query("SELECT * FROM booked_users");
    return result.rows;
  }

  async create(booking) {
    const { emailUser, day, month, year, hour, cost, done } = booking;
    const result = await db.query(
      "INSERT INTO booked_users (email_user, day, month, year, hour, cost, done) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [emailUser, day, month, year, hour, cost, done]
    );
    return result.rows[0];
  }

  async update(oldTask, newRecord) {
    const { email_user, day, month, year, hour, cost, done } = newRecord;
    const result = await db.query(
      `UPDATE booked_users 
       SET email_user = $1, day = $2, month = $3, year = $4, hour = $5, cost = $6, done = $7 
       WHERE email_user = $8 AND day = $9 AND month = $10 AND year = $11 AND hour = $12 
       RETURNING *`,
      [email_user, day, month, year, hour, cost, done, oldTask.email, oldTask.day, oldTask.month, oldTask.year, oldTask.hour]
    );
    return result.rows[0];
  }

  async delete(email, day, month, year, hour) {
    const result = await db.query(
      "DELETE FROM booked_users WHERE email_user = $1 AND day = $2 AND month = $3 AND year = $4 AND hour = $5 RETURNING *",
      [email, day, month, year, hour]
    );
    return result.rows[0];
  }

}

export default BookingRepository;


