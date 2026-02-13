"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ---------------- TIME ---------------- */
function getTimeDiff(startDate: Date) {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function TimePage() {
  const startDate = new Date("2025-12-24T00:00:00");
  const [time, setTime] = useState(getTimeDiff(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDiff(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      <div className="relative z-10 px-6 py-20 flex flex-col items-center gap-16">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl font-light text-center"
        >
          Forever & Always
        </motion.h1>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white/15 backdrop-blur-md p-8 rounded-3xl"
        >
          {Object.entries(time).map(([k, v]) => (
            <div key={k} className="text-center">
              <p className="text-3xl font-semibold">{v}</p>
              <p className="opacity-80 capitalize">{k}</p>
            </div>
          ))}
        </motion.div>

        {/* Wishlist poetic section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-2xl text-center bg-white/20 backdrop-blur-md rounded-3xl p-10"
        >
         <p className="text-xl font-light leading-relaxed mb-8">
            This little space is ours.  
            <br />
            A place to write our dreams, our wishes,  
            <br />
            the things we want to do, to feel, to live — together.  
            <br />
            Big or small, serious or silly,  
            <br />
            everything that matters to us belongs here.  
            <br />
            Let’s keep building memories, one dream at a time 🤍
          </p>

          <a
            href="https://www.icloud.com/notes/03avQfj7ntDwQ9TGe1-wWFHsA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-pink-500/80 hover:bg-pink-500 transition text-white font-light"
          >
            Open our wishlist ✨
          </a>
        </motion.div>

        {/* Back */}
        <button
          onClick={() => (window.location.href = "/home")}
          className="text-white/80 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}
