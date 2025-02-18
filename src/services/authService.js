import CustomerRepository from "../repositories/customerRepository.js";
import bcrypt from "bcrypt";

class AuthService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  static async authenticate(email, password) {
    const user = await CustomerRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Contraseña incorrecta.");
    }
    return user;
  }
}

export default AuthService;