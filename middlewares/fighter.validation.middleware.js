import { FIGHTER } from "../models/fighter.js";
import { validateAllowedFields } from "../utils/validators.js";

const validateFighterFieldsValue = (fields, method) => {
  if (method === "post") {
    const { name, power, defense, health } = fields;

    if (!name || !power || !defense) {
      return { error: true, message: "Missing required fields" };
    }
  }

  if (fields.power && (fields.power < 1 || fields.power > 100)) {
    return { error: true, message: "Power must be between 1 and 100" };
  }

  if (fields.defense && (fields.defense < 1 || fields.defense > 10)) {
    return { error: true, message: "Defense must be between 1 and 10" };
  }

  if (fields.health && (fields.health < 80 || fields.health > 120)) {
    return { error: true, message: "Health must be between 80 and 120" };
  }

  return;
};

const createFighterValid = (req, res, next) => {
  const { name, power, defense, health } = req.body;

  const validationValuesResult = validateFighterFieldsValue(
    name,
    power,
    defense,
    health
  );
  if (validationValuesResult && validationValuesResult.error === true) {
    return res.status(400).json(validationValuesResult);
  }

  const allowedFields = ["name", "power", "defense", "health"];
  const validationFieldsResult = validateAllowedFields(allowedFields, req.body);
  if (validationFieldsResult && validationFieldsResult.error === true) {
    return res.status(400).json(validationFieldsResult);
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const allowedFields = ["name", "power", "defense", "health"];

  if (!Object.keys(req.body).some((key) => allowedFields.includes(key))) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided to update.",
    });
  }

  const validationValuesResult = validateFighterFieldsValue(req.body, "patch");
  if (validationValuesResult && validationValuesResult.error === true) {
    return res.status(400).json(validationValuesResult);
  }

  const validationFieldsResult = validateAllowedFields(allowedFields, req.body);
  if (validationFieldsResult && validationFieldsResult.error === true) {
    return res.status(400).json(validationFieldsResult);
  }

  next();
};

export { createFighterValid, updateFighterValid };
