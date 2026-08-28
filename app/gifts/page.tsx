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
  "Je sais que je n'ai pas toujours été doué pour mettre des mots sur ce que je ressens. Alors aujourd'hui, je me lance, sans détour.",
  "J'ai des sentiments pour toi, et je crois que ce que je ressens est assez fort pour que je te le dise enfin. Tu es intelligente, belle, gentille, attentive, à l'écoute. Tu es aussi une artiste dans l'âme — originale, passionnée dans tout ce que tu fais.",
  "Et cette passion, cette force de caractère, je la retrouve dans ta manière d'affronter les situations difficiles, de surmonter les épreuves et les gens. Je suis en admiration totale devant toi.",
  "Il y a une chose que j'aime moins : quand au moindre problème, tu as envie de tout effacer, comme si je n'existais plus, ou de me ghoster. Mais la plupart du temps, je me dis que ces réactions viennent du fait que tu tiens à moi, et que tu as un minimum d'attentes envers moi. C'est normal que tu te sentes vexée, triste ou déçue quand je fais n'importe quoi. Et rien qu'en me disant ça, j'arrive à passer au-dessus.",
  "J'essaie de te rendre heureuse, parfois en faisant les bons choix, parfois les mauvais — mais tout ça parce que tu le mérites. J'avais juste besoin que tu comprennes ça.",
];

const QUESTION = "Est-ce que tu me crois, quand je te dis tout ça ?";

type Stage = "letter" | "question" | "gifts";

export default function GiftsPage() {
  const [stage, setStage] = useState<Stage>("letter");
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  const [bookChoice, setBookChoice] = useState<string | null>(null);
  const [bookSending, setBookSending] = useState(false);

  const [museumRequested, setMuseumRequested] = useState(false);
  const [museumSending, setMuseumSending] = useState(false);

  const [cakeTime, setCakeTime] = useState("");
  const [cakeConfirmed, setCakeConfirmed] = useState(false);
  const [cakeSending, setCakeSending] = useState(false);

  const handleAnswer = async (value: "yes" | "no") => {
    setAnswer(value);
    await sendGiftEmail(
      "💌 Sa réponse à la question",
      `Elle a répondu : ${value === "yes" ? "Oui" : "Non"}`
    );
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
                {paragraphIndex < LETTER_PARAGRAPHS.length - 1
                  ? "Continuer"
                  : "Continuer"}
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

              {answer === null && (
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => handleAnswer("yes")}
                    className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition font-medium"
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => handleAnswer("no")}
                    className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition font-light"
                  >
                    Non
                  </button>
                </div>
              )}

              {answer === "yes" && (
                <>
                  <p className="text-pink-200 font-medium">
                    Ah ah, j&apos;espère que ça va te faire plaisir.
                  </p>
                  <button
                    onClick={() => setStage("gifts")}
                    className="mt-8 px-8 py-3 rounded-full bg-pink-500/90 hover:bg-pink-500 transition"
                  >
                    Voir mes cadeaux
                  </button>
                </>
              )}

              {answer === "no" && (
                <>
                  <p className="text-pink-200 font-medium mb-6">
                    Tu es sûre ? Prends le temps d&apos;y réfléchir encore un
                    peu.
                  </p>
                  <button
                    onClick={() => setAnswer(null)}
                    className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition font-light"
                  >
                    Réessayer
                  </button>
                </>
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
                    ligne — à budget réduit, mais avec tout mon cœur dedans.
                  </p>
                  <p className="opacity-90 font-light text-sm">
                    📱 Ou un abonnement lecture illimité, avec accès à des
                    millions de livres internationaux, valable jusqu&apos;à
                    nos 1 an ensemble — après ça, tu pourras switcher si tu
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

              <div className="text-9xl font-serif text-pink-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mt-8">
                U
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
