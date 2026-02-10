"use client";

import { motion } from "framer-motion";

const floatingItems = [
  { emoji: "❤️", top: "20%", left: "15%" },
  { emoji: "🤍", top: "30%", left: "70%" },
  { emoji: "🌸", top: "45%", left: "40%" },
  { emoji: "❤️", top: "60%", left: "20%" },
  { emoji: "🤍", top: "65%", left: "80%" },
  { emoji: "🌸", top: "15%", left: "55%" },
  { emoji: "❤️", top: "75%", left: "50%" },
  { emoji: "❤️", top: "20%", left: "15%" },
  { emoji: "🤍", top: "30%", left: "70%" },
  { emoji: "🌸", top: "45%", left: "40%" },
  { emoji: "❤️", top: "60%", left: "20%" },
  { emoji: "🤍", top: "65%", left: "80%" },
  { emoji: "🌸", top: "15%", left: "55%" },
  { emoji: "❤️", top: "75%", left: "50%" },
];

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/backgrounds/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Flou + voile léger */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      {/* Navigation horizontale */}
      <nav className="relative z-10 flex justify-center gap-10 pt-10 text-lg text-white font-light flex-wrap">
        <button
          onClick={() => (window.location.href = "/letters")}
          className="hover:scale-110 transition"
        >
          💌 Letters
        </button>

        <button
          onClick={() => (window.location.href = "/verses")}
          className="hover:scale-110 transition"
        >
          📖 Verses
        </button>

        <button
          onClick={() => (window.location.href = "/music")}
          className="hover:scale-110 transition"
        >
          🎶 Music
        </button>

        <button
          onClick={() => (window.location.href = "/gallery")}
          className="hover:scale-110 transition"
        >
          🖼️ Gallery
        </button>

        <button
          onClick={() => (window.location.href = "/time")}
          className="hover:scale-110 transition"
        >
          ⏳ Time
        </button>
      </nav>

      {/* Éléments flottants */}
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl pointer-events-none"
          style={{ top: item.top, left: item.left }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{
            duration: 2,
            delay: index * 0.4,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Texte émotionnel centré en bas */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="absolute bottom-16 w-full flex justify-center z-10 px-6"
      >
        <p className="text-center text-2xl sm:text-3xl font-light text-white leading-relaxed drop-shadow-lg max-w-3xl">
          Welcome, my sweet, to your safe place. <br />
          A quiet world where my love surrounds you, <br />
          now, forever, and always.
        </p>
      </motion.div>
    </main>
  );
}
