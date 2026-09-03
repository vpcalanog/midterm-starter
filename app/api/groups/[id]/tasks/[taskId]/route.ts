import { NextResponse } from "next/server";
// TODO (Step 15): import { getServerSession } from "next-auth";
// TODO (Step 15): import { authOptions } from "@/lib/auth";
import { getGroupById, updateTask, deleteTask } from "@/lib/data";

// TODO (Step 15): PATCH /api/groups/:id/tasks/:taskId — update a task.
// Requires authentication AND ownership of the parent group.
// Same 3-check pattern as before: session -> group exists -> group.ownerId matches.
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; taskId: string } }
) {
  const group = await getGroupById(params.id);
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const body = await request.json();
  const updated = await updateTask(params.id, params.taskId, body);

  if (!updated) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// TODO (Step 15): DELETE /api/groups/:id/tasks/:taskId — same pattern as PATCH.
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; taskId: string } }
) {
  const group = await getGroupById(params.id);
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const deleted = await deleteTask(params.id, params.taskId);

  if (!deleted) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted" });
}
