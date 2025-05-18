// services/catways.js
const Catway = require("../models/catway");

module.exports = {
  // GET /api/catways
  list: async () => {
    return await Catway.find();
  },

  // GET /api/catways/:id
  get: async (id) => {
    const catway = await Catway.findOne({ catwayNumber: id });
    if (!catway) throw new Error("Catway non trouvé");
    return catway;
  },

  // POST /api/catways
  create: async (data) => {
    const catway = new Catway(data);
    return await catway.save();
  },

  // PUT /api/catways/:id (ne modifie que stateDescription)
  update: async (id, data) => {
    const updatedData = { stateDescription: data.stateDescription }; // Bloque la modification du numéro/type
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: id },
      updatedData,
      { new: true }
    );
    if (!updatedCatway) throw new Error("Catway non trouvé");
    return updatedCatway;
  },

  // DELETE /api/catways/:id
  remove: async (id) => {
    const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: id });
    if (!deletedCatway) throw new Error("Catway non trouvé");
    return { message: "Catway supprimé" };
  },
};
