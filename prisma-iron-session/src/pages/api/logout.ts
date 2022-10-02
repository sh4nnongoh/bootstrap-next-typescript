import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../utils/withIronSession";
type Data = {
  message: string
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { user } = req.session;
  if (req.method !== "POST" || !user) {
    res.status(500).json({ message: "Invalid logout request." });
    return;
  }
  req.session.destroy();
  res.status(200).json({ message: `Logged out ${user.name}` });
};
export default withSessionRoute(handler);
