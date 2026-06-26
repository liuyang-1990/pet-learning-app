import { NextResponse } from "next/server";

import { getHouseholdSpace, saveHouseholdSpace } from "@/server/database";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ household: getHouseholdSpace() });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ household: saveHouseholdSpace(body.household) });
}
