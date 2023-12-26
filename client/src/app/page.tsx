import axios from "axios";

async function getData() {
  const res = await axios("/api/users/current-user");
  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
