import debug from "debug";
import sendRequest from "./users-request";

const log = debug("mern:utilities:users-api"); // eslint-disable-line no-unused-vars
// Add the following import
const BASE_URL = "/api/users";

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
