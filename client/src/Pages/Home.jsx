import React from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

// Reusable fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Generate high-quality images in under 5 seconds. No queues, just instant results every time.",
  },
  {
    icon: "🎨",
    title: "Multiple Styles",
    desc: "Photorealistic, anime, cinematic and more — choose from a wide range of artistic styles to match your vision.",
  },
  {
    icon: "💬",
    title: "AI Chat",
    desc: "Refine and perfect your images through seamless, natural conversation with our intelligent AI assistant.",
  },
  {
    icon: "🕘",
    title: "Full History",
    desc: "Every image you create is securely saved. Browse and download your complete creative history at any time.",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    desc: "Your creations belong to you. Full privacy controls ensure your images remain completely yours.",
  },
  {
    icon: "📥",
    title: "Instant Download",
    desc: "Download your generated images instantly in full HD quality — no watermarks, no restrictions, completely free.",
  },
];

const badges = [
  { icon: "✦", text: "Only signup needed" },
  { icon: "✦", text: "Private by default" },
  { icon: "✦", text: "Free to start" },
  { icon: "✦", text: "No watermarks" },
  { icon: "✦", text: "Instant generation" },
  { icon: "✦", text: "Cancel anytime" },
  { icon: "✦", text: "HD downloads" },
  { icon: "✦", text: "Your images, your rights" },
];

function Home() {
  const navigate = useNavigate();

  const handleGenBtn = () => {
    navigate("/chat");
  };

  const handleHistBtn = () => {
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] overflow-x-hidden font-sans">
      {/* ── NAVBAR ── */}
      <div className="px-3 sm:px-6 pt-4">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-24 pb-10 sm:pb-16 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-[10%] -left-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-[rgba(0,229,255,0.07)] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[5%] -right-[5%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-[rgba(99,102,241,0.08)] blur-[80px] pointer-events-none" />

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.25)] rounded-full px-4 py-1.5 text-[#00e5ff] text-xs tracking-wide mb-7"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          Powered by AI · Free to start
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-extrabold leading-none tracking-tighter mb-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
          }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
        >
          Image
          <br />
          <span className="text-[#00e5ff]">Generation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#7a8aaa] text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8 sm:mb-11 px-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          Transform your words into stunning visuals in seconds. Create,
          explore, and bring your imagination to life with next-gen AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
        >
          <motion.button
            onClick={handleGenBtn}
            className="bg-[#00e5ff] text-[#070b14] font-bold px-8 py-3.5 rounded-xl text-sm shadow-[0_0_30px_rgba(0,229,255,0.35)] cursor-pointer border-0"
            style={{ fontFamily: "'Syne', sans-serif" }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Generating →
          </motion.button>
          <motion.button
            onClick={handleHistBtn}
            className="bg-transparent border border-white/10 text-[#f0f4ff] px-8 py-3.5 rounded-xl text-sm cursor-pointer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            View Gallery
          </motion.button>
        </motion.div>

        <motion.div
          className="relative w-full mt-20 overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          {/* Left fade edge */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none" />
          {/* Right fade edge */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-3 w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...badges, ...badges].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 text-sm text-[#7a8aaa] whitespace-nowrap flex-shrink-0 hover:border-[rgba(0,229,255,0.3)] hover:text-[#00e5ff] transition-colors duration-200"
              >
                <span className="text-[#00e5ff] text-xs">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
        <p className="text-[#00e5ff] text-xs uppercase tracking-[3px] text-center mb-4">
          Why Imagger
        </p>
        <h2
          className="font-extrabold text-center tracking-tight mb-14"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Everything you need to
          <br />
          create stunning images
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 sm:p-7 lg:p-9 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: "rgba(0,229,255,0.3)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,229,255,0.1)] flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2.5 text-[#f0f4ff]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-[#7a8aaa] text-sm leading-relaxed font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-4 sm:mx-8 lg:mx-12 mb-12 sm:mb-16 lg:mb-24 px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20 rounded-3xl bg-gradient-to-br from-[rgba(0,229,255,0.08)] to-[rgba(99,102,241,0.06)] border border-[rgba(0,229,255,0.15)] text-center flex flex-col items-center gap-4">
        <h2
          className="font-extrabold tracking-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Ready to create something amazing?
        </h2>
        <p className="text-[#7a8aaa] font-light text-base max-w-md">
          Join thousands of creators already using Imagger every day.
        </p>
        <motion.button
          onClick={handleGenBtn}
          className="mt-2 bg-[#00e5ff] text-[#070b14] font-bold px-10 py-4 rounded-xl text-base shadow-[0_0_30px_rgba(0,229,255,0.35)] cursor-pointer border-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started Free →
        </motion.button>
      </section>
    </div>
  );
}

export default Home;
