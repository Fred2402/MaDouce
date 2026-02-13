"use client";

import Link from "next/link";

const videos = [
  {
    title: "Wizkid – Final",
    embed: "https://www.youtube.com/embed/srwAd1iR5qI",
  },
  {
    title: "Wizkid – CARO",
    embed: "https://www.youtube.com/embed/L0fsgy-VyC0",
  },
  {
    title: "Lana Del Rey – Young and Beautiful",
    embed: "https://www.youtube.com/embed/o_1aF54DO60",
  },
  {
    title: "Wallows – Are You Bored Yet?",
    embed: "https://www.youtube.com/embed/wIgmyE5Juzw",
  },
  {
    title: "R5 – My Heart Made Up On You",
    embed: "https://www.youtube.com/embed/jO1kDZzDpgw",
  },
  {
    title: "Humbe – Fantasma",
    embed: "https://www.youtube.com/embed/e2c8NkNY41U",
  },
  {
    title: "RM & Aeon – Don’t",
    embed: "https://www.youtube.com/embed/8Sd2n3Q5TnY",
  },
  {
    title: "BTS – The Truth Untold",
    embed: "https://www.youtube.com/embed/ITc-om9SVr4",
  },
  {
    title: "The Neighbourhood – Reflection",
    embed: "https://www.youtube.com/embed/lP_xjVxCqU0",
  },
  {
    title: "The Neighbourhood – Nervous",
    embed: "https://www.youtube.com/embed/XTDH7gSqwiQ",
  },
];

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-pink-50 text-center py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="text-left mb-10">
          <Link
            href="/home"
            className="text-pink-600 hover:text-pink-800 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-light text-pink-600 mb-12">
          Our Soundtrack 🤍
        </h1>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-md"
            >
              <h2 className="text-lg mb-4 text-gray-700">
                {video.title}
              </h2>

              <div className="aspect-video">
                <iframe
                  src={video.embed}
                  title={video.title}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Poetic Section */}
        <div className="mt-20 max-w-2xl mx-auto text-gray-600">
          <p className="text-xl font-light leading-relaxed mb-6">
            Music says the things we sometimes don’t know how to say.
            <br />
            So let’s share our worlds through melodies.
            <br />
            Let me discover your songs,
            <br />
            and discover a little more of you.
          </p>

          <a
            href="https://music.apple.com/fr/playlist/partage-moi-tes-bons-go%C3%BBt/pl.u-76oNkmpuv5x2aML?a=join&it=QoG8k9ztQgNlrbAfz9Xb4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
          >
            Share your music with me 🎶
          </a>
        </div>
      </div>
    </main>
  );
}
