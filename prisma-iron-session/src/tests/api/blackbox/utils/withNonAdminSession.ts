/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import getNonAdminCookie from "./getNonAdminCookie";
import setDestroyIronSession from "./setDestroyIronSession";
const withNonAdminSession = async (
  nonAdminRequest: request.Test
) => {
  const cookie = await getNonAdminCookie();
  const result = await Promise.all([nonAdminRequest.set("Cookie", cookie), setDestroyIronSession(cookie)]);
  return result[0];
};
export default withNonAdminSession;
