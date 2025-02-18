import passport from "../config/passport.js";

//Dependency Injection: Inyectar Dependencias en los Controladores
//Inyectamos los repositorios y servicios en los controladores para desacoplar la lógica.
// Definición de la clase AuthController
class AuthController {
  static login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Error interno del servidor" });
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error interno del servidor" });
        }
        return res.json({ email: user.email });
      });
    })(req, res, next);
  }

  // Método para manejar el cierre de sesión
  static logout(req, res) {
    // Cerrar la sesión del usuario
    req.logout((err) => {
      if (err) {
        // Si hay un error al cerrar sesión, devolver un error 500
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      // Si el cierre de sesión es exitoso, devolver un mensaje de éxito
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  }

  // Método para verificar si el usuario está autenticado
  static checkAuth(req, res) {
    // Verificar si el usuario está autenticado
    if (req.isAuthenticated()) {
      // Si está autenticado, devolver el email del usuario
      res.json({ email: req.user.email });
    } else {
      // Si no está autenticado, devolver un error 401
      res.status(401).json({ message: "Not authenticated" });
    }
  }
}

// Exportar la clase AuthController para su uso en otros archivos
export default AuthController;