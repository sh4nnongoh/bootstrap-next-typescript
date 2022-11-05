import { PrismaClient, UserEvent } from "@prisma/client";
import { isEmpty } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withIronSession";
type Data = {
  message?: string
  data?: Record<string, UserEvent>
}
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { user: currentUser } = req.session;
  if ((req.method !== "POST" && req.method !== "GET") || !currentUser?.isAdmin) {
    res.status(500).json({ message: "Invalid User request." });
    return;
  }
  const prisma = new PrismaClient();
  switch (req.method) {
    case "POST": {
      const { user } = req.body || {};
      if (isEmpty(user)) {
        res.status(500).json({ message: "Invalid User request." });
        break;
      }
      const { email } = user;
      const existingUser = await prisma.userEvent.findFirst({
        where: {
          email: {
            equals: email
          }
        }
      });
      const updatedUser = isEmpty(existingUser) ? user : { ...user, userId: existingUser.userId };
      const createResult = await prisma.userEvent.create({ data: updatedUser });
      if (createResult) {
        res.status(200).json({ message: `Created ${updatedUser.name}.` });
        break;
      }
      res.status(500).json({ message: `Failed to create ${updatedUser.name}.` });
      break;
    }
    case "GET":
    default: {
      const result = await prisma.userEvent.findMany({
        orderBy: {
          createdAt: "asc"
        }
      });
      const latestUsers = result.reduce((acc, user) => ({
        ...acc,
        [user.userId]: user
      }), {});
      res.status(200).json({ data: latestUsers });
    }
  }
};
export default withSessionRoute(handler);
