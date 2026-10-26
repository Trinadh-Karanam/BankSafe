
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error("Request failed:", err);

  // If the response has already started, let Express handle it.
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    typeof err.statusCode === "number" &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
      ? err.statusCode
      : 500;

  const message =
    statusCode >= 500
      ? "Internal server error"
      : err.message || "Request failed";

  res.status(statusCode).json({ message });
};
