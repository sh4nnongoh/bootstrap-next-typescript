import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { USER_SECRET } from "../../config";
import { withSessionRoute } from "../../lib/withIronSession";
type Data = {
  message: string
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, password } = req.body;
  if (req.method !== "POST" || !email || password !== USER_SECRET) {
    res.status(500).json({ message: "Invalid login request." });
    return;
  }
  const prisma = new PrismaClient();
  const currentUser = await prisma.userEvent.findFirst({
    where: {
      email: {
        equals: email as string
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  if (!currentUser || !currentUser.isActive) {
    res.status(404).json({ message: "No such user." });
    return;
  }
  req.session.user = currentUser;
  await req.session.save();
  res.status(200).json({ message: `Logged in as ${currentUser.name}` });
};
export default withSessionRoute(handler);
