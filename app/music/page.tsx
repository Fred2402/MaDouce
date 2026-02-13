"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const videos = [
  {
    title: "Wizkid – Final",
    embedUrl: "https://www.youtube.com/embed/srwAd1iR5qI",
  },
  {
    title: "Wizkid – CARO",
    embedUrl: "https://www.youtube.com/embed/L0fsgy-VyC0",
  },
  {
    title: "R5 – My Heart Made Up On You",
    embedUrl: "https://www.youtube.com/embed/jO1kDZzDpgw",
  },
  {
    title: "Humbe – Fantasma",
    embedUrl: "https://www.youtube.com/embed/e2c8NkNY41U",
  },
  {
    title: "RM & Aeon – Don’t",
    embedUrl: "https://www.youtube.com/embed/oVPYa7QCmRg",
  },
  {
    title: "BTS – The Truth Untold",
    embedUrl: "https://www.youtube.com/embed/ITc-om9SVr4",
  },
  {
    title: "The Neighbourhood – Reflection",
    embedUrl: "https://www.youtube.com/embed/x47TgeRJtH0",
  },
  {
    title: "The Neighbourhood – Nervous",
    embedUrl: "https://www.youtube.com/embed/XTDH7gSqwiQ",
  },
];

export default function MusicPage() {
  const router = useRouter();

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
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20" />

      {/* Bouton retour */}
      <div className="relative z-10 pt-6 px-6">
        <button
          onClick={() => router.push("/home")}
          className="text-white/80 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-light text-center mb-12">
          Our Music
        </h1>

        {/* Vidéos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/15 backdrop-blur-md rounded-3xl p-4 shadow-lg"
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-center text-lg font-light">
                {video.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 💖 SECTION POÉTIQUE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto text-center bg-white/15 backdrop-blur-md rounded-3xl p-10"
        >
          <p className="text-xl font-light leading-relaxed mb-8">
            Music has a way of saying what words sometimes can’t.  
            <br />
            I’d love to discover your world through the songs you love,  
            <br />
            the melodies that comfort you, inspire you, or make you smile.  
            <br />
            Share your favorite sounds with me,  
            <br />
            and let’s let our hearts listen together 🤍
          </p>

          <a
            href="https://music.apple.com/fr/playlist/partage-moi-tes-bons-go%C3%BBt/pl.u-76oNkmpuv5x2aML?a=join&it=QoG8k9ztQgNlrbAfz9Xb4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-pink-500/80 hover:bg-pink-500 transition text-white font-light"
          >
            Share your music with me 🎧
          </a>
        </motion.div>
      </div>
    </main>
  );
}
