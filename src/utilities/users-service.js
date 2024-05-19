import debug from "debug";
import * as userAPI from "./users-api";
// import usersRequest from "../utilities/users-request";

const log = debug("mern:utilities:user-service");

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export const signUp = async (userData) => {
  log("formData: %o", userData);
  const token = await userAPI.signUp(userData);
  log("token: %o", token);
  localStorage.setItem("token", token);
  return getUser();
};

export const login = async (userData) => {
  log("running formData: %o", userData);
  const token = await userAPI.login(userData);
  log("token: %o", token);
  localStorage.setItem("token", token);
  return getUser();
};

export function logOut() {
  localStorage.removeItem("token");
}

export const checkToken = async () => {
  const dateStr = await userAPI.checkToken();
  return new Date(dateStr);
};

// Example function using sendRequest for authenticated requests
export const updateStudent = async (updateData) => {
  const res = await userAPI.update(updateData);
  log(res);
  return res.data;
};
