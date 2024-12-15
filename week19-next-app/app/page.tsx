import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-lg w-screen h-screen flex items-center justify-center">
      <div>
        TODO APPLICATION
        <br></br>
        <Link className="text-md border m-2" href="/signin">
          Sign in to TODO app
        </Link>
        <br></br>
        <Link className="text-md border m-2" href="/signin">
          Sign up to TODO app
        </Link>
      </div>
    </div>
  );
}
