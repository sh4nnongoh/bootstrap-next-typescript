import { UserEvent } from './schema';
declare module 'iron-session' {
  interface IronSessionData {
    user?: UserEvent;
  }
}
