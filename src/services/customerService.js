import CustomerRepository from "../repositories/customerRepository.js";
import bcrypt from "bcrypt";

class CustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async createCustomer(email, password, firstName, lastName, phoneNumber) {
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      throw new Error("El nombre ya existe en la base de datos.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await this.customerRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    return newCustomer;
  }
}

export default CustomerService;