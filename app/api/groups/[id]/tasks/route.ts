import { NextResponse } from "next/server";
// TODO (Step 14): import { getServerSession } from "next-auth";
// TODO (Step 14): import { authOptions } from "@/lib/auth";
import { getGroupById, createTask } from "@/lib/data";

// GET /api/groups/:id/tasks — list a group's tasks. Stays PUBLIC.
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const group = await getGroupById(params.id);

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  return NextResponse.json(group.tasks);
}

// TODO (Step 14): POST /api/groups/:id/tasks — add a task to a group.
// Requires authentication AND ownership of the PARENT GROUP (not the task —
// tasks don't have their own owner field, so we check via their group).
// Follow the same 3-check pattern as PATCH /api/groups/:id in the previous file.
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const group = await getGroupById(params.id);
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const body = await request.json();

  if (!body.title) {
    return NextResponse.json(
      { error: "'title' is required" },
      { status: 400 }
    );
  }

  const newTask = await createTask(params.id, body.title);
  return NextResponse.json(newTask, { status: 201 });
}
