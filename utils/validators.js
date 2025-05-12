const validateAllowedFields = (allowedFields, body) => {
  const invalidFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return {
      error: true,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    };
  }
  return null;
};

export { validateAllowedFields };
