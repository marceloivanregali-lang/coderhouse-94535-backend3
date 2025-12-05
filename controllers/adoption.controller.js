import Adoption from "../models/Adoption.js";

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user")
      .populate("pet")
      .lean();

    res.json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getAdoptionById = async (req, res) => {
  const { aid } = req.params;

  try {
    const adoption = await Adoption.findById(aid)
      .populate("user")
      .populate("pet")
      .lean();

    if (!adoption) {
      return res.status(404).json({
        status: "error",
        message: "Adopción no encontrada",
      });
    }

    res.json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

export const createAdoption = async (req, res) => {
  try {
    const newAdoption = await Adoption.create(req.body);
    res.json({ status: "success", payload: newAdoption });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const deleteAdoption = async (req, res) => {
  const { aid } = req.params;

  try {
    const deleted = await Adoption.findByIdAndDelete(aid);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Adopción no encontrada",
      });
    }

    res.json({
      status: "success",
      message: `Adopción ${aid} eliminada`,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};
