// for backend we are not returnning any xlm thats why file is ts and it should be route file

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    user: "Tanay",
    email: "tanay@gcom.com",
  });
}
