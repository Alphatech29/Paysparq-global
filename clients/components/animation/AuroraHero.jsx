import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {useMotionTemplate,useMotionValue,motion,animate,} from "framer-motion";

const COLORS_TOP = ["#8D5500FF", "#E2BB73FF", "#ffc76d", "#E46300FF"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #82350c 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid pc:min-h-screen mobile:py-24  top-0 pc:pt-48 place-content-center overflow-hidden bg-gray-950 px-4 pc:py-0 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center mobile:pt-24 pc:pt-0">
        <h1 className="max-w-4xl text-interB bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center pc:text-5xl mobile:text-4xl font-bold leading-tight">
        Your Gateway to Gift Card Trading, Crypto Excellence, and Easy Bill Payments!
        </h1>
        <p className="my-6 max-w-2xl text-center text-xl leading-relaxed md:text-lg md:leading-relaxed">
        Paysparq: Nigeria`s top platform for crypto and gift card trading. Securely trade Bitcoin, Ethereum, USDT, and more, with easy international payments.
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          <a href="/auth/sign-up">Getting Started</a>
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};