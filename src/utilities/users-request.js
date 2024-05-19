import { getToken } from "../utilities/users-service";
import debug from "debug";

const log = debug("mern:utilities:send-request");

export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  log("Retrieved token:", token);
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
    log("Authorization header set:", options.headers.Authorization);
  }

  const res = await fetch(url, options);
  if (res.ok) return res.json();
  const error = await res.json();
  throw new Error(error.message || "Bad Request");
}
