const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, "Le numéro de catway est requis"],
      min: [1, "Le numéro doit être positif"],
      validate: {
        validator: Number.isInteger,
        message: "Le numéro doit être un entier",
      },
      ref: "Catway", // Référence au modèle Catway
    },
    clientName: {
      // Correction : camelCase pour la cohérence
      type: String,
      required: [true, "Le nom du client est requis"],
      trim: true,
      maxlength: [100, "Le nom ne doit pas dépasser 100 caractères"],
    },
    boatName: {
      type: String,
      required: [true, "Le nom du bateau est requis"],
      trim: true,
      maxlength: [50, "Le nom ne doit pas dépasser 50 caractères"],
    },
    startDate: {
      type: Date,
      required: [true, "La date de début est requise"],
      validate: [
        {
          validator: function (value) {
            return value > new Date(); // Doit être dans le futur
          },
          message: "La réservation doit commencer dans le futur",
        },
        {
          validator: function (value) {
            return value < this.endDate;
          },
          message: "La date de début doit être antérieure à la date de fin",
        },
      ],
    },
    endDate: {
      type: Date,
      required: [true, "La date de fin est requise"],
      validate: {
        validator: function (value) {
          const minDuration = 24 * 60 * 60 * 1000; // 1 jour en millisecondes
          return value - this.startDate >= minDuration;
        },
        message: "La réservation doit durer au moins 24h",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index pour optimiser les recherches
Booking.index({ catwayNumber: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model("Booking", Booking);
