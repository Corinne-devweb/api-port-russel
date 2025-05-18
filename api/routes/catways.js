const express = require("express");
const router = express.Router();
const service = require("../services/catways"); // Import du service unifié

// Routes unifiées
router.get("/", service.list); // GET /api/catways → Liste
router.get("/:id", service.get); // GET /api/catways/:id → Détail
router.post("/", service.create); // POST /api/catways → Création
router.put("/:id", service.update); // PUT /api/catways/:id → Mise à jour (stateDescription uniquement)
router.delete("/:id", service.remove); // DELETE /api/catways/:id → Suppression

module.exports = router;
