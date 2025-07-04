import axios from "axios";
export default async function User() {
  const response = await axios.get<{ name: string; email: string }>(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );
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
