// Check if there is a valid API token in the request or throw an error
export function verifyCollectivoApiToken(event: any) {
  const headers = getHeaders(event);

  if (!Object.hasOwn(headers, "authorization")) {
    throw createError({
      statusCode: 401,
      statusMessage: "No token provided",
    });
  }

  const token = headers["authorization"]?.replace("Bearer ", "");

  if (token !== useRuntimeConfig().apiToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }
}
