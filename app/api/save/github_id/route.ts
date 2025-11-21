import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const github_id = await req.text();

    // 创建表如果不存在
    await db`
      CREATE TABLE IF NOT EXISTS advx_applications (
        id SERIAL PRIMARY KEY,
        github_id VARCHAR(255),
        name VARCHAR(255),
        email VARCHAR(255),
        age INTEGER,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 假设更新 id=1 的记录（临时方案）
    await db`
      UPDATE advx_applications
      SET github_id = ${github_id}, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving github_id:", error);
    return NextResponse.json(
      { error: "Failed to save github_id" },
      { status: 500 },
    );
  }
}
