import BookingRepository from "../repositories/bookingRepository.js";



class BookingService {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async getDaysInMonthAndNextMonth() {
    const bookings = await this.bookingRepository.findAll();
    console.log(bookings)
    const startDate = new Date();
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3);
    const daysArray = [];

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0) {
        let firstHour = false;
        let secondHour = false;
        let thirdHour = false;

        for (const booking of bookings) {
          if (
            booking.day === currentDate.getDate() &&
            booking.month === currentDate.getMonth() + 1 &&
            booking.year === currentDate.getFullYear()
          ) {
            if (booking.hour === "8:30") firstHour = true;
            if (booking.hour === "10:30") secondHour = true;
            if (booking.hour === "15:00") thirdHour = true;
          }
        }

        if (!firstHour) daysArray.push([currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear(), "8:30"]);
        if (!secondHour) daysArray.push([currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear(), "10:30"]);
        if (!thirdHour) daysArray.push([currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear(), "15:00"]);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
  }

  async createReservation(emailUser, day, month, year, hour, cost, done) {
    const existingReservations = await this.bookingRepository.findByEmail(emailUser);
    if (existingReservations.length > 0) {
      const hasPendingReservations = existingReservations.some((res) => !res.done);
      if (hasPendingReservations) {
        throw new Error("Ya tienes reservas pendientes.");
      }
    }
    const newReservation = await this.bookingRepository.create({
      emailUser,
      day,
      month,
      year,
      hour,
      cost,
      done,
    });
    return newReservation;
  }

  async getRecords() {
    return await this.bookingRepository.findAll();
  }

  async updateRecord(oldTask, newRecord) {
    const { email_user, day, month, year, hour, cost, done } = newRecord;
    const done_db = done === "yes";
    return await this.bookingRepository.update(oldTask, {
      email_user,
      day,
      month,
      year,
      hour,
      cost,
      done: done_db,
    });
  }

  async markWorkDone(emailUser, day, month, year, hour) {
    await this.bookingRepository.markAsDone(emailUser, day, month, year, hour);
  }

  async deleteRecord(email, day, month, year, hour) {
    console.log(email, day, month, year, hour)
    await this.bookingRepository.delete(email, day, month, year, hour);
  }

  async addRecord(email, day, month, year, hour, cost, done) {
    const done_db = done === "yes";
    await this.bookingRepository.create({
      emailUser: email,
      day,
      month,
      year,
      hour,
      cost,
      done: done_db,
    });
  }
}

export default BookingService;