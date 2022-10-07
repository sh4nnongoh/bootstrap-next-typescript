import { ADMIN, PRISMA, USER_ACTIVE } from "../constants";
const setInitialDbState = () => PRISMA.userEvent.deleteMany()
  .then(() => Promise.all([
    PRISMA.userEvent.create({
      data: ADMIN
    }),
    PRISMA.userEvent.create({
      data: USER_ACTIVE
    })]))
  .then(() => PRISMA.userEvent.findMany())
  .then((result) => {
    expect(result.length).toEqual(2);
  })
  .catch((error) => { throw new Error(error); });
export default setInitialDbState;
