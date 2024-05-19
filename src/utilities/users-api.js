import debug from "debug";
import usersRequest from "../utilities/users-request";

const log = debug("mern:utilities:users-api"); // eslint-disable-line no-unused-vars
const BASE_URL = "/api/users";

// Refactored code below
export function signUp(userData) {
  return usersRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return usersRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return usersRequest(`${BASE_URL}/check-token`);
}

export function update(payload) {
  return usersRequest(`${BASE_URL}/update`, "PUT", payload);
}
