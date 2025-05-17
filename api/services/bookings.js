const Reservation = require("../models/reservation");
const Catway = require("../models/catway");

module.exports = {
  // GET /api/catways/:id/reservations
  list: async (catwayId) => {
    const reservations = await Reservation.find({ catwayNumber: catwayId });
    if (!reservations.length)
      throw new Error("Aucune réservation trouvée pour ce catway");
    return reservations;
  },

  // GET /api/catways/:id/reservations/:idReservation
  get: async (reservationId) => {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) throw new Error("Réservation non trouvée");
    return reservation;
  },

  // POST /api/catways/:id/reservations
  create: async (catwayId, data) => {
    // Vérifie que le catway existe
    const catway = await Catway.findOne({ catwayNumber: catwayId });
    if (!catway) throw new Error("Catway non trouvé");

    // Vérifie les conflits de dates
    const existingBooking = await Reservation.findOne({
      catwayNumber: catwayId,
      $or: [
        {
          startDate: { $lte: data.endDate },
          endDate: { $gte: data.startDate },
        },
      ],
    });
    if (existingBooking)
      throw new Error("Conflit de réservation pour cette période");

    const reservation = new Reservation({
      ...data,
      catwayNumber: catwayId,
    });
    return await reservation.save();
  },

  // PUT /api/catways/:id/reservations/:idReservation
  update: async (reservationId, data) => {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      data,
      { new: true, runValidators: true }
    );
    if (!updatedReservation) throw new Error("Réservation non trouvée");
    return updatedReservation;
  },

  // DELETE /api/catways/:id/reservations/:idReservation
  remove: async (reservationId) => {
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!deletedReservation) throw new Error("Réservation non trouvée");
    return { message: "Réservation supprimée" };
  },
};
