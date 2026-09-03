import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// TODO (Step 4): POST /api/register — create a new user account.
// Expected body: { name: string, email: string, password: string }
//
// 1. Parse the body. If name, email, or password is missing, return 400.
// 2. If password.length < 8, return 400 with a helpful message.
// 3. Check if a user with this email already exists
//    (prisma.user.findUnique({ where: { email } })). If so, return 409.
// 4. Hash the password: await bcrypt.hash(password, 10)
//    NEVER store the plain-text password.
// 5. Create the user: prisma.user.create({ data: { name, email, password: hashedPassword } })
// 6. Return only safe fields (id, name, email) with status 201 —
//    never send the password hash back to the client.
export async function POST(request: Request) {
  return NextResponse.json(
    { message: "TODO: implement POST /api/register" },
    { status: 501 }
  );
}
