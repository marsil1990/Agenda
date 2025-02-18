// Importar las bibliotecas necesarias
import passport from "passport"; // Passport.js para manejar la autenticación
import passportLocal from "passport-local"; // Estrategia local de Passport (usuario y contraseña)
import bcrypt from "bcrypt"; // Para hashing y comparación de contraseñas
import db from "./db.js"; // Conexión a la base de datos

// Extraer la clase Strategy de passport-local
const LocalStrategy = passportLocal.Strategy;

// Configurar la estrategia local de Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Especificar que el campo "email" se usará como nombre de usuario
      passwordField: "password", // Especificar que el campo "password" se usará como contraseña
    },
    // Función asíncrona para verificar las credenciales del usuario
    async (email, password, done) => {
      try {
        // Buscar al usuario en la base de datos por su email
        const result = await db.query("SELECT * FROM customer WHERE email = $1", [email]);

        // Verificar si se encontró un usuario con ese email
        if (result.rows.length > 0) {
          const user = result.rows[0]; // Obtener el primer usuario encontrado

          // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
          const match = await bcrypt.compare(password, user.password);

          // Si las contraseñas coinciden, autenticar al usuario
          if (match) {
            return done(null, user); // Autenticación exitosa
          } else {
            // Si la contraseña no coincide, devolver un mensaje de error
            return done(null, false, { message: "Incorrect password." });
          }
        } else {
          // Si no se encuentra el usuario, devolver un mensaje de error
          return done(null, false, { message: "Incorrect username." });
        }
      } catch (err) {
        // Si ocurre un error, devolverlo
        return done(err);
      }
    }
  )
);

// Serializar al usuario para almacenar su identificador en la sesión
passport.serializeUser((user, done) => {
  done(null, user.email); // Usar el email como identificador único
});

// Deserializar al usuario para recuperar sus datos a partir del identificador almacenado en la sesión
passport.deserializeUser(async (email, done) => {
  try {
    // Buscar al usuario en la base de datos por su email
    const result = await db.query("SELECT * FROM customer WHERE email = $1", [email]);

    // Si se encuentra el usuario, devolver sus datos
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      // Si no se encuentra, devolver false
      done(null, false);
    }
  } catch (err) {
    // Si ocurre un error, devolverlo
    done(err);
  }
});

// Exportar la configuración de Passport para su uso en la aplicación
export default passport;