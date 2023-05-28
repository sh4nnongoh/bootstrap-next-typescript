import { UserEvent } from '@/types/schema';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { USER_EVENT_CREATE, USER_EVENT_READ } from '@/config/kysely';
import { createId } from '@paralleldrive/cuid2';
import { withSessionRoute } from '../../lib/withIronSession';
type Data = {
  message?: string
  data?: Record<string, UserEvent>
};
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { user: currentUser } = req.session;
  if ((req.method !== 'POST' && req.method !== 'GET') || !currentUser?.isAdmin) {
    res.status(500).json({ message: 'Invalid User request.' });
    return;
  }
  switch (req.method) {
    case 'POST': {
      const { user } = req.body || {};
      if (isEmpty(user)) {
        res.status(500).json({ message: 'Invalid User request.' });
        break;
      }
      const { email } = user;
      const existingUser = (
        await USER_EVENT_READ
          .selectAll()
          .where('email', '=', email)
          .executeTakeFirst() || {}
      ) as UserEvent;
      const updatedUser = isEmpty(existingUser) ? user : { ...user, id: createId(), userId: existingUser.userId };
      const createResult = await USER_EVENT_CREATE.values(updatedUser).executeTakeFirst();
      if (createResult) {
        res.status(200).json({ message: `Created ${updatedUser.name}.` });
        break;
      }
      res.status(500).json({ message: `Failed to create ${updatedUser.name}.` });
      break;
    }
    case 'GET':
    default: {
      const result = (
        await USER_EVENT_READ
          .selectAll()
          .orderBy('createdAt', 'asc')
          .execute()
      ) as unknown as UserEvent[];
      const latestUsers = result.reduce((acc, user) => ({
        ...acc,
        [user.userId]: user,
      }), {});
      res.status(200).json({ data: latestUsers });
    }
  }
};
export default withSessionRoute(handler);
