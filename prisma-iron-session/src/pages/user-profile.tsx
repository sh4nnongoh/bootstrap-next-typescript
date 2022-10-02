/* eslint-disable no-console */
import { UserEvent } from "@prisma/client";
import { isEmpty } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC, FormEvent, ReactNode, useState
} from "react";
import { USER_SECRET } from "../config";
import { withSessionSsr } from "../utils/withIronSession";
const Layout: FC<{children: ReactNode}> = ({ children }) => (
  <div className="flex flex-col w-screen items-center p-10">
    {children}
  </div>
);
const UserProfile: NextPage<{
  user: UserEvent | null
}> = (props) => {
  const { user } = props;
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`);
    query.searchParams.append("email", `${userEmail}`);
    query.searchParams.append("password", `${USER_SECRET}`);
    fetch(query, { method: "POST" })
      .then((result) => (result.json()))
      .then((result) => {
        console.log(result);
        router.reload();
      })
      .catch((error) => console.error(error));
  };
  const handleLogout = () => {
    const query = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/logout`);
    fetch(query, { method: "POST" })
      .then((result) => (result.json()))
      .then((result) => {
        console.log(result);
        router.reload();
      })
      .catch((error) => console.error(error));
  };
  if (isEmpty(user)) {
    return (
      <Layout>
        Login to view your profile
        <form className="flex flex-col w-full h-32 justify-evenly items-center" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block">
            <input
              id="email"
              type="email"
              placeholder="Enter your email..."
              className="w-[300px] px-3 py-2 border"
              onChange={handleInput}
            />
          </label>
          <button type="submit" className="border rounded px-2">Submit</button>
        </form>
      </Layout>
    );
  }
  const {
    id, userId, createdAt, email, name, isActive, isAdmin
  } = user;
  return (
    <Layout>
      <div className="p-10 font-bold">
        Welcome
        {" "}
        {name}
        ! View your details below.
      </div>
      <div className="grid grid-cols-2 m-10">
        <div>id:</div>
        <div>{id}</div>
        <div>userId:</div>
        <div>{userId}</div>
        <div>createdAt:</div>
        <div>{String(createdAt)}</div>
        <div>email:</div>
        <div>{email}</div>
        <div>name:</div>
        <div>{name}</div>
        <div>isActive:</div>
        <div>{isActive ? "True" : "False"}</div>
        <div>isAdmin:</div>
        <div>{isAdmin ? "True" : "False"}</div>
      </div>
      <button type="button" className="border rounded px-2" onClick={handleLogout}>Logout</button>
    </Layout>
  );
};
export const getServerSideProps = withSessionSsr(({ req }) => {
  const { user = null } = req.session;
  return {
    props: {
      user
    }
  };
});
export default UserProfile;
