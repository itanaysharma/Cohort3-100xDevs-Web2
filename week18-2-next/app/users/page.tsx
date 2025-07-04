import axios from "axios";
export default async function User() {
  const response = await axios.get<{ name: string; email: string }>(
    "http://localhost:3000/api/v1/user/details"
  );
  await new Promise((r) => setTimeout(r, 1000)); // You can set delay by this
  const data = response.data;
  console.log("hi");
  return (
    <div>
      User page <br />
      {data.name}
      <br />
      {data.email}
    </div>
  );
}
