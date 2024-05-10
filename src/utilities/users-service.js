import debug from "debug";
import * as userAPI from "./users-api";

const log = debug("mern:utilities:user-service");

export const signUp = async (userData) => {
  log("formData: %o", userData);

  const token = await userAPI.signUp(userData);
  log("token: %o", token);

  return token;
};
