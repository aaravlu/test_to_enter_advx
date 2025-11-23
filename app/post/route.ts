import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data_store";
import { AdvxData } from "@/types/advx";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { github_id, ...fields } = body;

    if (!github_id) {
      return NextResponse.json(
        { error: "github_id is required" },
        { status: 400 },
      );
    }

    const existingData = dataStore.get(github_id) || {};
    const mergedData = { ...existingData, github_id, ...fields };

    dataStore.set(github_id, mergedData as AdvxData);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
