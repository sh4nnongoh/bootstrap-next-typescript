/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { APP_URL } from "../../constants";
const setDestroyIronSession = (cookie: string[]) => request(APP_URL)
  .post("/api/logout")
  .set("Cookie", cookie);
export default setDestroyIronSession;
