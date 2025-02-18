import CustomerService from "../services/customerService.js";
import CustomerRepository from "../repositories/customerRepository.js";

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);

class CustomerController {
  static async createCustomer(req, res) {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    
    try {
      const newCustomer = await customerService.createCustomer(
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      );
      res.status(200).json({ message: "El nombre se ingresó correctamente", customer: newCustomer });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default CustomerController;