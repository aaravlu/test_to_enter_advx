import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

async function exists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

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
    const filePath = path.join("/tmp", `${github_id}.json`);

    let existingData = {};

    if (await exists(filePath)) {
      existingData = JSON.parse(await fs.readFile(filePath, "utf-8"));
    }

    const mergedData = { ...existingData, github_id, ...fields };

    await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
