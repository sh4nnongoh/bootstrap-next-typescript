/* eslint-disable no-console */
import type { NextPage } from "next";
import { useState, ChangeEvent, FormEvent } from "react";
import { withSessionSsr } from "../utils/withIronSession";
const CreateUser: NextPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/create-user`);
    query.searchParams.append("user", JSON.stringify({
      email: userEmail,
      name: userEmail.split("@")[0],
      isActive: true,
      isAdmin: false
    }));
    fetch(query, { method: "POST" })
      .then((result) => (result.json()))
      .then((result) => console.log(result))
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
