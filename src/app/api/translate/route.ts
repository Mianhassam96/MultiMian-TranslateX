import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const from = (formData.get("from") as string) || "auto";
  const to = formData.get("to") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const text = await file.text();

  try {
    // Call LibreTranslate API
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text",
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      translatedText: data.translatedText,
      fileName: file.name,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
