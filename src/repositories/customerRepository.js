import db from "../config/db.js";
// Repository: Acceso a la Base de Datos 
class CustomerRepository { 
    async findByEmail(email) {
    const result = await db.query("SELECT * FROM customer WHERE email = $1", [email]);
    return result.rows[0];
  }

    async create(customer) {
    const { email, password, firstName, lastName, phoneNumber } = customer;
    const result = await db.query(
      "INSERT INTO customer (email, password, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, password, firstName, lastName, phoneNumber]
    );
    return result.rows[0];
  }
}

export default CustomerRepository;