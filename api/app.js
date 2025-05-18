require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const logger = require("./utils/logger"); // Logger personnalisé

// Import des routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const catwaysRouter = require("./routes/catways");
const bookingsRouter = require("./routes/bookings");
const usersRouter = require("./routes/users");

// Configuration
const swaggerDocument = YAML.load("./swagger.yaml");
const app = express();

// 1. Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("Connecté à MongoDB"))
  .catch((err) => logger.error("Erreur MongoDB:", err));

// 2. Middlewares de sécurité
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    exposedHeaders: ["Authorization"],
  })
);

// 3. Limiteur de requêtes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use("/api/", apiLimiter);

// 4. Middlewares standards
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.path}`);
  next();
});

// 5. Documentation API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 6. Routes
app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/catways", catwaysRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/users", usersRouter);

// 7. Gestion des erreurs
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint non trouvé",
    documentation: "/api-docs",
  });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Une erreur est survenue",
  });
});

module.exports = app;
