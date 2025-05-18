const express = require("express");
const router = express.Router();
const packageJson = require("../package.json");

/**
 * @swagger
 * tags:
 *   name: Root
 *   description: Accueil de l'API
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Root]
 *     summary: Accueil API
 *     description: |
 *       Retourne les informations de base de l'API et la liste des endpoints disponibles.
 *       **Accès public**
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "API Capitainerie"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: string
 *                       example: "/api/auth"
 *                     catways:
 *                       type: string
 *                       example: "/api/catways"
 *                     bookings:
 *                       type: string
 *                       example: "/api/bookings"
 *                     docs:
 *                       type: string
 *                       example: "/api-docs"
 */
router.get("/", (req, res) => {
  res.status(200).json({
    name: "API Capitainerie - Port de Russell",
    version: packageJson.version,
    status: 200,
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      auth: "/api/auth",
      catways: "/api/catways",
      bookings: "/api/bookings",
      users: "/api/users",
      docs: "/api-docs",
    },
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Root]
 *     summary: Health Check
 *     description: |
 *       Endpoint de vérification du statut de l'API.
 *       Utilisé pour les tests de déploiement et monitoring.
 *     responses:
 *       200:
 *         description: API opérationnelle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
