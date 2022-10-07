/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import getAdminCookie from "./getAdminCookie";
import setDestroyIronSession from "./setDestroyIronSession";
const withAdminSession = async (
  adminRequest: request.Test
) => {
  const cookie = await getAdminCookie();
  await adminRequest.set("Cookie", cookie);
  const result = await Promise.all([adminRequest.set("Cookie", cookie), setDestroyIronSession(cookie)]);
  return result[0];
};
export default withAdminSession;
