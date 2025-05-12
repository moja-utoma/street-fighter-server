const responseMiddleware = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  const result = res.data;
  const error = res.err;

  if (error) {
    const status = error.status || 400;
    return res.status(status).json({
      error: true,
      message: error.message || "Request processing error",
    });
  }

  if (!result) {
    return res.status(404).json({
      error: true,
      message: "Data not found",
    });
  }

  return res.status(200).json(result);
};

export { responseMiddleware };
