/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { USER_SECRET } from "../../../../config";
import { APP_URL, USER_ACTIVE } from "../../constants";
const getNonAdminCookie = () => request(APP_URL)
  .post("/api/login")
  .query({ email: USER_ACTIVE.email, password: USER_SECRET })
  .then((response) => Promise.resolve([response.header["set-cookie"][0]]));
export default getNonAdminCookie;
