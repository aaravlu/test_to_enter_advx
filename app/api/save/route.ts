import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdvxApplicationData } from "../../advx_application_form";

export async function POST(req: NextRequest) {
  try {
    const data: AdvxApplicationData = await req.json();

    // 创建表如果不存在
    await db`
      CREATE TABLE IF NOT EXISTS advx_applications (
        id SERIAL PRIMARY KEY,
        github_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        age INTEGER,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Upsert 数据
    await db`
      INSERT INTO advx_applications (github_id, name, email, age)
      VALUES (${data.github_id}, ${data.name}, ${data.email}, ${data.age})
      ON CONFLICT (github_id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        age = EXCLUDED.age,
        updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving all data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
