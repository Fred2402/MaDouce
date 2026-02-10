"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Verse = {
  id: number;
  text: string;
  reference: string;
  note: string;
};

const DEFAULT_VERSES: Verse[] = [
  {
    id: 1,
    reference: "Luke 12:22",
    text:
      "Then Jesus said to his disciples: “Therefore I tell you, do not worry about your life, what you will eat; or about your body, what you will wear.”",
    note: "",
  },
  {
    id: 2,
    reference: "Luke 22:31–32",
    text:
      "Simon, Simon, Satan has asked to sift all of you as wheat. But I have prayed for you, Simon, that your faith may not fail. And when you have turned back, strengthen your brothers.",
    note: "",
  },
];

export default function VersesPage() {
  const router = useRouter();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [text, setText] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");

  /* Charger depuis le localStorage ou valeurs par défaut */
  useEffect(() => {
    const saved = localStorage.getItem("verses");
    if (saved) {
      setVerses(JSON.parse(saved));
    } else {
      setVerses(DEFAULT_VERSES);
      localStorage.setItem("verses", JSON.stringify(DEFAULT_VERSES));
    }
  }, []);

  /* Sauvegarder */
  useEffect(() => {
    localStorage.setItem("verses", JSON.stringify(verses));
  }, [verses]);

  const addVerse = () => {
    if (!text || !reference) return;

    setVerses([
      ...verses,
      {
        id: Date.now(),
        text,
        reference,
        note,
      },
    ]);

    setText("");
    setReference("");
    setNote("");
  };

  const deleteVerse = (id: number) => {
    setVerses(verses.filter((v) => v.id !== id));
  };

  return (
    <main
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: "url('/backgrounds/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Flou */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

      {/* Back */}
      <div className="relative z-10 pt-6 px-6">
        <button
          onClick={() => router.push("/home")}
          className="text-white/80 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light text-center mb-10"
        >
          📖 Your Verses
        </motion.h1>

        {/* Formulaire */}
        <div className="bg-white/90 text-gray-800 rounded-3xl p-6 shadow-lg mb-10">
          <input
            placeholder="Verse text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl border"
          />

          <input
            placeholder="Reference (example: Luke 12:22)"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl border"
          />

          <textarea
            placeholder="Personal note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl border"
          />

          <button
            onClick={addVerse}
            className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
          >
            ➕ Add Verse
          </button>
        </div>

        {/* Liste des versets */}
        <div className="space-y-6">
          {verses.map((verse) => (
            <motion.div
              key={verse.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/85 text-gray-800 rounded-3xl p-6 shadow"
            >
              <p className="italic mb-2">“{verse.text}”</p>
              <p className="font-semibold mb-2">{verse.reference}</p>

              {verse.note && (
                <p className="text-sm text-gray-600 mb-4">
                  {verse.note}
                </p>
              )}

              <button
                onClick={() => deleteVerse(verse.id)}
                className="text-sm text-pink-500 hover:underline"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
