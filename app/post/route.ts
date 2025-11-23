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
      console.log("File exists, pasring data.");
      existingData = JSON.parse(await fs.readFile(filePath, "utf-8"));
    } else {
      console.log("File does not exist, creating new one.");
    }

    const mergedData = { ...existingData, github_id, ...fields };

    try {
      await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2));
    } catch (error) {
      return NextResponse.json({ error: "Fail to save file" }, { status: 500 });
      // console.error("Error when writing:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
