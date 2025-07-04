import Link from "next/link";
export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-4xl">
      <div>
        TODO APPLICATION
        <br />
        <Link className="text-md border m-2" href="/signin">
          Sign in to Todo App
        </Link>
        <br />
        <Link className="text-md border m-2" href="/signup">
          Sign up to Todo App
        </Link>
      </div>
    </div>
  );
}
