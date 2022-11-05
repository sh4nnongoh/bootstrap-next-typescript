/* eslint-disable no-console */
import { UserEvent } from "@prisma/client";
import { isEmpty } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  useState, ChangeEvent, FormEvent, useEffect
} from "react";
import { withSessionSsr } from "../lib/withIronSession";
const CreateUser: NextPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState<Record<string, UserEvent>>({});
  console.log(users);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
      method: "GET"
    })
      .then((result) => (result.json()))
      .then(({ data }) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`);
    fetch(query, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: userEmail,
          name: userEmail.split("@")[0],
          isActive: true,
          isAdmin: false
        }
      }),
      headers: { "content-type": "application/json" }
    })
      .then((result) => (result.json()))
      .then((result) => {
        console.log(result);
        router.reload();
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col w-screen items-center p-10">
      Create a User by entering their email below.
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
      {!isEmpty(users) && (
      <div>
        Existing Users
        {Object.values(users).map(({
          id, userId, createdAt, email, name, isActive, isAdmin
        }) => (
          <div key={id} className="grid grid-cols-2 m-10">
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
        ))}
      </div>
      )}
    </div>
  );
};
export const getServerSideProps = withSessionSsr(({ req }) => {
  const { user = null } = req.session;
  if (!user?.isAdmin) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      user
    }
  };
});
export default CreateUser;
