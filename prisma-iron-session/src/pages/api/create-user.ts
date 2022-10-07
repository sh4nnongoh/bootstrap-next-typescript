import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../utils/withIronSession";
type Data = {
  message: string
}
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { user: currentUser } = req.session;
  const { user } = req.body;
  if (req.method !== "POST" || !currentUser?.isAdmin || !user) {
    res.status(500).json({ message: "Invalid Create User request." });
    return;
  }
  const prisma = new PrismaClient();
  const result = await prisma.userEvent.create({ data: user });
  if (result) {
    res.status(200).json({ message: `Created ${user.name}.` });
    return;
  }
  res.status(500).json({ message: `Failed to create ${user.name}.` });
};
export default withSessionRoute(handler);
