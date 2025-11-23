import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

    const filePath = path.join(process.cwd(), "/tmp", `${github_id}.json`);

    let existingData = {};
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading existing file:", error);
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
