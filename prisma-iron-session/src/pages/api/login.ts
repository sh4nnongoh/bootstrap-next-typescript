import type { NextApiRequest, NextApiResponse } from 'next';
import { UserEvent } from '@/types/schema';
import { USER_EVENT_READ, USER_SECRET } from '../../constants';
import { withSessionRoute } from '../../lib/withIronSession';
type Data = {
  message: string
};
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { email, password } = req.body;
  if (req.method !== 'POST' || !email || password !== USER_SECRET) {
    res.status(500).json({ message: 'Invalid login request.' });
    return;
  }
  const currentUser = (
    await USER_EVENT_READ
      .where('email', '=', email)
      .selectAll()
      .orderBy('createdAt', 'desc')
      .executeTakeFirst() || {}
  ) as UserEvent;
  if (!currentUser || !currentUser.isActive) {
    res.status(404).json({ message: 'No such user.' });
    return;
  }
  req.session.user = currentUser;
  await req.session.save();
  res.status(200).json({ message: `Logged in as ${currentUser.name}` });
};
export default withSessionRoute(handler);
