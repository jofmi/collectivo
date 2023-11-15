export function parseBoolean(value: any, defaultValue?: boolean) {
  if (value === "true" || value === true) {
    return true;
  }
  if (value === "false" || value === false) {
    return false;
  }
  if (
    !defaultValue &&
    (value === "" || value === undefined || value === null)
  ) {
    return defaultValue;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "Invalid parameter value '" + value + "'",
  });
}
