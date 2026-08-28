"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 👉 Colle ici la clé reçue sur https://web3forms.com (gratuit, 30 secondes)
const WEB3FORMS_ACCESS_KEY = "e9df262c-27c9-40be-96de-eaf7b700ef89";

async function sendGiftEmail(subject: string, message: string) {
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        message,
        from_name: "Ma Douce 🎁",
      }),
    });
    return true;
  } catch {
    return false;
  }
}

const LETTER_PARAGRAPHS = [
  "Avant d'ouvrir quoi que ce soit, j'ai besoin de te dire quelque chose, vraiment.",
  "Tu es devenue bien plus qu'une personne que j'aime. Tu es ma star, celle vers qui je lève les yeux même dans mes jours les plus flous. Et tu es aussi mon refuge, l'endroit où je pose les armes et où je respire enfin.",
  "Je ne vais pas te mentir : je ne maîtrise pas encore tout ce que je ressens. Mais chaque jour j'y vois un peu plus clair, et ce que je découvre me plaît énormément. Tu comptes énormément pour moi, et l'idée de te perdre m'est insupportable.",
  "Malgré les obstacles, malgré la distance, malgré tout ce qui pourrait nous compliquer la tâche, je suis heureux d'être avec toi. Et j'essaie chaque jour de t'offrir la meilleure version de moi-même.",
];

const QUESTION = "D'après ce que tu viens de lire, qu'est-ce que je suis pour toi ?";
const OPTIONS = [
  "Ta star et ton refuge 🌟",
  "Un ami parmi d'autres",
  "Une habitude comme une autre",
  "Je ne sais pas encore",
];
const CORRECT_INDEX = 0;
const MAX_ATTEMPTS = 3;

type Stage = "letter" | "question" | "gifts";

export default function GiftsPage() {
  const [stage, setStage] = useState<Stage>("letter");
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct" | "revealed">("idle");

  const [bookChoice, setBookChoice] = useState<string | null>(null);
  const [bookSending, setBookSending] = useState(false);

  const [museumRequested, setMuseumRequested] = useState(false);
  const [museumSending, setMuseumSending] = useState(false);

  const [cakeTime, setCakeTime] = useState("");
  const [cakeConfirmed, setCakeConfirmed] = useState(false);
  const [cakeSending, setCakeSending] = useState(false);

  const handleAnswer = async (index: number) => {
    if (feedback === "correct" || feedback === "revealed") return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const isCorrect = index === CORRECT_INDEX;

    await sendGiftEmail(
      "💌 Sa réponse à la question",
      `Tentative ${nextAttempts}/${MAX_ATTEMPTS} — elle a répondu : "${OPTIONS[index]}" ${
        isCorrect ? "(bonne réponse ✅)" : "(mauvaise réponse ❌)"
      }`
    );

    if (isCorrect) {
      setLocked(index);
      setFeedback("correct");
    } else if (nextAttempts >= MAX_ATTEMPTS) {
      setLocked(CORRECT_INDEX);
      setFeedback("revealed");
    } else {
      setFeedback("wrong");
    }
  };

  const handleBookChoice = async (choice: string) => {
    setBookSending(true);
    await sendGiftEmail(
      "🎁 Elle a choisi son cadeau lecture",
      `Ma douce a choisi : ${choice}`
    );
    setBookChoice(choice);
    setBookSending(false);
  };

  const handleMuseum = async () => {
    setMuseumSending(true);
    await sendGiftEmail(
      "🏛️ Demande de ticket musée",
      "Elle a demandé son ticket de musée (5 000 FCFA). Pense à lui envoyer de quoi payer !"
    );
    setMuseumRequested(true);
    setMuseumSending(false);
  };

  const handleCake = async () => {
    if (!cakeTime) return;
    setCakeSending(true);
    await sendGiftEmail(
      "🎂 Heure de livraison du gâteau",
      `Elle souhaite recevoir son gâteau à ${cakeTime}. Préviens le livreur !`
    );
    setCakeConfirmed(true);
    setCakeSending(false);
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
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      <div className="relative z-10 px-6 py-20 flex flex-col items-center gap-10 min-h-screen justify-center">
        <AnimatePresence mode="wait">
          {stage === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl bg-white/15 backdrop-blur-md rounded-3xl p-10 text-center"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={paragraphIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-light leading-relaxed"
                >
                  {LETTER_PARAGRAPHS[paragraphIndex]}
                </motion.p>
              </AnimatePresence>

              <button
                onClick={() => {
                  if (paragraphIndex < LETTER_PARAGRAPHS.length - 1) {
                    setParagraphIndex(paragraphIndex + 1);
                  } else {
                    setStage("question");
                  }
                }}
                className="mt-10 px-8 py-3 rounded-full bg-pink-500/80 hover:bg-pink-500 transition"
              >
                {paragraphIndex < LETTER_PARAGRAPHS.length - 1
                  ? "Continuer"
                  : "Continuer 🤍"}
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {LETTER_PARAGRAPHS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full transition ${
                      i <= paragraphIndex ? "bg-pink-300" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl bg-white/15 backdrop-blur-md rounded-3xl p-10 text-center"
            >
              <h2 className="text-2xl font-light mb-8">{QUESTION}</h2>

              <div className="flex flex-col gap-3">
                {OPTIONS.map((option, index) => {
                  const isLocked = locked !== null;
                  const isCorrectOption = index === CORRECT_INDEX;

                  return (
                    <button
                      key={option}
                      disabled={isLocked}
                      onClick={() => handleAnswer(index)}
                      className={`px-5 py-3 rounded-full transition font-light ${
                        isLocked && isCorrectOption
                          ? "bg-pink-500 text-white"
                          : "bg-white/20 hover:bg-white/30"
                      } disabled:cursor-default`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {feedback === "wrong" && (
                <p className="mt-6 text-pink-200 font-medium">
                  Pas tout à fait 🤔 — il te reste {MAX_ATTEMPTS - attempts} essai
                  {MAX_ATTEMPTS - attempts > 1 ? "s" : ""}.
                </p>
              )}

              {feedback === "correct" && (
                <p className="mt-6 text-pink-200 font-medium">
                  C&apos;est exactement ça 🥹🤍
                </p>
              )}

              {feedback === "revealed" && (
                <p className="mt-6 text-pink-200 font-medium">
                  La vraie réponse, c&apos;est celle-là 🤍 — et c&apos;est ce que tu es
                  pour moi, vraiment.
                </p>
              )}

              {(feedback === "correct" || feedback === "revealed") && (
                <button
                  onClick={() => setStage("gifts")}
                  className="mt-8 px-8 py-3 rounded-full bg-pink-500/80 hover:bg-pink-500 transition"
                >
                  Voir mes cadeaux 🎁
                </button>
              )}
            </motion.div>
          )}

          {stage === "gifts" && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center gap-12"
            >
              <h1 className="text-4xl sm:text-5xl font-light text-center">
                🎉 Joyeux anniversaire, ma douce 🎉
              </h1>
              <p className="max-w-xl text-center text-lg font-light opacity-90">
                Trois petites surprises t&apos;attendent. Ouvre-les une par une 🤍
              </p>

              <div className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-3xl p-8 text-center">
                <p className="text-2xl mb-2">📚</p>
                <h2 className="text-xl font-semibold mb-2">
                  Pour la lectrice en toi
                </h2>
                <p className="opacity-80 mb-6 font-light">
                  Choisis ton cadeau : une carte cadeau pour acheter des livres
                  en ligne, ou un abonnement à une plateforme de lecture.
                </p>

                {bookChoice ? (
                  <p className="text-pink-200 font-medium">
                    💌 C&apos;est noté : {bookChoice} arrive bientôt !
                  </p>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      disabled={bookSending}
                      onClick={() => handleBookChoice("Carte cadeau livres")}
                      className="px-5 py-2 rounded-full bg-pink-500/80 hover:bg-pink-500 transition disabled:opacity-50"
                    >
                      Carte cadeau livres
                    </button>
                    <button
                      disabled={bookSending}
                      onClick={() =>
                        handleBookChoice("Abonnement lecture en ligne")
                      }
                      className="px-5 py-2 rounded-full bg-pink-500/80 hover:bg-pink-500 transition disabled:opacity-50"
                    >
                      Abonnement lecture
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-3xl p-8 text-center">
                <p className="text-2xl mb-2">🏛️</p>
                <h2 className="text-xl font-semibold mb-2">
                  Une visite au musée
                </h2>
                <p className="opacity-80 mb-6 font-light">
                  Un ticket t&apos;attend (5 000 FCFA). Clique pour le
                  demander.
                </p>

                {museumRequested ? (
                  <p className="text-pink-200 font-medium">
                    💌 Demande envoyée, ton ticket arrive !
                  </p>
                ) : (
                  <button
                    disabled={museumSending}
                    onClick={handleMuseum}
                    className="px-6 py-2 rounded-full bg-pink-500/80 hover:bg-pink-500 transition disabled:opacity-50"
                  >
                    {museumSending ? "Envoi..." : "Demander"}
                  </button>
                )}
              </div>

              <div className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-3xl p-8 text-center">
                <p className="text-2xl mb-2">🎂</p>
                <h2 className="text-xl font-semibold mb-2">
                  Un gâteau pour toi
                </h2>
                <p className="opacity-80 mb-6 font-light">
                  Choisis l&apos;heure à laquelle tu veux le recevoir
                  aujourd&apos;hui.
                </p>

                {cakeConfirmed ? (
                  <p className="text-pink-200 font-medium">
                    💌 Parfait, livraison prévue à {cakeTime} !
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="time"
                      value={cakeTime}
                      onChange={(e) => setCakeTime(e.target.value)}
                      className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <button
                      disabled={cakeSending || !cakeTime}
                      onClick={handleCake}
                      className="px-6 py-2 rounded-full bg-pink-500/80 hover:bg-pink-500 transition disabled:opacity-50"
                    >
                      {cakeSending ? "Envoi..." : "Confirmer l'heure"}
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => (window.location.href = "/home")}
                className="text-white/80 hover:text-white transition"
              >
                ← Retour
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
