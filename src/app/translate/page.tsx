"use client";

import { useState } from "react";
import "./translate.scss";

export default function TextTranslatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("ur");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: input,
        source: from,
        target: to,
      }),
    });

    const data = await res.json();
    setOutput(data.translatedText || "");
    setLoading(false);
  };

  return (
    <main className="text-translate">
      <header className="page-header">
        <h1>Text Translator</h1>
        <p>Translate text instantly with AI precision</p>
      </header>

      <div className="translator-card">
        <div className="language-bar">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>

          <button
            className="swap"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            ⇄
          </button>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="ur">Urdu</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="text-area">
          <textarea
            placeholder="Type text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <textarea
            placeholder="Translation will appear here..."
            value={output}
            readOnly
          />
        </div>

        <button className="translate-btn" onClick={translateText} disabled={loading}>
          {loading ? "Translating…" : "Translate"}
        </button>
      </div>
    </main>
  );
}
