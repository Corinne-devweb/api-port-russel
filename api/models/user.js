// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// On importe le module bcrypt qui permet de hacher des mots de passe
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Le nom est requis"],
    },
    firstname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "L'email est requis"],
      unique: true, // index unique
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [12, "Le mot de passe doit contenir au moins 112 caractères"],
      select: false,
    },
  },
  {
    // Ajoute 2 champs au document : createdAt et updatedAt
    timestamps: true,
  }
);

// Hash le mot de passe quand il est modifié
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", User);
