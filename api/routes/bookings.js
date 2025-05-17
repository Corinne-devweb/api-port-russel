const express = require("express");
const router = express.Router();
const service = require("../services/bookings");

// Routes unifiées
router.get("/", service.list); // Toutes réservations OU par catway si query
router.get("/:id", service.get); // Détail réservation
router.post("/", service.create); // Création (avec catway dans body)
router.put("/:id", service.update); // Mise à jour
router.delete("/:id", service.remove); // Suppression

module.exports = router;
