import { USER } from "../models/user.js";
import { validateAllowedFields } from "../utils/validators.js";

const validateFieldsValue = (fields, method) => {
  if (method === "post") {
    const { firstName, lastName, email, phone, password } = fields;
    if (!firstName || !lastName || !email || !phone || !password) {
      return { error: true, message: "Missing required fields" };
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (fields.email && !emailRegex.test(fields.email)) {
    return {
      error: true,
      message: "Invalid email format. Only Gmail allowed.",
    };
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (fields.phone && !phoneRegex.test(fields.phone)) {
    return { error: true, message: "Invalid phone format. Use +380xxxxxxxxx." };
  }

  if (fields.password && password.length < 4) {
    return {
      error: true,
      message: "Password must be at least 4 characters long.",
    };
  }

  return;
};

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const validationValuesResult = validateFieldsValue(
    {
      firstName,
      lastName,
      email,
      phone,
      password,
    },
    "post"
  );
  if (validationValuesResult && validationValuesResult.error === true) {
    return res.status(400).json(validationValuesResult);
  }

  const allowedFields = ["firstName", "lastName", "email", "phone", "password"];
  const validationFieldsResult = validateAllowedFields(allowedFields, req.body);
  if (validationFieldsResult && validationFieldsResult.error === true) {
    return res.status(400).json(validationFieldsResult);
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const allowedFields = ["firstName", "lastName", "email", "phone", "password"];

  if (!Object.keys(req.body).some((key) => allowedFields.includes(key))) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided to update.",
    });
  }

  const validationValuesResult = validateFieldsValue(req.body, "patch");
  if (validationValuesResult && validationValuesResult.error === true) {
    return res.status(400).json(validationValuesResult);
  }

  const validationFieldsResult = validateAllowedFields(allowedFields, req.body);
  if (validationFieldsResult && validationFieldsResult.error === true) {
    return res.status(400).json(validationFieldsResult);
  }

  next();
};

export { createUserValid, updateUserValid };
