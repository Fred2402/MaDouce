"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Photo = {
  src: string;
  comment: string;
};

const PHOTO_COUNT = 12;
const STORAGE_KEY = "gallery-comments";

const DEFAULT_COMMENTS: string[] = [
  "Our very first memory together 🤍",
  "This day still makes me smile.",
  "One of my favorite moments with you.",
  "I love how happy you look here.",
  "A simple moment, but so precious.",
  "This picture means a lot to me.",
  "Forever grateful for this day.",
  "You were glowing here.",
  "One memory I’ll never forget.",
  "Pure happiness, nothing else.",
  "This photo says everything.",
  "Always you, always us.",
];

export default function GalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const initialized = useRef(false);

  /* INIT */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setPhotos(JSON.parse(saved));
    } else {
      const initialPhotos = Array.from(
        { length: PHOTO_COUNT },
        (_, i) => ({
          src: `/img/photo${i + 1}.jpg`,
          comment: DEFAULT_COMMENTS[i] || "",
        })
      );
      setPhotos(initialPhotos);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialPhotos)
      );
    }

    initialized.current = true;
  }, []);

  /* SAVE */
  useEffect(() => {
    if (!initialized.current) return;
    if (photos.length === 0) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(photos)
    );
  }, [photos]);

  const updateComment = (index: number, text: string) => {
    setPhotos((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], comment: text };
      return copy;
    });
  };

  const handleDragEnd = (_: any, info: any) => {
    if (zoomIndex === null) return;

    if (info.offset.x < -120 && zoomIndex < photos.length - 1) {
      setZoomIndex(zoomIndex + 1);
    }
    if (info.offset.x > 120 && zoomIndex > 0) {
      setZoomIndex(zoomIndex - 1);
    }
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
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      {/* Back */}
      <div className="relative z-10 pt-6 px-6">
        <button
          onClick={() => router.push("/home")}
          className="text-white/80 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-light text-center mb-12">
          Our Memories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="bg-white/15 backdrop-blur-md rounded-3xl p-5 shadow-lg"
            >
              {/* Photo */}
              <motion.img
                src={photo.src}
                alt={`Memory ${index + 1}`}
                onClick={() => setZoomIndex(index)}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer rounded-2xl w-full h-56 object-cover mb-4"
              />

              {/* Label */}
              <p className="text-sm text-white/80 mb-2">
                Your memory for this photo
              </p>

              {/* Commentaire VISIBLE */}
              <textarea
                value={photo.comment}
                onChange={(e) =>
                  updateComment(index, e.target.value)
                }
                className="
                  w-full h-24
                  rounded-2xl
                  p-4
                  bg-white
                  text-gray-900
                  resize-none
                  outline-none
                  border border-gray-300
                  focus:ring-2 focus:ring-pink-300
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Zoom */}
      {zoomIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <motion.img
            key={photos[zoomIndex].src}
            src={photos[zoomIndex].src}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="max-w-[90%] max-h-[90%] rounded-3xl cursor-grab"
          />

          <button
            onClick={() => setZoomIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition"
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
}
