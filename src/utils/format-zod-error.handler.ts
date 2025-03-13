export const formatZodErrors = (error: any) => {
  return error.errors.map((err: any) => ({
    path: err.path.join("."),
    message: err.message,
  }));
};
