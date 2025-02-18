//El patrón Factory se usa para crear instancias de modelos de manera centralizada.
class Customer {
    constructor({ email, password, firstName, lastName, phoneNumber }) {
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
    }
  }
  
  export default Customer;