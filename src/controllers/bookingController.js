import BookingService from "../services/bookingService.js";
import BookingRepository from "../repositories/bookingRepository.js";

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);

class BookingController {
  static async getAvailableDays(req, res) {
    try {
      const availableDays = await bookingService.getDaysInMonthAndNextMonth();
      res.send(availableDays);
    } catch (error) {
      console.error("Error al obtener los días disponibles:", error);
      res.status(500).send("Error al obtener los días disponibles");
    }
  }

  static async createReservation(req, res) {
    const { email_user, day, month, year, hour, cost, done } = req.body;
    try {
      const newReservation = await bookingService.createReservation(
        email_user,
        day,
        month,
        year,
        hour,
        cost,
        done
      );
      res.status(200).json({ message: "Reserva creada correctamente", reservation: newReservation });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getRecords(req, res) {
    try {
      const records = await bookingService.getRecords();
      res.send(records);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      res.status(500).send("Error al obtener los registros");
    }
  }

  static async updateRecord(req, res) {
    const { oldTask, newRecord } = req.body;
    try {
      const updatedTask = await bookingService.updateRecord(oldTask, newRecord);
      res.status(200).json({ message: "Reserva actualizada correctamente", task: updatedTask });
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      res.status(500).send("Error al actualizar la reserva");
    }
  }

  static async markWorkDone(req, res) {
    const { emailUser, day, month, year, hour } = req.body;
    try {
      await bookingService.markWorkDone(emailUser, day, month, year, hour);
      res.status(200).json({ message: "Trabajo marcado como completado" });
    } catch (error) {
      console.error("Error al marcar el trabajo como completado:", error);
      res.status(500).send("Error al marcar el trabajo como completado");
    }
  }

  static async deleteRecord(req, res) {
    const { email, day, month, year, hour } = req.body;
    try {
      await bookingService.deleteRecord(email, day, month, year, hour);
      res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      res.status(500).send("Error al eliminar la reserva");
    }
  }

  static async addRecord(req, res) {
    const { email, day, month, year, hour, cost, done } = req.body;
    try {
      await bookingService.addRecord(email, day, month, year, hour, cost, done);
      res.status(200).json({ message: "Reserva agregada correctamente" });
    } catch (error) {
      console.error("Error al agregar la reserva:", error);
      res.status(500).send("Error al agregar la reserva");
    }
  }
}

export default BookingController;