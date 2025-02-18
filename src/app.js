import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/corsMiddleware.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configura CORS para permitir solicitudes desde el front-end en 'http://localhost:3000'
app.use(corsMiddleware);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true })); //credentiales, permite coockies en la sesión


// Middleware de CORS de Express (opcional, si necesitas más configuraciones)


// Configura middlewares para manejar JSON y URL codificados en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secreto para firmar la cookie de sesión
    resave: false, // No guarda la sesión si no se ha modificado
    saveUninitialized: false, // No guarda sesiones nuevas no inicializadas
    cookie: { secure: false },  // Cambiar a true si usas HTTPS para asegurar las cookie
  })
);

// Inicializa Passport y la sesión
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", customerRoutes);
app.use("/api", bookingRoutes);

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});