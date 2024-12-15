import Image from "next/image";
import axios from "axios";
import Link from "next/link";
async function getUserDetails() {
  try {
    const response = await axios.get("http://localhost:3001/api/user");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="text-lg w-screen h-screen flex items-center justify-center">
      <div>
        TODO APPLICATION
        <div>{userData?.email}</div>
        <br></br>
        <Link className="text-md border m-2" href="/signin">
          Sign in to TODO app
        </Link>
        <br></br>
        <Link className="text-md border m-2" href="/signup">
          Sign up to TODO app
        </Link>
      </div>
    </div>
  );
}
