const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Catway = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, "Le numéro de catway est requis"],
      unique: true, // Garantit l'unicité comme spécifié
      min: [1, "Le numéro doit être positif"],
      validate: {
        validator: Number.isInteger,
        message: "Le numéro doit être un entier",
      },
    },
    catwayType: {
      type: String,
      required: [true, "Le type de catway est requis"],
      enum: {
        values: ["long", "short"], // Seulement 2 valeurs possibles
        message: "Le type doit être 'long' ou 'short'",
      },
      trim: true,
    },
    catwayState: {
      type: String,
      required: [true, "L'état du catway est requis"],
      trim: true,
      maxlength: [
        100,
        "La description de l'état ne doit pas dépasser 100 caractères",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Exemple : ajoute un champ calculé si nécessaire
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Empêche la modification du catwayNumber et catwayType en PUT/PATCH
Catway.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.catwayNumber || update.catwayType) {
    throw new Error(
      "La modification du numéro ou type de catway est interdite"
    );
  }
  next();
});

module.exports = mongoose.model("Catway", Catway);
