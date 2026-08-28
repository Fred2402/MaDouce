"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  "Je sais que je n'ai pas toujours été doué pour mettre des mots sur ce que je ressens. Mais bon je vais essayer, donc , je te raconte :",
  "J'ai des sentiments pour toi, premier degré hein. Après, tu t'es vue ? Tu es intelligente, authentique , passionée , captivante, solaire, belle, douce, gentille, à l'écoute, sexy avec de beaux yeux en plus... bref, tu es toi, et c'est exactement ça que j'aime. Tu respires ta personnalité et tes passions.",
  "Et cette force de caractère, je la retrouve dans ta manière d'affronter les situations difficiles, de surmonter les épreuves et les gens. Je suis en admiration totale devant toi.",
  "Mais toi comme moi, on n'est pas parfaits, hein. Des fois, au moindre problème, j'ai l'impression que tu as envie de tout effacer, comme si je n'existais plus, ou de me ghoster carrément. Et ça, bah j'aime pas. Mais pour moi ça ne sera et ça n'a jamais été un frein, je me suis dit que si tu réagis comme ça, c'est parce que tu tiens à moi, que tu as des attentes envers moi, et que c'est normal de te sentir vexée, triste ou déçue quand je fais n'importe quoi. Tu vois, pour moi ça me montre que je commence à un peu mieux te connaître et te cerner. Rien qu'en me le rappelant, j'arrive à passer au-dessus (ps : ça ne veut pas dire que tu dois aussi le faire tout le temps hein, je veux juste que les difficultés on les résoud ensemble et que ça se fasse de manière naturelle, tu vois).",
  "J'essaie de te rendre heureuse, parfois en faisant les bons choix, parfois les mauvais, mais tout ça parce que tu le mérites. Et aussi moi ça me plait de te rendre heureuse donc voilà voilà.",
];

const QUESTION = "Tu me crois ?";
const MAX_NO = 3;

type Stage = "letter" | "question" | "gifts";

export default function GiftsPage() {
  const [stage, setStage] = useState<Stage>("letter");
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const [noCount, setNoCount] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const [bookChoice, setBookChoice] = useState<string | null>(null);
  const [bookSending, setBookSending] = useState(false);

  const [museumRequested, setMuseumRequested] = useState(false);
  const [museumSending, setMuseumSending] = useState(false);

  const [cakeTime, setCakeTime] = useState("");
  const [cakeConfirmed, setCakeConfirmed] = useState(false);
  const [cakeSending, setCakeSending] = useState(false);

  const handleNo = async () => {
    const next = Math.min(noCount + 1, MAX_NO);
    setNoCount(next);
    await sendGiftEmail(
      "💌 Sa réponse à la question",
      `Elle a répondu "Non" (${next}/${MAX_NO})`
    );
  };

  const handleYes = async () => {
    await sendGiftEmail(
      "💌 Sa réponse à la question",
      noCount > 0
        ? `Elle a fini par répondre "Oui" (après ${noCount} "non")`
        : `Elle a répondu "Oui" directement`
    );
    setConfirmed(true);
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

  const yesScale = 1 + Math.min(noCount, MAX_NO) * 0.2;

  return (
    <main
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: "url('/backgrounds/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      <div className="relative z-10 px-6 py-20 flex flex-col items-center gap-10 min-h-screen justify-center">
        <AnimatePresence mode="wait">
          {stage === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl bg-black/30 backdrop-blur-md rounded-3xl p-10 text-center shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={paragraphIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-light leading-relaxed [text-shadow:_0_1px_6px_rgb(0_0_0_/_60%)]"
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
                className="mt-10 px-8 py-3 rounded-full bg-pink-500/90 hover:bg-pink-500 transition"
              >
                Continuer
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
              className="w-full max-w-xl bg-black/30 backdrop-blur-md rounded-3xl p-10 text-center shadow-xl"
            >
              <h2 className="text-2xl font-light mb-10 [text-shadow:_0_1px_6px_rgb(0_0_0_/_60%)]">
                {QUESTION}
              </h2>

              {!confirmed ? (
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <motion.button
                    animate={{ scale: yesScale }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={handleYes}
                    className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition font-medium"
                  >
                    Oui
                  </motion.button>

                  {noCount < MAX_NO && (
                    <button
                      onClick={handleNo}
                      className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition font-light"
                    >
                      Non
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-pink-200 font-medium">
                  Ah ah, j&apos;espère que ça va te faire plaisir.
                </p>
              )}

              {noCount >= MAX_NO && !confirmed && (
                <p className="mt-6 text-pink-200 font-medium">
                  Kié, toi aussi tu vas choisir oui, pardon 😂
                </p>
              )}

              {confirmed && (
                <button
                  onClick={() => setStage("gifts")}
                  className="mt-8 px-8 py-3 rounded-full bg-pink-500/90 hover:bg-pink-500 transition"
                >
                  Voir mes cadeaux
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
              <h1 className="text-4xl sm:text-5xl font-light text-center [text-shadow:_0_1px_8px_rgb(0_0_0_/_60%)]">
                🎉 Joyeux anniversaire, ma douce 🎉
              </h1>
              <p className="max-w-xl text-center text-lg font-light opacity-90 [text-shadow:_0_1px_6px_rgb(0_0_0_/_60%)]">
                Trois petites surprises t&apos;attendent. Ouvre-les une par une.
              </p>

              <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl">
                <p className="text-2xl mb-2">📚</p>
                <h2 className="text-xl font-semibold mb-4">
                  Pour la lectrice en toi
                </h2>

                <div className="text-left space-y-3 mb-6">
                  <p className="opacity-90 font-light text-sm">
                    📖 Une carte cadeau pour t&apos;acheter des livres en
                    ligne, à budget réduit, mais avec tout mon cœur dedans.
                  </p>
                  <p className="opacity-90 font-light text-sm">
                    📱 Ou un abonnement lecture illimité, avec accès à des
                    millions de livres internationaux, valable jusqu&apos;à
                    nos 1 an ensemble, après quoi tu pourras switcher si tu
                    veux.
                  </p>
                </div>

                {bookChoice ? (
                  <p className="text-pink-200 font-medium">
                    💌 C&apos;est noté : {bookChoice} arrive bientôt !
                  </p>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      disabled={bookSending}
                      onClick={() => handleBookChoice("Carte cadeau livres")}
                      className="px-5 py-2 rounded-full bg-pink-500/90 hover:bg-pink-500 transition disabled:opacity-50"
                    >
                      Carte cadeau
                    </button>
                    <button
                      disabled={bookSending}
                      onClick={() =>
                        handleBookChoice("Abonnement lecture illimité")
                      }
                      className="px-5 py-2 rounded-full bg-pink-500/90 hover:bg-pink-500 transition disabled:opacity-50"
                    >
                      Abonnement illimité
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl">
                <p className="text-2xl mb-2">🏛️</p>
                <h2 className="text-xl font-semibold mb-2">
                  Une visite au musée
                </h2>
                <p className="opacity-90 mb-6 font-light">
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
                    className="px-6 py-2 rounded-full bg-pink-500/90 hover:bg-pink-500 transition disabled:opacity-50"
                  >
                    {museumSending ? "Envoi..." : "Demander"}
                  </button>
                )}
              </div>

              <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl">
                <p className="text-2xl mb-2">🎂</p>
                <h2 className="text-xl font-semibold mb-2">
                  Un gâteau pour toi
                </h2>
                <p className="opacity-90 mb-6 font-light">
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
                      className="px-6 py-2 rounded-full bg-pink-500/90 hover:bg-pink-500 transition disabled:opacity-50"
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

              <div className="text-9xl font-serif text-purple-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mt-8">
                U
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
