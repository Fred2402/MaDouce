"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const lettersContent: Record<string, string> = {
  Monday: `Hellooo ma douce 💖
J’espère que tu vas bien et que tu es en bonne santé.
Je voulais te rappeler que tu es la plus belle, la plus forte et la plus intelligente du monde.

Je sais que tu dois être un peu fatiguée après le week-end, mais t’inquiète, supporte encore un peu… bientôt tu rentreras.
Si tu lis ce message au réveil, c’est que je suis sûrement déjà réveillé à attendre ton message. Sinon, soit je dors, soit je suis en cours, soit on est en appel… bref 😄

Love u ma douce, profite bien de ta journée.
Je prie pour que tu passes une excellente semaine et que Dieu te protège et veille sur toi.

Bisouuu 💋
Milo`,

  Tuesday: `Hellooo ma douce 💕
Ça vaaa ? On est déjà mardi, kiiiee 😄 ça passe vite hein.

Je voulais te dire que tu es vraiment la plus magnifique de la Terre, waouhhh.
Je ne remercierai jamais assez Dieu de t’avoir mise dans ma vie.
En tout cas, je ne compte pas te laisser partir… ça, c’est sûr 😌

Que Dieu te protège et qu’Il veille sur toi.
Bisou ma douce 💋
Camille`,

  Wednesday: `Coucouuu ma belle 🤍
Alors mercredi, c’est un jour un peu particulier…
Parce que dans la nuit du mercredi 24, j’ai reçu le plus beau cadeau de Noël que je puisse avoir : TOI.

Je dois écrire 7 lettres, donc je ne vais pas faire long, mais je voulais surtout te dire merci.
Merci de m’avoir donné la chance de te rendre heureuse.
Je ne suis pas parfait, j’ai plein de défauts, et comme tu n’aimes pas les promesses, je ne vais pas t’en faire de vaines.

Je veux juste te dire que je ferai tout pour ne jamais te faire regretter.

Que Dieu te protège et qu’Il veille sur toi.
Bisouuuu 💋
Camille, ton chien préféré 🐶`,

  Thursday: `Hello ma douce 💖
Ça dit quoiii ?
Comme je sais que tu aimes bien le jeudi parce que c’est bientôt le week-end, je voulais te dire merci.

Merci de rayonner comme ça dans ma vie.
Et je t’aimmmeee fort ❤️

Bon, techniquement je suis trop fan de toi, donc j’espère au moins te décrocher un sourire avec ce message 😌
Bref, bisou ma douce.
Que Dieu te protège et qu’Il veille sur toi.

Bisouuu 💋
Milo`,

  Friday: `Hello beauté 😍
Ça vaaa ? C’est le week-end !

Je sais que le réveil peut être lourd, mais le repos arrive bientôt.
Je prie pour que tout ce qui t’a fatiguée cette semaine soit restauré.

Et n’oublie pas de m’accorder du temps hein… merci merci 😄
Bref, n’oublie jamais que I love u ❤️

Que Dieu te protège et qu’Il veille sur toi.
Bisouuu 💋
Ton homme 😌`,

  Saturday: `Hello ma douce 💕
C’est l’heureee ! L’heure de te reposer 😌
Faut dormir et rester avec moi… pardon 😄 j’ai besoin de ma dose de toi.

Je n’ai pas grand-chose à dire aujourd’hui, si ce n’est que j’espère que tu as aimé ton cadeau, vu que tu vas le recevoir un samedi et que ta journée était fun.
Sinon, tu sais que je suis là pour t’écouter 🤍

Je fais tout ça parce que je t’ai promis de te rendre heureuse, et surtout parce que ça me fait plaisir de te faire plaisir, donc j’espère que ça te plaît.

Passe une bonne journée.
Que Dieu te protège et qu’Il veille sur toi.
I love u ❤️ (oui oui, je me permets)

Camille`,

  Sunday: `Alors ma douce 🤍
On est déjà à la fin de la semaine.

J’espère que tu t’es reposée et que tu as bien profité.
Je sais que je ne suis pas parfait et que peut-être cette semaine j’ai mal agi, ou que je t’ai vexée, énervée, ou mal compris… alors je m’excuse déjà.

Je tiens trop à toi pour laisser ces choses gâcher ta semaine.
Je veux que tu saches que je tiens énormément à toi et que je t’aime beaucoup.

Je prie pour que tous tes projets s’accomplissent.
Tu as sûrement eu beaucoup de ramba cette semaine, mais ne te laisse pas démoraliser : tu es forte, et je sais que tu vas surmonter tout ça.

Sache que je serai toujours là pour toi, même si tu es fâchée contre moi.
Moi, je sais que je ne peux pas être fâché contre toi.

J’espère que je ne te prends pas la tête et que je suis sur la bonne voie pour te rendre heureuse.
Je te souhaite une très bonne journée.

Que Dieu te protège, qu’Il veille sur toi et qu’Il t’accompagne dans chacun de tes projets.
Plein de bisous 💋
Je t’aime ❤️

De la part du gars le plus chanceux de la Terre, ton plus grand fan.
Camille`,
};

export default function LettersPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [openedDay, setOpenedDay] = useState<string | null>(null);
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
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

      {/* Back to Home */}
      <div className="relative z-10 pt-6 px-6">
        <button
          onClick={() => router.push("/home")}
          className="text-white/80 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>

      {/* Contenu */}
      <div className="relative z-10 pt-16 max-w-3xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!openedDay ? (
            <motion.div
              key="days"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {days.map((day) => {
                const isToday = day === today;

                return (
                  <div
                    key={day}
                    onClick={() => isToday && setOpenedDay(day)}
                    className={`p-6 rounded-2xl text-center backdrop-blur-md transition ${
                      isToday
                        ? "bg-pink-500/80 cursor-pointer"
                        : "bg-white/30 text-white/60 cursor-not-allowed"
                    }`}
                  >
                    <h2 className="text-xl font-light">{day}</h2>
                    {!isToday && <p className="mt-2 text-sm">🔒 Locked</p>}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 text-gray-800 rounded-3xl p-8 shadow-xl"
            >
              <p className="whitespace-pre-line leading-relaxed text-center">
                {lettersContent[openedDay]}
              </p>

              <button
                onClick={() => setOpenedDay(null)}
                className="mt-8 block mx-auto text-pink-500 hover:underline"
              >
                Back 💗
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
 