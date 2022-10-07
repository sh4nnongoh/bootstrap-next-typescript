/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { USER_SECRET } from "../../../../config";
import { ADMIN, APP_URL } from "../../constants";
const getAdminCookie = () => request(APP_URL)
  .post("/api/login")
  .query({ email: ADMIN.email, password: USER_SECRET })
  .then((response) => Promise.resolve([response.header["set-cookie"][0]]));
export default getAdminCookie;
