"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useRequest from "src/hooks/useReques";


export default function SignOut() {
  const router = useRouter();
  const { sendRequest } = useRequest({
    url: "/api/users/sign-out",
    method: "post",
    body: {},
    onSuccess: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return <div style={{ textAlign: "center" }}>Signing you out...!</div>;
}
