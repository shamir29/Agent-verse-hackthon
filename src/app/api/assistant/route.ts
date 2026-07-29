import { NextRequest, NextResponse } from "next/server";
import { generateAssistantReply } from "@/lib/assistantReply";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const query = message || "Daily operations briefing";

    const textReply = generateAssistantReply(query);

    return NextResponse.json({ text: textReply });
  } catch (error) {
    console.error("AI Assistant API error:", error);
    return NextResponse.json({ text: "AI Operations Copilot is active. How can I assist your dispatch team today?" }, { status: 500 });
  }
}
