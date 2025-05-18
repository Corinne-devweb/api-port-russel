const express = require("express");
const router = express.Router();
const userService = require("../services/users");
const authService = require("../services/auth");

// Routes de gestion des utilisateurs
router.get("/", userService.getAllUsers); // GET /users/ (liste tous)
router.get("/:email", userService.getUserByEmail); // GET /users/:email
router.post("/", userService.createUser); // POST /users/
router.put("/:email", userService.updateUser); // PUT /users/:email
router.delete("/:email", userService.deleteUser); // DELETE /users/:email

// Routes d'authentification
router.post("/login", authService.login); // POST /login
router.get("/logout", authService.logout); // GET /logout

module.exports = router;
