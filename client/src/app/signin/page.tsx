"use client";
import { useState } from "react";
import useRequest, { UseRequest } from "../../hooks/useReques";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { errors, sendRequest }: UseRequest = useRequest({
    url: "/api/users/sign-in",
    method: "post",
    body: { email, password },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary" type="submit">
       Login
      </button>
    </form>
  );
};

export default SignIn;
